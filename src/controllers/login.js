const { async } = require('regenerator-runtime')
const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  // console.log(req.session.user)
  res.render('login')
}

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.register()

    if(login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save(() =>  {
        return res.redirect('back')
      });
      return
    }

    req.flash('success', 'Usuário criado com sucesso')
    req.session.save(() =>  {
      return res.redirect('back')
    });
  } catch (e) {
    return res.render('404')
  }
}

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.login()

    if(login.errors.length > 0) {
      req.flash('errors', login.errors)
      req.session.save(() =>  {
        return res.redirect('back')
      });
      return
    }

    req.flash('success', 'Você entrou no sistema')
    req.session.user = login.user
    req.session.save(() =>  {
      return res.redirect('/')
    });
  } catch (e) {
    return res.render('404')
  }
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}