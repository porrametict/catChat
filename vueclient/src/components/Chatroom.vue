<template>
  <div v-if="user">
    <h1>{{chatroom}}</h1>
    <input type="text" v-model="inputMessage"  @keypress.13="sendMessage(inputMessage)">

    <hr>
    <ul>
      <li v-for="(m,index) in messages" v-bind:key="index">{{m.user.username}} : {{m.body}}</li>
    </ul>
    <hr>
     <button @click="exitChat">ออกจากห้อง</button>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Ws from "@adonisjs/websocket-client";
const ws = Ws("ws://localhost:3333");
export default {
  name: "app",
  components: {},
  data: () => ({
    ws: null,
    chatroom: null,
    inputMessage: "Hello cat",
    messages: [],
    token : null 
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
    this.chatroom = await this.$route.params.chatname;
    this.connectServe();
    let token = localStorage.getItem('access_token')
    console.log("Chatroom start Token : ",token)
    this.token = token
  },
  methods: {
    connectServe: async function() {
      ws.withApiToken(this.token)
      .connect();
      this.chat = ws.subscribe(`chat:${this.chatroom}`);
      this.chat.on("ready", () => {
        this.sendMessage("Hello World");
      });
      this.chat.on("message", e => {
        this.reciveMessage(e);
      });

      this.chat.on("close" , () => {
      alert("คุณได้ออกจากห้องเเล้ว")
      this.$router.push({name:"home"})
      })

      this.chat.on('off' , () => {
          
      })
    },
    sendMessage: async function(message) {
      this.chat.emit("message", {body:message,user:this.user});
    },
    reciveMessage: async function(message) {
      this.messages.push(message);
    },
    exitChat : async function () {
       this.chat.emit("close",{user:this.user})
    }
  }
};
</script>

