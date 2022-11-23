<template>
  <div>
    <div id="recommend">
      <h2 class="pb-4">당신을 위한 추천 영화</h2>
      <swiper class="swiper swiper3D" :options="swiperOption3D" ref="swiper3D">
        <swiper-slide v-for="movie in recommend" :key="movie.id">
          <MoviesMainItem
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
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { mapGetters } from "vuex";
import axios from "axios";

import MoviesMainItem from "@/components/MoviesMainItem";
import MoviesItem from "@/components/MoviesItem";
import MovieDetail from "@/components/MovieDetail";

const API_URL = "http://127.0.0.1:8000/moji";

export default {
  name: "MoviesView",
  data() {
    return {
      // 3D swiper
      swiperOption3D: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
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
          1600: {
            slidesPerView: 4,
            initialSlide: 4,
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            },
          },
          1024: {
            slidesPerView: 3,
            initialSlide: 3,
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            },
          },
          768: {
            slidesPerView: 1,
            initialSlide: 1,
          },
        },
      },
      // 2D swiper
      swiperOption2D: {
        effect: "slide",
        grabCursor: true,
        loop: true,
        spaceBetween: 50,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1400: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            initialSlide: 5,
          },
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            initialSlide: 4,
          },
          850: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            initialSlide: 3,
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            initialSlide: 2,
          },
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            initialSlide: 1,
          },
        },
      },
    };
  },
  components: {
    MoviesMainItem,
    MoviesItem,
    Swiper,
    SwiperSlide,
  },
  methods: {
    // 스와이프 자동 재생 중지
    stopAutoPlay() {
      this.$refs.swiper3D.$swiper.autoplay.stop();
    },
    playAutoPlay() {
      this.$refs.swiper3D.$swiper.autoplay.start();
    },
    // 모달창 열기
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
  created() {
    this.$modal.hideAll();
    this.$store.dispatch("getMovies");
  },
  mounted() {
    console.log(this.$store.getters.prefer.length);
    if (this.$store.getters.prefer.length === 0) {
      this.$router.push({ name: "SelectMovieView" });
    }
  },
};
</script>

<style>
/* 기본 */
#recent,
#random-genre,
#recommend {
  padding: 3.3% 0;
}

/* 스와이퍼 */
#recommend .swiper-slide-active {
  transform: scale(1.2) !important;
  transition: 0.5s !important;
}

.swiper {
  padding: 3.3%;
}

@media screen and (max-width: 768px) {
  .swiper3D {
    padding: 7% 3.3%;
  }
}

.swiper-slide {
  display: flex;
  justify-content: center;
}

.swiper-button-prev,
.swiper-button-next {
  color: #a7a7a7;
}

/* 모달 */
.vm--modal {
  border-radius: 10px !important;
  overflow-y: scroll !important;
  background-color: #292929 !important;
}

.vm--modal::-webkit-scrollbar {
  display: none;
}

</style>