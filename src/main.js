// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

const firebaseConfig = {
  apiKey: "AIzaSyDQdWyRjM-0amskEGhkuqIrxTjz-mjHWYw",
  authDomain: "balancemangementlotus.firebaseapp.com",
  databaseURL: "https://balancemangementlotus.firebaseio.com",
  projectId: "balancemangementlotus",
  storageBucket: "balancemangementlotus.appspot.com",
  messagingSenderId: "922688554153",
  appId: "1:922688554153:web:54c24b10c15be376"
};

firebase.initializeApp(firebaseConfig);
