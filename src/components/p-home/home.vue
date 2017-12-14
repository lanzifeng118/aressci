<template>
  <div class="home">
    <div class="home-banner wrap f-clearfix">
      <banner class="f-left"></banner>
      <home-category class="f-right"></home-category>
    </div>
    <!-- product -->
    <home-information class="wrap"></home-information>
  </div>
</template>

<script>
import banner from 'components/banner/banner'
import homeInformation from 'components/p-home/information/information'
import homeCategory from 'components/p-home/category/category'

export default {
  data() {
    return {
    }
  },
  components: {
    banner,
    homeInformation,
    homeCategory
  }
}
</script>

<style>
.home {
  margin-top: 10px;
}
.home-banner {
  position: relative;
  overflow: hidden;
  margin-bottom: 1px;
}
.home-content .title-warp {
  position: relative;
}
.home-content .title{
  font-size: 18px;
  margin-bottom: 15px;
}
.home-content .more {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 18px;
}
</style>
