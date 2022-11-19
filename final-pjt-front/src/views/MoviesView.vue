<template>
  <div>
    <h1>Movies</h1>
    <div id="recommend">
      <swiper class="swiper" :options="swiperOption3D" ref="swiper3D">
        <swiper-slide v-for="movie in recommend" :key="movie.id">
          <MoviesItem
            class="imgdiv"
            :movie="movie"
            @stop-auto-play="stopAutoPlay"
            @play-auto-play="playAutoPlay"
          />
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </swiper>
    </div>

    <div id="recent">
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in recent" :key="movie.id">
          <MoviesItem :movie="movie" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <div id="random-genre">
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in randomGenre" :key="movie.id">
          <MoviesItem :movie="movie" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <modal name="movie-detail"> </modal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { mapGetters } from "vuex";

import MoviesItem from "@/components/MoviesItem";

export default {
  name: "MoviesView",
  data() {
    return {
      swiperOption3D: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 1,
        initialSlide: 3,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
          },
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
        breakpoints: {
          1024: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
          },
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
    stopAutoPlay() {
      this.$refs.swiper3D.$swiper.autoplay.stop();
    },
    playAutoPlay() {
      this.$refs.swiper3D.$swiper.autoplay.start();
    },
  },
  computed: {
    ...mapGetters(["recommend", "liked", "recent", "randomGenre"]),
    swiper() {
      return this.$refs.swiper3D.$swiper;
    },
  },
};
</script>

<style>
#recommend,
#recent,
#random-genre {
  padding: 50px;
}

#recommend .swiper-slide-active {
  transform: scale(1.2) !important;
  transition: 0.5s !important;
}

#recommend .swiper-slide {
  padding: 5%;
}

.imgdiv {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

.swiper-slide {
  display: flex;
  align-items: center;
  padding: 2%;
}

.swiper-slide:hover {
  transform: scale(1.1);
  transition: 0.5s;
  z-index: 1;
}

#moviedetail {
  width: 100%;
  height: 100%;
  background-color: #141619;
}
</style>