<template>
  <div class="resource wrap">
    <div class="resource-banner">
      <img src="/static/images/news-banner.jpg" alt="">
    </div>
    <div class="resource-content f-clearfix">
      <resource-category class="f-left""></resource-category>
      <router-view keep-alive class="f-left resource-content-view"></router-view>
    </div>
  </div>
</template>

<script>
import resourceCategory from 'components/resource/category/category'
export default {
  data() {
    return {

    }
  },
  components: {
    resourceCategory
  }
}
</script>

<style>
.resource {
  margin-top: 10px;
}
.resource-banner {
  margin-bottom: 12px;
}
.resource-content {
  position: relative;
  padding-top: 30px;
}
.resource-position {
  top: 2px;
  left: 0;
  position: absolute;
}
.resource-content-view {
  margin-left: 30px;
  width: 976px;
}
</style>
