<template>
  <nav class="row sticky-top py-2 px-1">
    <!-- 로고 -->
    <div class="d-flex col-8 col-lg-6 col-xxl-8">
      <img
        src="@/assets/logo.png"
        alt="logo"
        class="me-5"
        height="50"
        @click="goHome"
      />
      <autocomplete
        :search="search"
        placeholder="Search for a movie"
        aria-label="Search for a movie"
        :get-result-value="getResultValue"
      >
        <template #result="{ result, props }">
          <li class="result-li" v-bind="props" @click="goDetail(result.id)">
            <div class="result">
              <span class="result-title text-truncate">{{ result.title }}</span>
            </div>
          </li>
        </template>
      </autocomplete>
    </div>

    <!-- 넓은 화면 -->
    <div class="menu-expand col-6 col-xxl-4">
      <router-link :to="{ name: 'MoviesView' }" class="link">홈</router-link>
      <div @mouseover="changeMent" @mouseleave="resetMent" class="ment">
        <router-link
          :to="{ name: 'SelectMovieView' }"
          class="link"
          v-if="!isOvered"
          >보고싶은 영화가 없다면??</router-link
        >
        <router-link :to="{ name: 'SelectMovieView' }" class="link" v-else
          >다른 영화 추천받으러 가기</router-link
        >
      </div>
      <router-link :to="{ name: 'SelectMovieView' }" class="link"
        >내 프로필</router-link
      >
      <a @click.prevent="logOut" class="link">로그아웃</a>
      <img src="@/assets/no_profile.png" alt="profile" width="50" height="50" />
    </div>

    <!-- 좁은 화면 -->
    <div class="menu-dropdown col-4">
      <button
        class="dropdown-btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        메뉴
      </button>
      <ul class="dropdown-menu py-0 px-3" aria-labelledby="dropdownMenuButton1">
        <li class="menu">
          <router-link :to="{ name: 'MoviesView' }" class="link"
            >홈</router-link
          >
        </li>
        <li class="menu">
          <router-link :to="{ name: 'SelectMovieView' }" class="link"
            >마음에 드는 영화가 없다면?</router-link
          >
        </li>
        <li class="menu">
          <router-link :to="{ name: 'SelectMovieView' }" class="link"
            >내 프로필</router-link
          >
        </li>
        <li
          class="d-flex justify-content-center align-items-center"
          style="padding: 10px"
        >
          <a @click.prevent="logOut" class="link">로그아웃</a>
        </li>
      </ul>
      <img src="@/assets/no_profile.png" alt="profile" width="50" height="50" />
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import MovieDetail from "@/components/MovieDetail.vue";

const API_URL = "http://127.0.0.1:8000/moji";
export default {
  name: "AppNav",
  data() {
    return {
      isOvered: false,
    };
  },
  components: {
    Autocomplete,
  },
  methods: {
    // 검색
    search(input) {
      if (input.length < 1) {
        return [];
      }
      return this.$store.getters.all.filter((movie) => {
        return (
          movie.title.toLowerCase().startsWith(input.toLowerCase()) ||
          movie.title.toLowerCase().includes(input.toLowerCase())
        );
      });
    },
    getResultValue() {
      return "";
    },
    // 검색 결과 클릭 시 상세 페이지로 이동
    goDetail(movieId) {
      axios
        .get(`${API_URL}/movies/${movieId}/`, {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        })
        .then((res) => {
          this.$modal.show(
            MovieDetail,
            { movie: res.data },
            {
              height: "80%",
              width: "60%",
              adaptive: true,
              shiftY: 0.5,
            }
          );
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
    // 클릭
    logOut() {
      this.$store.dispatch("logOut");
    },
    goHome() {
      this.$router.push({
        name: "MoviesView",
      });
    },
    // 마우스 올렸을 때
    changeMent() {
      this.isOvered = true;
    },
    resetMent() {
      this.isOvered = false;
    },
  },
  created() {
    this.$store.dispatch("getAllMovies");
  },
};
</script>

<style>
/* 기본 */
nav {
  display: flex;
  justify-content: space-between;
  background-color: black;
  opacity: 0.8;
  margin: 0 !important;
}

img {
  cursor: pointer;
  -webkit-user-drag: none;
}

.menu {
  border-bottom: 1px solid #404040;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown-menu {
  background-color: rgb(0, 0, 0);
}

.dropdown-btn {
  background-color: black;
  opacity: 0.8;
  border: none;
  color: white;
  cursor: pointer;
  font-size: large;
  outline-style: none;
}

/* 라우터 링크 */
.link {
  border-radius: 10px;
  font-size: large;
  outline-style: none;
  cursor: pointer;
  color: #a7a7a7;
  text-decoration-line: none;
}

.link:hover {
  color: white;
  transition: 0.4s;
}

/* 넓은 화면 */
.menu-expand {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-dropdown {
  display: none;
}

/* 좁은 화면 */
@media screen and (max-width: 992px) {
  .menu-expand {
    display: none;
  }
  .menu-dropdown {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

/* 검색창 */
.autocomplete {
  width: 30vw;
}

.autocomplete-input {
  padding: 10px 60px !important;
}

/* 검색목록 */
.result {
  display: flex;
  align-items: center;
  color: black;
}

.result-title {
  font-size: 1rem;
}
</style>