import Vue from 'vue'
import Router from 'vue-router'
import BalanceManagement from '@/components/BalanceManagement'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/balancemanagement',
      name: 'BalanceManagement',
      component: BalanceManagement
    }
  ]
})
