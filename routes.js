const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/home')
const constactController = require('./src/controllers/contact')


route.get('/', homeController.homePage)
route.post('/', homeController.treatsPost)

route.get('/contact', constactController.contactPage)

module.exports = route;