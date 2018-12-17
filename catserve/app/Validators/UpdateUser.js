'use strict'

class UpdateUser {
  get validateAll() {
    return true
  }


  get rules() {
    let user = this.ctx.request.all()
    return {
      // validation rules
      'email': `required|unique:users,email,id,${user.id}`,
      'username': `required|unique:users,username,id,${user.id}`,
      'password': 'min:6',
      'password_confirmation' : "required_with_any:password|same:password"

    }
  }
}

module.exports = UpdateUser
