'use strict'

const Chatroom = use("App/Models/Chatroom")
class ChatController {
	async index ({response,request}) {
		let form = request.all()
		let chat = Chatroom.all();
		return chat
	}

	async store({response,request}){
		let form = request.all()
		let chat = new Chatroom()
		chat.fill(form);
		await chat.save();
		return await Chatroom.all()
		 
	}

	async destroy ({request,response}){
		let form = request.all()
		return form 
	}
}

module.exports = ChatController
