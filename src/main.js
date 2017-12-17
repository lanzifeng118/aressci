// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

Vue.config.productionTip = false

let about = [
  {name: 'Basic Information', id: '01'},
  {name: 'Enterprise Culture', id: '02'},
  {name: 'Contact Us', id: '03'}
]
about.forEach((v, i) => {
  v.link = '/aboutus/display/' + v.id
})
const store = new Vuex.Store({
  state: {
    basicInfo: {},
    productNav: [],
    productClassify: [],
    newsClassify: [],
    aboutusNav: [],
    about: about
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: {
    App
  }
})
