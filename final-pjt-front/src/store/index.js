import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    movies: [],
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({ name: 'MoviesView' })
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
        })
        .catch((err) => console.log(err));
    },

    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,
        headers: {
          Authorization: `Token ${this.state.token}`
        }
      })
        .then(res => {
          console.log(res.data);
          context.commit('GET_MOVIES', res.data)
        })
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
