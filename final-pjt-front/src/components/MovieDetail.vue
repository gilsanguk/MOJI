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
    <div class="container pt-3">
      <div class="row">
        <div class="col-12 col-md-3">
          <img
            :src="movie.poster_path"
            alt="poster"
            style="heigt: 100%; width: 100%"
          />
        </div>
        <div class="col-12 col-md-8">
          <h5>
            {{ movie?.title }}
            <span style="font-size: 80%;">{{ relatedYear }}</span>
          </h5>
          <p id="overview">{{ movie?.overview }}</p>
          <div class="row">
            <div class="col-12 col-md-6">
              <p>평점: {{ movie?.vote_average }}</p>
              <p>장르: {{ genres }}</p>
            </div>
            <div class="col-12 col-md-6">
              <p>감독: {{ director }}</p>
              <p id="in-text">출연: {{ actors }}</p>
            </div>
          </div>
        </div>
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
    show() {
      this.$modal.show("example");
    },
    hide() {
      this.$modal.hide("my-first-modal");
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
  }
};
</script>

<style scoped>
#moviedetail {
  width: 100%;
  height: auto;
  background-color: #141619;
  color: white;
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
  -webkit-line-clamp: 3;
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
</style>