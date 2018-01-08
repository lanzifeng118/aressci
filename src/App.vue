<template>
<div id="app">
  <v-header></v-header>
  <router-view keep-alive></router-view>
  <v-footer></v-footer>
</div>
</template>

<script>
import vHeader from 'components/c-header/header'
import vFooter from 'components/c-footer/footer'
import api from 'components/tools/api'

export default {
  data() {
    return {
    }
  },
  created() {
    this.getBisicInfo()
    this.getHome()
  },
  methods: {
    getHome() {
      this.axios(api.home.query()).then((res) => {
        let data = res.data
        if (data.code === '200') {
          let state = this.$store.state

          let aboutus = data.data.aboutUs
          if (aboutus) {
            state.aboutusId = aboutus.id
          }

          let news = data.data.news
          if (news) {
            news.detail = ''
            state.news = news
          }

          state.supportClassify = data.data.supportClassify

          let productClassify = data.data.productClassify
          productClassify.forEach((v, i) => {
            v.link = `product/list/c${v.id}`
          })
          state.productClassify = productClassify
        }
      })
    },
    getBisicInfo() {
      this.axios(api.basicInfo.query()).then((res) => {
        let data = res.data
        if (data.code === '200') {
          data.data.banner.forEach((v, i) => {
            if (i === 0) {
              v.active = true
            } else {
              v.active = false
            }
          })
          this.$store.state.basicInfo = data.data
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
