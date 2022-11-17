<template>
  <nav>
    <button @click="logOut">Log Out</button>
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
}
</script>

<style>

</style>