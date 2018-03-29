<template>
  <div class="home-information-news">
    <h3 class="home-information-item-title">
      {{text.title[lang]}}
    </h3>
    <router-link to="/support" class="home-information-item-more">
      {{text.more[lang]}}<span class="icon-more"></span>
    </router-link>
    <ul class="home-information-product-ul">
      <li v-for="item in items"><router-link :to="'/support?topic=' + item.name">{{item.name}}</router-link></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      text: {
        title: {
          cn: '服务与支持',
          en: 'Service & Support'
        },
        more: {
          cn: '更多',
          en: 'MORE'
        }
      }
    }
  },
  computed: mapState({
    lang: 'lang',
    items: 'supportClassify'
  })
}
</script>

<style>

</style>
