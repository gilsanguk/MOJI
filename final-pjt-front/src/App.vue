<template>
  <div id="app" class="appbody">
    <AppNav v-if="isLogin"/>
    <!-- <img src="@/assets/logo.png" @click="goHome"  class="bg-img"/> -->
    <router-view/>
  </div>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Raleway:300,700);
/* 전체 페이지 */
#app {
  font-family: 'Raleway', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 255, 255, 0.879)
}

.appbody {
  min-height: 100vh;
  max-width: 100vw;
  background-color: #141619;
  scroll-behavior: smooth;
}

.bg-img {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}
/* 영어, 숫자 폰트 */
#app .english {
  font-family: 'Archivo', sans-serif !important;
}

#app .number {
  font-family: 'Spoqa Han Sans Neo', 'sans-serif' !important;
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



/* 검색창 */
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

/* 네브바 검색창 */
#nav .autocomplete {
  width: 30vw;
}

#nav .autocomplete-input {
  padding: 10px 60px !important;
}

/* 검색목록 */
#nav .result {
  display: flex;
  align-items: center;
  color: black;
}

#nav .result-title {
  font-size: 1rem;
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