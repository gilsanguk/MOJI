<template>
  <div id="logindiv">
    <img src="@/assets/logo.png" alt="logo" height="100"/>
    <div id="loginformdiv">
      <div>
        <h1 style="font-size: 50px"><b>LogIn</b></h1>
      </div>
      <form @submit.prevent="logIn" id="loginform">
        <div class="d-flex flex-column">
          <label for="username" id="username">username : </label>
          <input
            type="text"
            id="username"
            placeholder="아이디를 입력하시오."
            v-model="username"
          />
        </div>
        <div class="d-flex flex-column">
          <label for="password" id="password"> password : </label>
          <input
            data-animate="come-down"
            type="password"
            id="password"
            placeholder="비밀번호를 입력하시오."
            v-model="password"
          />
        </div>
        <div class="d-flex flex-row justify-content-right">
          <input type="submit" value="Login" class="clickbutton"/>
          <input type="submit" value="SignUp" class="clickbutton" @click.prevent="goSignUp"/>
          <!-- <p class="clickbutton">회원가입</p> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    logIn() {
      const user = {
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch("logIn", user);
    },
    goSignUp() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped>
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

img {
  position: absolute;
  top: 3.3%;
  left: 3.3%;
  object-fit: cover;
  z-index: 1;
}
</style>