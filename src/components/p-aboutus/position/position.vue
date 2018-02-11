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
      path: '/aboutus'
    }
  },
  computed: {
    text() {
      return this.$store.state.lang === 'cn' ? '关于我们' : 'About Us'
    }
  },
  components: {
    position
  }
}
</script>

<style>
</style>
