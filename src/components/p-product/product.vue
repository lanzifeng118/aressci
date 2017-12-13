<template>
  <div class="product wrap">
    <div class="product-banner">
      <img :src="bannerSrc" alt="" height="130">
    </div>
    <div class="product-content f-clearfix">
      <product-category class="f-left""></product-category>
      <router-view keep-alive class="f-left""></router-view>
    </div>
  </div>
</template>

<script>
import homeVideo from 'components/p-product/video/video'
import productContact from 'components/p-product/contact/contact'
import productCategory from 'components/p-product/category/category'

export default {
  data() {
    return {
      bannerSrc: '/static/images/product-banner-all.jpg'
    }
  },
  watch: {
    '$route' (to, from) {
      this.findBanner()
    }
  },
  created() {
    this.findBanner()
  },
  methods: {
    findBanner() {
      let _this = this
      let path = this.$route.path.toLowerCase()
      let allPath = '/product/all'
      let listPath = '/product/list'
      let displayPath = '/product/display'
      if (path === allPath) {
        this.bannerSrc = '/static/images/product-banner-all.jpg'
      } else if (path.indexOf(listPath) === 0) {
        // list
        _this.$store.state.porducts.forEach((v, i) => {
          if (v.link.toLowerCase() === path) {
            this.bannerSrc = v.bannerSrc
          }
        })
      } else if (path.indexOf(displayPath) === 0) {
        // display
        _this.$store.state.porducts.forEach((v, i) => {
          let name = v.name.replace(/ /g, '').toLowerCase()
          if (path.indexOf(name) > 0) {
            this.bannerSrc = v.bannerSrc
          }
        })
      }
    }
  },
  components: {
    homeVideo,
    productContact,
    productCategory
  }
}
</script>

<style>
.product {
  margin-top: 10px;
}
.product-banner {
  margin-bottom: 12px;
}
.product-content {
  position: relative;
  padding-top: 30px;
  margin-bottom: 25px;
}
.product-position {
  top: 2px;
  left: 0;
  position: absolute;
}
/*product-contact*/
.product-contact {
  width: 254px;
  padding: 20px;
  margin-bottom: 15px;
}
.product-contact h3 {
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
.product-contact li {
  position: relative;
  display: block;
  color: #666;
  padding: 0 0 5px 12px;
  line-height: 1.5em;
}

.product-contact li::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #ccc;
  top: 7px;
  left: 0px;
}
.product-contact b {
  font-weight: bold;
  color: #0d93b8;
}
.product-contact a {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  display: inline-block;
}
.product-contact a:hover {
  color: #0d93b8;
}
</style>
