import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Following from '../views/Following.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/following',
    name: 'Following',
    component: Following
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
