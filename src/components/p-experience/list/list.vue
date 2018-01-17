<template>
  <div class="experience-list">
    <div class="experience-position position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">
        <span v-if="lang === 'cn'">首页</span>
        <span v-if="lang === 'en'">Home</span>
      </router-link>
      <span class="icon-right"></span>
      <router-link to="/experience/all">
        <span v-if="lang === 'cn'">项目经验</span>
        <span v-if="lang === 'en'">Project Experiences</span>
      </router-link>
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
    lang() {
      return this.$store.state.lang
    },
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
          let text = this.lang === 'cn' ? '数据不存在' : 'NO DATA EXIST'
          util.toast.show(this.toast, text, 'close')
          util.goBack(this.$router.push('/experience/all'))
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
