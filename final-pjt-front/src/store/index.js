import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls"

Vue.use(Vuex)
  
const ls = new SecureLS({ isCompression: false })

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['token'],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ],
  state: {
    recommendMovies: [],
    likedMovies: [],
    recentMovies: [],
    randomGenreMovies: [],
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.recommendMovies = movies.recommend
      state.likedMovies = movies.liked
      state.recentMovies = movies.recent
      state.randomGenreMovies = movies.random_genre
    },
    SAVE_TOKEN(state, token) {
      state.token = token
    },
  },
  actions: {
    signUp({ commit }, user) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: user.username,
          password1: user.password1,
          password2: user.password2,
        }
      })
        .then((res) => {
          commit('SAVE_TOKEN', res.data.key)
          router.push({ name: 'MoviesView' })
        })
        .catch((err) => console.log(err));
    },
    logIn({ commit }, user) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: user.username,
          password: user.password,
        }
      })
        .then((res) => {
          commit('SAVE_TOKEN', res.data.key)
          router.push({ name: 'MoviesView' })
        })
        .catch((err) => console.log(err));
    },
    logOut({ commit }) {
      commit('SAVE_TOKEN', null)
      router.push({ name: 'LogInView' })
    },
      
    getMovies(context) {
      axios.all([
        axios.get(`${API_URL}/movies/recommend/`),
        axios.get(`${API_URL}/movies/liked/`),
        axios.get(`${API_URL}/movies/recent/`),
        axios.get(`${API_URL}/movies/random_genre/`),
      ],
      {
        headers: {
          Authorization: `Token ${this.state.token}`
        }
      })
        .then(axios.spread((recommend, liked, recent, random_genre) => {
          context.commit('GET_MOVIES', {
            recommend: recommend.data,
            liked: liked.data,
            recent: recent.data,
            random_genre: random_genre.data,
          })
        }))
        .catch(err => { 
          if (err.response.status === 401) {
            router.push({ name: 'LogInView' })
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
