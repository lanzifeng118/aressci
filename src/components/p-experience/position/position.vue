<template>
  <position :text="text" :page="page" :path="path">
    <slot></slot>
  </position>
</template>

<script>
import position from 'components/c-position/position'
export default {
  props: {
    page: {
      default: 'inside'
    }
  },
  data() {
    return {
      path: '/experience/all'
    }
  },
  computed: {
    text() {
      return this.$store.state.lang === 'cn' ? '项目经验' : 'Project Experiences'
    }
  },
  components: {
    position
  }
}
</script>

<style>
</style>
