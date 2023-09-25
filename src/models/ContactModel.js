const mongoose = require('mongoose')
const { async } = require('regenerator-runtime')
// const { async } = require('regenerator-runtime')
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
  name: { type: String, require: true },
  lastname: { type: String, require: false, default: '' },
  email: { type: String, require: false},
  phone: { type: String, require: false},
  creationDate: { type: Date, default: Date.now }
})

const ContactModel = mongoose.model('Contact', ContactSchema)

class Contact { 
  constructor(body) {
    this.body = body,
    this.errors = [],
    this.contact = null
  }


  async register () {
    this.valid()
    if(this.errors.length > 0) return;

    this.contact = await ContactModel.create(this.body)
  }

  valid() {
    this.cleanUP()
    //email must valid
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido ') 

    //name is require
    if(!this.body.name) this.errors.push('Nome é obrigatório')

    if (!this.body.email && !this.body.phone) this.errors.push('Insira pelo menos o email ou o telefone')

  }

  cleanUP(){
    for(const key in this.body) { 
      if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      lastname: this.body.lastname,
      email: this.body.email,
      phone: this.body.phone,
      creationDate: this.body.creationDate
    }
  }

  static async searchById(id) {
    if(typeof id !== 'string') return
    const contact = await ContactModel.findById(id)
    return contact
  }

  async edit(id) {
    if(typeof id !== 'string') return
    this.valid
    if(this.errors.length > 0 ) return
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true })
  };

  static async searchContact() {
    const contacts = await ContactModel.find()
      .sort({ creationDate: -1 })
    return contacts
  }

  static async delete(id) {
    if(typeof id !== 'string') return
    const contact = await ContactModel.findOneAndDelete({ _id: id })
    return contact
  }

}

module.exports = Contact
