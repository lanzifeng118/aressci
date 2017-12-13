<template>
  <div class="experience wrap">
    <div class="experience-banner">
      <img src="/static/images/experience-banner.jpg" alt="">
    </div>
    <div class="experience-content f-clearfix">
      <experience-category class="f-left"></experience-category>
      <router-view keep-alive class="f-left""></router-view>
    </div>
  </div>
</template>

<script>
import experienceCategory from 'components/p-experience/category/category'

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
    experienceCategory
  }
}
</script>

<style>
.experience {
  margin-top: 10px;
}
.experience-banner {
  margin-bottom: 12px;
}
.experience-content {
  position: relative;
  padding-top: 30px;
}
.experience-position {
  top: 2px;
  left: 0;
  position: absolute;
}
</style>
