require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    //console.log('Connect to Data Base')
    app.emit('Done')
  })
  .catch(e => console.log('Error:', e));

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const routes = require('./routes')
const path = require('path')
// const helmet = require('helmet')
const csrf = require('csurf')
const { middlewareGlobal, checkCsrfErro, csrfMiddleware } = require('./src/middlewares/middleware');
const csurf = require('csurf');

app.use(express.urlencoded({ extended: true}))

// app.use(helmet())

app.use(express.static(path.resolve((__dirname), 'public')))

const sessionOptions = session({ 
  secret: 'foo',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})

app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

//our own middlewares
app.use(csurf())
app.use(checkCsrfErro)
app.use(csrfMiddleware)
app.use(middlewareGlobal)
app.use(routes)

app.on('Done', () => {
  app.listen(3000 , () => {
    console.log('Server running on port 3000!')
    console.log('Acsess: http://localhost:3000')
  });
})