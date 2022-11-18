<template>
  <div id="selectdiv">
    <div draggable="True" class="item">
      <div
        v-for="movie in movies"
        :key="movie.id"
      >
        {{ moive.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectMovieView',
  computed: {
    movies () {
      return this.$store.state.popularMovies
    }
  },
}
</script>

<style>

</style>