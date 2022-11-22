<template>
  <div class="container p-4 btn" @click="goDetail">
    <div class="row">
      <div class="d-flex">
        <!-- 제목 간략히 -->
        <div class="col-1">{{ review.user }}</div>
        <div class="text-truncate col-5">
          <b>{{ review.title }}</b>
        </div>
        <h5 class="col-3">
          <b>{{ date }}</b>
        </h5>

        <!-- 평점 -->
        <div class="star-ratings col-2">
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
export default {
  name: "ReviewItem",
  props: {
    review: Object,
    movie: Object,
  },
  data() {
    return {
      date: "",
    };
  },
  methods: {
    // 평점 계산
    ratingToPercent() {
      this.date = new Date(this.review.created_at).toLocaleString();
      const score = 5 * 10;
      return score;
    },
    // 리뷰 디테일
    goDetail() {
      this.$router.push(`/community/${this.movie.id}/reviews/${this.review.id}`);
    },
  },
};
</script>

<style>
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