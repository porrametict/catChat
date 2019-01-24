<template>
  <div v-if="user" id="section">
    <nav>
        <h2>All Players</h2>
        <ul>
            <li v-bind:key="index" v-for="(p,index) in allPlayer"><h3>{{p.user.username}}</h3></li>
        </ul>
    </nav>
    <div id="chat">
    <h1>{{room_code}}</h1>
    <h1 v-if="isHost">-- Host -- </h1>
    <h1> {{allPlayer.length}}  User(s)</h1>
    <input type="text" v-model="inputMessage"  @keypress.13="sendMessage(inputMessage)">

    <hr>
    <ul>
      <li v-for="(m,index) in messages" v-bind:key="index">{{m.user.username}} : {{m.body}}</li>
    </ul>
    <hr>
     <button @click="exitRoom">ออกจากห้อง</button>
  </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Ws from "@adonisjs/websocket-client";
const ws = Ws("ws://localhost:3333");
export default {
  data: () => ({
    room_code: null,
    token: null,
    room: null,
    allPlayer: [],
    messages:[],
    inputMessage:null,
    isHost : false
  }),
  async created() {
    this.room_code = this.$route.params.room_code;
    if (!this.user) {
      await this.$store.dispatch("login/getUser");
    }
    this.token = localStorage.getItem("access_token");
    this.connectServe();
  },
  computed: {
    ...mapState({
      user: state => state.login.user
    })
  },
  methods: {
    async connectServe() {
      ws.withApiToken(this.token).connect();

      this.room = ws.subscribe(`room:${this.room_code}`);
      this.room.on("ready", () => {
        this.room.emit("prompt", this.user);
      });
      this.room.on("message", e => {
        this.reciveMessage(e);
      });

      this.room.on("close", () => {
        alert("คุณได้ออกจากห้องเเล้ว");
        this.$router.push({name:"home"})
      });
      this.room.on("newPlayer", e => {
        //this.allPlayer.push(e);

      });
      this.room.on("playerExit", e => {
        this.allPlayer = e
        
      });

      this.room.on("getPlayers",(e)=>{
          this.allPlayer = e
          //console.log("getP",this.allPlayer)
      })

      this.room.on("isHost",()=>{
          this.isHost = true
      })
    },
    sendMessage: async function(message) {
      this.room.emit("message", { body: message, user: this.user });
    },
    reciveMessage: async function(message) {
      this.messages.push(message);
    },
    exitRoom: async function() {
      this.room.emit("exit",  this.user);
    }
  }
};
</script>
<style scoped>
#section {
  display: -webkit-flex;
  display: flex;
}

/* Style the navigation menu */
nav {
  flex: 1;
  padding: 20px;
}

/* Style the list inside the menu */
nav ul {
  list-style-type: none;
  padding: 0;
}

/* Style the content */
#chat {
  flex: 3;
  padding: 10px;
}

</style>


