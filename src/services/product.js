const parse = require('../utils/parse')
const product = new Object();
const db = new Object();

product.init = function (pool) {
    db.pool = pool
}


product.readProductById = async function (req, res) {
    const id = req.params.id
    try {
        const data = await db.pool.query(`SELECT user_id, name, amount, location, create_time, update_time
                                          FROM products
                                          WHERE id = $1`, [id])
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}
product.readProductByUserId = async function (req, res) {
    const userId = req.params.user_id
    try {
        const data = await db.pool.query(`SELECT id, name, amount, location, create_time, update_time
                                          FROM products
                                          WHERE user_id = $1`, [userId])
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}

product.updateProductById = async function (req, res) {
    const body = parse.reqProductBody(req.body)
    try {
        await db.pool.query(`UPDATE products
                             SET name        = COALESCE($1, name),
                                 amount      = COALESCE($2, amount),
                                 location    = COALESCE($3, location),
                                 create_time = Now(),
                                 update_time = Now()
                             WHERE id = $4`, [body.name, body.amount, body.location, body.id])
        res.status(200).json(parse.resBody(true, null, null))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}
product.createProduct = async function (req, res) {
    const body = parse.reqProductBody(req.body)
    try {
        await db.pool.query(`INSERT INTO products (name, user_id, amount, location, create_time, update_time)
                             VALUES ($1, $2,
                                     $3, $4, Now(),
                                     Now()) RETURNING *`, [body.name, body.user_id, body.amount, body.location])

        res.status(200).json(parse.resBody(true, null, null))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}

module.exports = product


