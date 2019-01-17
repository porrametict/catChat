<template>
  <div v-if="user">
    <h1>{{gameroom}}</h1>
    <input type="text" v-model="inputMessage"  @keypress.13="sendMessage(inputMessage)">

    <hr>
    <ul>
      <li v-for="(m,index) in messages" v-bind:key="index">{{m.user.username}} : {{m.body}}</li>
    </ul>
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
    gameroom: null,
    inputMessage: "Hello cat",
    messages: []
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
    this.gameroom = await this.$route.params.gamecode;
    this.connectServe();
  },
  methods: {
    connectServe: async function() {
      ws.connect();
      this.game = ws.subscribe(`game:${this.gameroom}`);
      this.game.on("ready", () => {
        this.sendMessage("Hello World");
      });
      this.game.on("message", e => {
        this.reciveMessage(e);
      });
    },
    sendMessage: async function(message) {
      this.game.emit("message", {body:message,user:this.user});
    },
    reciveMessage: async function(message) {
      this.messages.push(message);
    }
  }
};
</script>

