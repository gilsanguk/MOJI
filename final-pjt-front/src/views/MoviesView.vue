<template>
  <div>
    <h1>Movies</h1>
    <h2>Hello {{isModalAct}}</h2>
    <h2>2 : {{detailmovie}}</h2>
    <div id="recommend">
      <swiper class="swiper" :options="swiperOption3D">
        <swiper-slide
          style="height: 700px"
          v-for="movie in recommend"
          :key="movie.id"
        >
          <div class="imgdiv">
            <MoviesItem :movie="movie" style="width: 400px; height: 600px" @open-modal="openModal"/>
          </div>
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </swiper>
    </div>

    <div id="liked">
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in liked" :key="movie.id">
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
        <swiper-slide v-for="movie in recent" :key="movie.id">
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
        <swiper-slide v-for="movie in randomGenre" :key="movie.id">
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
        slidesPerView: 7,
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
          }
        }
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
    openModal(movie) {
      this.isModalAct = true;
      this.detailmovie = movie;
      console.log(this.detailmovie);
    },
  },
  computed: {
    ...mapGetters(["recommend", "liked", "recent", "randomGenre"]),
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