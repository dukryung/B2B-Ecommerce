const parse = require('../utils/parse')
const product = new Object();
const db = new Object();

product.init = function (pool) {
    db.pool = pool
}


product.readProductById = async function (req, res) {
    const poolClient = await db.pool.connect();
    const id = req.params.id
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT user_id, name, amount, location, create_time, update_time
                                             FROM products
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
product.readProductByUserId = async function (req, res) {
    const poolClient = await db.pool.connect();
    const userId = req.params.user_id
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, amount, location, create_time, update_time
                                             FROM products
                                             WHERE user_id = $1`, [userId])
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

product.readProductByLocation = async function (req, res) {
    const poolClient = await db.pool.connect();
    const location = req.params.id
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, amount, location, create_time, update_time
                                             FROM products
                                             WHERE location = $1`, [location])
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


product.updateProductById = async function (req, res) {
    const poolClient = await db.pool.connect();
    const body = parse.reqProductBody(req.body)
    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`UPDATE products
                                SET name        = COALESCE($1, name),
                                    amount      = COALESCE($2, amount),
                                    location    = COALESCE($3, location),
                                    create_time = Now(),
                                    update_time = Now()
                                WHERE id = $4`, [body.name, body.amount, body.location, body.id])
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
product.createProduct = async function (req, res) {
    const poolClient = await db.pool.connect();
    const body = parse.reqProductBody(req.body)
    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`INSERT INTO products (name, user_id, amount, location, create_time, update_time)
                                VALUES ($1, $2,
                                        $3, $4, Now(),
                                        Now()) RETURNING *`, [body.name, body.user_id, body.amount, body.location])
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

product.deleteProductById = async function (req, res) {
    const poolClient = await db.pool.connect();
    const id = req.params.id
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query('DELETE FROM products WHERE id = $1', [id])
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

product.createParticipantsToAuction = async function (req, res) {
    const poolClient = await db.pool.connect();
    const body = parse.reqProductBody(req.body)
    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`INSERT INTO products (product_id, participants_id, amount, create_time, update_time)
                                VALUES ($1, $2,
                                        $3, Now(),
                                        Now()) RETURNING *`, [body.id, body.participants_id, body.amount])
        await poolClient.query('COMMIT');
        res.status(200).json(parse.resBody(true, null, null))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }finally {
        poolClient.release();
    }
}


module.exports = product


