const redis = require('redis');
const crypto = require('./crypto');
const session = new Object()

session.init = function () {
    session.redisClient = redis.createClient({host: "localhost", port: 6379})
    session.expireHours = 24 * 60 * 60 * 1000
}

session.check = async (redisSession, headerSession) => {
    await session.redisClient.connect()
    try {
        if (new Date().getTime() + session.expireHours > Date.parse(session.expire) || headerSession !== session.auth_code) {
            console.log("session expired !!")
            return false
        }
        return true
    } catch (e) {
        console.error(e)
        return false
    } finally {
        await session.redisClient.disconnect()
    }
}

session.set = async (email) => {
    await session.redisClient.connect()
    try {
        const nowTime = new Date().getTime();
        const session = await crypto.createHash(email)
        await this.client.set(email, JSON.stringify({
            expire: new Date(nowTime + this.expireHours).toISOString(),
            auth_code: session.hashed_value
        }));
    } catch (e) {
        console.error(e)
    } finally {
        await session.redisClient.disconnect()
    }
}

session.get = async (email) => {
    console.log('LOGGED');
    await session.redisClient.connect()
    try {
        const session = await session.redisClient.get(email)
        return session
    } catch (e) {
        console.error(e)
    } finally {
        await session.redisClient.disconnect()
    }
}

session.delete = async (email) => {

    console.log('LOGGED');
    try {
        const session = await this.client.del(email)
        return session
    } catch (e) {
        console.error(e)
    } finally {

    }
}


class Session {

    constructor(client) {
        if (client === null || client === undefined) {
            const redisClient = redis.createClient({host: "localhost", port: 6379})
            this.client = redisClient
        }


        return this

    }


}

module.exports = session