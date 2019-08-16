import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from 'vue-router'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'

Vue.use(Router)
Vue.use(Vuetify)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Lotus Kpm',
      component: lazyLoad('Login')
    },
    {
      path: '/bm',
      name: 'Balance Management',
      component: lazyLoad('BalanceManagement'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'HomePage',
      component:lazyLoad('HomePage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

function lazyLoad(view){
  return() => import(`@/components/${view}.vue`)
}

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const isAuthNeeded = to.matched.some(record => record.meta.requiresAuth);

  if(isAuthNeeded && !currentUser){
    next('login');
  }
  else if(currentUser && to.name == 'Lotus Kpm' ){
    next('bm');
  }
  else{
    next()
  }
});

export default router