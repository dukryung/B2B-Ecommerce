const {Router} = require('express');
const serviceUser =  require('./services/user')
const serviceLog = require('./services/log')
const routes = Router();



routes.get("/users", serviceUser.getUsers)
routes.post("/", serviceUser.insertUser)

routes.get("/log/:id", serviceLog.getDealLogById)

module.exports = routes;


