<template>
  <nav class="row sticky-top py-2 px-1">
    <div class="d-flex col-8 col-lg-6 col-xxl-8">
      <img src="@/assets/logo.png" alt="logo" height="50" @click="goHome" />
    </div>
    <div class="menu-expand col-6 col-xxl-4">
      <router-link :to="{ name: 'MoviesView'}" class="link">홈</router-link>
      <div @mouseover="changeMent" @mouseleave="resetMent" class="ment">
        <router-link :to="{ name: 'SelectMovieView'}" class="link" v-if="!isOvered">보고싶은 영화가 없다면??</router-link>
        <router-link :to="{ name: 'SelectMovieView'}" class="link" v-else>다른 영화 추천받으러 가기</router-link>
      </div>
      <router-link :to="{ name: 'SelectMovieView'}" class="link">내 프로필</router-link>
       <a @click.prevent="logOut" class="link">로그아웃</a>
      <img src="@/assets/no_profile.png" alt="profile" width="50" height="50">
    </div>

    <div class="menu-dropdown col-4">
      <button class="dropdown-btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        메뉴
      </button>
      <ul class="dropdown-menu py-0 px-3" aria-labelledby="dropdownMenuButton1">
        <li class="menu"><router-link :to="{ name: 'MoviesView'}" class="link">홈</router-link></li>
        <li class="menu"><router-link :to="{ name: 'SelectMovieView'}" class="link" >마음에 드는 영화가 없다면?</router-link></li>
        <li class="menu"><router-link :to="{ name: 'SelectMovieView'}" class="link">내 프로필</router-link></li>
        <li class="d-flex justify-content-center align-items-center" style="padding: 10px;"><a @click.prevent="logOut" class="link">로그아웃</a></li>
      </ul>
      <img src="@/assets/no_profile.png" alt="profile" width="50" height="50">
    </div>
  </nav>
      
</template>

<script>
export default {
  name: "AppNav",
  data() {
    return {
      isOvered: false,
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
    goHome() {
      this.$router.push({
        name: "MoviesView",
      });
    },
    changeMent() {
      this.isOvered = true;
    },
    resetMent() {
      this.isOvered = false;
    },
  },
};
</script>

<style>
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

.menu-expand {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-dropdown {
  display: none;
}

@media screen and (max-width: 992px) {
  .menu-expand {
    display: none;
  }
  .menu-dropdown{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

.menu {
  border-bottom: 1px solid #404040;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown-menu {
  background-color: black;
  opacity: 0.8;
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

/* @keyframes tutsFade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
} */
</style>