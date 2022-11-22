const parse = require('../utils/parse')
const login = new Object();
const db = new Object();
const redis = new Object();
const expireHours = 24 * 60 * 60 * 1000
login.init = function (pool, redisClient) {
    db.pool = pool
    redis.client = redisClient

}

login.readIndex = async function (req, res) {
}


login.readLogin = async function (req, res) {
    const poolClient = await db.pool.connect();
    await redis.client.connect();
    const id = req.body.id;

    try {
        await poolClient.query('BEGIN');
        const data = await poolClient.query(`SELECT id, name, attribute, authority, grade
                                             FROM users
                                             WHERE id = $1`, [id])

        const nowTime = new Date().getTime();

        await redis.client.set(data.rows[0].name, JSON.stringify({expire: new Date(nowTime + expireHours).toISOString()}))

        const redisData = await redis.client.get(data.rows[0].name, ["expire"])
        console.log("redisData : ", redisData)

        res.status(200).json(parse.resBody(true, null, "test"))
        await poolClient.query('COMMIT');
    } catch (e) {
        console.error(e)
        await poolClient.query('ROLLBACK');
        res.status(505).json(parse.resBody(false, e.toString(), null))

    } finally {
        poolClient.release()
        redis.client.disconnect()
    }

}

module.exports = login