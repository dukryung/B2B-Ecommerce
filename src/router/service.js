const serviceUser = require('../services/user')
const serviceLog = require('../services/log')
const serviceProduct = require('../services/product')
const service = new Object()

service.init = function (wsServer) {
    //set websocket server
    service.wsServer = wsServer
    service.wsServer.on("connection", (socket) => {
        console.log('New client connected!');
        socket.on("message", (msg) => {
            msg = JSON.parse(msg)
            if (Reflect.has(serviceUser, msg.type)) {
                Reflect.apply(Reflect.get(serviceUser, msg.type), undefined, [socket, msg])
            } else if (Reflect.has(serviceProduct, msg.type)) {
                Reflect.apply(Reflect.get(serviceProduct, msg.type), undefined, [socket, msg])
            } else if (Reflect.has(serviceLog, msg.type)) {
                Reflect.apply(Reflect.get(serviceLog, msg.type), undefined, [socket, msg])
            }
        })
        socket.on('close', () => console.log('Client has disconnected!'));
    })
}



module.exports = service;


