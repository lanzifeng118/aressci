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

let products = [
  {
    name: 'Phoenix Controls',
    fullName: 'Phoenixcontrols Precision Airflow Controls Products',
    logoSrc: '/static/images/PhoenixControls-logo.png',
    bannerSrc: '/static/images/product-banner-phoenix.jpg',
    classifyLevel1: [
      {
        name: 'Valves and Controllers',
        imgSrc: 'static/images/prodct-phoenix-01.jpg',
        classifyLevel2: [
          {
            name: 'Medium Pressure Valve'
          },
          {
            name: 'Low Pressure Valve'
          },
          {
            name: 'Valve Accessories and Options'
          }
        ]
      },
      {
        name: 'Space Sensors and Monitors',
        imgSrc: 'static/images/prodct-phoenix-02.jpg',
        classifyLevel2: [
          {
            name: 'Temperature and Humidity Sensors'
          },
          {
            name: 'Temperature Controllers'
          },
          {
            name: 'Pressure Monitors'
          },
          {
            name: 'Local Display Units'
          }
        ]
      },
      {
        name: 'Fume Hood Controls',
        imgSrc: 'static/images/prodct-phoenix-03.jpg'
      },
      {
        name: 'Network Integration',
        imgSrc: 'static/images/prodct-phoenix-04.jpg'
      },
      {
        name: 'Valve Upgrade Kit',
        imgSrc: 'static/images/prodct-phoenix-02.jpg'
      },
      {
        name: 'Dashboards',
        imgSrc: 'static/images/prodct-phoenix-01.jpg'
      }
    ]
  },
  {
    name: 'Drager',
    fullName: 'Dräger Gas Detectors Products',
    logoSrc: '/static/images/drager-logo.png',
    bannerSrc: '/static/images/product-banner-drager.jpg',
    classifyLevel1: [
      {
        name: 'Combustible Gas Detection',
        imgSrc: 'static/images/prodct-drager-01.jpg',
        classifyLevel2: [
          {
            name: 'Catalytic'
          },
          {
            name: 'IR'
          }
        ]
      },
      {
        name: 'Toxic Gas Detection',
        imgSrc: 'static/images/prodct-drager-02.jpg',
        classifyLevel2: [
          {
            name: 'EX-(ia & ib)'
          },
          {
            name: 'EX- (d)'
          }
        ]
      },
      {
        name: 'Flame Detection',
        imgSrc: 'static/images/prodct-drager-03.jpg'
      },
      {
        name: 'FIntegrated Control System',
        imgSrc: 'static/images/prodct-drager-02.jpg'
      }
    ]
  },
  {
    name: 'Aircuity',
    fullName: 'Aircuity Critical Indoor Environmental Monitoring',
    logoSrc: '/static/images/aircuity-logo.png',
    bannerSrc: '/static/images/product-banner-aircuity.jpg',
    classifyLevel1: [
      {
        name: 'Sensor Suite',
        imgSrc: 'static/images/prodct-phoenix-02.jpg'
      },
      {
        name: 'Sensor Suite Sensors',
        imgSrc: 'static/images/prodct-phoenix-01.jpg'
      },
      {
        name: 'Information Management Server',
        imgSrc: 'static/images/prodct-phoenix-03.jpg'
      },
      {
        name: 'OptiNet Structured Cable',
        imgSrc: 'static/images/prodct-phoenix-04.jpg'
      },
      {
        name: 'Room Sensor',
        imgSrc: 'static/images/prodct-drager-01.jpg'
      },
      {
        name: 'Duct Probes',
        imgSrc: 'static/images/prodct-drager-02.jpg'
      },
      {
        name: 'Air Data Routers',
        imgSrc: 'static/images/prodct-drager-03.jpg'
      },
      {
        name: 'High Flow Vacuum Pump',
        imgSrc: 'static/images/prodct-drager-02.jpg'
      }
    ]
  }
]
products.forEach((v, i) => {
  let name = v.name.replace(/ /g, '')
  v.link = '/product/list/' + name
  v.classifyLevel1.forEach((v1, i1) => {
    let link1 = '/product/display/' + name + '-' + v1.name.replace(/ /g, '')
    v1.link = link1
    if (v1.classifyLevel2) {
      v1.classifyLevel2.forEach((v2, i2) => {
        let link2 = link1 + '/' + v2.name.replace(/ /g, '')
        v2.link = link2
        // v2.link = '/static/test.pdf'
      })
    }
  })
})

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
    productClassify: [],
    products: products,
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
