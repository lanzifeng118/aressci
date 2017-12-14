<template>
  <div class="experience-all">
    <div class="experience-position position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">Home</router-link>
      <span class="icon-right"></span>
      All Project Experiences
    </div>
    <!-- items -->
    <experience-company v-if="items.length > 0" v-for="item in items" :experience="item" :all="all"></experience-company>
    <toast
      v-show="toast.show"
      :text="toast.text"
      :icon="toast.icon"
    >
    </toast>
  </div>

</template>

<script>
import api from 'components/tools/api'
import util from 'components/tools/util'
import experienceCompany from 'components/p-experience/company/company'
import toast from 'components/toast/toast'

export default {
  data() {
    return {
      items: [],
      all: true,
      // toast
      toast: {
        show: false,
        text: '',
        icon: ''
      }
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    getItems() {
      this.axios(api.experienceList.query()).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          this.items = data.data.list
          // console.log(this.items)
        } else {
          util.req.queryError(this.toast)
        }
      })
    }
  },
  components: {
    toast,
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
