<template>
<div>
    <h1>Hello Cortana</h1>
    <hr>
    <div>
        <h1>GAME ROOM <button @click="switchToChatRoom()">สลับไปห้องเเชท</button> </h1>
        <button @click="newGame()">สร้างเกมส์ใหม่</button>
        <hr>
        <input type="text"  v-model="gameCode">
        <button @click="enterGame()">เข้าร่วมเกมส์</button>
    </div>
</div>
</template>
<script>
export default {
    data : () => ({
        gameCode : "กรอกเลขห้อง",
    }),
    async created () {
        this.start()

    },
    methods : {
        async start () {
            console.log("HomeGame.vue Start")
        },
        async newGame () {
            alert('NEW GAME ')

        },
        async enterGame () {
            alert(this.gameCode)
        },
        async switchToChatRoom () {
            alert("LET'S GO ")
        }
    }
}
</script>

