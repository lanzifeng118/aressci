<template>
  <div class="news wrap">
    <banner-in page="news"></banner-in>
    <div class="news-content f-clearfix">
      <news-category class="f-left"></news-category>
      <router-view keep-alive class="f-left""></router-view>
    </div>
  </div>
</template>

<script>
import newsCategory from 'components/p-news/category/category'
import bannerIn from 'components/c-banner-in/banner-in'
import api from 'components/tools/api'

export default {
  data() {
    return {
    }
  },
  created() {
    this.getClassify()
  },
  methods: {
    getClassify() {
      this.axios(api.newsClassify.query()).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          let list = data.data.list
          list.forEach((v, i) => {
            v.border = false
            v.link = `/news/list/c${v.id}`
          })
          this.$store.state.newsClassify = [{name: '所有分类', link: '/news/all', border: false}].concat(list)
        }
      })
    }
  },
  components: {
    newsCategory,
    bannerIn
  }
}
</script>

<style>
.news {
  margin-top: 10px;
}
.news-content {
  position: relative;
  margin-bottom: 30px;
  padding-top: 30px;
}
.news-position {
  top: 2px;
  left: 0;
  position: absolute;
}
</style>
