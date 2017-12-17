<template>
  <div class="home-information-news">
    <h3 class="home-information-item-title">Service & Support</h3>
    <router-link to="/support" class="home-information-item-more">
      MORE<span class="icon-more"></span>
    </router-link>
    <ul class="home-information-product-ul">
      <li v-for="item in items"><router-link to="/support">{{item.name}}</router-link></li>
    </ul>
  </div>
</template>

<script>
import api from 'components/tools/api'

export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    getItems() {
      this.axios(api.supportClassify.query()).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          this.items = data.data.list
        }
      })
    }
  }
}
</script>

<style>

</style>
