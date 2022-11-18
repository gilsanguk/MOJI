import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls"

Vue.use(Vuex)

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
    popularMovies: [],
    recommendMovies: [],
    likedMovies: [],
    recentMovies: [],
    randomGenreMovies: [],
    preferMovies: [],
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
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user.id = userData.id
      state.user.username = userData.username
      state.user.nickname = userData.nickname
      state.user.profileImage = userData.profileImage
    },
    GET_MOVIES(state, movies) {
      state.popularMovies = movies
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
      axios.all([
        axios.get(`${API_URL}/movies/popular/`),
        axios.get(`${API_URL}/movies/recommend/${context.state.user.username}/`),
        axios.get(`${API_URL}/movies/liked/`),
        axios.get(`${API_URL}/movies/recent/`),
        axios.get(`${API_URL}/movies/random_genre/`),
      ],
        {
          headers: {
            Authorization: `Token ${this.state.token}`
          }
        })
        .then(axios.spread((popular, recommend, liked, recent, random_genre) => {
          context.commit('GET_MOVIES', {
            popular: popular.data,
            recommend: recommend.data,
            liked: liked.data,
            recent: recent.data,
            random_genre: random_genre.data,
          })
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
  },
  modules: {
  }
})
