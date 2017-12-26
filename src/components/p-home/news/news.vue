<template>
  <div class="home-information-news" v-if="item">
    <h3 class="home-information-item-title">News</h3>
    <router-link to="news" class="home-information-item-more">
      MORE<span class="icon-more"></span>
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
    item() {
      return this.$store.state.news
    }
  }
}
</script>

<style>

</style>
