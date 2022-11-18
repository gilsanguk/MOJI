<template>
  <div id="selectdiv">
    <div class="container">
      <div class="d-flex">
        <div
          v-for="movie in movies"
          :key="movie.id"
          draggable="True"
          class="item"
        >
          <img :src="movie.poster_path" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectMovieView',
  methods: {
    getPopularMovies() {
      this.$store.dispatch('getPopularMovies')
    },
  },
  created() {
    this.getPopularMovies()
  },
  computed: {
    movies() {
      return this.$store.state.popularMovies
    },
  },
}
</script>

<style scoped>
img {
  width: 200px;
}
</style>