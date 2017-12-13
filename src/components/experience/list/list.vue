<template>
  <div class="experience-list">
    <div class="experience-position position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">Home</router-link>
      <span class="icon-right"></span>
      <router-link to="/experience/all">All Project Experiences</router-link>
      <span class="icon-right"></span>
      <span>{{item.name}}</span>
    </div>
    <!-- items -->
    <experience-company :experience="item" :all="all"></experience-company>
  </div>
</template>

<script>
import experienceCompany from 'components/experience/company/company'
export default {
  data() {
    return {
      item: null,
      classifyName: '',
      all: false
    }
  },
  watch: {
    '$route' (to, from) {
      this.getItem()
    }
  },
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      let path = this.$route.path
      let _this = this
      this.$store.state.experience.forEach((v, i) => {
        if (v.link === path) {
          _this.item = v
        }
      })
    }
  },
  components: {
    experienceCompany
  }
}
</script>

<style>
.experience-list {
  margin-left: 30px;
  width: 976px;
}
</style>
