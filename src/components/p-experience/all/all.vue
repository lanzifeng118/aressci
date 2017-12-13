<template>
  <div class="experience-all">
    <div class="experience-position position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">Home</router-link>
      <span class="icon-right"></span>
      All Project Experiences
    </div>
    <!-- items -->
    <experience-company v-for="item in items" :experience="item" :all="all"></experience-company>
  </div>

</template>

<script>
import experienceCompany from 'components/p-experience/company/company'

export default {
  data() {
    return {
      items: null,
      all: true
    }
  },
  created() {
    this.items = this.$store.state.experience
  },
  methods: {
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
  height: 180px;
}
</style>
