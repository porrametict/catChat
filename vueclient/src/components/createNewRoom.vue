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
export default {
  data: () => ({
    subjectSelected: null,
    SelectChoices: null
  }),
  async created() {
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
      createRoom () {
       // let response = await axios.post 
      }
  }
};
</script>

