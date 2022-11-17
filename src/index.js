const express = require('express');
const ws = require('./websocket')
const http = require('http');
const {getPool} = require('./utils/database');
const serviceUser = require('./services/user')
const serviceLog = require('./services/log')
const serviceProduct = require('./services/product')
const serviceLogin = require('./services/login')
const serviceRoutes = require('./router/service');
const loginRouter = require('./router/login')
const cors = require('cors');


//serviceApp implementation by using websocket.
const serviceApp = express().use((req, res) => res.sendFile('/public/index.html', {root: __dirname})).use(express.json()).use(cors)
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
    }
)();


//loginApp is for login.
const loginApp = express().use(cors()).use(loginRouter);
const loginServer = http.createServer(loginApp);
loginServer.listen(10005, () => console.log(`Listening on ${10005}`));
