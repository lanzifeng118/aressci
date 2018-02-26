<script>
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
let supportClassifyUrl = '/api/guest/support/classify'
let supportBannerUrl = '/api/guest/support/banner'
let newsListUrl = '/api/guest/news/list'
let newsClassifyUrl = '/api/guest/news/classify'
let newsBannerUrl = '/api/guest/news/banner'

function getApi(lang) {
  lang = lang || 'cn'

  let queryFun = (url, pageData, method) => {
    method = method || 'query'
    let data = {
      lang: lang
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
        method: method,
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
          id: id,
          lang: lang
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
          lang: lang
        }
      }
    }
  }

  let insertFun = (url, data) => {
    data.lang = lang
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
      query(data) {
        return queryFun(navUrl, data)
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
      search(pageData) {
        return queryFun(productListUrl, pageData, 'search')
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
              lang: lang
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
  return api
}

export default {
  getApi
}
</script>
