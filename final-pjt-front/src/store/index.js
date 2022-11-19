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
    liked: [],
    recent: [],
    randomGenre: [],
    prefer: [],
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
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user.id = userData.id
      state.user.username = userData.username
      state.user.nickname = userData.nickname
      state.user.profileImage = userData.profileImage
    },
    GET_MOVIES(state, movies) {
      state.recommend = movies.recommend
      state.liked = movies.liked
      state.recent = movies.recent
      state.randomGenre = movies.randomGenre
      state.prefer = movies.prefer
    },
    GET_ALL_MOVIES(state, movies) {
      state.all = movies
    },
    SAVE_TOKEN(state, token) {
      state.token = token
    },
  },
  actions: {
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
        .catch((err) => console.log(err));
    },
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
        .catch(() => 
        alert('아이디 또는 비밀번호가 일치하지 않습니다.')
        );
    },
    logOut({ commit }) {
      commit('SAVE_TOKEN', null)
      router.push({ name: 'LoginView' })
    },
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

    getMovies(context) {
      const axiosrecommend = axios.get(
        `${API_URL}/movies/recommend/${context.state.user.username}/`,
        {headers: { Authorization: `Token ${this.state.token}`}})
      const axiosliked = axios.get(
        `${API_URL}/movies/liked/`,
        {headers: { Authorization: `Token ${this.state.token}`}})
      const axiosrecent = axios.get(
        `${API_URL}/movies/recent/`,
        {headers: { Authorization: `Token ${this.state.token}`}})
      const axiosrandomGenre = axios.get(
        `${API_URL}/movies/random_genre/`,
        {headers: { Authorization: `Token ${this.state.token}`}})

      axios.all([axiosrecommend, axiosliked, axiosrecent, axiosrandomGenre])
        .then(axios.spread((recommend, liked, recent, randomGenre) => {
          const movies = {
            recommend: recommend.data,
            liked: liked.data,
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
  }
})
