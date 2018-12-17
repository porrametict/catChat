'use strict'

class login {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required',
      password: 'required'
    }
  }
}

module.exports = login
