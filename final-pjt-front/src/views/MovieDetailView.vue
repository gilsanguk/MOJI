<template>
  <div>
    <h1>{{ movie.title }}</h1>
    <div class="movie">
      <img :src="movie.poster_path" alt="movie poster">
      <div class="movie-info">
        <h2>영화 정보</h2>
        <p>개봉일: {{ movie.release_date }}</p>
        <p>평점: {{ movie.vote_average }}</p>
        <p>장르: {{ movie.genres }}</p>
        <p>상영시간: {{ movie.runtime }}</p>
        <p>개요: {{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieDetailView',
  data() {
    return {
      movie: null,
    }
  },
  created() {
    this.getMovieDetail()
  },
  methods: {
    getMovieDetail() {
      const movieId = this.$route.params.id
      axios({
        method: 'get',
        url: `${API_URL}/movies/${movieId}/`,
      })
        .then(res => {
          this.movie = res.data
          console.log(this.movie);
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push({ name: 'LogInView' })
          } else if (err.response.status === 404) {
            this.$router.push({ name: 'NotFound404' })
          } else {
            console.log(err)
          }
        })
    }
  },
}
</script>

<style>

</style>