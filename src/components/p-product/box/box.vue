<template>
  <ul class="product-list-items-box">
    <li
      class="white-box"
      v-for="item in items"
    >
      <router-link :to="item.link" class="f-clearfix">
        <img :src="item.img" :alt="item.name">
        <div class="product-list-items-box-text">
          <h4 :title="item.name">
            {{item.name}}<span v-if="search === 'Y'">{{item.classify}}</span>
          </h4>
          <p>{{item.brief}}</p>
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
    return {
    }
  },
  created() {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style>
.product-list-items-box a {
  display: block;
  padding: 20px 16px;
  height: 100%;
}
.product-list-items-box li{
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
  font-weight: bold;
}
.product-list-items-box-text h4 > span {
  font-size: 12px;
  display: inline-block;
  margin-left: 5px;
  color: #999;
}
.product-list-items-box-text p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;
   -webkit-box-orient: vertical;
  line-height: 1.5em;
}
.product-list-items-box li:hover p {
  color: #333;
}
</style>
