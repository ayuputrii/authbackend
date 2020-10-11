const authRoute = require('express').Router();
const authController = require('../Controllers/authController');

authRoute.post('/register', authController.register);
authRoute.get('/login', authController.login);
authRoute.patch("/login/:id", authController.update);
authRoute.delete("/login/:id", authController.delete);

module.exports = authRoute