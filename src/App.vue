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
    this.getProdcutClassify()
  },
  methods: {
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
      }).catch((err) => {
        console.log(err)
      })
    },
    getProdcutClassify() {
      this.axios(api.productClassify.query()).then((res) => {
        let data = res.data
        let state = this.$store.state
        if (data.code === '200') {
          data.data.list.forEach((v, i) => {
            v.link = '1111'
            v.open = false
          })
          state.productClassify = data.data.list
        }
      }).catch((err) => {
        console.log(err)
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
#app {

}

</style>
