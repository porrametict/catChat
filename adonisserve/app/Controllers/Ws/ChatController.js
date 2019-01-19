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
    //console.log(message,this.socket.id)
    arr.push({"user": message.user,"socket": this.socket.id})
    //console.log(arr)
    
    this.socket.broadcastToAll('message', message)
  }

  async onClose(e){  
    console.log("onClose",e)
    this.socket.close()
  }
}

module.exports = ChatController
