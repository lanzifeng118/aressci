<template>
<div class="product-display">
  <position>
    <router-link :to="'/product/list/c' + classifyId">{{classifyName}}</router-link>
    <span class="icon-right"></span>
    {{item.name}}
  </position>
  <div class="product-display-wrap f-left" v-if="item.name">
    <div class="product-display-summary f-clearfix">
      <img v-if="item.img" :src="item.img" :alt="item.name" class="f-left">
      <div class="product-display-summary-text">
        <h4>{{item.name}}</h4>
        <p>{{item.brief}}</p>
      </div>
    </div>
    <div class="product-display-box">
      <div class="product-display-tab">
        <ul class="f-clearfix">
          <li :class="{active: tabShow[0]}" @click="tabClick(0)">
            <span v-if="lang === 'cn'">产品信息</span>
            <span v-if="lang === 'en'">Product Info</span>
          </li>
          <li :class="{active: tabShow[1]}" @click="tabClick(1)">
            <span v-if="lang === 'cn'">产品资源</span>
            <span v-if="lang === 'en'">Resources</span>
          </li>
        </ul>
      </div>
      <div class="product-display-detail">
        <!-- info -->
        <div class="product-display-info" v-show="tabShow[0]" v-html="item.detail"></div>
        <!-- resources -->
        <div class="product-display-resources" v-show="tabShow[1]">
          <h3>产品文档</h3>
          <table class="product-display-resources-table" v-if="item.resources && item.resources.length > 0">
            <thead>
              <tr>
                <th width="70">
                  <span v-if="lang === 'cn'">类型</span>
                  <span v-if="lang === 'en'">Type</span>
                </th>
                <th>
                  <span v-if="lang === 'cn'">文件名</span>
                  <span v-if="lang === 'en'">Name</span>
                </th>
                <th width="70">
                  <span v-if="lang === 'cn'">下载</span>
                  <span v-if="lang === 'en'">Download</span>
                </th>
                <th width="70">
                  <span v-if="lang === 'cn'">大小</span>
                  <span v-if="lang === 'en'">Size</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="itemR in item.resources">
                <td class="center">
                  <span v-if="itemR.type === 'pdf'" class="icon icon-pdf"></span>
                  <span v-if="itemR.type === 'doc'" class="icon icon-word"></span>
                  <span v-if="itemR.type === 'xlsx' || itemR.type === 'xls'" class="icon icon-excel"></span>
                </td>
                <td class="name">
                  <a v-if="itemR.type === 'pdf'" :href="itemR.url" target="_blank">{{itemR.name}}
                  </a>
                  <a v-if="itemR.type !== 'pdf'" :href="itemR.url" :download="itemR.name">{{itemR.name}}</a>
                </td>
                <td class="center">
                  <a :href="itemR.url" :download="itemR.name"><span class="icon-download"></span></a>
                </td>
                <td class="center">{{itemR.size}}</td>
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
  <toast
    v-show="toast.show"
    :text="toast.text"
    :icon="toast.icon"
  >
  </toast>
</div>
</template>

<script>
import productVideo from 'components/p-product/video/video'
import productContact from 'components/p-product/contact/contact'
import position from 'components/p-product/position/position'

import api from 'components/tools/api'
import apiEn from 'components/tools/api-en'
import util from 'components/tools/util'
import toast from 'components/toast/toast'

export default {
  data() {
    return {
      classifyId: 0,
      productId: 0,
      item: {},
      tabShow: [true, false],
      // toast
      toast: {
        show: false,
        text: '',
        icon: ''
      }
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    api() {
      return this.$store.state.lang === 'cn' ? api : apiEn
    },
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
      this.tabClick(0)
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
      this.axios(api.productList.queryById(this.productId)).then((res) => {
        let data = res.data
        // console.log(data)
        if (data.code === '200') {
          if (data.data) {
            this.item = data.data
          } else {
            let text = this.lang === 'cn' ? '此产品不存在' : 'This product does not exist.'
            util.toast.show(this.toast, text)
            util.goBack(() => {
              this.$router.push('/product/all')
            })
          }
        }
      })
    },
    tabClick(index) {
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
    productContact,
    toast,
    position
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
  margin-top: -1px;
  height: 32px;
  overflow: hidden;
}
.product-display-tab ul {
  height: 32px;
  background: #f6f6f6;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.product-display-tab li{
  cursor: pointer;
  float: left;
  padding: 8px 12px;
  line-height: 16px;
  margin-top: -1px;
  border-right: 1px solid #e5e5e5;
}
.product-display-tab li:hover {
}
.product-display-tab li.active {
  background-color: #fff;
  padding: 7px 12px 8px 12px;
  border-top: 2px solid #0d93b8;
  color: #0d93b8;
}
.product-display-detail {
  line-height: 1.5em;
  margin-top: -1px;
}
.product-display-detail>div {
  padding: 30px 25px;
  height: 605px;
  overflow-y: auto;
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
.product-display-resources-table a {
  display: block;
}
.product-display-resources-table td.center {
  text-align: center;
}
</style>
