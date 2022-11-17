<template>
  <img :src="movie.poster_path">
</template>

<script>
export default {
  name: 'MoviesItem',
  props: {
    movie: Object,
  },
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>