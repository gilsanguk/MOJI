import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpView from '@/views/SignUpView'
import LoginView from '@/views/LoginView'
import MoviesView from '@/views/MoviesView'
import CommunityView from '@/views/CommunityView'
import SelectMovieView from '@/views/SelectMovieView'
import NotFound404 from '@/views/NotFound404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/movies',
  },
  {
    path: '/notfound404',
    name: 'NotFound404',
    component: NotFound404,
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/selectmovie',
    name: 'SelectMovieView',
    component: SelectMovieView
  },
  {
    path: '/movies',
    name: 'MoviesView',
    component: MoviesView
  },
  {
    path: '/community/:id/reviews',
    name: 'CommunityView',
    component: CommunityView
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
