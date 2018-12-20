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
    //console.log(message,this.socket.id)
    this.socket.broadcastToAll('message',message)
    //this.socket.broadcastToAll('message',this.collectSummation(message))

    //this.socket.emitTo('message',{username: 'TEST',message:'You Only'},[this.socket.id])
    this.socket.emit('id',"dfgdfgd")
    
  }


}

module.exports = ChatController
