<template>
  <div>
    <img
      :src="movie.poster_path"
      @click="openModal"
      @mouseover="stopAutoPlay"
      @mouseleave="playAutoPlay"
    />
  </div>
</template>

<script>
export default {
  name: "MoviesItem",
  props: {
    movie: Object,
  },
  methods: {
    openModal() {
      this.$emit("open-modal", this.movie.id);
    },
    stopAutoPlay() {
      this.$emit("stop-auto-play");
    },
    playAutoPlay() {
      this.$emit("play-auto-play");
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>