<template>
  <div id="commentform">
    <!-- 창 닫기 -->
    <button id="closebtn" @click="closeModal">X</button>

    <!-- 리뷰 작성 폼 -->
    <form @submit.prevent>
      <div id="content">
          <p>내용</p>
          <textarea
          class="form-control"
          rows="3"
          placeholder="내용을 입력해 주세요"
          v-model="content"
          ></textarea>
      </div>
      <button type="submit" id="summitbtn" @click="createComment">
        등록
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "CommentsCreate",
  props: {
    closeModal: Function,
    refresh: Function,
    review: Object,
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    // 댓글 생성 요청
    createComment() {
      const data = {
        content: this.content,
      }
      axios({
        method: "post",
        url: `${API_URL}/community/reviews/${this.review.id}/comments/create/`,
        headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        data: data,
      })
        .then(() => {
          this.content = "";
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
  border-radius: 10px;
  overflow-y: scroll;
  background-color: #292929;
}

#commentform {
  padding: 3% 7%
}

#closebtn {
  float: right;
  background-color: transparent;
  font-size: xx-large;
  color: #a7a7a7;
  border: 0;
  outline: 0;
}

#content p {
  margin-top: 7%;
  color: white;
  font-size: large;
  font-weight: bold;
}

#content .form-control {
  resize: none;
}

#summitbtn {
  float: right;
  background-color: transparent;
  font-size: x-large;
  color: #a7a7a7;
  border: 0;
  outline: 0;
}

#closebtn:hover,
#summitbtn:hover {
  color: white;
  cursor: pointer;
}
</style>