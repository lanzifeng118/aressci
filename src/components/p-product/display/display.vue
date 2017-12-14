<template>
<div class="product-display">
  <div class="product-position position">
    <span class="icon-location_fill icon"></span>
    <router-link to="/">Home</router-link>
    <span class="icon-right"></span>
    <router-link to="/product">All Products Categories</router-link>
    <span class="icon-right"></span>
    <router-link :to="'/product/list/c' + classifyId">{{classifyName}}</router-link>
    <span class="icon-right"></span>
    {{item.name}}
  </div>
  <div class="product-display-wrap f-left">
    <div class="product-display-summary f-clearfix">
      <img v-if="item.img" :src="item.img" :alt="item.name" class="f-left">
      <div class="product-display-summary-text">
        <h4>{{item.name}}</h4>
        <p>{{item.brief}}</p>
      </div>
    </div>
    <div class="product-display-box">
      <ul class="product-display-tab f-clearfix">
        <li :class="{active: tabShow[0]}" @click="show(0)">Product Info</li>
        <li :class="{active: tabShow[1]}" @click="show(1)">Resources</li>
      </ul>
      <div class="product-display-detail">
        <!-- info -->
        <div class="product-display-info" v-show="tabShow[0]" v-html="item.detail"></div>
        <!-- resources -->
        <div class="product-display-resources" v-show="tabShow[1]">
          <h3>Product Documentations</h3>
          <table class="product-display-resources-table" v-if="item.resources.length > 0">
            <thead>
              <tr>
                <th width="70">Type</th>
                <th>Name</th>
                <th width="70">Size</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="itemR in item.resources">
                <td class="type">
                  <span v-if="itemR.type === 'pdf'" class="icon icon-pdf"></span>
                  <span v-if="itemR.type === 'doc'" class="icon icon-word"></span>
                  <span v-if="itemR.type === 'xlsx' || itemR.type === 'xls'" class="icon icon-excel"></span>
                </td>
                <td class="name pointer">
                  <a v-if="itemR.type === 'pdf'" :href="itemR.url" target="_blank">{{itemR.name}}</a>
                  <a v-if="itemR.type !== 'pdf'" :href="itemR.url" :download="itemR.name">{{itemR.name}}</a>
                </td>
                <td class="size">{{itemR.size}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="f-right">
    <product-contact></product-contact>
    <product-video></product-video>
  </div>
</div>
</template>

<script>
import productVideo from 'components/p-product/video/video'
import productContact from 'components/p-product/contact/contact'
import api from 'components/tools/api'

export default {
  data() {
    return {
      classifyId: 0,
      productId: 0,
      item: {},
      tabShow: [true, false, false]
    }
  },
  computed: {
    classifyName() {
      let name = ''
      let nav = this.$store.state.productNav
      if (nav) {
        for (var i = 0; i < nav.length; i++) {
          if (nav[i].id === this.classifyId) {
            name = nav[i].name
            break
          }
        }
      }
      return name
    }
  },
  watch: {
    '$route' (to, from) {
      this.getIds()
      this.getItem()
    }
  },
  created() {
    this.getIds()
    this.getItem()
  },
  methods: {
    getIds() {
      let arr = this.$route.params.id.split('-')
      this.classifyId = parseInt(arr[0].slice(1))
      this.productId = parseInt(arr[1].slice(1))
    },
    getItem() {
      console.log('getItem')
      this.axios(api.productList.queryById(this.productId)).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          if (data.data) {
            this.item = data.data
          } else {
            // util.toast.show(this.toast, '此产品不存在', 'close')
            // this.goBack()
          }
        }
      })
    },
    show(index) {
      this.tabShow.forEach((v, i) => {
        let show = false
        if (i === index) {
          show = true
        }
        this.$set(this.tabShow, i, show)
      })
    }
  },
  components: {
    productVideo,
    productContact
  }
}
</script>

<style>
.product-display {
  width: 976px;
  margin-left: 30px;
}
.product-display-wrap {
  width: 700px;
}
/*summary*/
.product-display-summary {
  margin-bottom: 20px;
}
.product-display-summary img{
  width: 220px;
  min-height: 100px;
  max-height: 170px;
  margin-right: 10px;
  margin-bottom: 5px;
}
.product-display-summary-text h4 {
  color: #0d93b8;
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}
.product-display-summary-text p {
  line-height: 1.5em;
}
.product-display-box {
  border: 1px solid #e5e5e5;
}
/*tab*/
.product-display-tab {
  height: 32px;
  background: #f6f6f6;
  border-bottom: 1px solid #E5E5E5;
}
.product-display-tab li{
  cursor: pointer;
  float: left;
  padding: 8px 12px;
  line-height: 16px;
  margin-top: -1px;
  border-right: 1px solid #E5E5E5;
}
.product-display-tab li:hover {
}
.product-display-tab li.active {
  background-color: #fff;
  padding: 6px 10px 10px 10px;
  border-top: 2px solid #0d93b8;
  color: #0d93b8;
}
.product-display-detail {
  line-height: 1.5em;
  margin-top: -1px;
}
.product-display-detail>div {
  padding: 30px 25px;
  min-height: 605px;
}
div.product-display-info {
  color: #7d6666;
  padding-top: 15px;
}
.product-display-info  h1 {
  color: #0d93b8;
  font-weight: bold;
  margin: 15px 0;
}
.product-display-info p {
  margin: 10px 0;
}
.product-display-info ul,
.product-display-how ul {
  margin: 10px 0 10px 15px;
}
.product-display-info li {
  position: relative;
  display: block;
  padding: 0 0 5px 12px;
  line-height: 1.5em;
}
.product-display-info li::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background: #86b513;
  top: 7px;
  left: 0px;
}
.product-display-resources h3 {
  color: #0d93b8;
  font-weight: bold;
  margin-bottom: 15px;
}
.product-display-resources-table th {
  border-top: 1px solid #efefef;
}
.product-display-resources-table th,
.product-display-resources-table td {
  padding: 6px 0;
  vertical-align: middle;
  border-bottom: 1px solid #efefef;
}
.product-display-resources-table td.type {
  text-align: center;
}
.product-display-resources-table td.size {
  text-align: center;
}
</style>
