import Vue from 'vue'
import VueRouter from 'vue-router'
import LogInView from '@/views/LogInView'
import SignUpView from '@/views/SignUpView'
import MoviesView from '@/views/MoviesView'
import CommunityView from '@/views/CommunityView'
import MovieDetailView from '@/views/MovieDetailView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/movies',
  },
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/movies',
    name: 'MoviesView',
    component: MoviesView
  },
  {
    path: '/movies/:id',
    name: 'MovieDetailView',
    component: MovieDetailView
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
