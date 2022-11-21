const parse = require('../utils/parse')
const login = new Object();
const db = new Object();
login.init = function (pool) {
    db.pool = pool

}

login.readIndex = async function (req, res) {
    console.log("seq :", req.session)
    if (req.session.key) {
        console.log(req.session.key)
    }
    res.status(200).json("finish")
}


login.readLogin = async function (req, res) {
    const poolClient = await db.pool.connect();
    const id = req.body.id;
    const sess = req.session;

    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, attribute, authority, grade
                                             FROM users
                                             WHERE id = $1`, [id])

        sess.name = data.name
        //res.status(200).json(parse.resBody(true, null, "test"))
        res.end('done');
        await poolClient.query('COMMIT');
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))

    } finally {
        poolClient.release()
    }

}

module.exports = login