// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { firebaseConfig } from '@/firebaseConfig';

firebase.initializeApp(firebaseConfig)
Vue.config.productionTip = false

let vueApp = '';

firebase.auth().onAuthStateChanged(() => {
  if(!vueApp){
    vueApp = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
