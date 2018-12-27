<template>
  <div v-if="user">
    <h1>Hello Cortana {{user.username}}</h1>
    <input type="text" name="" id="" v-model="inputMessage" @keypress.13="sendMessage(inputMessage)">
    <hr>
    <ul>
      <li v-for="(m,index) in messages" v-bind:key="index"> {{m.user.username}} : {{m.body}}</li>
    </ul>
  </div>
</template>
<script>
import Ws from "@adonisjs/websocket-client";
const ws = Ws("ws://localhost:3333");
import { mapState } from "vuex";
import { watchFile } from 'fs';
export default {
  data: () => ({
    gameroom : null,
    inputMessage : "catcanfly",
    messages : []
  }),
  computed: {
    ...mapState({
      user: state => state.login.user
    })
  },
  async created() {
    if (!this.user) {
      await this.$store.dispatch("login/getUser");
    }
    this.gameroom = await this.$route.params.gamecode
    this.connectServe()
  },
  methods: {
    async start() {
      console.log("GameRoom.vue start");
    },
    async connectServe () {
      ws.connect();
      this.game = ws.subscribe(`game:${this.gameroom}`)
      this.game.on('ready',()=> {
        this.sendMessage("cattle")

      }),
      this.game.on('message', (msg) => {
        this.reciveMessage(msg)
      })

    },
    async sendMessage (message) {
      this.game.emit("message",{body:message,user:this.user})

    } ,
    async reciveMessage (message) {
      this.messages.push(message)
    }

  }
};
</script>

