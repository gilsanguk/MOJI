<template>
  <div id="bgdiv">
    <div class="container">
      <h1>
        <b>{{ movie?.title }}</b>
      </h1>
      <!-- 리뷰 -->
      <h3 class="english m-3 pb-3"><b>Review</b></h3>
      <div id="reviewdiv">
        <button id="reviewbtn" @click="openModal">리뷰 작성</button>
      </div>
      <div v-if="reviews.length">
        <ReviewItem
          v-for="review in paginatedData"
          :key="review.id"
          :review="review"
          :movie="movie"
        />
        <!-- 버튼 -->
        <div class="btn-cover">
          <button :disabled="pageNum === 0" @click="prevPage" id="page-btn">
            &lt;
          </button>
          <span class="page-count"
            ><span class="number">{{ pageNum + 1 }} / {{ pageCount }}</span>
            페이지</span
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
      <div v-else class="mt-5 text-center">
        <h3>작성된 리뷰가 없습니다.</h3>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewItem from "@/components/ReviewItem";
import ReviewCreateForm from "@/components/ReviewCreateForm";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";
export default {
  name: "CommunityView",
  components: {
    ReviewItem,
  },
  data() {
    return {
      movie: {},
      reviews: [],
      pageNum: 0,
      pageSize: 5,
    };
  },
  methods: {
    // 영화정보, 리뷰 가져오기
    getMovies() {
      axios
        .get(`${API_URL}/movies/${this.$route.params.movieId}/`, {
          headers: { Authorization: `Token ${this.$store.getters.getToken}`},
        })
        .then((res) => {
          this.movie = res.data;
          this.getReviews();
        });
    },
    getReviews() {
      axios.get(
          `${API_URL}/community/${this.$route.params.movieId}/reviews/?page=${this.pageNum}&page_size=${this.pageSize}`,
          {
            headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          }
        )
        .then((res) => {
          this.reviews = res.data;
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
    // 리뷰 작성 모달
    openModal() {
      this.$modal.show(
        ReviewCreateForm,
        {
          movie: this.movie,
          closeModal: this.closeModal,
          refresh: this.getReviews,
        },
        {
          height: "50%",
          adaptive: true,
        },
        { "before-close": (event) => event.cancel() }
      );
    },
    closeModal() {
      this.$modal.hideAll();
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
    // 페이지네이션
    pageCount() {
      let page = Math.floor(this.reviews.length / this.pageSize);
      if (this.reviews.length % this.pageSize > 0) page++;
      return page;
    },
    paginatedData() {
      if (this.reviews.length >= 1) {
        const start = this.pageNum * this.pageSize;
        let end = start + this.pageSize;
        return this.reviews.slice(start, end);
      } else {
        return 0;
      }
    },
  },
  created() {
    this.getMovies();
    this.$modal.hideAll();
  },
};
</script>

<style>
/* 기본 */
#bgdiv {
  min-height: 100vh;
  padding: 2rem 5rem;
}

/* 리뷰 작성 버튼 */
#reviewdiv {
  text-align: right;
  padding-bottom: 2rem;
  border-bottom: 1px solid #404040;
}

#reviewbtn:hover {
  color: #ffffff !important;
  cursor: pointer;
  transition: 0.4s;
}

/* 버튼 */
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}

button,
.btn-cover #page-btn {
  padding: 0.3% 2%;
  letter-spacing: 1px;
  background-color: transparent;
  color: #ffffff;
  border: 0;
  outline: 0;
}

button:hover,
.btn-cover #page-btn:hover {
  cursor: pointer;
}
</style>