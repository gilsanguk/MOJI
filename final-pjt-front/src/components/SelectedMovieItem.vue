<template>
  <div class="card h-100">
      <img v-if="!movie" src="@/assets/logo_col.png" class="default-img"/>
      <div v-if="!movie" class="card-body">
        <h5 class="card-title m-0 text-center">SELECT MOVIE</h5>
      </div>
    <button v-if="movie" @click="deleteMovie">x</button>
    <img v-if="movie" :src="movie.poster_path" />
    <div v-if="movie" class="card-body d-flex align-items-center">
      <h5 class="text-truncate card-title m-0">{{ movie?.title }}</h5>
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
.default-img {
  padding: 11% 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 30px;
  background-color: gray;
}

.card {
  width: 18rem;
  border-radius: 10px;
  background-color: rgba(0, 0, 0);
  padding: 0.7rem;
  padding-top: 0.8rem;
  opacity: 0.8;
  position: relative;
}

.card-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: default !important;
}

button {
  position: absolute;
  top: 0.2rem;
  right: 0.7rem;
  border: none;
  background-color: transparent;
  color: #a7a7a7;
  font-size: 2rem;
  cursor: pointer;
}

button:hover {
  color: white;
  transition: 0.4s;
}
</style>