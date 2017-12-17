<template>
  <div class="about wrap">
    <banner-in page="aboutus"></banner-in>
    <div class="about-content f-clearfix">
      <about-category class="f-left"></about-category>
      <router-view keep-alive class="f-left""></router-view>
    </div>
  </div>
</template>

<script>
import api from 'components/tools/api'
import aboutCategory from 'components/p-aboutus/category/category'
import bannerIn from 'components/c-banner-in/banner-in'

export default {
  data() {
    return {
      category: null
    }
  },
  watch: {
    '$route' (to, from) {
      this.redirect()
    }
  },
  created() {
    this.getNav()
  },
  methods: {
    getNav() {
      this.axios(api.aboutus.query()).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          let list = data.data.list
          list.forEach((v, i) => {
            v.link = `/aboutus/display/c${v.id}`
          })
          this.$store.state.aboutusNav = data.data.list
          this.redirect()
        }
      })
    },
    redirect() {
      if (this.$route.path === '/aboutus/display') {
        this.$router.push(this.$store.state.aboutusNav[0].link)
      }
    }
  },
  components: {
    aboutCategory,
    bannerIn
  }
}
</script>

<style>
.about {
  margin-top: 10px;
}
.about-banner {
  margin-bottom: 12px;
}
.about-content {
  position: relative;
  margin-bottom: 30px;
  padding-top: 30px;
}
.about-position {
  top: 2px;
  left: 0;
  position: absolute;
}
</style>
