const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/home')
const loginController = require('./src/controllers/login')
const contactController = require('./src/controllers/contact')
const { loginRequired } = require('./src/middlewares/middleware')


//home routes
route.get('/', homeController.index)

//login routes
route.get('/login/index', loginController.index)
route.post('/login/registro', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//contact routes
route.get('/contato/index', loginRequired, contactController.index)
route.post('/contato/registro', loginRequired, contactController.register)
route.get('/contato/index/:id', loginRequired, contactController.editIndex)
route.post('/contato/edit/:id', loginRequired, contactController.edit)




module.exports = route;