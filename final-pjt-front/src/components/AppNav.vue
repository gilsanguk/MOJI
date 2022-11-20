<template>
  <nav class="row sticky-top py-2">
    <div class="d-flex col-6">
      <img src="@/assets/logo.png" alt="logo" width="50" height="50" />
    </div>
    <div class="menu-col col-5">
      <div class="link" @click="goSelectMovie"><h5>마음에 드는 영화가 없다면?</h5></div>
      <div class="link" @click.prevent><h5>내 프로필</h5></div>
      <div class="link" @click="logOut"><h5>로그아웃</h5></div>
      <img src="@/assets/no_profile.png" alt="profile" width="50" height="50">
    </div>
  </nav>
      <!-- <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown button
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div> -->
</template>

<script>
export default {
  name: "AppNav",
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
    goSelectMovie() {
      this.$router.push({ name: "SelectMovieView" });
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
}

.link:hover {
  color: white;
}

.menu-col {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@keyframes tutsFade {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
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