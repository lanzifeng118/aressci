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
      path: '/news/all'
    }
  },
  computed: {
    text() {
      return this.$store.state.lang === 'cn' ? '所有新闻' : 'All News'
    }
  },
  components: {
    position
  }
}
</script>

<style>
</style>
