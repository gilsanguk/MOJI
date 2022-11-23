<template>
  <div class="movie-card card m-2" style="width: 18rem" @click="openModal">
    <!-- 내용 -->
    <img :src="movie.poster_path" class="card-img-top card-img" alt="..." />
    <div class="card-body">
      <h5 class="card-title text-truncate">
        <b>{{ movie.title }}</b>
      </h5>

      <!-- 평점 -->
      <div class="d-flex align-items-center">
        <span class="me-2 mt-1">평점:</span>
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

    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieDetail from "@/components/MovieDetail";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "MovieCard",
  props: {
    movie: Object,
  },
  methods: {
    // 평점을 퍼센트로 변환
    ratingToPercent() {
      return this.movie.vote_average * 10;
    },
    // 모달창 열기
    openModal() {
      axios.get(`${API_URL}/movies/${this.movie.id}/`, {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        })
        .then((res) => {
          this.$modal.hideAll();
          this.$modal.show(
            MovieDetail,
            { movie: res.data },
            {
              height: "80%",
              width: "60%",
              adaptive: true,
              shiftY: 0.5,
            }
          );
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push({ name: "LoginView" });
          } else if (err.response.status === 404) {
            this.$router.push({ name: "NotFound404" });
          } else {
            console.log(err);
          }
        });
    },
  },
};
</script>

<style scoped>
.movie-card {
  background-color: #3b3b3b;
  border-radius: 10px 10px 10px 10px !important;
  border: 0;
  outline: none;
  color: rgba(255, 255, 255, 0.9);
}

.card-img {
  height: 25rem;
  border-radius: 10px 10px 0 0 !important;
}

/* 평점 */
.star-ratings {
  color: #a7a7a7;
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

.star-ratings-base > span,
.star-ratings-fill > span {
  margin-right: 0.3rem;
}
</style>