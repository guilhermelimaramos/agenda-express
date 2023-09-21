const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: String
})

const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel