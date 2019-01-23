<template>
  <div>
    <h1>ห้อง {{room_code}}</h1>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import Ws from '@adonisjs/websocket-client'
const ws = Ws("ws://localhost:3333")
export default {
    data : () => ({
        room_code : null,
        token : null
    }),
    async created () {
        this.room_code = this.$route.params.room_code
        if(!this.user){
            await this.$store.dispatch("login/getUser")
        }
        this.token = localStorage.getItem('access_token')
        this.connectServe();
    },
    computed : {
        ...mapState({
            user : state => state.login.user
        })
    }
    ,
    methods : {
       async  connectServe () {
            ws.withApiToken(this.token)
            .connect()
        }
    }
}
</script>

