<template>
  <div id="app" class="appbody">
    <AppNav v-if="isLogin"/>
    <router-view/>
  </div>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Raleway:300,700);

#app {
  font-family: 'Raleway', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a7a7a7;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: white;
}

.appbody {
  min-height: 100vh;
  /* background-color: rgba(22, 22, 22, 0.872); */
  background-color: #141619;
  scroll-behavior: smooth;
}


</style>

<script>
import AppNav from '@/components/AppNav'
import Vue from 'vue'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.use(Autocomplete)

export default {
  name: 'App',
  components: {
    AppNav,
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
  },
}
</script>