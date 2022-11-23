const parse = require('../utils/parse')
const user = new Object();
const db = new Object();

user.init = function (pool) {
    db.pool = pool
}

user.readUsers = async function (socket, msg) {
    const poolClient = await db.pool.connect();

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
        socket.send(JSON.stringify(parse.resBody(true, null, data.rows)))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        socket.send(JSON.stringify(parse.resBody(false, e.toString(), null)))
    } finally {
        poolClient.release();
    }
}

user.readUserById = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    console.log("msg : ", msg.id)
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, attribute, authority, grade
                                             FROM users
                                             WHERE id = $1`, [msg.id])
        await poolClient.query('COMMIT');
        socket.send(JSON.stringify(parse.resBody(true, null, data.rows)))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        socket.send(JSON.stringify(parse.resBody(false, e.toString(), null)))
    } finally {
        poolClient.release();
    }
}
user.readUserByName = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, attribute, authority, grade
                                             FROM users
                                             WHERE name = $1`, [msg.name])
        await poolClient.query('COMMIT');
        socket.send(JSON.stringify(parse.resBody(true, null, data.rows)))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        socket.send(JSON.stringify(parse.resBody(false, e.toString(), null)))
    } finally {
        poolClient.release();
    }
}

user.updateUserById = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    //const body = parse.reqUserBody(req.body)
    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`UPDATE users
                                SET name        = COALESCE($1, name),
                                    attribute   = COALESCE($2, attribute),
                                    authority   = COALESCE($3, authority),
                                    grade       = COALESCE($4, grade),
                                    update_time = Now()
                                WHERE id = $5`, [msg.name, msg.attribute, msg.authority, msg.grade, msg.id])
        await poolClient.query('COMMIT');
        socket.send(JSON.stringify(parse.resBody(true, null, null)))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        socket.send(JSON.stringify(parse.resBody(false, e.toString(), null)))
    } finally {
        poolClient.release();
    }
}
user.createUser = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`INSERT INTO users (email, name, attribute, authority, create_time, update_time)
                                VALUES ($1, $2,
                                        $3, $4, Now(),
                                        Now()) RETURNING *`, [msg.email, msg.name, msg.attribute, msg.authority])
        await poolClient.query('COMMIT');
        socket.send(JSON.stringify(parse.resBody(true, null, null)))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        socket.send(JSON.stringify(parse.resBody(false, e.toString(), null)))
    } finally {
        poolClient.release();
    }
}

module.exports = user


