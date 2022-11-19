<template>
  <div>
    <img
      :src="movie.poster_path"
      @click.prevent="openModal"
      @mouseover="stopAutoPlay"
      @mouseleave="playAutoPlay"
    />
  </div>
</template>

<script>
import axios from "axios";
import MovieDetail from "@/components/MovieDetail";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "MoviesItem",
  props: {
    movie: Object,
  },
  methods: {
    openModal() {
      axios.get(
          `${API_URL}/movies/detail/${this.movie.id}/`, {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        })
        .then((res) => {
          console.log(res.data);
          this.$modal.show(MovieDetail, { movie: res.data }, {
            height: "auto",
            width: "60%",
            adaptive: true,
            scrollable: true,
            styles: {
              'backgroundColor': "#141619",
              'color': "white",
              'border-radius': "30px",
              'margin-top': "10%",
            },
          });
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push({ name: 'LoginView' })
          } else if (err.response.status === 404) {
            this.$router.push({ name: 'NotFound404' })
          } else {
            console.log(err)
          }
        });
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