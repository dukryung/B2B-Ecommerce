const {Router} = require('express');
const serviceUser = require('./services/user')
const serviceLog = require('./services/log')
const serviceProduct = require('./services/product')
const routes = new Object()

routes.init = function (wsServer) {
    routes.wsServer = wsServer

    routes.wsServer.on("connection", (socket) => {
        console.log(Reflect.ownKeys(serviceUser))
        console.log('New client connected!');
        socket.on("message", (msg) => {
            msg = JSON.parse(msg)
            if (Reflect.has(serviceUser, msg.type)) {
                Reflect.apply(Reflect.get(serviceUser,msg.type),undefined , [socket, msg])
            } else if (Reflect.has(serviceProduct, msg.type)) {
                Reflect.apply(Reflect.get(serviceProduct,msg.type),undefined , [socket, msg])
            } else if (Reflect.has(serviceLog, msg.type)) {
                Reflect.apply(Reflect.get(serviceLog,msg.type),undefined , [socket, msg])
            }
        })
        socket.on('close', () => console.log('Client has disconnected!'));
    })

}

module.exports = routes;


