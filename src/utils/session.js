const redis = require('redis');
const crypto = require('./crypto');

module.exports = class Session {
    constructor(client) {
        if (client === null || client === undefined) {
            const redisClient = redis.createClient({host: "localhost", port: 6379})
            this.client = redisClient
        }
        return self.init()

    }

    async init() {
        this.expireHours = 24 * 60 * 60 * 1000
        this.good = "jayden"
        this.client = redis.createClient({host: "localhost", port: 6379})
        console.log("this : ",this)

        return this;
    }

    async check(req, res, next) {
        console.log("good : ",this.good)
        //
        // await this.client.connect()
        // try {
        //     if (req.body.type === "createUser") next()
        //
        //     const session = await self.get(req.body.email)
        //     if (new Date().getTime() + this.expireHours > Date.parse(session.expire) || req.header.session !== session.auth_code) {
        //         console.log("session expired !!")
        //         await self.delete(req.body.email)
        //         res.status(400).send('invalid session')
        //     }
        //
        //     next()
        // } catch (e) {
        //     console.error(e)
        // } finally {
        //     await this.client.disconnect()
        // }
    }

    async set(email) {
        await this.client.connect()
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
            await this.client.disconnect()
        }
    }

    async get(email) {
        await this.client.connect()
        console.log('LOGGED');
        try {
            const session = await this.client.get(email)
            return session
        } catch (e) {
            console.error(e)
        } finally {
            await this.client.disconnect()
        }
    }

    async delete(email) {
        await this.client.connect()
        console.log('LOGGED');
        try {
            const session = await this.client.del(email)
            return session
        } catch (e) {
            console.error(e)
        } finally {
            await this.client.disconnect()
        }
    }


}

