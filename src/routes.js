const {Router} = require('express');
const serviceUser = require('./services/user')
const serviceLog = require('./services/log')
const routes = Router();


routes.get("/users", serviceUser.readUsers)
routes.get("/users/:id", serviceUser.readUserById)
routes.get("/users/:name", serviceUser.readUserByName)

routes.post("/users", serviceUser.createUser)
routes.put("/users", serviceUser.updateUserById)

routes.get("/log/:id", serviceLog.readLogsById)

module.exports = routes;


