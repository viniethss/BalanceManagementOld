import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from 'vue-router'
import BalanceManagement from '@/components/BalanceManagement'
import HomePage from '@/components/HomePage'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/bm',
      component: BalanceManagement
    },
    {
      path: '/',
      component: HomePage
    },
    {
      path: '*', 
      redirect: '/'
    }
  ]
})
