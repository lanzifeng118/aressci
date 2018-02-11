<template>
  <div class="product-all wrap">
    <position page="index"></position>
    <div class="product-all-items-wrap">
      <ul class="product-all-items" v-if="items.length > 0">
        <li class="white-box" v-for="item in items">
          <router-link :to="item.link" class="f-clearfix">
            <div class="f-left product-all-item-left">
              <div class="product-all-item-logo">
                <img :src="item.logo" :alt="item.name">
              </div>
              <img v-if="item.product && item.product.length > 0" :src="item.product[0].img" :alt="item.product[0].name">
            </div>
            <div class="f-right product-all-item-right">
              <p v-if="item.product && item.product.length > 0">{{item.product[0].brief}}</p>
            </div>
            <router-link class="product-all-item-more" :to="item.link">MORE<span class="icon-more"></span></router-link>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import position from 'components/p-product/position/position'

export default {
  data() {
    return {
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    items() {
      return this.$store.state.productNav
    }
  },
  components: {
    position
  }
}
</script>

<style>
.product-all {
  width: 976px;
  margin-left: 20px;
}
.product-all-items-wrap {

}
.product-all-items>li {
  border-color: #e5e5e5;
  position: relative;
  margin-bottom: 20px;
}
.product-all-items>li>a {
  display: block;
}
.product-all-item-left {
  overflow: hidden;
  width: 240px;
  line-height: 0;
}
.product-all-item-left a {
  display: block;
  padding-top: 10px;
}
.product-all-item-logo {
  text-align: center;
  height: 51px;
  padding: 8px 0;
}
.product-all-item-logo img{
  max-width: 100%;
  max-height: 35px;
}
.product-all-item-right p {
  color: #333;
  line-height: 1.5em;
}
.product-all-item-right {
  padding: 55px 20px 15px 20px;
  width: 730px;
}
.product-all-item-more {
  position: absolute;
  top: 25px;
  right: 30px;
  color: #999;
  opacity: 0.4;
}
.product-all-items>li:hover .product-all-item-more {
  opacity: 1;
}
.product-all-item-more span{
  display: inline-block;
  margin-left: 5px;
}
</style>
