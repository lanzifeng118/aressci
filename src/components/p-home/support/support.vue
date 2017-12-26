<template>
  <div class="home-information-news">
    <h3 class="home-information-item-title">Service & Support</h3>
    <router-link to="/support" class="home-information-item-more">
      MORE<span class="icon-more"></span>
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
    items() {
      return this.$store.state.supportClassify
    }
  }
}
</script>

<style>

</style>
