'use strict'

let room_states = ['normal','active']
let room_state = "normal"
let game_state = ['questioning','select_respondent','answering','end']
const Room = use('App/Models/Room')
let players = []
let host = {}
class RoomController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  async onPrompt(e) {
    players.push({ "user": e, "socket_id": this.socket.id })
    this.checkHost(e)
    this.updatePlayer(e)
  }
    
  async onMessage(message) {
    this.socket.broadcastToAll('message', message)
  }

  async onExit(e) {
    players = this.deleteUser(players, e.id)
    this.socket.broadcastToAll("playerExit", players)
    this.socket.close()

  }
  async onClose(e) { // ยังไม่สามารถ จัดการคนที่ ปิดเเท็บได้ หรือ กดย้อนกลับ เเล้ว ออกจากห้องได้
    console.log(e)
  }
  
  async onGameStart () {
    this.socket.emit("gameState")
        this.roomActive()
   // console.log("GAME START")
  }

  async roomActive(){
    this.socket.broadcastToAll("gameStarted")
    }

  async checkHost(e) {
    let room_code = this.socket.id
    let end = room_code.indexOf("#")
    room_code = room_code.substring(5, end)
    //console.log(room_code)
    let room = await Room.findBy("room_code", room_code)
    // console.log(room.toJSON().host_id)
    let host_id = room.toJSON().host_id
    if (host_id == e.id) {
      host = {user:e,socket_id:this.socket.id}
      this.socket.emit("isHost",true)
    }
  }

  async onQuestion (e) {
    this.socket.broadcast("question",e)
  } 

  async onWillAns (e) {
     this.socket.emitTo("getRespondent",e,[host.socket_id])
  }

  async onSelectRepondent (u) {
    players.forEach(element => {
      if(element.user.id == u.id){
        this.socket.emitTo("selectYou",true,[element.socket_id])
      }else{
        this.socket.emitTo("selectYou",false,[element.socket_id])
      }
      
    });
  }
  onSentAns (e) {
    this.socket.emitTo("getAnswer",e,[host.socket_id])
  }
  async onTof (e){
    // to be continues
  }
  updatePlayer(e) {
    this.socket.broadcastToAll("getPlayers", players)
    this.socket.broadcastToAll("newPlayer", e)
    // console.log(players)
  }


  deleteUser(arr, value) {
    return arr.filter(function (ele) {
      return ele.user.id != value;
    });
  }
}

module.exports = RoomController
