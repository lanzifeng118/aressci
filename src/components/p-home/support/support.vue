<template>
  <div class="home-information-news">
    <h3 class="home-information-item-title">
      {{lang === 'cn' ? '服务与支持' : 'Service & Support'}}
    </h3>
    <router-link to="/support" class="home-information-item-more">
      {{lang === 'cn' ? '更多' : 'MORE'}}<span class="icon-more"></span>
    </router-link>
    <ul class="home-information-product-ul">
      <li v-for="item in items"><router-link :to="'/support?topic=' + item.name">{{item.name}}</router-link></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: mapGetters({
    lang: 'lang',
    items: 'supportClassify'
  })
}
</script>

<style>

</style>
