import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from 'vue-router'
import BalanceManagement from '@/components/BalanceManagement'
import Login from '@/components/Login'
import HomePage from '@/components/HomePage'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Lotus Kpm',
      component: Login
    },
    {
      path: '/bm',
      name: 'Balance Management',
      component: BalanceManagement
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
