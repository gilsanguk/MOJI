<template>
  <div>
    <h1>Movies</h1>
    <div class="movies">
      <div v-for="movie in movies" :key="movie.id">
        <router-link :to="'/movies/' + movie.id">
          <img :src="movie.poster_path" alt="movie poster">
        </router-link>
        <router-link :to="{name: 'CommunityView', params: {id: movie.id} }">
          리뷰 보기
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoviesView',
  methods: {
    getMovies() {
      this.$store.dispatch('getMovies')
    }
  },
  created() {
    this.getMovies()
  },
  computed: {
    movies() {
      const movies = this.$store.state.movies
      return movies
    }
  }
}
</script>

<style>

</style>