<template>
  <div id="app" class="appbody">
    <AppNav v-if="isLogin"/>
    <LoadingPage v-if="isLoading"/>
    <div class="bg">
      <img v-if="isShowed" src="@/assets/logo.png" class="bg-img"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav'
import LoadingPage from '@/components/LoadingPage'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
  name: 'App',
  components: {
    AppNav,
    LoadingPage
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    isLoading() {
      return this.$store.getters.isLoading
    },
    isShowed() {
      return this.$route.name === 'MoviesView' || this.$route.name === 'CommunityView'
    }
  },
}
</script>

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
  position: relative;
}

.bg {
  position: fixed;
  width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.bg-img {
  position: absolute;
  width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  z-index: -1;
  -webkit-user-drag: none;
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

/* 리뷰 작성 버튼 */
#reviewbtn {
  margin-bottom: 2rem;
  color: #a7a7a7;
}

#reviewbtn:hover {
  color: #ffffff !important;
  cursor: pointer;
  transition: 0.4s;
}

.btn-none {
  background-color: transparent !important;
  border: none;
  outline: none;
  cursor: pointer;
}


/* 버튼 */
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}

button,
.btn-cover #page-btn {
  padding: 0.3% 2%;
  letter-spacing: 1px;
  background-color: transparent;
  color: #a7a7a7;
  border: 0;
  outline: 0;
}

button:hover,
.btn-cover #page-btn:hover {
  color: white;
  cursor: pointer;
}

</style>