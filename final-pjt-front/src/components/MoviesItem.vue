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
  width: 400px;
  height: 600px;
}


</style>