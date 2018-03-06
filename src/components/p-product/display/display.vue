<template>
  <div class="product-display">
    <position>
      <router-link :to="'/product/list/c' + id.classify">{{classifyName}}</router-link>
      <span class="icon-right"></span>
      {{item.name}}
    </position>
    <div class="product-display-wrap f-left">
      <div class="product-query-text" v-show="queryText">{{queryText}}</div>
      <div v-if="item.name">
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
                {{text.info[lang]}}
              </li>
              <li :class="{active: tabShow[1]}" @click="tabClick(1)">
                {{text.resource[lang]}}
              </li>
            </ul>
          </div>
          <div class="product-display-detail">
            <!-- info -->
            <div class="product-display-info" v-show="tabShow[0]" v-html="item.detail"></div>
            <!-- resources -->
            <div class="product-display-resources" v-show="tabShow[1]">
              <h3>{{text.doc[lang]}}</h3>
              <table class="product-display-resources-table" v-if="item.resources && item.resources.length > 0">
                <thead>
                  <tr>
                    <th width="70">{{text.type[lang]}}</th>
                    <th>{{text.name[lang]}}</th>
                    <th width="70">{{text.download[lang]}}</th>
                    <th width="70">{{text.size[lang]}}</th>
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
                      <a :href="itemR.url" :download="itemR.name">
                        <span class="icon-download"></span>
                      </a>
                    </td>
                    <td class="center">{{itemR.size}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="f-right">
      <product-contact></product-contact>
      <product-video v-if="classifyName" :classify="classifyName"></product-video>
    </div>
    <toast v-show="toast.show" :text="toast.text" :icon="toast.icon">
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
      queryText: '',
      item: {},
      tabShow: [true, false],
      // toast
      toast: {
        show: false,
        text: '',
        icon: ''
      },
      text: {
        info: {
          cn: '产品信息',
          en: 'Product Info'
        },
        resource: {
          cn: '产品资源',
          en: 'Resources'
        },
        doc: {
          cn: '产品文档',
          en: 'Product Documents'
        },
        type: {
          cn: '类型',
          en: 'Type'
        },
        name: {
          cn: '文件名',
          en: 'Name'
        },
        download: {
          cn: '下载',
          en: 'Download'
        },
        size: {
          cn: '大小',
          en: 'Size'
        }
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
    id() {
      let arr = this.$route.params.id.split('-')
      let classify = parseInt(arr[0].slice(1))
      let product = parseInt(arr[1].slice(1))
      return {
        classify,
        product
      }
    },
    classifyName() {
      let name = ''
      let nav = this.$store.state.productNav
      if (nav) {
        for (var i = 0; i < nav.length; i++) {
          if (nav[i].id === this.id.classify) {
            name = nav[i].name
            break
          }
        }
      }
      return name
    }
  },
  watch: {
    $route(to, from) {
      this.tabClick(0)
      this.getItem()
    }
  },
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      this.queryText = this.lang === 'cn' ? '正在查询...' : 'Querying...'
      this.item = {}
      this.axios(this.api.productList.queryById(this.id.product)).then(res => {
        let data = res.data
        // console.log(data)
        if (data.code === '200') {
          this.queryText = ''
          if (data.data) {
            this.item = data.data
          } else {
            let text =
              this.lang === 'cn'
                ? '此产品不存在'
                : 'This product does not exist.'
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
.product-display-summary img {
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
.product-display-tab li {
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
.product-display-detail > div {
  padding: 30px 25px;
  height: 605px;
  overflow-y: auto;
}
div.product-display-info {
  color: #7d6666;
  padding-top: 15px;
}
.product-display-info h1 {
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
