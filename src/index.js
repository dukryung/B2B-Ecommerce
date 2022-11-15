const express = require('express');
const ws = require('./websocket')
const {getPool} = require('./utils/database');
const serviceUser = require('./services/user')
const serviceLog = require('./services/log')
const serviceProduct = require('./services/product')
const routes = require('./routes');
const cors = require('cors');

const app = express().use((req, res) => res.sendFile('/public/index.html', {root: __dirname})).use(express.json()).use(cors)
    .listen(10002, () => console.log(`Listening on ${10002}`));

const wsServer = ws.init(app);
routes.init(wsServer);

(async () => {
        try {
            const pool = await getPool();
            serviceUser.init(pool)
            serviceLog.init(pool)
            serviceProduct.init(pool)

        } catch (e) {
            console.error(e)
        }
    }
)();