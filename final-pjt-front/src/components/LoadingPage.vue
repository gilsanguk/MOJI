<template>
  <div id="loadingbox">
    <div id="loading"><div class="spinner"></div></div>
    <img
      class="img"
      src="@/assets/logo_film.png"
      alt="loading..."
      width="200"
    />
  </div>
</template>

<script>
export default {
  name: "LoadingPage",
};
</script>

<style>
/* 기본 */
#loadingbox {
  position: absolute;
  z-index: 1000;
  background-color: black;
  height: 100vh;
  width: 100vw;
  text-align: center;
  justify-content: center;
  line-height: 100vh;
}

.img {
  position: relative;
  margin: auto;
  margin-top: 20%;
}

/* 로딩바 */
#loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#loading .spinner {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin-top: -32px;
  margin-left: -32px;
  border-radius: 50%;
  border: 5px solid transparent;
  border-top-color: #a7a7a7;
  animation: spinner 0.8s ease infinite;
}
</style>