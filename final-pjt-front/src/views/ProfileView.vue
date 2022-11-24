<template>
  <div class="bgdiv">
    <h1>{{ user.nickname }}님의 프로필</h1>
    <div class="profile">
      <label for="file-input" class="profile">
        <img
          v-if="user.profile_image"
          :src="user.profile_image"
          alt=""
          height="200"
        />
        <img
          v-else
          src="@/assets/no_profile.png"
          alt=""
          height="200"
        />
        <img
          src="@/assets/profile_image_plus.png"
          alt=""
          height="50"
          class="profile-plus"
        />
      </label>
      <input id="file-input" @change="uploadImg" type="file" accept="image/*" class="d-none"/>
      <h5 class="my-4">ID : {{ user.username }}</h5>
      <button class="send-btn" @click.prevent="updateProfile">
        수정하기
      </button>
      <button class="delete-btn" @click.prevent="deleteUser">
        회원탈퇴
      </button>
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
          this.user.profile_image = 'http://127.0.0.1:8000' + this.user.profile_image;
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
      console.log(this.image);
      const url = URL.createObjectURL(this.image);
      console.log(url);
      this.user.profile_image = url;
    },
    updateProfile() {
      const data = new FormData();
      data.append("profile_image", this.image);
      axios
        .patch(
          `${API_URL}/accounts/profile/${this.$route.params.nickname}/update/`,
          data,
          {
            headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          }
        )
        .then(() => {
          this.$store.dispatch("setUserData", this.user.nickname);
          this.$router.push({ name: "MoviesView" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteUser() {
      this.$store.dispatch("deleteUser");
      this.$router.push({ name: "MoviesView" });
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  width: 40%;
  margin-bottom: 3rem;
  border-radius: 10px;
  padding: 2%;
  background-color: #343434;
}

.profile img {
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.7;
}

.profile-plus {
  position: absolute;
}
</style>