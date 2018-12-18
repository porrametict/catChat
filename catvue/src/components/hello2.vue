<template>
  <div>
    <input type="text" v-model="name">
    <h1 >User 1 : {{name}}</h1>
    <input type="number" v-model="inputmsg" @keypress.13="sendMessage(inputmsg)">

    <ul>
      <li v-for="(m,index) in allmsg" v-bind:key="index">{{m.username}} :  {{m.message}}</li>
    </ul>
 <hr>
  </div>
</template>

<script>

/* eslint-disable */

import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://localhost:3333')


export default {

  data : () => ({
    name: "User01",
    ws : null ,
    chat : null,
    inputmsg : 0,
    allmsg : [{username: "client" , message  : "Welcome"}]
  }),

  async created () {
      this.Wsconnect()
  },
  methods : {
     async Wsconnect  () {
       ws.connect()
       this.chat = ws.subscribe('chat')

       this.chat.on('ready', () => {
        this.sendMessage("1")
        })

        this.chat.on('message', (event) => {
          this.reciveMessage(event)
        })
     },

     async sendMessage(msg) {
       this.chat.emit('message',{username : this.name , message : msg})
     },

     async reciveMessage(e) {
      console.log(e,"reciveMessage")
      this.allmsg.push(e)

     }
  }
  
}
</script>

