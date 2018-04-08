<template>
  <div class="product wrap">
    <product-banner></product-banner>
    <div class="product-content f-clearfix">
      <product-category class="f-left"></product-category>
      <router-view keep-alive class="f-left"></router-view>
    </div>
  </div>
</template>

<script>
import productBanner from 'components/p-product/banner/banner'
import productContact from 'components/p-product/contact/contact'
import productCategory from 'components/p-product/category/category'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: mapGetters({
    api: 'api'
  }),
  created() {
    this.getNav()
  },
  methods: {
    getNav() {
      this.axios(this.api.nav.query()).then((res) => {
        let data = res.data
        if (data.code === '200') {
          let list = data.data.list
          if (list && list.length > 0) {
            list.forEach((v, i) => {
              v.link = `/product/list/c${v.id}`
              v.open = false
              v.product.forEach((vP, iP) => {
                vP.link = `/product/display/c${v.id}-p${vP.id}`
              })
            })
            this.$store.commit('setProductNav', list)
          }
        }
      })
    }
  },
  components: {
    productBanner,
    productContact,
    productCategory
  }
}
</script>

<style>
.product {
  margin-top: 10px;
}
.product-content {
  position: relative;
  padding-top: 30px;
  margin-bottom: 25px;
}
.product-query-text {
  color: #ccc;
  text-align: center;
  font-size: 20px;
  padding-top: 30px;
}
</style>
