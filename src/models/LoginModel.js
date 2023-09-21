const mongoose = require('mongoose')
const validator = require('validator')

const LoginSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: {type: String, require: true}
  
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
  constructor(body) {
    this.body = body,
    this.errors = [],
    this.user = null
  }

  async register() {
    this.valid()
    if(this.errors.length > 0) return

    try {
      this.user = await LoginModel.create(this.body)
    } catch (e) {
      console.log('Erro', e)
    }
  }

  valid() {
    this.cleanUP()
    //email must valid
    if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido ') 

    //password
    if (this.body.password.length < 6 || this.body.password.length > 30) this.errors.push('A senha precisar ter entre 3 e 30 caractéres')
    
  }

  cleanUP() {
    for(const key in this.body) { 
      if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  } 



  cleanUP() {
    for(const key in this.body) { 
      if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  } 
}

module.exports = Login;