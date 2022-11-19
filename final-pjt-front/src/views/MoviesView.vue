<template>
  <div>
    <h1>Movies</h1>
    <div id="recommend">
      <swiper class="swiper" :options="swiperOption3D">
        <swiper-slide
          style="height: 700px"
          v-for="movie in recommendMovies"
          :key="movie.id"
        >
          <div class="imgdiv">
            <MoviesItem :movie="movie" style="width: 400px; height: 600px" />
          </div>
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </swiper>
    </div>

    <div id="liked">
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in likedMovies" :key="movie.id">
          <div class="smallimgdiv">
            <MoviesItem :movie="movie" />
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <div id="recent">
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in recentMovies" :key="movie.id">
          <div class="smallimgdiv">
            <MoviesItem :movie="movie" />
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <div id="random-genre">
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in randomGenreMovies" :key="movie.id">
          <div class="smallimgdiv">
            <MoviesItem :movie="movie" />
          </div>
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
        pagination: ".swiper-pagination",
        effect: "coverflow",
        loop: true,
        grabCursor: true,
        slidesPerView: 5,
        // loopAdditionalSlides: 5,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false,
        // },
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        },
      },
      swiperOption2D: {
        pagination: ".swiper-pagination",
        effect: "slide",
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
      this.$router.push({ name: "LoginView" });
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
#recommend,
#lidked,
#recent,
#random-genre {
  padding: 50px;
}

.imgdiv {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.smallimgdiv {
  margin: 50px;
}

.smallimgdiv:hover {
  transform: scale(1.1);
  transition: 0.5s;
  z-index: 1;
}
</style>