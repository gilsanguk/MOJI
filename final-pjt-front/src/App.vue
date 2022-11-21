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
  color: rgba(255, 255, 255, 0.879)
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
  max-width: 100vw;
  /* background-color: rgba(22, 22, 22, 0.872); */
  background-color: #141619;
  scroll-behavior: smooth;
}

.autocomplete {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.autocomplete-input {
  max-width: 850px;
  padding: 20px 50px;
}

.autocomplete-result-list {
  max-width: 850px;
  max-height: 40vh !important;
}



</style>

<script>
import AppNav from '@/components/AppNav'
import '@trevoreyre/autocomplete-vue/dist/style.css'

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