'use strict'
let arr = [] ;
class GameController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    //arr.push(this.socket)
    console.log(arr,"All Sockets")
  }
  onMessage(message){
    console.log(5555)
    this.socket.broadcastToAll('message', message)
  }
}

module.exports = GameController
