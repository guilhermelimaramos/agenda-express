const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/home')
const loginController = require('./src/controllers/login')


//home routes
route.get('/', homeController.index)

//login routes
route.get('/login/index', loginController.index)
route.post('/login/registro', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)


module.exports = route;