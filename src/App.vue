<template>
<div id="app" :class="{cn: lang === 'cn'}">
  <v-header></v-header>
  <router-view keep-alive></router-view>
  <v-footer></v-footer>
</div>
</template>

<script>
import vHeader from 'components/c-header/header'
import vFooter from 'components/c-footer/footer'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  created() {
    this.getBisicInfo()
    this.getHome()
  },
  computed: mapGetters(['api', 'lang']),
  methods: {
    getHome() {
      this.axios(this.api.home.query()).then((res) => {
        let data = res.data
        // console.log(data)
        if (data.code === '200') {
          let store = this.$store

          let aboutus = data.data.aboutUs
          aboutus && store.commit('afterGetAboutusId', aboutus.id)

          let news = data.data.news
          news && store.commit('setNews', news)

          store.commit('setSupportClassify', data.data.supportClassify)

          let productClassify = data.data.productClassify
          productClassify.forEach((v, i) => {
            v.link = `product/list/c${v.id}`
          })
          store.commit('setProductClassify', productClassify)
        }
      })
    },
    getBisicInfo() {
      this.axios(this.api.basicInfo.query()).then((res) => {
        let data = res.data
        if (data.code === '200') {
          let dataD = data.data
          dataD.banner.forEach((v, i) => {
            if (i === 0) {
              v.active = true
            } else {
              v.active = false
            }
          })
          document.title = dataD.full_name
          this.$store.commit('setBasicInfo', dataD)
        }
      })
    }
  },
  components: {
    vHeader,
    vFooter
  }
}
</script>

<style>
@import "./common/common.css";
html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}
</style>
