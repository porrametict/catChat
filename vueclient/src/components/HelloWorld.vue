<template>
  <div>
      <input type="text" v-model="inputMessage" id="" @keypress.13="sendMessage(inputMessage)">

      <hr>
      <ul>
        <li v-for="(m,index) in messages" v-bind:key="index">{{m}}</li>
      </ul>
  </div>
</template>
<script>

import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://localhost:3333')
export default {
  name : "app",
  components : {

  },
  data : () => ({
    ws : null,
    inputMessage : "Hello cat",
    messages: ['cat']
  })
  ,async created () {
        this.connectServe()
  }
  , methods : {
    connectServe : async function () {
        ws.connect()
        this.chat = ws.subscribe('chat')
        this.chat.on ('ready' , () => {
           this.sendMessage("Hello World")
          })
        this.chat.on ('message', (e)=> {
          this.reciveMessage(e)

        })

        

        

    },
    sendMessage : async function (message) {
      this.chat.emit("message",message)
    },
    reciveMessage : async function(message) {
      this.messages.push(message)

    }

  }
  
}
</script>

