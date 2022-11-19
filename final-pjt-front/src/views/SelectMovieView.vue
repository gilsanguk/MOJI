<template>
  <div style="min-height: 100vh;">
    <div id="searchdiv">
      <autocomplete
        :search="search"
        placeholder="Search for a movie"
        aria-label="Search for a movie"
        :get-result-value="getResultValue"
        @submit="onSubmit"
      >
        <template #result="{ result, props }">
          <li v-bind="props">
            <div class="result">
              <img :src="result.poster_path" />
              <div class="result-title">{{ result.title }}</div>
            </div>
          </li>
        </template>
      </autocomplete>
    </div>

    <div id="selecteddiv" style="color:white;">
      <h2>선택한 영화들</h2>
      <div v-for="movie in selectmovies" :key="movie.id">
        <SelectedMovieItem :movie="movie" @delete-movie="deleteMovie"/>
      </div>
    </div>
    <button @click="setPrefer">추천받기</button>
  </div>
</template>

<script>
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import SelectedMovieItem from "../components/SelectedMovieItem.vue";

export default {
  name: "SelectMovieView",
  data() {
    return {
      selectmovies: [],
    };
  },
  components: {
    Autocomplete,
    SelectedMovieItem,
  },
  methods: {
    search(input) {
      if (input.length < 1) {
        return [];
      }
      return this.movies.filter((movie) => {
        return (movie.title.toLowerCase().startsWith(input.toLowerCase()) ||
          movie.title.toLowerCase().includes(input.toLowerCase())) &&
          !this.selectmovies.includes(movie);
      });
    },
    getResultValue() {
      return '';
    },
    onSubmit(result) {
      if (this.selectmovies.length < 5) {
        this.selectmovies.push(result);
      } else {
        alert("5개까지만 선택 가능합니다.");
      }
    },
    deleteMovie(movie) {
      this.selectmovies = this.selectmovies.filter((m) => m.id !== movie.id);
    },
    setPrefer() {
      if (this.selectmovies.length == 0) {
        alert("영화를 선택해주세요.");
      } else {
        // this.$store.dispatch("setPrefer", this.selectmovies);
        // this.$router.push("/MoviesView");
        console.log(this.selectmovies);
      }
    },
  },
  computed: {
    movies() {
      return this.$store.getters.all;
    },
  },
};
</script>

<style scoped>
#searchdiv {
  max-width: 600px;
  margin: 0 auto;
}

.result {
  display: flex;
  align-items: center;
}

.result img {
  width: 10%;
  height: 10%;
  margin-right: 20px;
}
</style>