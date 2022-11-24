<template>
  <div id="reviewform">
    <!-- 창 닫기 -->
    <button id="closebtn" @click="closeModal">X</button>

    <!-- 리뷰 작성 폼 -->
    <form @submit.prevent>
      <div class="form-group">
        <div id="title">
          <p>제목</p>
          <input
            class="form-control"
            placeholder="제목을 입력해 주세요"
            v-model.trim="title"
            :class="err ? 'error' : ''"
          />
        </div>
        <div id="content">
          <p>내용</p>
          <textarea
            class="form-control"
            rows="3"
            placeholder="내용을 입력해 주세요"
            v-model.trim="content"
            :class="err ? 'error' : ''"
          ></textarea>
        </div>
        <!-- 평점 -->
        <div id="rank">
          <span>평점</span>
          <select id="rate" v-model="rank">
            <option
              style="color: black"
              class="content-font"
              :value="rate"
              v-for="(rate, idx) in this.reviewRate"
              :key="idx"
            >
              {{ rate }}
            </option>
          </select>
          <button type="submit" id="summitbtn" @click="createReview">
            등록
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "ReviewCreateForm",
  props: {
    closeModal: Function,
    getReview: Function,
    getReviews: Function,
    movie: Object,
    review: Object,
  },

  data() {
    return {
      reviewRate: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      title: "",
      content: "",
      rank: 10,
      err: false,
    };
  },
  methods: {
    // 리뷰 생성 요청
    createReview() {
      if (!this.title && !this.content) {
        this.err = true;
        alert("제목과 내용을 입력해주세요");
        return;
      } else if (!this.content) {
        this.err = true;
        alert("내용을 입력해주세요");
        return;
      } else if (!this.title) {
        this.err = true;
        return;
      }
      const data = {
        title: this.title,
        content: this.content,
        rank: this.rank,
      };
      if (this.review) {
        axios({
          method: "put",
          url: `${API_URL}/community/${this.$route.params.movieId}/reviews/${this.review.id}/`,
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          data: data,
        })
          .then(() => {
            this.title = "";
            this.content = "";
            this.rank = "";
            this.closeModal();
          })
          .then(() => {
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
      } else {
        axios({
          method: "post",
          url: `${API_URL}/community/${this.$route.params.movieId}/reviews/create/`,
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          data: data,
        })
          .then(() => {
            this.title = "";
            this.content = "";
            this.rank = "";
            this.closeModal();
          })
          .then(() => {
            this.getReviews();
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
      }
    },
  },
  created() {
    if (this.review) {
      this.title = this.review.title;
      this.content = this.review.content;
      this.rank = this.review.rank;
    }
  },
};
</script>

<style scoped>
/* 기본 */
.vm--modal {
  border-radius: 10px;
  background-color: #292929;
}

#reviewform {
  padding: 3% 7%;
}

#closebtn {
  float: right;
  background-color: transparent;
  font-size: x-large;
  color: #a7a7a7;
  border: 0;
  outline: 0;
}

#title p,
#content p,
#rank {
  color: white;
  font-size: large;
  font-weight: bold;
}

#title p {
  margin-top: 5%;
}

#content p,
#rank {
  margin-top: 7%;
}

#rank span {
  margin-right: 3%;
}

#reviewform .form-control {
  resize: none;
}

#summitbtn {
  position: absolute;
  background-color: transparent;
  font-size: x-large;
  color: #a7a7a7;
  border: 0;
  outline: 0;
  right: 8%;
  bottom: 8%;
}

/* button:hover, */
#closebtn:hover,
#summitbtn:hover {
  color: white;
  cursor: pointer;
}
</style>