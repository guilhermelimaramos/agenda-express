const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/home')
const loginController = require('./src/controllers/login')


//home routes
route.get('/', homeController.index)

//login routes
route.get('/login/index', loginController.index)

module.exports = route;