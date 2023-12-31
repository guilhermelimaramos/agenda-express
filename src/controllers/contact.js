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

  const contact = await Contact.searchById(req.params.id)
  if(!contact) return res.render('404')
  res.render('contact', { contact: contact })
}

exports.edit = async (req, res) => {
  try {
    if(!req.params.id) return res.render('404')
    const contact = new Contact(req.body)
    await contact.edit(req.params.id)
  
    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors)
      req.session.save(() => res.redirect(`/contato/index/${req.params.id}`));
      return
    }
  
    req.flash('success', 'Contato editado com Sucesso')
    req.session.save(() => res.redirect(`/contato/index/${contact.contact._id}`))
    return
  } catch(e) {
    console.log(e)
    res.render('404')
  }

}

exports.delete = async (req, res) => {
  if(!req.params.id) return res.render('404')

  const contact = await Contact.delete(req.params.id)
  if(!contact) return res.render('404')
  req.flash('success', 'Contato apagado com Sucesso')
  req.session.save(() => res.redirect('back'))
}