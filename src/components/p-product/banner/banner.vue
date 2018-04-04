<template>
  <div class="product-banner">
    <a v-if="item.link" :href="item.link" target="_blank">
      <img v-if="item.img" :src="item.img">
    </a>
    <img v-if="!item.link && item.img" :src="item.img">
  </div>
</template>

<script>
import api from 'components/tools/api'
import apiEn from 'components/tools/api-en'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      all: {
        img: '',
        link: ''
      },
      item: {
        img: '',
        link: ''
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getItem()
    },
    nav() {
      if (this.isInPath()) {
        this.getIn()
      }
    }
  },
  computed: mapState({
    nav: 'productNav',
    api(state) {
      return state.lang === 'cn' ? api : apiEn
    }
  }),
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      // console.log('getItem')
      if (this.isInPath()) {
        this.getIn()
      } else {
        this.getAll()
      }
    },
    getAll() {
      // console.log('getAll')
      if (!this.all.img) {
        this.axios(this.api.productBanner.query()).then(res => {
          let data = res.data
          if (data.code === '200') {
            this.all.img = data.data.img
            this.all.link = data.data.link
            this.item.img = this.all.img
            this.item.link = this.all.link
          }
        })
      } else {
        this.item.img = this.all.img
        this.item.link = this.all.link
      }
    },
    getIn() {
      // console.log('getIn')
      let id = this.$route.params.id
      if (id) {
        id = parseInt(id.split('-')[0].slice(1))
        let nav = this.nav
        let obj = null
        if (nav.length > 0) {
          for (let i = 0; i < nav.length; i++) {
            if (nav[i].id === id) {
              obj = nav[i]
              break
            }
          }
          if (obj && obj.banner_img) {
            this.item.img = obj.banner_img
            this.item.link = obj.banner_link
          } else {
            this.getAll()
          }
        }
      } else {
        this.getAll()
      }
    },
    isInPath() {
      let path = this.$route.path
      return path !== '/product/all' && path.indexOf('/product/search') < 0
    }
  }
}
</script>

<style>
.product-banner {
  margin-bottom: 12px;
  font-size: 0;
}
</style>
