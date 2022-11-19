<template>
  <div id="logindiv">
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
  created() {
    if (this.$store.getters.isLogin) {
      this.$router.push({ name: "MoviesView" });
    }
  },
};
</script>

<style scoped>
#logindiv {
  height: 1000px;
  background: url("https://assets.nflxext.com/ffe/siteui/vlv3/9737377e-a430-4d13-ad6c-874c54837c49/945eec79-6856-4d95-b4c6-83ff5292f33d/KR-ko-20220111-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  display: flex;
  align-items: center;
  justify-content: end;
}

#logindiv:before {
  margin: 0;
  content: "";
  background: linear-gradient(to left, rgba(0, 0, 0, 0.733), transparent);
  position: absolute;
  left: 0;
  height: 1000px;
  width: 100%;
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
  position: fixed;
  margin-right: 15rem;
}

#loginform {
  color: white;
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
  width: 110px;
  height: 45px;
  border-radius: 10px;
  margin-right: 1.5rem;
  padding: 0rem 1rem;
  margin-top: 2rem;
  background-color: white;
  color: black;
  font-size: 20px;
  outline-style: none;
  cursor: pointer;
}

.clickbutton:hover{
  outline-style: none;
  background-color: #ff8223;
  animation: tutsFade 2s 1s linear alternate;
}

@keyframes tutsFade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>