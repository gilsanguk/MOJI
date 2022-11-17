<template>
  <div id="signupdiv" class="d-flex align-items-center justify-content-start">
    <div id="signupformdiv">
      <div>
        <h1>Sign Up</h1>
      </div>
      <form @submit.prevent="signUp" id="signupform">
        <div class="d-flex flex-column">
          <label for="username" id="username">username : </label>
          <input
            type="text"
            id="username"
            placeholder="아이디를 입력하시오."
            v-model="username"
          /><br />
        </div>
        <div class="d-flex flex-column">
          <label for="password1" id="password1"> password : </label>
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
        <div>
          <input type="submit" value="SignUp" id="clickbutton" />
        </div>
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
      };
      this.$store.dispatch("signUp", user);
    },
  },
  created() {
    if (this.$store.getters.isLogin) {
      this.$router.push({ name: "MoviesView" });
    }
  },
};
</script>

<style scoped>
#signupdiv {
  height: 100vh;
  background: url("https://assets.nflxext.com/ffe/siteui/vlv3/9737377e-a430-4d13-ad6c-874c54837c49/945eec79-6856-4d95-b4c6-83ff5292f33d/KR-ko-20220111-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  display: flex;
  align-items: center;
  justify-content: start;
}

#signupdiv:before {
  margin: 0;
  content: "";
  background: linear-gradient(to left, rgba(0, 0, 0, 0.733), transparent);
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
}

#signupformdiv {
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.447);
  color: white;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  margin-left: 15rem;
}

#signupform {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
}

label#username,
label#password1,
label#password2 {
  width: 400px;
  height: 15px;
  border-radius: 10px;
  padding-left: 1rem;
  margin-top: 1rem;
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}

input#username,
input#password1,
input#password2 {
  width: 400px;
  height: 38px;
  border-radius: 10px;
  padding-left: 1rem;
  margin-top: 1rem;
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}

#clickbutton {
  width: 70px;
  height: 38px;
  border-radius: 10px;
  margin-left: 2rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

#clickbutton:hover {
transform: scale(1.1);
background-color: #3cb371
}
</style>