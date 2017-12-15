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

let experience = [
  {
    name: 'Phoenix Controls',
    classify: [{
      name: 'Manufacturing',
      logo: [
        'static/images/experience-01.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg'
      ]
    }, {
      name: 'Pharmaceuticals',
      logo: [
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg'
      ]
    }, {
      name: 'Chemical Industry',
      logo: [
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg'
      ]
    }]
  },
  {
    name: 'Drager',
    classify: [{
      name: 'Manufacturing',
      logo: [
        'static/images/experience-01.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg'
      ]
    }, {
      name: 'Pharmaceuticals',
      logo: []
    }, {
      name: 'Chemical Industry',
      logo: [
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg'
      ]
    }]
  },
  {
    name: 'Aircuity',
    classify: [{
      name: 'Manufacturing',
      logo: []
    }, {
      name: 'Pharmaceuticals',
      logo: [
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg'
      ]
    }, {
      name: 'Chemical Industry',
      logo: [
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-04.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-01.jpg',
        'static/images/experience-02.jpg',
        'static/images/experience-03.jpg',
        'static/images/experience-04.jpg'
      ]
    }]
  }
]
experience.forEach((v, i) => {
  let name = v.name.replace(/ /g, '')
  v.link = '/experience/list/' + name
})

let news = [
  {name: 'Phoenix Controls', id: '1'},
  {name: 'Drager', id: '2'},
  {name: 'Aircuity', id: '3'}
]
news.forEach((v, i) => {
  let name = v.name.replace(/ /g, '')
  v.link = '/news/list/' + name
})

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
    experience: experience,
    news: news,
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
