<template>
  <div>
    <div class="container d-flex bg-dark rounded-3 shadow-lg text-white align-items-center my-2">
      <img :src="movie.poster_path" />
      <h3>{{ movie.title }}</h3>
      <button @click="deleteMovie">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectedMovieItem",
  props: {
    movie: Object,
  },
  methods: {
    deleteMovie() {
      this.$emit("delete-movie", this.movie);
    },
  },
};
</script>

<style scoped>
img {
  width: 10%;
  height: 10%;
  margin: 10px;
}
h3 {
  margin-left: 20px;
}
</style>