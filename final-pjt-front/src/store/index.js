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
      paths: ['token', 'user', 'prefer'],
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
    token: null,
    prefer: null, 
    user: {
      id: '',
      username: '',
      nickname: '',
      profileImage: null,
    },
    isLoading: false,
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    getUsername(state) {
      return state.user.username
    },
    getUserId(state) {
      return state.user.id
    },
    getUserProfileImage(state) {
      return state.user.profileImage
    },
    getNickname(state) {
      return state.user.nickname
    },
    getToken(state) {
      return state.token
    },
    isLoading(state) {
      return state.isLoading
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
      state.user.profileImage = userData.profile_image
    },
    // 영화 정보
    GET_MOVIES(state, movies) {
      state.recommend = movies.recommend
      state.liked = movies.liked
      state.recent = movies.recent
      state.randomGenre = movies.randomGenre
      state.prefer = movies.prefer
    },
    // 모든 영화
    GET_ALL_MOVIES(state, movies) {
      state.all = movies
    },
    // 선호 영화
    SET_PREFER(state, movies) {
      state.prefer = movies
    },
    // 영화 재로딩
    GET_PART_MOVIES(state, liked) {
      state.liked = liked
    },
    // 로딩
    SET_LOADING(state) {
      state.isLoading = true;
    },
    CLOSE_LOADING(state) {
      state.isLoading = false;
    },
  },
  actions: {
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
    // 회원탈퇴
    deleteUser({ commit }) {
      axios({
        method: 'delete',
        url: `${API_URL}/accounts/profile/${this.state.user.nickname}/`,
        headers: { Authorization: `Token ${this.state.token}` }
      })
        .then(() => {
          commit('SAVE_TOKEN', null)
          alert('회원탈퇴가 완료되었습니다.')
          router.push({ name: 'LoginView' })
        })
        .catch((err) => console.log(err));
    },
    // 영화 정보
    getMovies(context) {
      context.commit('SET_LOADING')
      const axiosrecommend = axios.get(
        `${API_URL}/movies/recommend/`,
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
      const axiosprefer = axios.get(
        `${API_URL}/movies/prefer/`,
        {headers: { Authorization: `Token ${this.state.token}`}})
        
        axios.all([axiosrecommend, axiosliked, axiosrecent, axiosrandomGenre, axiosprefer])
        .then(axios.spread((recommend, liked, recent, randomGenre, prefer) => {
          if (prefer.data.length === 0) {
            router.push({ name: 'SelectMovieView'})
          }
          const movies = {
            recommend: recommend.data,
            liked: liked.data,
            recent: recent.data,
            randomGenre: randomGenre.data,
            prefer: prefer.data,
          }
          context.commit('GET_MOVIES', movies)
        }))
        .then(() => {
          context.dispatch('getAllMovies')
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
    // 모든 영화
    getAllMovies(context) {
      context.commit('SET_LOADING')
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
        .then(() => {
          context.commit('CLOSE_LOADING')
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
    // 영화 재로딩
    getPartMovies(context) {
      axios.get(
        `${API_URL}/movies/liked/`,
        {headers: { Authorization: `Token ${this.state.token}`}}
        )
        .then((liked) => {
            liked.data
          context.commit('GET_PART_MOVIES', liked.data)
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
        .then((res) => {
          context.commit('SET_PREFER', res.data);
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
