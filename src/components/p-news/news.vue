<template>
  <div class="news wrap">
    <banner-in page="news"></banner-in>
    <div class="news-content f-clearfix">
      <news-category class="f-left"></news-category>
      <router-view keep-alive class="f-left"></router-view>
    </div>
  </div>
</template>

<script>
import newsCategory from 'components/p-news/category/category'
import bannerIn from 'components/c-banner-in/banner-in'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: mapGetters(['api', 'lang']),
  created() {
    this.getClassify()
  },
  methods: {
    getClassify() {
      this.axios(this.api.newsClassify.query()).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          let list = data.data.list
          list.forEach((v, i) => {
            v.border = false
            v.link = `/news/list/c${v.id}`
          })
          let allObj = {
            name: this.lang === 'cn' ? '所有新闻' : 'All News',
            link: '/news/all',
            border: false
          }
          this.$store.commit('setNewsClassify', [allObj].concat(list))
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
