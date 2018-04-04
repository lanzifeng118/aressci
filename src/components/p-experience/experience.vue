<template>
  <div class="experience wrap">
    <banner-in page="experience"></banner-in>
    <div class="experience-content f-clearfix">
      <experience-category class="f-left"></experience-category>
      <router-view keep-alive class="f-left"></router-view>
    </div>
    <toast
      v-show="toast.show"
      :text="toast.text"
      :icon="toast.icon"
    >
    </toast>
  </div>
</template>

<script>
import experienceCategory from 'components/p-experience/category/category'
import bannerIn from 'components/c-banner-in/banner-in'
import toast from 'components/toast/toast'

export default {
  data() {
    return {
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
      this.$store.dispatch('setExperienceList', this.toast)
    }
  },
  components: {
    experienceCategory,
    bannerIn,
    toast
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
