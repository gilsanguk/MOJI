<template>
  <nav>
    <button @click="logOut">Log Out</button>
    <button @click="goSelectMovie">마음에 드는 영화가 없다면?</button>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    },
    goSelectMovie() {
      this.$router.push({ name: 'SelectMovieView' })
    }
  },
}
</script>

<style>

</style>