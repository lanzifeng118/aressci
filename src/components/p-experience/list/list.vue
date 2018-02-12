<template>
  <div class="experience-list">
    <position>
      <span>{{item.name}}</span>
    </position>
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
import position from 'components/p-experience/position/position'
import experienceCompany from 'components/p-experience/company/company'
import toast from 'components/toast/toast'
import util from 'components/tools/util'

export default {
  data() {
    return {
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
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    id() {
      return parseInt(this.$route.params.id.slice(1))
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
          util.goBack(() => {
            this.$router.push('/experience/all')
          })
        }
      }
      return item
    }
  },
  created() {
  },
  methods: {
  },
  components: {
    toast,
    experienceCompany,
    position
  }
}
</script>

<style>
.experience-list {
  margin-left: 30px;
  width: 976px;
}
</style>
