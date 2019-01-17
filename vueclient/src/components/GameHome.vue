<template>
  <div v-if="user">
    <h1>Hello {{user.username}}</h1>
    <hr>
    <div>
      <h1>
        GAME ROOM
        <button @click="switchToChatRoom()">สลับไปห้องเเชท</button>
      </h1>
      <input type="text" v-model="newgame"> <button @click="newGame(newgame)">สร้างเกมส์ใหม่</button>
      <hr>
      <input type="text" v-model="gameCode">
      <button @click="enterGame()">เข้าร่วมเกมส์</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    newgame : "กรอกชื่อห้องใหม่",
    gameCode: "กรอกชื่อห้อง"
  }),
  computed: {
    ...mapState({
      cduser: state => state.login.user
    })
  },
  async created() {
    this.start();
  },
  methods: {
    async start() {
      if (!this.user) {
        await this.$store.dispatch("login/getUser");
      }
      console.log("HomeGame.vue Start");
    },
    async newGame(newgame) {
      alert("NEW GAME");
      this.gameCode = newgame
      this.enterGame()
    },
    async enterGame() {
      alert(this.gameCode);
      this.$router.push({name :"gameroom",params : {gamecode : this.gameCode}})
    },
    async switchToChatRoom() {
      alert("LET'S GO ");
      this.$router.push({ name: "home" });
    }
  }
};
</script>

