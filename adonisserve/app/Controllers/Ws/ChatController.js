'use strict'

let arr = [];


class ChatController {


  constructor ({ socket, request}) {
    this.socket = socket
    this.request = request  
  }


  async onPrompt (e) {
    //console.log("omPromt",e)
    arr.push({"user": e.user,"socket": this.socket.id})
    this.countUser()
    

  }

  async onMessage(message){
    this.socket.broadcastToAll('message', message)
  }

  async onExit(e){  
   // console.log("onExit",e)
    arr = this.deleteUser(arr,e.user.id)
    this.countUser()
    this.socket.close()
    
  }


  deleteUser (arr,value) {
    return arr.filter(function(ele){
      return ele.user.id != value;
  });

  }


  countUser() {
   // console.log("countUser",arr.length ,arr)
    this.socket.broadcastToAll('updateRoom',arr.length)
  }
}

module.exports = ChatController
