'use strict'

const Hash =use('Hash'); 
class UserLoginController {

	async index ({request,response,auth}){
		const {username,password} = request.all();
		let token = await auth.authenticator('user').attempt(username, password)
		console.log("USER CAT ",token)
		return token ;

	}

	async user({request,auth}){
		let user = await auth.authenticator('user').user ; 
		return user ;
	}


}

module.exports = UserLoginController
