<template>
  <div class="position">
    <span class="icon-location_fill icon"></span>
    <router-link to="/">
      <span>{{textHome}}</span>
    </router-link>
    <span class="icon-right"></span>

    <span v-if="page ==='index'">{{text}}</span>

    <router-link v-if="page !=='index'" :to="path">
      <span>{{text}}</span>
    </router-link>
    <span v-if="page !=='index'" class="icon-right"></span>
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    page: {
      default: 'inside'
    },
    text: {
      default: ''
    },
    path: {
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    textHome() {
      return this.$store.state.lang === 'cn' ? '首页' : 'Home'
    }
  },
  components: {
  }
}
</script>

<style>
.position {
  top: 2px;
  left: 0;
  position: absolute;
  color: #999;
  font-size: 12px;
}
.position a {
  color: #999;
}
.position a:hover {
  color: #333;
}
.position span.icon-right {
  vertical-align: -1px;
  -webkit-transform-origin-x: 0;
  -webkit-transform: scale(0.90);
}

</style>
