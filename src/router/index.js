import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import UserCrud from '../components/UserCrud'
import CervejaCrud from '../components/CervejaCrud'
import BarrilCrud from '../components/BarrilCrud'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    component:UserCrud
  },
  {
    path: '/cervejas',
    component:CervejaCrud
  },
  {
    path: '/barris',
    component:BarrilCrud
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
