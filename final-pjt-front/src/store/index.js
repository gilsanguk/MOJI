import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    movies: [],
  },
  getters: {
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies
    },
  },
  actions: {
    getMovies: async ({ commit }) => {
      axios.get(`${API_URL}/movies/`)
        .then(res => {
          commit('SET_MOVIES', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  modules: {
  }
})
