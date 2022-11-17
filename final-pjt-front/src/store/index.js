import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    recommend_movies: [],
    liked_movies: [],
    recent_movies: [],
    random_genre_movies: [],
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.recommend_movies = movies.recommend
      state.liked_movies = movies.liked
      state.recent_movies = movies.recent
      state.random_genre_movies = movies.random_genre
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
        .catch((err) => console.log(err));
    }

    // getMovies(context) {
    //   axios({
    //     method: 'get',
    //     url: `${API_URL}/movies/`,
    //     headers: {
    //       Authorization: `Token ${this.state.token}`
    //   }
    // })
    //   .then(res => {
    //     context.commit('GET_MOVIES', res.data)
    //   })
    //   .catch(err => {
    //     if (err.response.status === 401) {
    //       router.push({ name: 'LogInView' })
    //     } else if (err.response.status === 404) {
    //       router.push({ name: 'NotFound404' })
    //     } else {
    //       console.log(err)
    //     }
    //   });
    // },

  },
  modules: {
  }
})
