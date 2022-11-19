<template>
  <div id="bgdiv">
    <div id="bgdivdiv">
    <h1><b>보고 싶은 영화를 선택하세요</b></h1>
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

    <div id="selecteddiv">
      <h2>선택한 영화 ({{selectmovies.length}}/5)</h2>
      <div v-for="movie in selectmovies" :key="movie.id" >
        <SelectedMovieItem :movie="movie" @delete-movie="deleteMovie"/>
      </div>
    </div>
    <button @click="setPrefer" id="clickbutton">추천받기</button>
    </div>
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
#bgdiv {
  min-height: 100vh;
  padding: 2rem 5rem
}

#bgdivdiv {
  margin: 0% 15%
}

#searchdiv {
  margin: 0 auto;
  font-size: 40px;
}

.result {
  display: flex;
  align-items: center;
  color: black;
}

.result img {
  width: 10%;
  height: 10%;
  margin-right: 20px;
}

#selecteddiv {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

#selecteddiv div {
  margin: 2rem 1rem ;
}

#clickbutton {
  border-radius: 10px;
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