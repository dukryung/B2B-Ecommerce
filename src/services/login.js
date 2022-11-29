const parse = require('../utils/parse')
const login = new Object();
const db = new Object();
const session = require('../utils/session')

login.init = function (pool) {
    db.pool = pool
}

login.readIndex = async function (req, res) {
}


login.readLogin = async function (req, res) {
    const poolClient = await db.pool.connect();
    const id = req.body.id;
    const email = req.body.email;

    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, attribute, authority, grade
                                             FROM users
                                             WHERE id = $1
                                               AND email = $2`, [id, email])

        if (data.rows.length !== 1) {
            throw 'cannot find data'
        }
        await session.set(email)
        console.log(await session.get(email))

        await poolClient.query('COMMIT');

        res.redirect(`ws://localhost:10002/`)
        //res.status(200).json(parse.resBody(true, null, "test"))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))

    } finally {
        poolClient.release()
    }

}

module.exports = login