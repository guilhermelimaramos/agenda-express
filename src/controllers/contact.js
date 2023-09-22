// const exports = require('webpack')
const Contact = require('../models/ContactModel')
const { async } = require("regenerator-runtime")

exports.index = (req, res) => {

  res.render('contact', {
     contact: {}
  })
}

exports.register = async (req, res) => {
  try { 
    const contact = new Contact(req.body) 
    await contact.register()

    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors)
      req.session.save(() => res.redirect('back'))
      return
    }

    req.flash('success', 'Contato salvo com Sucesso')
    req.session.save(() => res.redirect(`/contato/index/${contact.contact._id}`))
    return
  }catch(e) {
    console.log(e)
    return res.render('404')
  }
}

exports.editIndex = async (req, res) => {
  if(!req.params.id) return res.render('404')

  const contact = new Contact(req.body)
  contact.searchById(req.params.id)
  if(!contact) return res.render('404')
  res.render('contact', { contact })
}