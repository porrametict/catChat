'use strict'

class StoreUser {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      'email': 'required|email|unique:users,email',
      'username': 'required|unique:users,username',
      'password': 'required',
      'password_confirmation': 'required_with_any:password|same:password'
    }
  }
}

module.exports = StoreUser
