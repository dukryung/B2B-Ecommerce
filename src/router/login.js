const {Router} = require('express');
const serviceLogin = require('../services/login')
const router = Router();

router.get("/", serviceLogin.readIndex);
router.get("/login", serviceLogin.readLogin)

module.exports = router