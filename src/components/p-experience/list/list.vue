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
    <experience-company v-if="item.classify.length > 0" :experience="item" :all="all"></experience-company>
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
      item: {
        name: '',
        classify: []
      },
      all: false,
      // toast
      toast: {
        show: false,
        text: '',
        icon: ''
      }
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
      let id = parseInt(this.$route.params.id.slice(1))
      this.axios(api.experienceList.queryById(id)).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          if (data.data) {
            this.item = data.data
          } else {
            util.toast.show(this.toast, 'NO DATA EXIST', 'close')
            this.goBack()
          }
        }
      })
    },
    goBack() {
      setTimeout(() => {
        this.$router.push('/experience')
      }, 700)
    }
  },
  components: {
    toast,
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
