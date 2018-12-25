<template>
    <div>
        <h1>Hello Cortana</h1>
        <hr>
        <div>
        <h1>CHAT ROOM <button @click="switchToGameRoom()">สลับไปห้องเกมส์</button> </h1> 
        <input type="text" v-model="newRoomName"> 
        <button @click="newChatRoom()">กดเพื่อสร้างห้องเเชทใหม่</button>
        
        <br>
            <ul>
                <li v-for="(c,index) in chatRooms" v-bind:key="index" >ห้อง {{c}} <button @click="enterChatRoom('cat')">เข้าร่วมเเชท</button> </li>
                
            </ul>
        </div>

    </div>
</template>
<script>
export default {
    data : () => ({
        chatRooms : ['cat'] ,
        newRoomName  : "ใส่ชือห้องเเชท" 
    }),
    async created () {
        this.start()
    },
    methods : {
        start : async function () {
            console.log("cat canfly Home.vue create()")
        },
        newChatRoom : async function () {
            alert(this.newRoomName)
        },
        enterChatRoom : async function (chatRoom){
            alert(chatRoom)
        },
        switchToGameRoom : async function (){
            alert("Let's Go")
        }
    }
}
</script>

