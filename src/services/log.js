const parse = require('../utils/parse')
const log = new Object();
const db = new Object();

log.init = function (pool) {
    db.pool = pool
}

log.readLogs = async function (req, res) {
    try {
        const data = await db.pool.query(`
            SELECT id,
                   type,
                   trader_id,
                   create_time,
                   update_time
            FROM deal_log`)

        console.log("data ", data)
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}

log.readLogsById = async function (req, res) {
    try {
        const data = await db.pool.query(`
            SELECT id,
                   type,
                   trader_id,
                   create_time,
                   update_time
            FROM deal_log
            WHERE user_id = $1`, [req.params.id])

        console.log("data ", data)
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}

log.createLogs = async function (req, res) {
    const body = parse.reqLogBody(req.body)
    try {
        await db.pool.query(`INSERT INTO deal_log (user_id, type, trader_id, create_time, update_time)
                             VALUES ($1, $2,
                                     $3, Now(),
                                     Now()) RETURNING *`, [body.user_id, body.type, body.trader_id])

        res.status(200).json(parse.resBody(true, null, null))
    } catch (e) {
        console.error(e)
        res.status(505).json(parse.resBody(false, e.toString(), null))
    }
}

module.exports = log