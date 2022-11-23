<template>
  <div class="d-flex justify-content-center">
    <div id="bg-div">
      <p id="title">{{ review.title }}</p>
      <p id="username" class="english">작성자 : {{ review.user?.nickname }}</p>
      <p v-if="review.updated_at === review.created_at" id="time" class="number">
        작성된 시간 : {{ displayedAt() }}
      </p>
      <p v-else id="time" class="number">수정된 시간 : {{ displayedAt() }}</p>
        <!-- 평점 -->
        <div id="rank" class="star-ratings col-2">
          <div
            class="star-ratings-fill space-x-2 text-lg"
            :style="{ width: ratingToPercent() + '%' }"
          >
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <div class="star-ratings-base space-x-2 text-lg">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
      </div>
    <div id="likebtn">
      <button
          class="btn btn-outline-danger"
          @click.prevent="likeReview(review.id)"
        >
          <i class="fas fa-heart"></i>
          <span class="badge badge-light number">{{ review.like_users?.length }}</span>
      </button>
    </div>
    <div id="content">{{ review.content }}</div>
    <div id="comment">
      <button @click="createComment">댓글 작성</button>
      <CommentItem
        id="commentitem"
        v-for="(comment,index) in comments"
        :key="index"
        :comment="comment"
        />
    </div>
    </div>
  </div>
</template>

<script>
import CommentCreate from '@/components/CommentCreate'
import CommentItem from '@/components/CommentItem'

import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "ReviewDetailView",
  components: {
    CommentItem
  },
  data() {
    return {
      comments: [],
      review: {},
      time: "",
    };
  },
  methods: {
    // 시간 계산
    displayedAt() {
      return new Date(this.review.created_at).toLocaleString();
    },

    // 평점 계산
    ratingToPercent() {
      return this.review.rank * 10 
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
    updateReview() {
      const review = {
        id: this.$route.params.id,
        title: this.title,
        content: this.content,
      };
      this.$store.dispatch("updateReview", review);
    },
    // 리뷰 삭제
    deleteReview() {
      const review = {
        id: this.$route.params.id,
      };
      this.$store.dispatch("deleteReview", review);
    },

    // 댓글 받기
    getComments() {
      axios.get(
          `${API_URL}/community/reviews/${this.$route.params.reviewId}/comments/`,
          {
            headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          }
        )
        .then((res) => {
          this.comments = res.data;
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

    // 댓글 작성 모달
    createComment() {
      this.$modal.show(
        CommentCreate,
        {
          review: this.review,
          closeModal: this.closeModal,
          refresh: this.getComments,
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
  },
  created() {
    this.getReview();
    this.getComments();
    this.$modal.hideAll()
  },
};
</script>

<style scoped>
#bg-div {
  width: 40%;
}

#title {
  margin: 3%;
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
}

#likebtn {
  display: flex;
  justify-content: flex-end;
}

#comment {
  margin: 5% 0%
}

#commentitem {
  text-align: left;
  margin: 3% 0%
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