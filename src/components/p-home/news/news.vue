<template>
  <div class="home-information-news" v-if="item">
    <h3 class="home-information-item-title">{{text.title[lang]}}</h3>
    <router-link to="news" class="home-information-item-more">
      {{text.more[lang]}}<span class="icon-more"></span>
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
      text: {
        title: {
          cn: '新闻',
          en: 'News'
        },
        more: {
          cn: '更多',
          en: 'MORE'
        }
      }
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
