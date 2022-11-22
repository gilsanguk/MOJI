<template>
  <div @click="openModal" id="posterdiv">
    <figure class="snip1384">
      <img :src="movie.poster_path" />
      <figcaption id="movie-detail">
        <div id="detail-div">
          <h5 style="word-break: keep-all" class="english text-center">{{ movie.title }}</h5>
          <!-- 좋아요 -->
          <i
            class="heart far fa-heart fa-4x"
          >
            <span>{{ likeUsers }}</span>
          </i>
          <!-- 평점 -->
          <div class="star-ratings">
            <div
              class="star-ratings-fill space-x-2 text-lg"
              :style="{ width: ratingToPercent(movie) + '%' }"
            >
              <span>★</span><span>★</span><span>★</span><span>★</span
              ><span>★</span>
            </div>
            <div class="star-ratings-base space-x-2 text-lg">
              <span>★</span><span>★</span><span>★</span><span>★</span
              ><span>★</span>
            </div>
          </div>
          <span id="detail-footer"
            >영화 정보 더보기 <i class="bi bi-arrow-right"></i
          ></span>
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<script>

export default {
  name: "MoviesItem",
  props: {
    movie: Object,
  },
  methods: {
    openModal() {
      this.$emit("open-modal", this.movie.id);
    },
    stopAutoPlay() {
      this.$emit("stop-auto-play");
    },
    playAutoPlay() {
      this.$emit("play-auto-play");
    },
    ratingToPercent(movie) {
      const score = +movie.vote_average * 10;
      return score;
    },
  },
  computed: {
    likeUsers() {
      return this.movie.like_users.length;
    },
  },
};
</script>

<style scoped>
#posterdiv {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

img {
  width: 100%;
  height: 100%;
}

.heart{
  position: relative;
}
.heart > span {
  position: absolute;
  width: 100%;
  z-index: 1;
  left: 0px;
  top: 0px;
  width: 5em;
  line-height: 5em;
  font-size: 0.2em;
  color: white;
  display: block;
  text-align: center;
  white-space: nowrap;
}

.star-ratings {
  color: #aaa9a9;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: gold;
}

.star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}

.star-ratings-base {
  z-index: 0;
  padding: 0;
}

#detail-div {
  display: none;
}

#detail-footer {
  color: #aaa9a9;
}

#movie-detail:hover #detail-div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}

figure.snip1384 {
  font-family: "Raleway", Arial, sans-serif;
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 230px;
  max-width: 315px;
  width: 100%;
  color: #ffffff;
  text-align: left;
  font-size: 16px;
  background-color: #000000;
}
figure.snip1384 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
figure.snip1384 img {
  max-width: 100%;
  backface-visibility: hidden;
  vertical-align: top;
}
figure.snip1384:after,
figure.snip1384 figcaption {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
figure.snip1384:after {
  content: "";
  background-color: rgba(0, 0, 0, 0.65);
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
  opacity: 0;
}
figure.snip1384 figcaption {
  z-index: 1;
  padding: 40px;
}
figure.snip1384 h3,
figure.snip1384 .links {
  width: 100%;
  margin: 5px 0;
  padding: 0;
}
figure.snip1384 h3 {
  line-height: 1.1em;
  font-weight: 700;
  font-size: 1.4em;
  text-transform: uppercase;
  opacity: 0;
}
figure.snip1384 p {
  font-size: 0.8em;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0;
  top: 50%;
  -webkit-transform: translateY(40px);
  transform: translateY(40px);
}
#detail-footer {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 20px 25px;
  opacity: 0;
  -webkit-transform: translateX(-10px);
  transform: translateX(-10px);
  color: #aaa9a9;
}

figure.snip1384 a {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

figure.snip1384:hover img,
figure.snip1384.hover img {
  zoom: 1;
  filter: alpha(opacity=50);
  -webkit-opacity: 0.5;
  opacity: 0.5;
}

figure.snip1384:hover:after,
figure.snip1384.hover:after {
  opacity: 1;
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
figure.snip1384:hover h3,
figure.snip1384.hover h3,
figure.snip1384:hover p,
figure.snip1384.hover p,
figure.snip1384:hover #detail-footer {
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  opacity: 1;
}
</style>