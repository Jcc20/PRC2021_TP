import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    components: require("../components/Login.vue")
  },
  {
    path: '/registar',
    name: 'Registar',
    components: require("../components/Login.vue")
  },
  {
    path: '/',
    name: 'Recurso'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
