<template>
  <div id="moviedetail">
    {{ movie.title }}
  </div>
</template>

<script>
const API_URL = "http://www.googleapis.com/youtube/v3/search";

export default {
  name: "MovieDetail",
  props: {
    movie: Object,
  },
  data() {
    return {
      videoUrl: "",
    };
  },
  methods: {
    show () {
        this.$modal.show('example')
    },
    hide () {
        this.$modal.hide('my-first-modal');
    },
  },
};
</script>

<style scoped>
#moviedetail {
  width: 100%;
  height: 100%;
  background-color: #141619;
}
</style>