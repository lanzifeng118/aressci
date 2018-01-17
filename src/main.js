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

let lang = 'cn'

let navItems = [
  {name: '首页', link: '/home'},
  {
    name: '产品',
    link: '/product',
    list: []
  },
  {
    name: '项目经验',
    link: '/experience'
  },
  {name: '服务与支持', link: '/support'},
  {name: '新闻', link: '/news'},
  {name: '关于我们', link: '/aboutus'}
]
let navItemsEn = [
  {name: 'HOME', link: '/home'},
  {
    name: 'PRODUCT',
    link: '/product',
    list: []
  },
  {
    name: 'PROJECT EXPERIENCE',
    link: '/experience'
  },
  {name: 'SERVICE & SUPPORT', link: '/support'},
  {name: 'NEWS', link: '/news'},
  {name: 'ABOUT US', link: '/aboutus'}
]

const store = new Vuex.Store({
  state: {
    lang: lang,
    navItems: lang === 'cn' ? navItems : navItemsEn,
    basicInfo: {}, // 基础信息
    aboutusId: null, // 第一条关于我们id
    news: null, // 第一条新闻数据
    supportClassify: [],
    experienceList: [],
    productNav: [], // 产品导航
    productClassify: [],
    newsClassify: [],
    aboutusNav: []
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({name: from.name}) : next('/home')
  } else {
    next()
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
