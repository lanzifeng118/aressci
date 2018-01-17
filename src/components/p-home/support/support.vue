<template>
  <div class="home-information-news">
    <h3 class="home-information-item-title">
      <span v-if="lang === 'cn'">服务与支持</span><span v-if="lang === 'en'">Service & Support</span>
    </h3>
    <router-link to="/support" class="home-information-item-more">
      <span v-if="lang === 'cn'">更多</span><span v-if="lang === 'en'">MORE</span><span class="icon-more"></span>
    </router-link>
    <ul class="home-information-product-ul">
      <li v-for="item in items"><router-link :to="'/support?topic=' + item.name">{{item.name}}</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    items() {
      return this.$store.state.supportClassify
    }
  }
}
</script>

<style>

</style>
