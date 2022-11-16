<template>
  <nav>
    <router-link v-if="!isLogin" :to="{ name: 'SignUpView' }">Sign Up</router-link>
    <button v-if="isLogin" @click="logOut">Log Out</button>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  }
}
</script>

<style>

</style>