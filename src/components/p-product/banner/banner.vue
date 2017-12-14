<template>
<div class="product-banner">
  <a v-if="item.link" :href="item.link"><img v-if="item.img" :src="item.img"></a>
  <img v-if="!item.link && item.img" :src="item.img">
</div>
</template>

<script>
import api from 'components/tools/api'

export default {
  data() {
    return {
      id: 0,
      item: {
        img: '',
        link: ''
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.getItem()
    },
    itemC() {
      this.getItem()
    }
  },
  computed: {
    itemC() {
      let obj = {}
      let nav = this.$store.state.productNav
      if (nav) {
        for (var i = 0; i < nav.length; i++) {
          if (nav[i].id === this.id) {
            obj = nav[i]
            break
          }
        }
      }
      console.log(obj)
      return obj
    }
  },
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      let path = this.$route.path
      if (path === '/product/all') {
        this.axios(api.productBanner.query()).then((res) => {
          let data = res.data
          if (data.code === '200') {
            this.item = data.data
          } else {
            // util.req.queryError(this.toast)
          }
        })
      } else {
        this.getId()
      }
    },
    getId() {
      var id = this.$route.params.id
      if (id) {
        let arr = id.split('-')
        this.id = parseInt(arr[0].slice(1))
        this.item.img = this.itemC.banner_img
        this.item.link = this.itemC.banner_link
      }
    }
  }
}
</script>

<style>
.product-banner {
  margin-bottom: 12px;
}
</style>
