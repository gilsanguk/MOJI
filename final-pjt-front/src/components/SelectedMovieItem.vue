<template>
  <div>
    <div id="container">
      <div id="selecteddiv"> 
        <img :src="movie.poster_path" />
        <span>{{ movie.title }}</span>
      </div>
      <button @click="deleteMovie">x</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectedMovieItem",
  props: {
    movie: Object,
  },
  methods: {
    deleteMovie() {
      this.$emit("delete-movie", this.movie);
    },
  },
};
</script>

<style scoped>
#container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 30px;
  background-color: gray;
}

#selecteddiv {
  display: flex;
  align-items: center;
}

img {
  width: 15%;
  height: 15%;
  border-radius: 10px;
}
span {
  margin-left: 2rem;
  margin-right: 2rem;
  font-size: 200%;
}

button {
   border-radius: 5px;
   height: 50%;
   font-size: 200%;
   color: whitesmoke;
   display: flex;
   align-items:center;
   justify-content: center;
   transition-duration: 0.7s;
   background-color: rgba(140, 154, 168, 0.537);
   border: 0.5px solid black;
}

button:hover {
  background: #ff8223; 
  color: white;
}

</style>