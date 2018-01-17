<template>
  <div class="experience-all">
    <div class="experience-position position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">
        <span v-if="lang === 'cn'">首页</span>
        <span v-if="lang === 'en'">Home</span>
      </router-link>
      <span class="icon-right"></span>
      <span v-if="lang === 'cn'">项目经验</span>
      <span v-if="lang === 'en'">Project Experiences</span>
    </div>
    <!-- items -->
    <experience-company v-if="items.length > 0" v-for="item in items" :experience="item" :all="all"></experience-company>
  </div>

</template>

<script>
import experienceCompany from 'components/p-experience/company/company'

export default {
  data() {
    return {
      all: true
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    items() {
      return this.$store.state.experienceList
    }
  },
  created() {
  },
  components: {
    experienceCompany
  }
}
</script>

<style>
.experience-all {
  margin-left: 30px;
  width: 976px;
}
.experience-all .experience-item-logo ul{
  height: 260px;
  overflow: hidden;
}
</style>
