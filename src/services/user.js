const parse = require('../utils/parse')
const user = new Object();
const db = new Object();

user.init = function (pool) {
    db.pool = pool
}

user.readUsers = async function (req, res) {
    const poolClient = db.pool.connect()
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`
            SELECT id,
                   name,
                   attribute,
                   authority,
                   grade
            FROM users`)

        await poolClient.query('COMMIT');
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))
    } finally {
        poolClient.release();
    }
}

user.readUserById = async function (req, res) {
    const poolClient = db.pool.connect()
    const id = req.params.id
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, attribute, authority, grade
                                             FROM users
                                             WHERE id = $1`, [id])
        await poolClient.query('COMMIT');
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))
    } finally {
        poolClient.release();
    }
}
user.readUserByName = async function (req, res) {
    const poolClient = db.pool.connect()
    const name = req.params.name
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, attribute, authority, grade
                                             FROM users
                                             WHERE name = $1`, [name])
        await poolClient.query('COMMIT');
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))
    } finally {
        poolClient.release();
    }
}

user.updateUserById = async function (req, res) {
    const poolClient = db.pool.connect()
    const body = parse.reqUserBody(req.body)
    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`UPDATE users
                                SET name        = COALESCE($1, name),
                                    attribute   = COALESCE($2, attribute),
                                    authority   = COALESCE($3, authority),
                                    grade       = COALESCE($4, grade),
                                    update_time = Now()
                                WHERE id = $5`, [body.name, body.attribute, body.authority, body.grade, body.id])
        await poolClient.query('COMMIT');
        res.status(200).json(parse.resBody(true, null, null))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))
    } finally {
        poolClient.release();
    }
}
user.createUser = async function (req, res) {
    const poolClient = db.pool.connect()
    const body = parse.reqUserBody(req.body)
    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`INSERT INTO users (name, attribute, authority, create_time, update_time)
                                VALUES ($1, $2,
                                        $3, Now(),
                                        Now()) RETURNING *`, [body.name, body.attribute, body.authority])
        await poolClient.query('COMMIT');
        res.status(200).json(parse.resBody(true, null, null))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))
    } finally {
        poolClient.release();
    }
}

module.exports = user


