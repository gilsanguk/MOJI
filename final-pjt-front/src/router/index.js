import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesView from '@/views/MoviesView'
import CommunityView from '@/views/CommunityView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
