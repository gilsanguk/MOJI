<template>
  <div id="signupdiv" class="d-flex align-items-center justify-content-start">
    <div id="signupform">
      <h1>Sign Up</h1>
      <form @submit.prevent="signUp">
        <label for="username">username : </label>
        <input type="text" id="username" v-model="username"><br>

        <label for="password1"> password : </label>
        <input type="password" id="password1" v-model="password1"><br>

        <label for="password2"> password confirmation : </label>
        <input type="password" id="password2" v-model="password2">
        
        <input type="submit" value="SignUp">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  methods: {
    signUp() {
      if (this.password1 !== this.password2) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      const user = {
        username: this.username,
        password1: this.password1,
        password2: this.password2,
      };
      this.$store.dispatch('signUp', user)
    }
  }
}
</script>

<style scoped>
#signupdiv{
  height: 100vh;
  background: url('https://assets.nflxext.com/ffe/siteui/vlv3/9737377e-a430-4d13-ad6c-874c54837c49/945eec79-6856-4d95-b4c6-83ff5292f33d/KR-ko-20220111-popsignuptwoweeks-perspective_alpha_website_large.jpg');
}

#signupdiv:before{
  margin: 0;
  content: '';
  background: linear-gradient(to left, rgba(0, 0, 0, 0.733),transparent);
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
}

#signupform{
  width: 25%;
  height: 25%;
  background-color: rgba(0, 0, 0, 0.447);
  color : white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  margin-left: 5rem;
}
</style>