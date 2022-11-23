<template>
  <div class="bgdiv">
    <p>작성자 : {{ comment.user.nickname }} </p>
    <p v-if="comment.created_at === comment.updated_at" class="number">{{displayedAt()}}</p>
    <p v-else class="number">{{displayedAt()}} (수정됨) </p>
    <div id="contentdiv">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: {
    comment: Object
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