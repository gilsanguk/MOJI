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
export default {
  name: 'MovieDetail',
  props: {
    movie: Object,
  },
}
</script>

<style>

</style>