<template>
  <div id="moviedetail">
    <div id="video-box">
      <iframe
        id="video"
        :src="youtubeVideo"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="container p-4">
      <div class="row">
        <div class="col-12 mb-3 mb-lg-0 col-lg-3">
          <img
            :src="movie.poster_path"
            alt="poster"
            style="heigt: 100%; width: 100%"
          />
        </div>
        <div class="col-12 col-lg-9">
          <h2>
            <b>{{ movie?.title }}</b>
            <span style="font-size: 80%; margin-left: 2%">{{
              relatedYear
            }}</span>
          </h2>
          <p id="overview">{{ movie?.overview }}</p>
          <div class="row pb-3">
            <div class="col-12 col-lg-6">
              <p>평점: {{ movie?.vote_average }}</p>
              <p>장르: {{ genres }}</p>
            </div>
            <div class="col-12 col-lg-6">
              <p>감독: {{ director }}</p>
              <p id="in-text">출연: {{ actors }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer py-4" @click="goReview">
        <h3>리뷰 작성하러 가기</h3>
      </div>
      <div title="영화추천 받기" class="modal-footer pt-4" @click="goRecommend">
        <h3>이 영화가 좋았다면?</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieDetail",
  props: {
    movie: Object,
  },
  methods: {
    goReview() {
      this.$modal.hideAll();
      this.$router.push({
        path: `community/${this.movie.id}/review`,
      })
    },
  },
  computed: {
    youtubeVideo() {
      return `https://www.youtube.com/embed/${this.movie.youtube_key}`;
    },
    relatedYear() {
      return this.movie.release_date.slice(0, 4);
    },
    actors() {
      return this.movie.actors.map((actor) => actor.name).join(", ");
    },
    director() {
      return this.movie.directors.map((director) => director.name).join(", ");
    },
    genres() {
      return this.movie.genres.map((genre) => genre.name).join(", ");
    },
  },
};
</script>

<style scoped>
p {
  font-size: 125%;
}

#moviedetail {
  width: 100%;
  height: auto;
  background-color: #141619;
  color: #a5a5a5
}

#moviedetail-webkit-scrollbar {
  display: none !important;
}

#video-box {
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
}

#video {
  position: absolute;
  width: 100%;
  height: 100%;
}

#overview {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

#in-text {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #404040;
  color: #a5a5a5;
}

.modal-footer:hover {
  color: #FFFFFF;
  cursor: pointer;
}
</style>