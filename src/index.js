const express = require('express');
const ws = require('./websocket')
const http = require('http');
const {getPool} = require('./utils/database');
const {checkSession} = require('./utils/session')
const serviceUser = require('./services/user')
const serviceLog = require('./services/log')
const serviceProduct = require('./services/product')
const serviceLogin = require('./services/login')
const serviceRoutes = require('./router/service');
const loginRouter = require('./router/login');
const cors = require('cors');
const redis = require('redis');
const redisClient = redis.createClient({host: "localhost", port: 6379});

//serviceApp implementation by using websocket.
const serviceApp = express().use((req, res) => res.sendFile('/public/index.html', {root: __dirname})).use(express.json()).use(cors).use(function(req, res, next){
    console.log("A new request received at " + Date.now());
    next();
})
    .listen(10002, () => console.log(`Listening on ${10002}`));
const serviceServer = ws.init(serviceApp);
serviceRoutes.init(serviceServer);

(async () => {
    try {
        const pool = await getPool();
        serviceUser.init(pool)
        serviceLog.init(pool)
        serviceProduct.init(pool)
        serviceLogin.init(pool, redisClient)
    } catch (e) {
        console.error(e)
    }
})();

//loginApp is for login.
const loginApp = express().use(express.json()).use(cors()).use(loginRouter);
const loginServer = http.createServer(loginApp);
loginServer.listen(10005, () => console.log(`Listening on ${10005}`));
//number 7270 1635