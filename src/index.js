const express = require('express');
const http = require('http');
const {getPool} = require('./utils/database');
const serviceUser = require('./services/user')
const serviceLog = require('./services/log')
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());

const server = http.Server(app);


(async () => {
        try {
            const pool = await getPool();
            serviceUser.init(pool)
            serviceLog.init(pool)
        } catch (e) {
            console.error(e)
        }
    }
)();


app.use(routes);
app.use(cors)

server.listen("10002");
