const {Router} = require('express');
const serviceUser =  require('./services/user')
const routes = Router();



routes.get("/", serviceUser.getUsers)
routes.post("/", serviceUser.insertUser)

module.exports = routes;


