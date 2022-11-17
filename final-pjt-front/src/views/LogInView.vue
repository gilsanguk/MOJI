<template>
  <div id="logindiv">
    <div id="loginformdiv">
      <div>
        <h1 class="mb-3 text-left"><b>LogIn</b></h1>
      </div>
      <form @submit.prevent="logIn" id="loginform">
        <div class="d-flex flex-column">
          <label for="username" id="username">username : </label>
          <input type="text" id="username" placeholder="아이디를 입력하시오." v-model="username" />
        </div>
        <div class="d-flex flex-column">
          <label for="password" id="password"> password : </label>
          <input type="password" id="password" placeholder="비밀번호를 입력하시오." v-model="password" />
        </div>
        <div>
          <router-link v-if="!isLogin" :to="{ name: 'SignUpView' }" id="clickbutton">
            Sign Up
          </router-link>
          <input type="submit" value="logIn" id="clickbutton" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogInView",
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
  height: 100vh;
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
  height: 100%;
  width: 100%;
}

#loginformdiv {
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
  margin-right: 15rem;
}

#loginform {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
}

#username,
#password {
  width: 400px;
  border-radius: 10px;
  padding-left: 1rem;
  margin-top: 1rem;
  display: inline-block;
  text-align: left;
  vertical-align: middle;

}

label#username,
label#password {
  height: 15px;
}

input#username,
input#password {
  height: 38px;
}

#clickbutton {
  width: 70px;
  height: 35px;
  border-radius: 10px;
  margin-left: 2rem;
  margin-top: 1rem;
  text-decoration: none;
}

a#clickbutton{
  background-color: white;
  color: black;
}
</style>