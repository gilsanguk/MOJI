<template>
  <div id="logindiv">
    <!-- 로고 -->
    <img src="@/assets/logo.png" alt="logo" height="100"/>
    <div id="loginformdiv">
      <div>
        <h1 style="font-size: 50px"><b>LogIn</b></h1>
      </div>
      <!-- 로그인 창 -->
      <form @submit.prevent="logIn" id="loginform">
        <div class="d-flex flex-column">
          <label for="username" id="username" class="english">username : </label>
          <input
            type="text"
            id="username"
            placeholder="아이디를 입력하시오."
            v-model="username"
            :class="err ? 'error' : ''"
          />
        </div>
        <div class="d-flex flex-column">
          <label for="password" id="password" class="english"> password : </label>
          <input
            data-animate="come-down"
            type="password"
            id="password"
            autocomplete="on"
            placeholder="비밀번호를 입력하시오."
            v-model="password"
            :class="err ? 'error' : ''"
          />
        </div>
        <!-- 푸터 -->
        <div class="d-flex flex-row justify-content-right">
          <input type="submit" value="Login" class="clickbutton"/>
          <input type="submit" value="SignUp" class="clickbutton" @click.prevent="goSignUp"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/moji'

export default {
  name: "LoginView",
  data() {
    return {
      username: null,
      password: null,
      err: null,
    };
  },
  methods: {
    // 로그인
     // 로그인
    logIn() {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: this.username,
          password: this.password,
        }
      })
        .then((res) => {
          this.$store.commit('SAVE_TOKEN', res.data.key)
        })
        .then(() => {
          this.$store.dispatch('setUserData', this.username)
        })
        .then(() => {
          this.$router.push({ name: 'MoviesView' })
        })
        .catch(() => {
          this.err = true;
        });
    },
    // 회원가입 페이지로 이동
    goSignUp() {
      this.$router.push("/signup");
    },
  },
  created() {
    this.$modal.hideAll()
  },
};
</script>

<style scoped>
/* 기본 */
#logindiv {
  background: url("https://assets.nflxext.com/ffe/siteui/vlv3/5aecc44d-2a1f-4313-8399-98df20908b64/47e9a72c-4e54-4be7-993f-91413ee2dd47/KR-ko-20221114-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
}

#logindiv:before {
  content: "";
  background: linear-gradient(to right, rgba(0, 0, 0, 0.700), rgba(0, 0, 0, 0.222));
  position: absolute;
  left: 0;
  height: 100vh;
  min-width: 100vw;
}

img {
  position: absolute;
  top: 3.3%;
  left: 3.3%;
  object-fit: cover;
  z-index: 1;
}

/* 로그인 폼 */
#loginformdiv {
  padding: 3rem 5rem;
  background-color: rgba(0, 0, 0, 0.517);
  color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

#loginform {
  color: #a7a7a7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}

/* 인풋, 라벨 */
#username,
#password {
  width: 500px;
  border-radius: 10px;
  padding-left: 1rem;
  margin-top: 1rem;
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}

label#username,
label#password {
  margin-top: 3rem;
  font-size: 27px;
}

input#username,
input#password {
  height: 55px;
}

.error {
  border: 1px solid crimson;
  box-shadow: 0 0 0 3px rgba(220, 50, 20, 0.5);
}

/* 버튼 */
.clickbutton {
  margin-top: 10%;
  font-size: x-large;
  padding: 0.3% 2%;
  letter-spacing: 1px;
  background-color:transparent;
  color: #a7a7a7;
  border: 0;
  outline: 0;
  font-weight: 600;
  margin-right: 1.5rem;
}

.clickbutton:hover{
  cursor: pointer;
  color: white;
  transition: 0.4s;
}

</style>