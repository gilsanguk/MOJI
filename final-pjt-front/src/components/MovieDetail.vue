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
          <figure class="snip1384">
            <img
              :src="movie.poster_path"
              alt="poster"
              style="heigt: 100%; width: 100%"
            />
            <figcaption id="movie-detail">
              <i
                class="heart fa-heart fa-3x"
                @click="changeLike"
                :class="isLiked ? 'fas' : 'far'"
              ></i>
            </figcaption>
          </figure>
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
              <p>장르: {{ genres }}</p>
              <p>감독: {{ director }}</p>
            </div>
            <div class="col-12 col-lg-6">
              <p>평점: {{ movie?.vote_average }}</p>
              <p id="in-text">출연: {{ actors }}</p>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer py-4" @click="goReview">
        <h5>리뷰 작성하러 가기</h5>
      </div>
      <div
        @mouseover="changeMent"
        @mouseleave="resetMent"
        title="영화추천 받기"
        class="modal-footer pt-4"
        @click="goRecommend"
      >
        <h5 v-if="!isOvered">이 영화가 좋았다면?</h5>
        <h5 v-if="isOvered">비슷한 영화 추천받으러 가기</h5>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "MovieDetail",
  props: {
    movie: Object,
  },
  data() {
    return {
      isOvered: false,
      isLiked: false,
      likeCount: 0,
    };
  },
  methods: {
    goReview() {
      this.$modal.hideAll();
      this.$router.push({
        path: `community/${this.movie.id}/reviews`,
      });
    },
    goRecommend() {
      this.$modal.hideAll();
      this.$router.push({
        path: `movies/${this.movie.id}/recommend`,
      });
    },
    changeMent() {
      this.isOvered = true;
    },
    resetMent() {
      this.isOvered = false;
    },
    changeLike() {
      axios({
        method: "post",
        url: `${API_URL}/movies/${this.movie.id}/like/`,
        headers: {
          Authorization: `Token ${this.getToken}`,
        },
      })
        .then((res) => {
          this.isLiked = res.data.is_liked;
          this.likeCount = res.data.like_count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.isLiked = this.movie.like_users.includes(this.$store.state.user.id);
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
    getToken() {
      return this.$store.getters.getToken;
    },
  },
};
</script>

<style scoped>
.heart {
  color: white;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}

@media screen and (max-width: 992px) {
  .heart {
    transform: scale(2.3);
  }
}

.heart:hover:before {
  color: crimson;
  transition: 0.4s;
}

#moviedetail {
  width: 100%;
  height: auto;
  background-color: #141619;
  color: #a5a5a5;
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
  -webkit-line-clamp: 1;
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
  color: #ffffff;
  cursor: pointer;
  transition: 0.4s;
}


figure.snip1384 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}


figure.snip1384 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}


figure.snip1384 img {
  max-width: 100%;
  backface-visibility: hidden;
  vertical-align: top;
}

figure.snip1384 figcaption {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>