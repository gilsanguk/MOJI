<template>
  <div id="app" class="appbody">
    <AppNav v-if="isLogin"/>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Hi Melody', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
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
  created() {
    if (!this.$store.getters.isLogin) {
      this.$router.push({ name: "LoginView" });
    } else {
      this.$store.dispatch("getAllMovies");
      this.$store.dispatch("getMovies");
    }
  },
}
</script>