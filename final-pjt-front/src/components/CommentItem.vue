<template>
  <div >
    <div class="bgdiv position-relative" v-if="!updating">
      <div class="d-flex justify-content-between">
        <div>
          <p>작성자 : {{ comment.user.nickname }}</p>
          <p v-if="comment.created_at === comment.updated_at" class="number py-1" style="font-size:small; font-weight:300">
            {{ displayedAt() }}
          </p>
          <p v-else class="number py-1" style="font-size:small; font-weight:300">{{ displayedAt() }} (수정됨)</p>
        </div>

        <div>
          <!-- 삭제 -->
          <button
            v-if="$store.state.user.id === comment.user.id"
            @click="deleteComment"
            style="position: absolute; right: 0; top: 0"
          >
            X
          </button>

          <div
            class="d-flex col-3 justify-content-end"
            style="position: absolute; right: 0; bottom: 0"
          >
            <!-- 수정 -->
            <button
              v-if="$store.state.user.id === comment.user.id"
              @click="updateComment"
              style="font-size: small"
            >
              수정
            </button>
            <!-- 좋아요 -->
            <div id="likebtn">
              <button
                class="like-btn btn"
                :class="isLiked ? 'btn-outline-light' : 'btn-outline-danger'"
                @click.prevent="likeComment"
              >
                <i
                  class="fas fa-heart position-absolute"
                  :class="{ 'w-heart': !isLiked }"
                ></i>
              </button>
              <span
                class="badge badge-light number d-flex align-items-center"
                >{{ likeCount }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div id="contentdiv">{{ comment.content }}</div>
    </div>
    <CommentCreate
      v-if="updating"
      :comment="comment"
      @get-comments="getComments"
    />
  </div>
</template>

<script>
import CommentCreate from "@/components/CommentCreate.vue";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "CommentItem",
  props: {
    comment: Object,
  },
  data() {
    return {
      updating: false,
      isLiked: false,
      likeCount: 0,
    };
  },
  components: {
    CommentCreate,
  },
  methods: {
    // 날짜 표시
    displayedAt() {
      const seconds = (new Date() - new Date(this.comment.updated_at)) / 1000;
      if (seconds < 60) return `방금 전`;
      const minutes = seconds / 60;
      if (minutes < 60) return `${Math.floor(minutes)}분 전`;
      const hours = minutes / 60;
      if (hours < 24) return `${Math.floor(hours)}시간 전`;
      const days = hours / 24;
      if (days < 7) return `${Math.floor(days)}일 전`;
      const weeks = days / 7;
      if (weeks < 5) return `${Math.floor(weeks)}주 전`;
      const months = days / 30;
      if (months < 12) return `${Math.floor(months)}개월 전`;
      const years = days / 365;
      return `${Math.floor(years)}년 전`;
    },

    // 리뷰 좋아요
    likeComment() {
      axios({
        method: "post",
        url: `${API_URL}/community/reviews/${this.$route.params.reviewId}/comments/${this.comment.id}/like/`,
        headers: { Authorization: `Token ${this.$store.getters.getToken}` },
      })
        .then((res) => {
          this.isLiked = res.data.is_liked;
          this.likeCount = res.data.like_count;
          this.getComments();
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

    // 댓글 수정
    updateComment() {
      this.updating = true;
    },
    // 댓글 삭제
    deleteComment() {
      axios
        .delete(
          `${API_URL}/community/reviews/${this.$route.params.reviewId}/comments/${this.comment.id}/`,
          {
            headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          }
        )
        .then(() => {
          this.$emit("get-comments");
        });
    },
    getComments() {
      this.$emit("get-comments");
      this.updating = false;
    },
  },
  created() {
    this.isLiked = this.comment.like_users.includes(this.$store.state.user.id);
    this.likeCount = this.comment.like_users.length;
    console.log(this.comment);
  },
};
</script>

<style scoped>
/* 기본 */
.bgdiv {
  margin: 2% 0%;
  font-size: large;
}

.bgdiv p {
  margin: 0 0 1%;
}

/* 좋아요 */
#likebtn {
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
</style>