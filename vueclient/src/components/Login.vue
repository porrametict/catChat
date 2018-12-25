<template>
    <div>
        username : <input type="text" v-model="form.username">
        <br>
        passowrd : <input type="password" v-model="form.password" @keypress.13="login()">
        <br>
        <button @click="login()">Login</button>
        
    </div>
</template>

<script>
export default {
    data: () => ({
        form : {}
    }),
    async created () {

    },
    methods : {
        login : async function () {
            let data = await this.$store.dispatch("login/getToken",this.form)
            if (data){
                await this.$store.dispatch("login/getUser",data)
                this.$router.push({name : 'home'})
            }
        }
        
    
        
    }  
}
</script>
