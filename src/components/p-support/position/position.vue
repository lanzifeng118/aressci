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
      path: '/product/all'
    }
  },
  computed: {
    text() {
      return this.$store.state.lang === 'cn' ? '服务与支持' : 'Servive & Support'
    }
  },
  components: {
    position
  }
}
</script>

<style>
</style>
