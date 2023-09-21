// const HomeModel = require('../models/HomeModel')

// HomeModel.create({
//   title: 'Other title to test',
//   description: ''
// })
  // .then(data => console.log(data))
  // .catch(e => console.log('Error:', e))

exports.index = (req, res) => {
  res.render('index')
}

