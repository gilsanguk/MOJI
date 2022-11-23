<template>
  <div id="loading">
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
  name: "LoadingPage"
};
</script>

<style>
#loading {
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
</style>