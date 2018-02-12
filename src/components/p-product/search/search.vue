<template>
<div class="product-list">
  <position>
    <span v-if="searchText">{{text.search[lang]}}-{{searchText}}</span>
    <span v-if="!searchText">{{text.searchAll[lang]}}</span>
  </position>
  <div class="product-list-show f-left">
    <div class="product-list-show-classify">
      <div class="product-query-text" v-if="queryText">{{queryText}}</div>
      <box v-if="items.length > 0" :items="items" search="Y"></box> 
    </div>
    <paging
      v-if="paging.total > 0"
      :paging="paging"
      @pagingNextClick="pagingNextClick"
      @pagingPreClick="pagingPreClick"
      @pagingChange="pagingChange"
    >
    </paging>
  </div>
  <div class="f-right">
    <product-contact></product-contact>
    <product-video></product-video>
  </div>
</div>
</template>

<script>
import paging from 'components/c-paging/paging'
import productVideo from 'components/p-product/video/video'
import box from 'components/p-product/box/box'
import productContact from 'components/p-product/contact/contact'
import position from 'components/p-product/position/position'
import api from 'components/tools/api'
import apiEn from 'components/tools/api-en'

export default {
  data() {
    return {
      items: [],
      id: 0,
      queryText: '',
      text: {
        search: {
          cn: '查询',
          en: 'SEARCH'
        },
        searchAll: {
          cn: '查询所有',
          en: 'SEARCH ALL'
        }
      },
      // paging
      paging: {
        size: 4,
        no: 0,
        total: 0
      }
    }
  },
  created() {
    this.getItems()
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    api() {
      return this.$store.state.lang === 'cn' ? api : apiEn
    },
    searchText() {
      return this.$route.params.id
    }
  },
  watch: {
    '$route' (to, from) {
      this.getItems()
    }
  },
  methods: {
    getItems() {
      this.queryText = this.lang === 'cn' ? '正在查询...' : 'Querying...'
      this.items = []
      this.paging.total = 0

      let pageData = {
        page_size: this.paging.size,
        page_no: this.paging.no,
        name: this.searchText
      }
      this.axios(this.api.productList.query(pageData)).then((res) => {
        let data = res.data
        // console.log(data)
        if (data.code === '200') {
          let list = data.data.list
          if (list.length === 0) {
            this.queryText = this.lang === 'cn' ? '无相关产品' : 'There is no related products'
          } else {
            // 查询分类
            this.axios(this.api.productClassify.query()).then((resC) => {
              let dataC = resC.data
              if (dataC.code === '200') {
                let obj = {}
                dataC.data.list.forEach((v, i) => {
                  if (!obj[v.name]) {
                    obj[v.name] = v.id
                  }
                })
                list.forEach((v, i) => {
                  v.link = `/product/display/c${obj[v.classify]}-p${v.id}`
                })
                this.queryText = ''
                this.paging.total = data.data.total
                this.items = list
              }
            })
          }
        }
      })
    },
    pagingPreClick() {
      this.paging.no --
      this.getItems()
    },
    pagingNextClick() {
      this.paging.no ++
      this.getItems()
    },
    pagingChange(index) {
      this.paging.no = index
      this.getItems()
    }
  },
  components: {
    paging,
    productVideo,
    productContact,
    position,
    box
  }
}
</script>

<style>
.product-list {
  margin-left: 30px;
  width: 976px;
}
.product-list-show {
  width: 700px;
}
/*classify*/
.product-list-show-classify {

}
</style>
