<template>
  <div>{{ movies }}</div>
</template>

<script>
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/moji'

export default {
  name: "RecommendView",
  data() {
    return {
      movies: [],
    };
  },
  created() {
    const movieId = this.$route.params.id
    const Token = this.$store.getters.getToken
    axios.get(
      `${API_URL}/movies/recommend/${movieId}/`,
      {headers: { Authorization: `Token ${Token}`}})
      .then((res) => {
        this.movies = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
}
</script>

<style>

</style>