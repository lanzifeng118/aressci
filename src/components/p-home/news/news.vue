<template>
  <div class="home-information-news" v-if="item">
    <h3 class="home-information-item-title">{{text.title[lang]}}</h3>
    <router-link to="news" class="home-information-item-more">
      {{text.more[lang]}}<span class="icon-more"></span>
    </router-link>
    <h4 class="home-information-item-h4">
      <router-link :to="'/news/display/p' + item.id">{{item.name}}</router-link>
    </h4>
    <p class="home-information-item-p">{{item.brief}}</p>
    <h5 class="home-information-news-time">{{item.modifytime}}</h5>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: mapState({
    lang: 'lang',
    item: 'news'
  })
}
</script>

<style>
.home-information-news-time {
  position: absolute;
  bottom: 15px;
  left: 25px;
  color: #bbb;
  font-size: 12px;
  width: 65px;
  overflow: hidden;
  white-space: nowrap;
}
</style>
