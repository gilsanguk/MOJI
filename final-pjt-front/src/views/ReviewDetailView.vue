<template>
  <div>
    <h1>!!</h1>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/moji'

export default {
  name: "ReviewDetailView",
  data() {
    return {
      review: {},
    };
  },
  methods: {
    // 리뷰 받기
    getReview() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.movieId}/reivews/${this.$route.params.reviewId}/`,
      })
        .then((res) => {
          console.log(res.data);
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
}
</script>

<style>

</style>