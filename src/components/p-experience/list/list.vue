<template>
  <div class="experience-list">
    <div class="experience-position position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">首页</router-link>
      <span class="icon-right"></span>
      <router-link to="/experience/all">项目经验</router-link>
      <span class="icon-right"></span>
      <span>{{item.name}}</span>
    </div>
    <!-- items -->
    <experience-company v-if="item.logo && item.logo.length > 0" :experience="item" :all="all"></experience-company>
    <toast
      v-show="toast.show"
      :text="toast.text"
      :icon="toast.icon"
    >
    </toast>
  </div>
</template>

<script>
import experienceCompany from 'components/p-experience/company/company'
import toast from 'components/toast/toast'
import util from 'components/tools/util'

export default {
  data() {
    return {
      id: 0,
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
      this.getId()
    }
  },
  computed: {
    item() {
      let item = {}
      let list = this.$store.state.experienceList
      if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].id === this.id) {
            item = list[i]
            break
          }
        }
        if (!item.logo) {
          util.toast.show(this.toast, '数据不存在', 'close')
          this.goBack()
        }
      }
      return item
    }
  },
  created() {
    this.getId()
  },
  methods: {
    getId() {
      this.id = parseInt(this.$route.params.id.slice(1))
    },
    goBack() {
      setTimeout(() => {
        this.$router.push('/experience/all')
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
