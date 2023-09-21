// const HomeModel = require('../models/HomeModel')

// HomeModel.create({
//   title: 'Other title to test',
//   description: ''
// })
  // .then(data => console.log(data))
  // .catch(e => console.log('Error:', e))

exports.homePage = (req, res) => {
  res.render('index', {
    title: 'Title of Home Page',
    numbers: [0, 1, 2, 4, 5, 6, 7, 8, 9]
  })
}

exports.treatsPost = (req, res) => {
  res.send(req.body)
}

