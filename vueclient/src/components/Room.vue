<template>
  <div v-if="user" id="section">
    <nav id="displayUser" v-if="room_state == 'normal' ">
      <input v-if="isHost" type="button" value="เริ่ม" @click="gameStart()">
      <h2>All Players</h2>
      <ul>
        <li v-bind:key="index" v-for="(p,index) in allPlayer">
          <h3>{{p.user.username}}</h3>
        </li>
      </ul>
    </nav>
    <div id="chat" v-if="room_state == 'normal' ">
      <h1>{{room_code}}</h1>
      <h1 v-if="isHost">-- Host --</h1>
      <h1>{{allPlayer.length}} User(s)</h1>
      <input type="text" v-model="inputMessage" @keypress.13="sendMessage(inputMessage)">

      <hr>
      <ul>
        <li v-for="(m,index) in messages" v-bind:key="index">{{m.user.username}} : {{m.body}}</li>
      </ul>
      <hr>
      <button @click="exitRoom">ออกจากห้อง</button>
    </div>
    <div id="game" v-if="room_state == 'active' && isHost == true && respondents.length ==0">
      <h1>ตั้งคำถามเลยย</h1>
      <input type="text" v-model="question">
      <button @click="sentQuestion()">ส่งคำถาม</button>
    </div>

    <div id="game" v-if="room_state != 'normal' && isHost == false && displayQuestion == null">
      <h1>เกมได้เริ่มขึ้นเเล้ว เตรียมพร้อมรับคำถามได้เลยย</h1>
    </div>

    <div v-if="displayQuestion != null ">
      <h1>{{secDown}}</h1>
      <h1>คำถาม : {{displayQuestion}}</h1>
      <button @click="willAns()">จะตอบ</button>

      <div id="selectYou" v-if="ansbox">
        <div v-if="isRespondent == true && isHost != true">
          <h1>ยินดีด้วยคุณได้ตอบข้อนี้</h1>
          <div id="answer">
            <input type="text" v-model="answerQ" @keypress.13="sentAns()">
          </div>
        </div>
        <div v-else-if="isRespondent != true  && isHost != true">
          <h1>เสียใจด้วยคุณไม่ได้โอกาศตอบข้อนี้</h1>
        </div>
      </div>
    </div>
    <div v-if="respondents.length != 0 && isHost == true && room_state == 'active'">
      <h1>คนที่ประสงค์จะตอบ</h1>
      <ul>
        <li v-for="(u,index) in respondents" v-bind:key="index">
          {{u.username}}
          <button @click="selectRepondent(u)">เลือก</button>
        </li>
      </ul>

      <div v-if="answerDisplay">
        <h1>{{answerDisplay.user.username}} ตอบว่า {{answerDisplay.answer}}</h1>
        <input type="button" value="ถูก" @click="tOrf({user:answerDisplay.user,tof:true})">
        <input type="button" value="ผิด" @click="tOrf({user:answerDisplay.user,tof:false})">
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Ws from "@adonisjs/websocket-client";
import { setTimeout } from "timers";
const ws = Ws("ws://localhost:3333");
export default {
  data: () => ({
    room_code: null,
    token: null,
    room: null,
    allPlayer: [],
    messages: [],
    inputMessage: null,
    isHost: false,
    room_state: "normal",
    question: null,
    displayQuestion: null,
    secDown: 15,
    respondents: [],
    isRespondent: false,
    ansbox: false,
    answerQ: "",
    answerDisplay: null,
    windowState: false
  }),
  async created() {
    this.room_code = this.$route.params.room_code;
    if (!this.user) {
      await this.$store.dispatch("login/getUser");
    }
    this.token = localStorage.getItem("access_token");
    this.connectServe();
   /// want Fix
    let someThing = window.addEventListener("beforeunload", function (event) {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.

  event.returnValue = true;
  // console.log(someThing,"segthkjl")
});
  },
  mounted() {
    // window.beforeunload = this.confirmExit()
    // window.unload = this.exitRoom()
  },
  async beforeDestroy() {
    //window.beforeunload = this.confirmExit();
    //window.addEventListener('beforeunload',this.confirmExit())
    this.confirmExit()
    //window.addEventListener('onbeforeunload',this.confirmExit())
  },
  destroyed() {
    this.exitRoom()
    //window.addEventListener('unload',this.confirmExit())
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
        this.$router.push({ name: "home" });
      });
      this.room.on("newPlayer", e => {
        //this.allPlayer.push(e);
      });
      this.room.on("playerExit", e => {
        this.allPlayer = e;
      });

      this.room.on("getPlayers", e => {
        this.allPlayer = e;
        //console.log("getP",this.allPlayer)
      });

      this.room.on("question", e => {
        console.log("QW", e);
        this.displayQuestion = e;
        this.secDown = 15;
        this.countTenSec();
      });

      this.room.on("isHost", () => {
        this.isHost = true;
        console.log("ishost");
      });

      this.room.on("gameStarted", () => {
        this.room_state = "active";
        console.log(this.room_state, "GameStarted");
        console.log(this.respondents, "rd");
      });
      this.room.on("getRespondent", e => {
        this.respondents.push(e);
      });
      this.room.on("selectYou", e => {
        this.ansbox = true;
        this.isRespondent = true;
        console.log("selectYou", e);
      });

      this.room.on("getAnswer", e => {
        this.answerDisplay = e;
      });
    },
    sendMessage: async function(message) {
      this.room.emit("message", { body: message, user: this.user });
    },
    reciveMessage: async function(message) {
      this.messages.push(message);
    },
    exitRoom: async function() {
      console.log("exitRoom")
      this.room.emit("exit", this.user);
    },
    async gameStart() {
      this.room.emit("gameStart");
    },
    async sentQuestion() {
      this.room.emit("question", this.question);
    },
    countTenSec() {
      this.secDown -= 1;
      if (this.secDown == 0) {
        return;
      }
      setTimeout(this.countTenSec, 1000);
    },
    willAns() {
      this.room.emit("willAns", this.user);
    },
    selectRepondent(u) {
      this.room.emit("selectRepondent", u);
    },
    sentAns() {
      this.room.emit("sentAns", { user: this.user, answer: this.answerQ });
    },
    tOrf(e) {
      this.room.emit("tof", e);
    },
    confirmExit(e) {
      console.log(this.windowState,"cat")
      e.preventDefault()
      
      if (this.windowState) {
        alert("You leave this room.");
        this.exitRoom();
      } else {
        this.windowState = true;
        e.returnValue = "" ;
      }
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

#game {
  flex: 3;
  padding: 10px;
}
</style>


 ;