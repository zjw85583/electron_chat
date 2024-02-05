import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/chat'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "chat" */ '@/views/login.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import(/* webpackChunkName: "chat" */ '@/views/chat.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
