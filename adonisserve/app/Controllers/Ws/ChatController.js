'use strict'

let arr = [];


class ChatController {


  constructor ({ socket, request}) {
    this.socket = socket
    this.request = request  
  }


  async onMessage(message){
    //console.log("onMessage")
    // let user = await auth.authercation('user').user ; 
    // console.log("User",user)
    console.log(message)
    this.socket.broadcastToAll('message', message)
  }
}

module.exports = ChatController
