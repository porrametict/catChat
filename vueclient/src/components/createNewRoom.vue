<template>
  <div>
    <h1>Create New Room</h1>

    <hr>

    <select v-model="subjectSelected" @change="selectChange" placeholder="please Select">
      <option
        v-for="(choice,index) in SelectChoices"
        v-bind:key="index"
      >{{ choice.subject_code}} - {{choice.subject_name}}</option>
    </select>
    <button @click="createRoom">สร้างห้อง</button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data: () => ({
    subjectSelected: null,
    SelectChoices: null
  }),
  computed : {
    ...mapState({
      user : state => state.login.user
    })
  },
  async created() {
     if (!this.user) {
      await this.$store.dispatch("login/getUser");
    }

    let response = await axios
      .get("subject")
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        console.log("erroe create New ROOM ", error);
      });
    this.SelectChoices = response;
  },
  methods : {
      selectChange () {
          console.log(this.subjectSelected)
      },
      async createRoom () {
      let user_id = this.user.id
      let subject_code = this.subjectSelected.substring(0,6)
      let _ = this
      let response = await axios.post('room',{host_id : user_id,subject_id : subject_code,room_code:null})
       .then( (response) => {
         console.log("create Room Response" ,response.data.room_code)
         alert(`สร้างห้องสำเร็จ CODE ห้องนี้คือ : ${response.data.room_code}`)
         _.$router.push({name:'home'})
         //return response.data
       }).catch((error)=> {
         console.log("create Room",error)
       })
        
      }
      
  }
};
</script>

