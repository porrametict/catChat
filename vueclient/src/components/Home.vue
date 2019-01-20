<template>
  <div v-if="user">
    <h1>Hello {{user.username}}</h1>
    <hr>
    สร้างห้อง
    <button @click="goCreateRoom">กดที่นี่เพื่อสร้างห้องใหม่</button>
    <hr>
    <div>
      <h1>
        CHAT ROOM
        <button @click="switchToGameRoom()">สลับไปห้องเกมส์</button>
      </h1>
      <input type="text" v-model="newRoomName">
      <button @click="newChatRoom(newRoomName)">กดเพื่อสร้างห้องเเชทใหม่</button>

      <br>
      <ul>
        <li v-for="(c,index) in chatRooms" v-bind:key="index">
          ห้อง {{c.name_room}}
          <button @click="enterChatRoom(c.name_room)">เข้าร่วมเเชท</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data: () => ({
    chatRooms: [],
    newRoomName: "ใส่ชือห้องเเชท"
  }),
  computed: {
    ...mapState({
      user: state => state.login.user
    })
  },
  async created() {
    this.start();
  },
  methods: {
    start: async function() {
      if (!this.user) {
        await this.$store.dispatch("login/getUser");
      }
      this.chatRooms = await this.$store.dispatch("chat/getChatRoom");
      console.log(this.chatRooms, "Home.vue Start");
    },
    newChatRoom: async function(newRoom) {
      let data = await this.$store.dispatch("chat/createChatroom", {
        name_room: newRoom
      });
      if (data) {
        this.enterChatRoom(newRoom);
      }
    },
    enterChatRoom: async function(chatRoom) {
      alert(chatRoom);
      this.$router.push({ name: "chatroom", params: { chatname: chatRoom } });
    },
    switchToGameRoom: async function() {
      alert("Let's Go");
      this.$router.push({ name: "game" });
    },
    goCreateRoom () {
      this.$router.push({name:"createNewRoom"})
    }

  }
};
</script>

