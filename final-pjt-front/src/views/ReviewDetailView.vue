<template>
  <div class="d-flex justify-content-center">
    <div id="bg-div" class="m-5">
      <p id="title">{{ review.title }}</p>
      <p id="username" class="english">작성자 : {{ review.user.nickname }}</p>
      <p v-if="review.updated_at === review.created_at" id="time" class="number">
        작성된 시간 : {{ displayedAt() }}
      </p>
      <p v-else id="time" class="number">수정된 시간 : {{ displayedAt() }}</p>
      <div id="content">{{ review.content }}</div>
      <label style="margin-right: 15px" class="content-font" for="rank">내가 생각하는 영화 평점</label>
      <div class="select-wrapper" style="margin-right: 15px; margin-bottom:15px">            
        <select name="rate" id="rate" v-model="myMovieRate" class="content-font">
          <option style="color: black;" class="content-font" :value="rate" v-for="(rate, idx) in this.reviewRate" :key="idx">{{ rate }}</option>
        </select>
      </div>
      <div id="likebtn">
        <button
          class="btn btn-outline-danger"
          @click.prevent="likeReview(review.id)"
        >
          <i class="fas fa-heart"></i>
          <span class="badge badge-light number">{{ review.like_users.length }}</span>
        </button>
      </div>
      <h1>댓글수</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "ReviewDetailView",
  data() {
    return {
      reviewRate: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      review: {},
      time: "",
    };
  },
  methods: {
    // 시간 계산
    displayedAt() {
      return new Date(this.review.created_at).toLocaleString();
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
  },
  created() {
    this.getReview();
  },
};
</script>

<style>
#bg-div {
  width: 60%;
}

#title {
  margin: 3%;
  font-size: x-large;
  font-weight: bold;
}

#username {
  text-align: right;
  font-size: medium;
  margin-right: 1%;
}

#time {
  text-align: right;
  font-size: small;
  margin-right: 1%;
}

#content {
  text-align: left;
  margin: 2%;
}

#likebtn {
  display: flex;
  justify-content: flex-end;
}
</style>