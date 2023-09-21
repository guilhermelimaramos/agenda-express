exports.middlewareGlobal = (req, res, next) => {
  res.locals.aVarLocal = 'Valeu of local variable'
  next()
}

exports.checkCsrfErro = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.render('404')
  }
  next()
}

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}