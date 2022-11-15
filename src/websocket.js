const {Server} = require('ws');
const ws = new Object()


ws.init = function (server) {
    ws.Server = new Server({server})

    return ws.Server
}

module.exports = ws;
