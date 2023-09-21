exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors')
  next()
}

exports.checkCsrfErro = (err, req, res, next) => {
  if (err) {
    return res.render('404')
  }
  next()
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}