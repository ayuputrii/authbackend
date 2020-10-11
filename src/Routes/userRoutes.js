const userRoute = require('express').Router();
const userController = require('../Controllers/userController');

userRoute.get('/', userController.getAllusers);
userRoute.patch("/users/:id", userController.update);

module.exports = userRoute