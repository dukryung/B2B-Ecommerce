const parse = require('../utils/parse')
const user = new Object();
const db = new Object();

user.init = function (pool) {
    db.pool = pool
}

user.readUsers = async function (req, res) {
    try {
        const data = await db.pool.query(`
            SELECT id,
                   name,
                   attribute,
                   authority,
                   grade
            FROM users`)

        console.log("data ", data)
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}

user.readUserById = async function (req, res) {
    const id = req.params.id
    try {
        const data = await db.pool.query(`SELECT id, name, attribute, authority, grade
                                          FROM users
                                          WHERE id = $1`, [id])
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}
user.readUserByName = async function (req, res) {
    const name = req.params.name
    try {
        const data = await db.pool.query(`SELECT id, name, attribute, authority, grade
                                          FROM users
                                          WHERE name = $1`, [name])
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}

user.updateUserById = async function (req, res) {
    const body = parse.reqUserBody(req.body)
    try {
        await db.pool.query(`UPDATE users
                             SET name        = COALESCE($1, name),
                                 attribute   = COALESCE($2, attribute),
                                 authority   = COALESCE($3, authority),
                                 grade       = COALESCE($4, grade),
                                 update_time = Now()
                             WHERE id = $5`, [body.name, body.attribute, body.authority, body.grade, body.id])
        res.status(200).json(parse.resBody(true, null, null))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}
user.createUser = async function (req, res) {
    const body = parse.reqUserBody(req.body)
    try {
        await db.pool.query(`INSERT INTO users (name, attribute, authority, create_time, update_time)
                             VALUES ($1, $2,
                                     $3, Now(),
                                     Now()) RETURNING *`, [body.name, body.attribute, body.authority])

        res.status(200).json(parse.resBody(true, null, null))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}

module.exports = user


