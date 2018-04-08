<template>
  <position :text="text" :page="page" :path="path">
    <slot></slot>
  </position>
</template>

<script>
import position from 'components/c-position/position'
import { mapGetters } from 'vuex'

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
      return this.lang === 'cn' ? '关于我们' : 'About Us'
    },
    ...mapGetters(['lang'])
  },
  components: {
    position
  }
}
</script>

<style>
</style>
