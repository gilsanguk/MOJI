<template>
  <div id="reviewform">
    <!-- 영화 정보 -->
    <div>
      
    </div>
    <!-- 리뷰 작성 폼 -->
    <form @submit.prevent>
      <div class="form-group">
        <div id="title">
          <p>제목</p>
          <input
            class="form-control"
            placeholder="제목을 입력해 주세요"
            v-model="title"
          />
        </div>
        <div id="content">
          <p>내용</p>
          <textarea
            class="form-control"
            rows="3"
            placeholder="내용을 입력해 주세요"
            v-model="content"
          ></textarea>
        </div>
        <div id="rank">
          <div>
            <span>내가 생각하는 영화 평점</span>       
            <select id="rate" v-model="rank">
              <option style="color: black;" class="content-font" :value="rate" v-for="(rate, idx) in this.reviewRate" :key="idx">{{ rate }}</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" @click="createReview">
        등록
      </button>
    </form>
    <!-- 창 닫기 -->
    <button @click="closeModal">X</button>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "ReviewCreateForm",
  props: {
    closeModal: Function,
    refresh: Function,
    movie: Object,
  },
  data() {
    return {
      reviewRate: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      title: "",
      content: "",
      rank: 0,
    };
  },
  methods: {
    // 리뷰 생성 요청
    createReview() {
      const data = {
        title: this.title,
        content: this.content,
        rank: this.rank,
      }
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
          this.refresh();
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
  },
};
</script>

<style scoped>
/* 기본 */
.vm--modal {
  border-radius: 10px !important;
  overflow-y: scroll !important;
  background-color: #292929 !important;
}

#reviewform .form-group {
  padding-right: 5%;
  padding-left: 5%;
}

#title p,
#content p,
#rank{
  color: white;
  margin-top: 5%;
  margin-bottom: 3%;
  font-size: large;
  font-weight: bold;
}

#rank span {
  margin-right: 3%
}


#reviewform .form-control {
  resize: none;
}

label {
  color: white;
}
</style>