<template>
  <div class="news wrap">
    <div class="news-banner">
      <img src="/static/images/news-banner.jpg" alt="">
    </div>
    <div class="news-content f-clearfix">
      <news-category class="f-left"></news-category>
      <router-view keep-alive class="f-left""></router-view>
    </div>
  </div>
</template>

<script>
import newsCategory from 'components/news/category/category'
export default {
  data() {
    return {
      category: null
    }
  },
  created() {
    this.category = this.$store.state.experience
  },
  components: {
    newsCategory
  }
}
</script>

<style>
.news {
  margin-top: 10px;
}
.news-banner {
  margin-bottom: 12px;
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
