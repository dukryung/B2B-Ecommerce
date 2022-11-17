const parse = require('../utils/parse')
const login = new Object();
const db = new Object();

login.init = function (pool) {
    db.pool = pool
}

login.readIndex = async function (req,res) {
    console.log("Inde")
    res.send('stop it!!!')
}

login.readLogin = async function (req, res) {
    const name = req.params.name
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`
            SELECT id,
                   name,
                   attribute,
                   authority,
                   grade
            FROM users WHERE name = $1`,[name])

        await poolClient.query('COMMIT');
        

        res.status(200).json(parse.resBody(true, null, "helloworlod"))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))
    } finally {
        poolClient.release();
    }
}

module.exports = login