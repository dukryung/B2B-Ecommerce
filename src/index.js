const express = require('express');
const ws = require('./websocket')
const http = require('http');
const {getPool} = require('./utils/database');
const serviceUser = require('./services/user')
const serviceLog = require('./services/log')
const serviceProduct = require('./services/product')
const serviceLogin = require('./services/login')
const serviceRoutes = require('./router/service');
const loginRouter = require('./router/login');
const cors = require('cors');
const {Session} = require('./utils/session')


//serviceApp implementation by using websocket.

const serviceApp = express().use(express.json()).use(cors()).use(async (req, res, next) => {
    sess = new Session()
    try {
        if (req.body.type === "createUser") next()
        const isValid =  await sess.check(req.body.email, req.header.session)

        if (!isValid) {
            throw 'session invalid'
        }
        next()
    } catch (e) {
        console.error(e)
    }
}).use((req, res) => res.sendFile('/public/index.html', {root: __dirname}))
    .listen(10002, () => console.log(`Listening on ${10002}`));
const serviceServer = ws.init(serviceApp);
serviceRoutes.init(serviceServer);

(async () => {
    try {
        const pool = await getPool();
        serviceUser.init(pool)
        serviceLog.init(pool)
        serviceProduct.init(pool)
        serviceLogin.init(pool)
    } catch (e) {
        console.error(e)
    }
})();

//loginApp is for login.
const loginApp = express().use(express.json()).use(cors()).use(loginRouter);
const loginServer = http.createServer(loginApp);
loginServer.listen(10005, () => console.log(`Listening on ${10005}`));