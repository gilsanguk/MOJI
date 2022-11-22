import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls"
import VModal from 'vue-js-modal'

Vue.use(Vuex)
Vue.use(VModal)

const ls = new SecureLS({ isCompression: false })

const API_URL = 'http://127.0.0.1:8000/moji'

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['token', 'user'],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ],
  state: {
    all: [],
    recommend: [],
    recent: [],
    randomGenre: [],
    token: null,
    user: {
      id: '',
      username: '',
      nickname: '',
      profileImage: null,
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    getToken(state) {
      return state.token
    },
    all(state) {
      return state.all
    },
    recommend(state) {
      return state.recommend
    },
    liked(state) {
      return state.liked
    },
    recent(state) {
      return state.recent
    },
    randomGenre(state) {
      return state.randomGenre
    },
    prefer(state) {
      return state.prefer
    },
  },
  mutations: {
    // 토큰 저장
    SAVE_TOKEN(state, token) {
      state.token = token
    },
    // 유저 정보
    SET_USER_DATA(state, userData) {
      state.user.id = userData.id
      state.user.username = userData.username
      state.user.nickname = userData.nickname
      state.user.profileImage = userData.profileImage
    },
    // 영화 정보
    GET_MOVIES(state, movies) {
      state.recommend = movies.recommend
      state.recent = movies.recent
      state.randomGenre = movies.randomGenre
      state.prefer = movies.prefer
    },
    // 모든 영화
    GET_ALL_MOVIES(state, movies) {
      state.all = movies
    },
  },
  actions: {
    // 회원가입
    signUp(context, user) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: user.username,
          password1: user.password1,
          password2: user.password2,
          nickname: user.nickname,
        }
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .then(() => {
          context.dispatch('setUserData', user.username)
        })
        .then(() => {
          router.push({ name: 'MoviesView' })
        })
        .catch((err) => console.log(err.response))
    },
    // 로그인
    logIn(context, user) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: user.username,
          password: user.password,
        }
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .then(() => {
          context.dispatch('setUserData', user.username)
        })
        .then(() => {
          router.push({ name: 'MoviesView' })
        })
        .catch((err) => 
        console.log(err.response.data)
        );
    },
    // 로그아웃
    logOut({ commit }) {
      commit('SAVE_TOKEN', null)
      router.push({ name: 'LoginView' })
    },
    // 유저 정보
    setUserData({ commit }, username) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/profile/${username}/`,
        headers: {
          Authorization: `Token ${this.state.token}`
        }
      })
        .then((res) => {
          commit('SET_USER_DATA', res.data)
        })
        .catch((err) => console.log(err));
    },
    // 영화 정보
    getMovies(context) {
      const axiosrecommend = axios.get(
        `${API_URL}/movies/recommend/`,
        {headers: { Authorization: `Token ${this.state.token}`}})
      const axiosrecent = axios.get(
        `${API_URL}/movies/recent/`,
        {headers: { Authorization: `Token ${this.state.token}`}})
      const axiosrandomGenre = axios.get(
        `${API_URL}/movies/random_genre/`,
        {headers: { Authorization: `Token ${this.state.token}`}})

      axios.all([axiosrecommend, axiosrecent, axiosrandomGenre])
        .then(axios.spread((recommend, recent, randomGenre) => {
          if (recommend.data.length === 0) {
            router.push({ name: 'SelectMovieView'})
          }
          const movies = {
            recommend: recommend.data,
            recent: recent.data,
            randomGenre: randomGenre.data,
          }
          context.commit('GET_MOVIES', movies)
        }))
        .catch(err => {
          if (err.response.status === 401) {
            router.push({ name: 'LoginView' })
          } else if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          } else {
            console.log(err)
          }
        });
    },
    // 모든 영화
    getAllMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,
        headers: {
          Authorization: `Token ${this.state.token}`
        }
      })
        .then((res) => {
          context.commit('GET_ALL_MOVIES', res.data)
        })
        .catch(err => {
          if (err.response.status === 401) {
            router.push({ name: 'LoginView' })
          } else if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          } else {
            console.log(err)
          }
        });
    },
    // 선호 영화
    resetPrefer(context, movies) {
      axios({
        method: 'POST',
        url: `${API_URL}/movies/reset/`,
        headers: {
          Authorization: `Token ${this.state.token}`
        },
        data: {
          movies: movies
        }
      })
        .then(() => {
          context.dispatch('getMovies')
        })
        .catch(err => {
          if (err.response.status === 401) {
            router.push({ name: 'LoginView' })
          } else if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          } else {
            console.log(err)
          }
        });
    },
  },
  modules: {
  },
})
