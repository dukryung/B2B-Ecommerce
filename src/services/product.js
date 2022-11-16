const parse = require('../utils/parse')
const product = new Object();
const db = new Object();

product.init = function (pool) {
    db.pool = pool
}


product.readProductById = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT user_id, name, amount, location, create_time, update_time
                                             FROM products
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
product.readProductByUserId = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, amount, location, create_time, update_time
                                             FROM products
                                             WHERE user_id = $1`, [msg.user_id])
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

product.readProductByLocation = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, amount, location, create_time, update_time
                                             FROM products
                                             WHERE location = $1`, [msg.location])
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


product.updateProductById = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`UPDATE products
                                SET name        = COALESCE($1, name),
                                    amount      = COALESCE($2, amount),
                                    location    = COALESCE($3, location),
                                    create_time = Now(),
                                    update_time = Now()
                                WHERE id = $4`, [msg.name, msg.amount, msg.location, msg.id])
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
product.createProduct = async function (socket, msg) {
    const poolClient = await db.pool.connect();

    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`INSERT INTO products (name, user_id, amount, location, create_time, update_time)
                                VALUES ($1, $2,
                                        $3, $4, Now(),
                                        Now()) RETURNING *`, [msg.name, msg.user_id, msg.amount, msg.location])
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

product.deleteProductById = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query('DELETE FROM products WHERE id = $1', [msg.id])
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

product.createParticipantsToAuction = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`INSERT INTO products (product_id, participants_id, amount, create_time, update_time)
                                VALUES ($1, $2,
                                        $3, Now(),
                                        Now()) RETURNING *`, [msg.id, msg.participants_id, msg.amount])
        await poolClient.query('COMMIT');
        socket.send(JSON.stringify(parse.resBody(true, null, null)))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        socket.send(JSON.stringify(parse.resBody(false, e.toString(), null)))
    }finally {
        poolClient.release();
    }
}


module.exports = product


