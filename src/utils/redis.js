const redis = require('redis');
var session = require('express-session');
const redisStore = require('connect-redis')(session);
var client = redis.createClient()

module.exports.getSession = () => {

    return session({
        secret: "test",
        store: new redisStore({host: 'localhost', port: 6379, client: client}),
        saveUninitialized: false,
        resave: false,
    })
}