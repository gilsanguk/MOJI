import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import SignUpView from '@/views/SignUpView'
import LoginView from '@/views/LoginView'
import MoviesView from '@/views/MoviesView'
import CommunityView from '@/views/CommunityView'
import ReviewDetailView from '@/views/ReviewDetailView'
import SelectMovieView from '@/views/SelectMovieView'
import NotFound404 from '@/views/NotFound404'
import TestView from '@/views/TestView'

Vue.use(VueRouter)
const routes = [
  {
    path: '*',
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) {
        if (store.getters.prefer.length !== 0) {
          next()
        } else {
          next('/selectmovie')
        }
      } else {
        next('/login')
      }
    },
  },
  {
    path: '/notfound404',
    name: 'NotFound404',
    component: NotFound404,
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) {
        next('/movies')
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) {
        next('/movies')
      } else {
        next()
      }
    }
  },
  {
    path: '/movies',
    name: 'MoviesView',
    component: MoviesView,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) {
        if (store.getters.prefer.length !== 0) {
          next()
        } else {
          next('/selectmovie')
        }
      } else {
        next('/login')
      }
    },
  },
  {
    path: '/selectmovie',
    name: 'SelectMovieView',
    component: SelectMovieView,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/community/:movieId/reviews',
    name: 'CommunityView',
    component: CommunityView,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) {
        if (store.getters.prefer.length !== 0) {
          next()
        } else {
          next('/selectmovie')
        }
      } else {
        next('/login')
      }
    },
  },
  {
    path: '/community/:movieId/reviews/:reviewId',
    name: 'ReviewDetailView',
    component: ReviewDetailView,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogin) {
        if (store.getters.prefer.length !== 0) {
          next()
        } else {
          next('/selectmovie')
        }
      } else {
        next('/login')
      }
    },
  },
  {
    path: '/test',
    name: 'TestView',
    component: TestView,
  },
  {
    path: '*',
    redirect: '/notfound404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
