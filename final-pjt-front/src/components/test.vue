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
        <div class="col-12 mb-3 col-lg-3 col-xxl-2">
          <img
            :src="movie.poster_path"
            alt="poster"
            style="heigt: 100%; width: 100%"
          />
        </div>
        <div class="col-12 col-lg-9 col-xxl-10">
          <div class="d-flex justify-content-between me-3">
            <h2 class="text-truncate">
              <b>{{ movie?.title }}</b>
            </h2>
            <i
              class="heart fa-heart fa-3x"
              @click="changeLike"
              :class="isLiked ? 'fas' : 'far'"
            ></i>
          </div>
          <h5>
            <b>{{ relatedYear }}</b>
          </h5>
          <p id="overview">{{ movie?.overview }}</p>
          <div class="row pb-3">
            <div class="col-12 col-lg-6">
              <p>장르: {{ genres }}</p>
              <p>감독: {{ director }}</p>
            </div>
            <div class="col-12 col-lg-6">
              <!-- 평점 -->
              <div class="d-flex">
                <p class="me-2">평점:</p>
                <div class="star-ratings">
                  <div
                    class="star-ratings-fill space-x-2 text-lg"
                    :style="{ width: ratingToPercent() + '%' }"
                  >
                    <span>★</span><span>★</span><span>★</span><span>★</span
                    ><span>★</span>
                  </div>
                  <div class="star-ratings-base space-x-2 text-lg">
                    <span>★</span><span>★</span><span>★</span><span>★</span
                    ><span>★</span>
                  </div>
                </div>
              </div>

              <p id="in-text">출연: {{ actors }}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="modal-footer footer-review py-4" @click="goReview">
        <h5>리뷰 작성하러 가기</h5>
      </div>
      <div v-if="recommend" class="modal-footer pt-4" >
        <MovieCard v-for="movie in paginatedData" :key="movie.id" :movie="movie" />
        <div class="btn-cover" >
          <button :disabled="pageNum === 0" @click="prevPage" id="page-btn"> &lt; </button>
          <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
          <button :disabled="pageNum >= pageCount - 1" @click="nextPage" id="page-btn"> &gt;</button>
        </div>
      </div>
      <div v-else class="modal-footer mt-5 text-center">
        <h3> 추천 영화가 없습니다. </h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "@/components/MovieCard";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "MovieDetail",
  props: {
    movie: Object,
  },
  components: {
    MovieCard,
  },
  data() {
    return {
      isLiked: false,
      likeCount: 0,
      recommend: [],
      pageNum: 0,
      pageSize: 12,
    };
  },
  methods: {
    goReview() {
      this.$modal.hideAll();
      this.$router.push({
        path: `community/${this.movie.id}/reviews`,
      });
    },
    getRecommend() {
      const movieId = this.movie.id;
      const Token = this.$store.getters.getToken;
      axios
        .get(`${API_URL}/movies/recommend/${movieId}/`, {
          headers: { Authorization: `Token ${Token}` },
        })
        .then((res) => {
          this.recommend = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
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
    ratingToPercent() {
      const score = +this.movie.vote_average * 10;
      return score;
    },
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    }
  },
  created() {
    this.isLiked = this.movie.like_users.includes(this.$store.state.user.id);
    this.getRecommend();
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
    pageCount() {
      let page = Math.floor(this.recommend.length / this.pageSize);
      console.log('l',this.recommend.length);
      console.log('s',this.pageSize);
      if (this.recommend.length % this.pageSize >= 0) page++;
      return page;
    },
    paginatedData() {
      if (this.recommend.length >= 1) {
        const start = this.pageNum * this.pageSize;
        let end = start + this.pageSize;
        return this.recommend.slice(start, end);
      } else {
        return 0;
      }
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

.footer-review:hover {
  color: #ffffff;
  cursor: pointer;
  transition: 0.4s;
}

.star-ratings {
  color: #aaa9a9;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: gold;
}

.star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}

.star-ratings-base {
  z-index: 0;
  padding: 0;
}
</style>