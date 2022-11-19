	
오후 6:29
<template>
  <div>
    <img :src="movie.poster_path" @click.prevent="openModal">
    <ModalView/>
  </div>
</template>

<script>
import ModalView from "@/components/ModalView";

export default {
  name: 'MoviesItem',
  props: {
    movie: Object,
  },
  components: {
    ModalView
  },
  methods : {
    openModal(){
      this.$emit('open-modal', this.movie);
    },
  },
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>