const {Router} = require('express');
const serviceUser = require('./services/user')
const serviceLog = require('./services/log')
const serviceProduct = require('./services/product')
const routes = Router();



routes.get("/", (req, res) => {
    res.sendFile(__dirname +'/public/index.html');
})
routes.get("/users", serviceUser.readUsers)
routes.get("/users/:id", serviceUser.readUserById)
routes.get("/users/:name", serviceUser.readUserByName)
routes.post("/users", serviceUser.createUser)
routes.put("/users", serviceUser.updateUserById)

routes.get("/products/location/:id", serviceProduct.readProductByLocation)
routes.get("/products/:id", serviceProduct.readProductById)
routes.get("/products/:user_id", serviceProduct.readProductByUserId)
routes.post("/products", serviceProduct.createProduct)
routes.put("/products", serviceProduct.updateProductById)
routes.delete("/products/:id", serviceProduct.deleteProductById)

routes.post("/products/auction/participants", serviceProduct.createParticipantsToAuction)

routes.get("/log/:id", serviceLog.readLogsById)

module.exports = routes;


