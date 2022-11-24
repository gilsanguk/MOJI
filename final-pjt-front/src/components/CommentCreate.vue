<template>
  <div id="commentform">
    <!-- 리뷰 작성 폼 -->
    <form @submit.prevent>
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
      <button type="submit" id="summitbtn" @click="createComment">
        작성
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
    reviewId: Number,
  },
  data() {
    return {
      content: "",
      err: false,
    };
  },
  methods: {
    // 댓글 생성 요청
    createComment() {
      if (!this.content) {
        this.err = true;
        alert("내용을 입력해주세요");
        return;
      }
      const data = {
        content: this.content,
      }
      axios({
        method: "post",
        url: `${API_URL}/community/reviews/${this.reviewId}/comments/create/`,
        headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        data: data,
      })
        .then(() => {
          this.content = "";
          this.$emit('getComments')
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

#summitbtn:hover {
  color: white;
  cursor: pointer;
}
</style>