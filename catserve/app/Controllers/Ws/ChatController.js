'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log(this.socket,this.request,"constructor")
  }

  onMessage (message) {
    this.socket.broadcastToAll('message',meassage)
  }
}

module.exports = ChatController
