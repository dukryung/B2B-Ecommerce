const {Server} = require('socket.io')
const parse = require('./utils/parse')
const websocket = new Object()


const connections = [];
websocket.init = (server) => {
    let io = new Server(server);
    io.on('connection', socket => {
        console.log("socket.id : ", socket.id);
        const {latitude, longitude, techs} = socket.handshake.query;
        console.log("techs: ", techs)
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parse.StringAsArray(techs)
        })
    })

}

module.exports = websocket;