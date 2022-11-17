<template>
  <div id="logindiv" class="d-flex align-items-center justify-content-end">
    <div id="loginform">
      <h1>LogIn</h1>
      <form @submit.prevent="logIn">
        <label for="username">username : </label>
        <input type="text" id="username" v-model="username"><br>

        <label for="password"> password : </label>
        <input type="password" id="password" v-model="password"><br>

        <input type="submit" value="logIn">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    logIn() {
      const user = {
        username: this.username,
        password: this.password,
      }
      this.$store.dispatch('logIn', user)
    }
  }
}
</script>

<style scoped>
#logindiv{
  height: 100vh;
  background: url('https://assets.nflxext.com/ffe/siteui/vlv3/9737377e-a430-4d13-ad6c-874c54837c49/945eec79-6856-4d95-b4c6-83ff5292f33d/KR-ko-20220111-popsignuptwoweeks-perspective_alpha_website_large.jpg');
}

#logindiv:before{
  margin: 0;
  content: '';
  background: linear-gradient(to left, rgba(0, 0, 0, 0.733),transparent);
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
}

#loginform{
  width: 25%;
  height: 25%;
  background-color: rgba(0, 0, 0, 0.447);
  color : white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  margin-right: 5rem;
}
</style>