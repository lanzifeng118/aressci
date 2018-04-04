function nav(lang) {
  return [
    {
      name: lang === 'cn' ? '首页' : 'HOME',
      link: '/home'
    },
    {
      name: lang === 'cn' ? '产品' : 'PRODUCT',
      link: '/product',
      list: []
    },
    {
      name: lang === 'cn' ? '项目经验' : 'PROJECT EXPERIENCE',
      link: '/experience'
    },
    {
      name: lang === 'cn' ? '服务与支持' : 'SERVICE & SUPPORT',
      link: '/support'
    },
    {
      name: lang === 'cn' ? '新闻' : 'NEWS',
      link: '/news'
    },
    {
      name: lang === 'cn' ? '关于我们' : 'ABOUT US',
      link: '/aboutus'
    }
  ]
}

const state = {
  navItems: [],
  basicInfo: {}, // 基础信息
  aboutusId: null, // 第一条关于我们id
  news: null, // 第一条新闻数据
  supportClassify: [],
  productNav: [], // 产品导航
  productClassify: [],
  newsClassify: [],
  aboutusNav: []
}

const getters = {
  navItems(state, getters, rootState) {
    console.log('1111111')
    console.log(rootState)
    console.log(nav(rootState.common.lang))
    return nav(rootState.common.lang)
  },
  basicInfo: state => state.basicInfo,
  banner: state => state.basicInfo.banner,
  aboutusId: state => state.aboutusId,
  news: state => state.news,
  supportClassify: state => state.supportClassify,
  productNav: state => state.productNav,
  productClassify: state => state.productClassify,
  newsClassify: state => state.newsClassify,
  aboutusNav: state => state.aboutusNav
}

const actions = {}

const mutations = {
  setBasicInfo(state, data) {
    state.basicInfo = data
  },
  setNews(state, data) {
    state.news = data
  },
  setSupportClassify(state, data) {
    state.supportClassify = data
  },
  setProductClassify(state, data) {
    state.productClassify = data
  },
  afterGetAboutusId(state, id) {
    state.aboutusId = id
    state.navItems[5].link = `/aboutus/display/c${id}`
  },
  setProductNav(state, list) {
    state.productNav = list
  },
  setNavProductList(state, list) {
    state.navItems[1].list = list
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
