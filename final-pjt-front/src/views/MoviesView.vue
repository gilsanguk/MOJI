<template>
  <div>
    <div id="recommend">
      <h1>Movies</h1>
      <swiper class="swiper" :options="swiperOption3D">
        <swiper-slide v-for="movie in recommendMovies" :key="movie.id">
          <MoviesItem :movie="movie" />
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </swiper>
    </div>

    <div id="liked">
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in likedMovies" :key="movie.id">
          <MoviesItem :movie="movie" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <div id="recent">
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in recentMovies" :key="movie.id">
          <MoviesItem :movie="movie" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <div id="random-genre">
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in randomGenreMovies" :key="movie.id">
          <MoviesItem :movie="movie" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import MoviesItem from "@/components/MoviesItem";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "MoviesView",
  data() {
    return {
      swiperOption3D: {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 5,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 20,
          stretch: 50,
          depth: 100,
          modifier: 1,
          slideShadows : true
        },
      },
      swiperOption2D: {
        pagination: '.swiper-pagination',
        effect: 'slide',
        grabCursor: true,
        loop: true,
        slidesPerView: 5,
        slidesPerGroup: 5,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
    
  },
  components: {
    MoviesItem,
    Swiper,
    SwiperSlide,
  },
  methods: {
    getMovies() {
      this.$store.dispatch("getMovies");
    },
  },
  created() {
    if (!this.$store.getters.isLogin) {
      this.$router.push({ name: "LoginView" })
    } else {
      this.getMovies();
    }
  },
  computed: {
    recommendMovies() {
      return this.$store.state.recommendMovies;
    },
    likedMovies() {
      return this.$store.state.likedMovies;
    },
    recentMovies() {
      return this.$store.state.recentMovies;
    },
    randomGenreMovies() {
      return this.$store.state.randomGenreMovies;
    },
  },  
};
</script>

<style>
</style>