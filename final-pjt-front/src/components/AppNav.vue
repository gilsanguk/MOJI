<template>
  <nav class="row sticky-top py-2">
    <div class="d-flex col-6">
      <img src="@/assets/logo.png" alt="logo" width="50" height="50" />
    </div>
    <div class="menu-expand col-6">
       <router-link :to="{ name: 'MoviesView'}" class="link">홈</router-link>
      <router-link :to="{ name: 'SelectMovieView'}" class="link">마음에 드는 영화가 없다면?</router-link>
      <router-link :to="{ name: 'SelectMovieView'}" class="link">내 프로필</router-link>
       <a @click.prevent="logOut" class="link">로그아웃</a>
      <img src="@/assets/no_profile.png" alt="profile" width="50" height="50">
    </div>

    <div class="menu-dropdown col-6">
      <button class="dropdown-btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        메뉴
      </button>
      <ul class="dropdown-menu py-0 px-3" aria-labelledby="dropdownMenuButton1">
        <li class="menu"><router-link :to="{ name: 'MoviesView'}" class="link">홈</router-link></li>
        <li class="menu"><router-link :to="{ name: 'SelectMovieView'}" class="link">마음에 드는 영화가 없다면?</router-link></li>
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
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style>
nav {
  display: flex;
  justify-content: space-between;
  background-color: #141619;
}

.link {
  border-radius: 10px;
  font-size: large;
  outline-style: none;
  cursor: pointer;
  color: #a5a5a5;
  text-decoration-line: none;
}

.link:hover {
  color: white;
}

.menu-expand {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-dropdown {
  display: none;
}

@media screen and (max-width: 768px) {
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
  background-color: #141619;
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