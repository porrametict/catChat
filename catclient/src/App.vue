<template>
  <div id="app">
   <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>
 <style lang="sass">
  @import "../node_modules/vuetify/dist/vuetify.css";
  @import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css';
  @import "../node_modules/@mdi/font/css/materialdesignicons.min.css";

</style>
