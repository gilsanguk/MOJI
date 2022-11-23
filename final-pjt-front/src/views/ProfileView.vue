<template>
  <div class="bgdiv">
    <h1>프로필 사진 변경</h1>
    <div class="profile">
      <img
        v-if="user.profile_image"
        :src="'http://127.0.0.1:8000' + user.profile_image"
        alt=""
        height="200"
      />
      <!-- <p v-else>{{ user.profile_image }}</p> -->
      <form>
        <div>
          <label for="chooseFile"> Click </label>
        </div>
        <input @change="uploadImg" type="file" accept="image/*" />
        <button class="send-btn" @click.prevent="updateProfile">프로필 수정</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "ProfileView",
  data() {
    return {
      user: {
        nickname: "",
        profile_image: "",
        username: "",
        password: "",
      },
      image: "",
    };
  },
  methods: {
    getUserInfo() {
      axios.get(
        `${API_URL}/accounts/profile/${this.$route.params.nickname}/`, {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        })
        .then((res) => {
          this.user = res.data;
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
    uploadImg(e) {
      this.image = e.target.files[0];
    },
    updateProfile() {
      const data = new FormData();
      data.append("profile_image", this.image);
      axios.patch(
        `${API_URL}/accounts/profile/${this.$route.params.nickname}/update/`, data, {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        })
        .then(() => {
          this.$store.dispatch("setUserData", this.user.nickname);
          this.$router.push({ name: "MoviesView" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style scoped>
.bgdiv {
  min-height: 100vh;
  padding: 2rem 5rem;
}
</style>