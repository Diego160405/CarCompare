import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import Browse from '@/views/Browse.vue'
import Compare from '@/views/Compare.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/browse', component: Browse },
    { path: '/compare', component: Compare },
  ],
})

export default router
