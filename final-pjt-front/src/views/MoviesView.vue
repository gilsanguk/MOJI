<template>
  <div>
    <h1>Movies</h1>
    <div id="recommend">
      <h2>당신을 위한 추천 영화</h2>
      <swiper class="swiper" :options="swiperOption3D" ref="swiper3D">
        <swiper-slide v-for="movie in recommend" :key="movie.id">
            <MoviesItem
              class="imgdiv"
              :movie="movie"
              @open-modal="openModal"
              @stop-auto-play="stopAutoPlay"
              @play-auto-play="playAutoPlay"
            />
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </swiper>
    </div>

    <div id="recent">
      <h2>최근 개봉 영화</h2>
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in recent" :key="movie.id">
            <MoviesItem :movie="movie" @open-modal="openModal" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <div id="random-genre">
      <h2>{{ randomGenre[1] }} 영화는 어때요?</h2>
      <swiper class="swiper" :options="swiperOption2D">
        <swiper-slide v-for="movie in randomGenre[0]" :key="movie.id">
            <MoviesItem :movie="movie" @open-modal="openModal" />
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
import axios from "axios";

import MovieDetail from "@/components/MovieDetail";
import MoviesItem from "@/components/MoviesItem";

const API_URL = "http://127.0.0.1:8000/moji";

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
          slideShadows: false,
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
        slidesPerGroup: 5,
        initialSlide: 5,
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
  created() {
    if (!this.$store.getters.isLogin) {
      this.$router.push({ name: "LoginView" });
    } else {
      this.$store.dispatch("getAllMovies");
      this.$store.dispatch("getMovies");
    }
  },
  methods: {
    stopAutoPlay() {
      this.$refs.swiper3D.$swiper.autoplay.stop();
    },
    playAutoPlay() {
      this.$refs.swiper3D.$swiper.autoplay.start();
    },
    openModal(movieId) {
      axios
        .get(`${API_URL}/movies/${movieId}/`, {
          headers: { Authorization: `Token ${this.$store.getters.getToken}` },
        })
        .then((res) => {
          this.$modal.show(
            MovieDetail,
            { movie: res.data },
            {
              height: "80%",
              width: "60%",
              adaptive: true,
              scrollable: true,
              shiftY: 0.5,
            }
          );
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push({ name: "LoginView" });
          } else if (err.response.status === 404) {
            this.$router.push({ name: "NotFound404" });
          } else {
            console.log(err);
          }
        });
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
/* 
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
} */

/* #swiperslide:hover { 
  transform: scale(1.1);
  transition: 0.5s;
  z-index: 1;
  opacity: 0.3;
} */
/* 
#titlediv {
  position: absolute;
  color: white;
  font-size: 250%;
  padding: 3%;
  opacity: 0;
  width: 100%;
}

.swiper-slide:hover #titlediv {
  display: inline-block;
  opacity: 1;
  z-index: 2;
} */


.vm--modal {
  border-radius: 10px !important;
  overflow-y: scroll !important;
}

.vm--modal::-webkit-scrollbar {
  display: none;
}
</style>