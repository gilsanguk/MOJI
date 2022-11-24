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
      <h5 class="mb-4">ID : {{ user.username }}</h5>
      <div class="button row">
        <button @click.prevent="updateProfile" class="col-6 left-btn py-3">
          수정하기
        </button>
        <button @click.prevent="deleteUser" class="col-6 py-3">
          회원탈퇴
        </button>
      </div>
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
        `${API_URL}/accounts/profile/${this.$route.params.username}/`, {
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
      const url = URL.createObjectURL(this.image);
      this.user.profile_image = url;
    },
    updateProfile() {
      const data = new FormData();
      data.append("profile_image", this.image);
      axios
        .patch(
          `${API_URL}/accounts/profile/${this.$route.params.username}/update/`,
          data,
          {
            headers: { Authorization: `Token ${this.$store.getters.getToken}` },
          }
        )
        .then(() => {
          this.$store.dispatch("setUserData", this.user.username);
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
  margin: 30px 0;
  width: 450px;
  border-radius: 10px;
  padding: 2% 2% 0%;
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

.button {
  border-top: 1px solid #404040;
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.left-btn {
  border-right: 1px solid #404040;
}
</style>