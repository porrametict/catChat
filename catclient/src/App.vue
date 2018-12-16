<template>
  <v-app>
   <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'App'
}
</script>

<style lang="sass" >
  @import "../node_modules/vuetify/dist/vuetify.css";
  @import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css';
  @import "../node_modules/@mdi/font/css/materialdesignicons.min.css";

</style>
