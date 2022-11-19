<template>
  <div>
    <h1>Movies</h1>
    <h2>Hello {{ isModalAct }}</h2>
    <h2>2 : {{ detailmovie }}</h2>
    <div id="recommend">
      <swiper class="swiper" :options="swiperOption3D">
        <swiper-slide
          v-for="movie in recommend"
          :key="movie.id"
          @mouseover="stopAutoPlay"
        >
          <MoviesItem class="imgdiv" :movie="movie" @open-modal="openModal" />
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
  </div>
</template>

<script>
import MoviesItem from "@/components/MoviesItem";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { mapGetters } from "vuex";

export default {
  name: "MoviesView",
  data() {
    return {
      isModalAct: false,
      detailmovie: {},

      swiperOption3D: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        initialSlide: 5,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
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
    openModal(movie) {
      this.isModalAct = true;
      this.detailmovie = movie;
      console.log(this.detailmovie);
    },
    stopAutoPlay() {
      console.log('!!');
      // this.$refs.swiper3D.swiper.autoplay.stop();
    },
  },
  computed: {
    ...mapGetters(["recommend", "liked", "recent", "randomGenre"]),
  },
};
</script>

<style>
#recommend,
#recent,
#random-genre {
  padding: 50px;
}

#recommend .swiper-slide-active:hover {
  transform: scale(1.1) !important;
  transition: 0.5s !important;
}

#recommend .swiper-slide {
  padding: 5%;
}

@media screen and (min-width: 320px) {
  #recommend img {
    height: 150%;
    width: 150%;
  }
}

@media screen and (min-width: 640px) {
  #recommend img {
    height: 170%;
    width: 170%;
  }
}

@media screen and (min-width: 768px) {
  #recommend img {
    height: 250%;
    width: 250%;
  }
}

@media screen and (min-width: 1024px) {
  #recommend img {
    height: 300%;
    width: 300%;
  }
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
</style>