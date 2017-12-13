<template>
  <div class="about wrap">
    <div class="about-banner">
      <img src="/static/images/news-banner.jpg" alt="">
    </div>
    <div class="about-content f-clearfix">
      <about-category class="f-left"></about-category>
      <router-view keep-alive class="f-left""></router-view>
    </div>
  </div>
</template>

<script>
import aboutCategory from 'components/about/category/category'
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
    aboutCategory
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
