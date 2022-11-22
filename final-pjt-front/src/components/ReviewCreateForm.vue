<template>
  <div id="reviewform">
    <form @submit.prevent>
      <div class="form-group">
        <label>제목</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="제목을 입력해 주세요"
          v-model="title"
        />
        <label for="content">내용</label>
        <textarea
          class="form-control"
          id="content"
          rows="3"
          placeholder="내용을 입력해 주세요"
          v-model="content"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="createReview">
        등록
      </button>
    </form>
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
      title: "",
      content: "",
    };
  },
  methods: {
    createReview() {
      const data = {
        title: this.title,
        content: this.content,
      }
      axios({
        method: "post",
        url: `${API_URL}/community/${this.$route.params.id}/reviews/create/`,
        headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        data: data,
      })
        .then(() => {
          this.title = "";
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

<style>
.vm--modal {
  border-radius: 10px !important;
  overflow-y: scroll !important;
  background-color: #292929 !important;
}

#reviewform .form-group {
  padding: 5%;
}

#reviewform .form-control {
  resize: none;
}

label {
  color: white;
}
</style>