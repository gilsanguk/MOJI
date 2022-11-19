<template>
  <div id="signupdiv">
    <div id="signupformdiv">
      <div>
        <h1 style="font-size:50px"><b>Sign Up</b></h1>
      </div>
      <form @submit.prevent="signUp" id="signupform">
        <div class="d-flex flex-column">
          <label for="username" id="username"><b>username :</b></label>
          <input
            type="text"
            id="username"
            placeholder="아이디를 입력하시오."
            v-model="username"
          /><br />
        </div>
        <div class="d-flex flex-column">
          <label for="nickname" id="nickname"><b>nickname :</b></label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력하시오."
            v-model="nickname"
          /><br />
        </div>
        <div class="d-flex flex-column">
          <label for="password1" id="password1"><b>password : </b></label>
          <input
            type="password"
            id="password1"
            placeholder="비밀번호를 입력하시오."
            v-model="password1"
          /><br />
        </div>
        <div class="d-flex flex-column">
          <label for="password2" id="password2">
            <b>password confirmation :</b>
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
        nickname: this.nickname
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
  height: 1000px;
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
  position: fixed;
  margin-left: 15rem;
}

#signupform {
  color: white;
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
  margin-top: 1rem;
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}


label#username,
label#password1,
label#password2,
label#nickname {
  margin-top: 1.5rem;
  font-size: 27px;
}

input#username,
input#password1,
input#password2,
input#nickname {
  height: 55px;
}

#clickbutton {
  width: 110px;
  height: 45px;
  border-radius: 10px;
  padding: 0rem 1rem;
  margin-top: 2rem;
  background-color: white;
  font-size: 20px;
  cursor:pointer;
  transition: all 0.2s ease-in-out;
}

#clickbutton:hover {
  transform: scale(1.1);
  background-color: #ff8223;
}
</style>