<template>
  <div id="signupdiv">
    <img src="@/assets/logo.png" alt="logo" height="100" @click="goLogin" />
    <div id="signupformdiv">
      <div>
        <h1 style="font-size: 50px"><b>Sign Up</b></h1>
      </div>
      <form @submit.prevent="signUp" id="signupform">
        <div class="d-flex flex-column">
          <label for="username" id="username">username :</label>
          <input
            type="text"
            id="username"
            placeholder="아이디를 입력하시오."
            v-model="username"
          /><br />
        </div>
        <div class="d-flex flex-column">
          <label for="nickname" id="nickname">nickname :</label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력하시오."
            v-model="nickname"
          /><br />
        </div>
        <div class="d-flex flex-column">
          <label for="password1" id="password1">password : </label>
          <input
            type="password"
            id="password1"
            placeholder="비밀번호를 입력하시오."
            v-model="password1"
          /><br />
        </div>
        <div class="d-flex flex-column">
          <label for="password2" id="password2">
            password confirmation :
          </label>
          <input
            type="password"
            id="password2"
            placeholder="비밀번호를 다시 입력하시오."
            v-model="password2"
          />
        </div>
        <button class="clickbutton mt-4">SignUp</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpView",
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
      nickname: null,
    };
  },
  methods: {
    signUp() {
      if (this.password1 !== this.password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      const user = {
        username: this.username,
        password1: this.password1,
        password2: this.password2,
        nickname: this.nickname,
      };
      this.$store.dispatch("signUp", user);
    },
    goLogin() {
      this.$router.push("/login");
    },
    created() {
      this.$modal.hideAll();
    },
  },
};
</script>

<style scoped>
#signupdiv {
  height: 1000px;
  background: url("https://assets.nflxext.com/ffe/siteui/vlv3/5aecc44d-2a1f-4313-8399-98df20908b64/47e9a72c-4e54-4be7-993f-91413ee2dd47/KR-ko-20221114-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

#signupdiv:before {
  content: "";
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.222)
  );
  position: absolute;
  left: 0;
  height: 1000px;
  width: 100%;
}

#signupformdiv {
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

#signupform {
  color: #a7a7a7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#username,
#password1,
#password2,
#nickname {
  width: 500px;
  border-radius: 10px;
  padding-left: 1rem;
  margin-top: 1%;
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}

label#username,
label#password1,
label#password2,
label#nickname {
  margin-top: 1%;
  font-size: 27px;
}

input#username,
input#password1,
input#password2,
input#nickname {
  height: 55px;
}

.clickbutton {
  font-size: x-large;
  padding: 0.3% 2%;
  letter-spacing: 1px;
  background-color: transparent;
  color: #a7a7a7;
  border: 0;
  outline: 0;
  font-weight: 600;
}

.clickbutton:hover {
  cursor: pointer;
  color: white;
  transition: 0.4s;
}

img {
  position: absolute;
  top: 3.3%;
  left: 3.3%;
  object-fit: cover;
  z-index: 1;
}

i {
  font-size: 3rem;
  margin-right: 1rem;
  color: #a7a7a7;
  position: absolute;
  top: 85%;
  left: 15%;
}
</style>