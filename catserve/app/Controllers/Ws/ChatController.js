'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    this.summation = 0
  }
  collectSummation (message) {
  	this.summation  = this.summation + parseInt(message.message) 
  	this.cat = {username:message.username,message:this.summation}
  	return  this.cat; 
  }
  onMessage (message) {
    this.socket.broadcastToAll('message',message)

  }
}

module.exports = ChatController
