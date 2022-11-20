<template>
  <nav>
    <button @click="logOut" id="clickbutton">Log Out</button>
    <button title="추천받기" @click="goSelectMovie" id="clickbutton">마음에 드는 영화가 없다면?</button>
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
#clickbutton {
  border-radius: 10px;
  margin-right: 1.5rem;
  padding: 0.5rem 1.5rem;
  margin-top: 2rem;
  background-color: white;
  color: black;
  font-size: large;
  outline-style: none;
  cursor: pointer;
}

#clickbutton:hover{
  outline-style: none;
  background-color: #ff8223;
  color: white;
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