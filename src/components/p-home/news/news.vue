<template>
  <div class="home-information-news">
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
import api from 'components/tools/api'

export default {
  data() {
    return {
      item: {}
    }
  },
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      this.axios(api.newsList.queryByOne()).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          data.data.modifytime = data.data.modifytime.replace(/\s.+$/g, '')
          this.item = data.data
        }
      })
    }
  }
}
</script>

<style>

</style>
