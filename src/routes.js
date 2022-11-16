const {Router} = require('express');
const serviceUser = require('./services/user')
const serviceLog = require('./services/log')
const serviceProduct = require('./services/product')
const serviceLogin = require('./services/login')
const routes = new Object()
const router = Router()

routes.init = function (wsServer) {
    //set http router
    routes.router = router


    //set websocket server
    routes.wsServer = wsServer
    routes.wsServer.on("connection", (socket) => {
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


    //
    routes.router.get("/login", serviceLogin.readLogin)
}



module.exports = routes;


