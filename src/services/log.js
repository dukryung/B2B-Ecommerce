const parse = require('../utils/parse')
const log = new Object();
const db = new Object();

log.init = function (pool) {
    db.pool = pool
}

log.readLogs = async function (req, res) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`
            SELECT id,
                   type,
                   trader_id,
                   create_time,
                   update_time
            FROM deal_log`)
        await poolClient.query('COMMIT');
        console.log("data ", data)
        res.status(200).json(parse.resBody(true, null, data.rows))
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))
    } finally {
        poolClient.release();
    }
}

log.readLogsById = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`
            SELECT id,
                   type,
                   trader_id,
                   create_time,
                   update_time
            FROM deal_log
            WHERE user_id = $1`, [msg.id])
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

log.createLogs = async function (socket, msg) {
    const poolClient = await db.pool.connect();
    try {
        await poolClient.query('BEGIN');
        await poolClient.query(`INSERT INTO deal_log (user_id, type, trader_id, create_time, update_time)
                             VALUES ($1, $2,
                                     $3, Now(),
                                     Now()) RETURNING *`, [msg.user_id, msg.type, msg.trader_id])
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

module.exports = log