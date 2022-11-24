<template>
  <div class="bgdiv ">
    <div class="d-flex justify-content-between">
      <div>
        <p>작성자 : {{ comment.user.nickname }} </p>
        <p v-if="comment.created_at === comment.updated_at" class="number">{{displayedAt()}}</p>
        <p v-else class="number">{{displayedAt()}} (수정됨) </p>
      </div>
      <div>
        <button>좋아요</button>
        <button @click="deleteComment">X</button>
        <button @click="updateComment">수정</button>
      </div>
    </div>
    <div id="contentdiv">{{comment.content}}</div>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "CommentItem",
  props: {
    comment: Object,
  },
  methods: {
    // 날짜 표시
    displayedAt() {
      const seconds = (new Date() - new Date(this.comment.updated_at)) / 1000
      if (seconds < 60) return `방금 전`
      const minutes = seconds / 60
      if (minutes < 60) return `${Math.floor(minutes)}분 전`
      const hours = minutes / 60
      if (hours < 24) return `${Math.floor(hours)}시간 전`
      const days = hours / 24
      if (days < 7) return `${Math.floor(days)}일 전`
      const weeks = days / 7
      if (weeks < 5) return `${Math.floor(weeks)}주 전`
      const months = days / 30
      if (months < 12) return `${Math.floor(months)}개월 전`
      const years = days / 365
      return `${Math.floor(years)}년 전`
    },

    // 댓글 수정
    updateComment() {
      const data = {
        content: this.content
      }
      axios({
        method: "put",
          url: `${API_URL}/community/reviews/${this.$route.params.reviewId}/comments/${this.comment.id}/`,
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          data: data
        })
        .then(() => {
          this.content = ""
          this.refresh()
        })
    },
    // 댓글 삭제
    deleteComment() {
      axios.delete(
        `${API_URL}/community/reviews/${this.$route.params.reviewId}/comments/${this.comment.id}/`, {
        headers: { Authorization: `Token ${this.$store.getters.getToken}`},
        })
          .then(() => {
            this.$emit('getComments')
          })
      },
  }
}
</script>

<style scoped>
.bgdiv {
  margin: 2% 0%;
  font-size: large;
}

.bgdiv p{
  margin: 0 0 1%
}
</style>