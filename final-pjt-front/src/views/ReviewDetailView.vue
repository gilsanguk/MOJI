<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <img src="@/assets/logo.png" alt="logo" class="me-5" height="200" />
    <div class="bg-div">
      <div class="bg-div-div">
        <!-- 헤더 -->
        <p id="title">{{ review.title }}</p>
        <p id="username" class="english">
          작성자 : {{ review.user?.nickname }}
        </p>
        <p
          v-if="review.updated_at === review.created_at"
          id="time"
          class="number"
        >
          작성된 시간 : {{ displayedAt() }}
        </p>
        <p v-else id="time" class="number">수정된 시간 : {{ displayedAt() }}</p>

        <!-- 평점 -->
        <div id="rank" class="star-ratings col-2">
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

        <!-- 좋아요 -->
        <div id="likebtn">
          <button
            class="like-btn btn"
            :class="isLiked ? 'btn-outline-light' : 'btn-outline-danger'"
            @click.prevent="likeReview(review.id)"
          >
            <i
              class="fas fa-heart position-absolute"
              :class="{ 'w-heart': !isLiked }"
            ></i>
          </button>
          <span class="badge badge-light number d-flex align-items-center">{{
            review.like_users?.length
          }}</span>
        </div>

        <!-- 수정, 삭제 -->
        <div
          v-if="$store.state.user.id === review.user?.id"
          class="d-flex justify-content-end"
        >
          <button @click="openModal" class="updatebtn">수정</button>
          <button @click="deleteReview" class="deletebtn">삭제</button>
        </div>

        <!-- 내용 -->
        <div id="content">{{ review.content }}</div>

        <!-- 댓글 -->

        <div v-if="comments.length !== 0">
          <CommentItem
            class="commentitem py-1"
            v-for="(comment, index) in paginatedData"
            :key="index"
            :comment="comment"
            :getReview="getReview"
            @get-comments="getComments"
          />
          <!-- 페이지네이션 -->
          <div class="my-3">
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

        <div class="comment">
          <CommentCreate :reviewId="review.id" @get-comments="getComments" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewCreateForm from "@/components/ReviewCreateForm";
import CommentCreate from "@/components/CommentCreate";
import CommentItem from "@/components/CommentItem";

import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "ReviewDetailView",
  components: {
    CommentItem,
    CommentCreate,
  },
  data() {
    return {
      isLiked: false,
      comments: [],
      review: {},
      time: "",
      pageNum: 0,
      pageSize: 5,
    };
  },
  methods: {
    // 시간 계산
    displayedAt() {
      return new Date(this.review.created_at).toLocaleString();
    },

    // 평점 계산
    ratingToPercent() {
      return this.review.rank * 10;
    },

    // 리뷰 받기
    getReview() {
      axios({
        method: "get",
        url: `${API_URL}/community/${this.$route.params.movieId}/reviews/${this.$route.params.reviewId}/`,
        headers: { Authorization: `Token ${this.$store.getters.getToken}` },
      })
        .then((res) => {
          this.review = res.data;
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

    // 리뷰 수정
    openModal() {
      this.$modal.show(
        ReviewCreateForm,
        {
          review: this.review,
          closeModal: this.closeModal,
          getReview: this.getReview,
        },
        {
          height: "42%",
          adaptive: true,
        },
        { "before-close": (event) => event.cancel() }
      );
    },

    // 리뷰 삭제
    deleteReview() {
      axios
        .delete(
          `${API_URL}/community/${this.$route.params.movieId}/reviews/${this.$route.params.reviewId}/`,
          {
            headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          }
        )
        .then(() => {
          this.$router.push({
            name: "CommunityView",
            params: { movieId: this.$route.params.movieId },
          });
        });
    },

    // 리뷰 좋아요
    likeReview(reviewId) {
      axios({
        method: "post",
        url: `${API_URL}/community/reviews/${reviewId}/like/`,
        headers: { Authorization: `Token ${this.$store.getters.getToken}` },
      })
        .then((res) => {
          this.isLiked = res.data.is_liked;
          this.getReview();
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

    // 댓글 받기
    getComments() {
      axios
        .get(
          `${API_URL}/community/reviews/${this.$route.params.reviewId}/comments/`,
          {
            headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          }
        )
        .then((res) => {
          this.comments = res.data;
          if (this.pageNum !== 0 && this.comments.length % 5 === 0) this.pageNum--;
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
      let page = Math.floor(this.comments.length / this.pageSize);
      if (this.comments.length % this.pageSize > 0) page++;
      return page;
    },
    paginatedData() {
      if (this.comments.length >= 1) {
        const start = this.pageNum * this.pageSize;
        let end = start + this.pageSize;
        return this.comments.slice(start, end);
      } else {
        return 0;
      }
    },
  },
  created() {
    this.getReview();
    this.getComments();
    this.$modal.hideAll();
  },
};
</script>

<style scoped>
/* 기본 */
.bg-div {
  width: 600px;
  margin-bottom: 3rem;
  border-radius: 10px;
  padding: 30px;
  background-color: #343434;
}

.bg-div-div {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #a7a7a7;
  border-radius: 10px;
  padding: 7%;
  background-color: #343434;
}

#title {
  font-size: x-large;
  font-weight: bold;
}

#rank {
  float: left;
}

#username {
  text-align: right;
  font-size: medium;
}

#time {
  text-align: right;
  font-size: small;
}

#content {
  text-align: left;
  border-bottom: 1px solid #404040;
  padding-bottom: 1rem;
}

img {
  opacity: 0.7;
}

/* 좋아요 */
#likebtn {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}

.like-btn {
  position: relative;
  border-radius: 50%;
  width: 20px;
  height: 25px;
  border: 0;
}

.fa-heart {
  position: absolute;
  top: 5.21px;
  left: 4px;
  color: #f00;
}

.w-heart {
  color: #fff !important;
}

.btn-outline-light:hover {
  color: #f00;
}

/* 댓글 */
.comment {
  border-top: 1px solid #404040;
}

.commentitem {
  text-align: left;
  margin: 0%;
  border-bottom: 1px solid #404040;
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
</style>