<script>
const LANG = 'cn'
let homeUrl = '/api/guest/index/summary'
let navUrl = '/api/guest/nav'
let basicInfoUrl = '/api/guest/basicinfo'
let productListUrl = '/api/guest/product/list'
let productClassifyUrl = '/api/guest/product/classify'
let productBannerUrl = '/api/guest/product/banner'
let productVideoUrl = '/api/guest/video'
let aboutusUrl = '/api/guest/aboutus'
let aboutusBannerUrl = '/api/guest/aboutus/banner'
let experienceListUrl = '/api/guest/experience/list'
let experienceClassifyUrl = '/api/guest/experience/classify'
let experienceBannerUrl = '/api/guest/experience/banner'
let friendlinkUrl = '/api/guest/friendlink'
let supportUrl = '/api/guest/support'
let supportClassifyUrl = '/api/admin/support/classify'
let supportBannerUrl = '/api/guest/support/banner'
let newsListUrl = '/api/guest/news/list'
let newsClassifyUrl = '/api/guest/news/classify'
let newsBannerUrl = '/api/guest/news/banner'

let queryFun = (url, pageData) => {
  let data = {
    lang: LANG
  }
  if (pageData) {
    for (var key in pageData) {
      data[key] = pageData[key]
    }
  }
  return {
    method: 'post',
    url: url,
    data: {
      method: 'query',
      data: data
    }
  }
}
let queryByIdFun = (url, id) => {
  return {
    method: 'post',
    url: url,
    data: {
      method: 'queryById',
      data: {
        id: id
      }
    }
  }
}
let queryByClassifyFun = (url, classify) => {
  return {
    method: 'post',
    url: url,
    data: {
      method: 'queryByClassify',
      data: {
        classify: classify,
        lang: LANG
      }
    }
  }
}

let insertFun = (url, data) => {
  data.lang = LANG
  return {
    method: 'post',
    url: url,
    data: {
      method: 'insert',
      data: data
    }
  }
}
let api = {
  home: {
    query() {
      return queryFun(homeUrl)
    }
  },
  nav: {
    query() {
      return queryFun(navUrl)
    }
  },
  basicInfo: {
    query() {
      return queryFun(basicInfoUrl)
    }
  },
  // product
  productList: {
    query(pageData) {
      return queryFun(productListUrl, pageData)
    },
    queryById(id) {
      return queryByIdFun(productListUrl, id)
    }
  },
  // productClassify
  productClassify: {
    query() {
      return queryFun(productClassifyUrl)
    }
  },
  // productBannerUrl
  productBanner: {
    query() {
      return queryFun(productBannerUrl)
    }
  },
  // productVideo
  productVideo: {
    query() {
      return queryFun(productVideoUrl)
    },
    queryById(id) {
      return queryByIdFun(productVideoUrl, id)
    },
    queryByClassify(classify) {
      return queryByClassifyFun(productVideoUrl, classify)
    }
  },
  // aboutus
  aboutus: {
    query() {
      return queryFun(aboutusUrl)
    },
    queryById(id) {
      return queryByIdFun(aboutusUrl, id)
    }
  },
  // aboutusBannerUrl
  aboutusBanner: {
    query() {
      return queryFun(aboutusBannerUrl)
    }
  },
  // experience
  experienceList: {
    query() {
      return queryFun(experienceListUrl)
    },
    queryById(id) {
      return queryByIdFun(experienceListUrl, id)
    }
  },
  // experienceClassify
  experienceClassify: {
    query() {
      return queryFun(experienceClassifyUrl)
    }
  },
  // experienceBannerUrl
  experienceBanner: {
    query() {
      return queryFun(experienceBannerUrl)
    }
  },
  // friendlink
  friendlink: {
    query() {
      return queryFun(friendlinkUrl)
    }
  },
  // support
  support: {
    insert(data) {
      return insertFun(supportUrl, data)
    }
  },
  supportClassify: {
    query() {
      return queryFun(supportClassifyUrl)
    }
  },
  // supportBannerUrl
  supportBanner: {
    query() {
      return queryFun(supportBannerUrl)
    }
  },
  // news
  newsList: {
    query(pageData) {
      return queryFun(newsListUrl, pageData)
    },
    queryById(id) {
      return queryByIdFun(newsListUrl, id)
    },
    queryByOne() {
      return {
        method: 'post',
        url: newsListUrl,
        data: {
          method: 'queryByOne',
          data: {
            lang: LANG
          }
        }
      }
    }
  },
  // newsClassify
  newsClassify: {
    query() {
      return queryFun(newsClassifyUrl)
    },
    queryById(id) {
      return queryByIdFun(newsClassifyUrl, id)
    }
  },
  // newBannerUrl
  newsBanner: {
    query() {
      return queryFun(newsBannerUrl)
    }
  }
}
export default api
</script>
