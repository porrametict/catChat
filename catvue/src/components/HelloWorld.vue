<template>
  <div>
    <input type="text" v-model="inputmsg" @keypress.13="sendMessage(inputmsg)">

    <ul>
      <li v-for="m in allmsg" v-bind:key="m">{{m}}</li>
    </ul>

  </div>
</template>

<script>

/* eslint-disable */

import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://localhost:3333')


export default {

  data : () => ({
    ws : null ,
    chat : null,
    inputmsg : "catType",
    allmsg : ['GOOD LUCK !!']
  }),

  async created () {
      this.Wsconnect()
  },
  methods : {
     async Wsconnect  () {
       ws.connect()
       this.chat = ws.subscribe('chat')

       this.chat.on('ready', () => {
        this.sendMessage("HELLO CHAT")
        })

        this.chat.on('message', (event) => {
          this.reciveMessage(event)
        })
     },

     async sendMessage(msg) {
       this.chat.emit('message',msg)
     },

     async reciveMessage(e) {
      console.log(e,"reciveMessage")
      this.allmsg.push(e)

     }
  }
  
}
</script>
