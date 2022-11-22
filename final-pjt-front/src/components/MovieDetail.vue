<template>
  <div id="moviedetail">
    <!-- 유튜브 -->
    <div id="video-box">
      <iframe
        id="video"
        :src="youtubeVideo"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <!-- 내용 -->
    <div class="container p-4">
      <div class="row">

        <!-- 영화 포스터 -->
        <div class="col-12 mb-3 col-lg-3 col-xxl-2">
          <img
            :src="movie.poster_path"
            alt="poster"
            style="heigt: 100%; width: 100%"
          />
        </div>

        <!-- 영화 정보 -->
        <div class="col-12 col-lg-9 col-xxl-10">
          <div class="d-flex justify-content-between me-3">
            <h2 class="text-truncate">
              <b>{{ movie?.title }}</b>
            </h2>
            <!-- 하트 -->
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

      <!-- 모달 푸터 -->
      <div class="modal-footer footer-review py-4" @click="goReview">
        <h5>리뷰 작성하러 가기</h5>
      </div>
      <h3 class="innerfooter">추천 콘텐츠</h3>
      <div v-if="recommend.length" class="modal-footer pt-4">
        <MovieCard
          v-for="movie in paginatedData"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <div v-else class="modal-footer mt-5 text-center">
        <h3>추천 콘텐츠가 없습니다.</h3>
      </div>
      <div v-if="recommend.length" class="btn-cover">
        <button :disabled="pageNum === 0" @click="prevPage" id="page-btn">
          &lt;
        </button>
        <span class="page-count"
          >{{ pageNum + 1 }} / {{ pageCount }} 페이지</span
        >
        <button
          :disabled="pageNum >= pageCount - 1"
          @click="nextPage"
          id="page-btn"
        >
          &gt;
        </button>
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
    // 리뷰 작성 페이지로 이동
    goReview() {
      this.$modal.hideAll();
      this.$router.push({
        path: `community/${this.movie.id}/reviews`,
      });
    },
    // 추천 영화 가져오기
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
    // 좋아요
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
    // 평점을 퍼센트로 변환
    ratingToPercent() {
      const score = +this.movie.vote_average * 10 - 3;
      return score;
    },
    // 페이지네이션
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
  },
  computed: {
    // 영화정보 가공
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
    // 페이지네이션
    pageCount() {
      let page = Math.floor(this.recommend.length / this.pageSize);
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
  created() {
    this.isLiked = this.movie.like_users.includes(this.$store.state.user.id);
    this.getRecommend();
  },
};
</script>

<style scoped>
/* 기본 */
#moviedetail {
  width: 100%;
  height: auto;
  color: rgba(255, 255, 255, 0.9);
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

/* 평점 */
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

/* 하트 */
.heart {
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}

.fas {
  color: crimson;
}

.fas:hover:before {
  transition: 0.4s;
  color: red;
}

.far:hover:before {
  color: crimson;
  transition: 0.4s;
}

/* 모달 푸터 */
.modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-review {
  border-top: 1px solid #404040;
  border-bottom: 1px solid #404040;
  color: #a7a7a7
}

.footer-review:hover {
  color: #ffffff;
  cursor: pointer;
  transition: 0.4s;
}

.innerfooter {
  margin-top: 1.5rem;
  text-align: center;
}

/* 페이지네이션*/
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}


.btn-cover #page-btn {
  padding: 0.3% 2%;
  letter-spacing: 1px;
  background-color:transparent;
  color: #a7a7a7;
  border: 0;
  outline: 0;
}

button:hover,
.btn-cover #page-btn:hover {
  color: #ffffff;
  cursor: pointer;
}
</style>