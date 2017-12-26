<template>
  <div class="home">
    <div class="home-ad wrap f-clearfix">
      <banner class="f-left"></banner>
      <home-category class="f-right"></home-category>
    </div>
    <!-- product -->
    <home-information class="wrap"></home-information>
  </div>
</template>

<script>
import banner from 'components/c-banner/banner'
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
.home-ad {
  position: relative;
  overflow: hidden;
}
</style>
