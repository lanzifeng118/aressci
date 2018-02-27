<template>
  <ul class="product-list-items-box">
    <li class="white-box" v-for="item in items">
      <router-link :to="item.link" class="f-clearfix">
        <img v-if="item.img" :src="item.img">
        <div class="product-list-items-box-text">
          <h4 :title="item.name">
            <b v-html="item.name"></b>
            <span v-if="search === 'Y'" v-html="item.classify"></span>
          </h4>
          <h5 v-if="search === 'Y' && item.type === '4'">{{detail}}</h5>
          <p v-html="item.brief"></p>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    },
    search: {
      default: 'N'
    }
  },
  data() {
    return {}
  },
  computed: {
    detail() {
      return this.$store.state.lang === 'cn' ? '见信息详情' : 'See the info detail'
    }
  },
  created() {},
  methods: {},
  components: {}
}
</script>

<style>
.product-list-items-box a {
  position: relative;
  overflow: hidden;
  display: block;
  padding: 20px 16px;
  height: 100%;
}
.product-list-items-box li {
  margin-bottom: 15px;
  height: 205px;
  border-color: #e5e5e5;
}
.product-list-items-box li img {
  float: left;
  width: 220px;
}
.product-list-items-box-text {
  width: 430px;
  float: right;
}
.product-list-items-box-text h4 {
  margin-bottom: 8px;
}
.product-list-items-box-text h5 {
  font-size: 12px;
  color: #ff1a1a;
  position: absolute;
  right: 20px;
  top: 20px;
}
.product-list-items-box-text h4 > span {
  font-size: 12px;
  display: inline-block;
  margin-left: 5px;
  color: #999;
}
.product-list-items-box-text p {
  overflow: hidden;
  height: 147px;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  line-height: 1.5em;
}
.product-list-items-box li:hover p {
  color: #333;
}
</style>
