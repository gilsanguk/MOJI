import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesView from '@/views/MoviesView'
import CommunityView from '@/views/CommunityView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/movies',
  },
  {
    path: '/movies',
    name: 'Movies',
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
