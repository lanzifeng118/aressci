<template>
  <div class="home-information-news" v-if="item">
    <h3 class="home-information-item-title"><span v-if="lang === 'cn'">新闻</span><span v-if="lang === 'en'">News</span></h3>
    <router-link to="news" class="home-information-item-more">
      <span v-if="lang === 'cn'">更多</span><span v-if="lang === 'en'">MORE</span><span class="icon-more"></span>
    </router-link>
    <h4 class="home-information-item-h4">
      <router-link :to="'/news/display/p' + item.id">{{item.name}}</router-link>
    </h4>
    <h5 class="home-information-item-time">{{item.modifytime}}</h5>
    <p class="home-information-item-p">{{item.brief}}</p>
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
    item() {
      return this.$store.state.news
    }
  }
}
</script>

<style>

</style>
