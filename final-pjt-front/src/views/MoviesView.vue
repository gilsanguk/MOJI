<template>
  <div>
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
    <modal name="movie-detail"></modal>
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
        effect: "slide",
        grabCursor: true,
        loop: true,
        initialSlide: 5,
        spaceBetween: 50,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1400: {
            slidesPerView: 5,
            slidesPerGroup: 4,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,  
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,  
          },
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,  
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
#recent,
#random-genre,
#recommend {
  padding: 3.3% 0;
}

#recommend .swiper-slide-active {
  transform: scale(1.2) !important;
  transition: 0.5s !important;
}

.swiper {
  padding: 3.3% 3.5% 3.3% 2%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
}

.vm--modal {
  border-radius: 10px !important;
  overflow-y: scroll !important;
}

.vm--modal::-webkit-scrollbar {
  display: none;
}

.swiper-button-prev,
.swiper-button-next {
  color: #404040;
}
</style>