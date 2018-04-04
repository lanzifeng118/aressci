<template>
  <div class="experience-all">
    <position page="index"></position>
    <!-- items -->
    <experience-company v-if="items.length > 0" v-for="item in items" :experience="item" :all="all"></experience-company>
  </div>

</template>

<script>
import experienceCompany from 'components/p-experience/company/company'
import position from 'components/p-experience/position/position'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      all: true
    }
  },
  computed: {
    items() {
      let items = []
      this.experienceList.forEach(v => {
        items.push(v)
      })
      items.forEach(v => {
        v.logo.forEach(vL => {
          vL.list = vL.list.slice(0, 8)
        })
      })
      return items
    },
    ...mapGetters(['lang', 'experienceList'])
  },
  created() {
  },
  components: {
    experienceCompany,
    position
  }
}
</script>

<style>
.experience-all {
  margin-left: 30px;
  width: 976px;
}
.experience-all .experience-item-logo ul{
  height: 380px;
  overflow: hidden;
}
</style>
