<template>
  <div class="product-list">
    <position>
      <span v-if="classifyName">{{classifyName}}</span>
    </position>
    <div class="product-list-show f-left">
      <div class="product-query-text" v-show="queryText">{{queryText}}</div>
      <div class="product-list-show-classify">
        <box v-if="items.length > 0" :items="items"></box>
      </div>
      <paging v-if="paging.total > 0" :paging="paging" @pagingNextClick="pagingNextClick" @pagingPreClick="pagingPreClick" @pagingChange="pagingChange">
      </paging>
    </div>
    <div class="f-right">
      <product-contact></product-contact>
      <product-video v-if="classifyName" :classify="classifyName"></product-video>
    </div>
  </div>
</template>

<script>
import paging from 'components/c-paging/paging'
import productVideo from 'components/p-product/video/video'
import productContact from 'components/p-product/contact/contact'
import box from 'components/p-product/box/box'
import position from 'components/p-product/position/position'
import util from 'components/tools/util'
import api from 'components/tools/api'
import apiEn from 'components/tools/api-en'

export default {
  data() {
    return {
      items: [],
      queryText: '',
      // paging
      paging: {
        size: 4,
        no: 0,
        total: 0
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
      let id = this.$route.params.id
      return id && parseInt(id.slice(1))
    },
    classifyName() {
      let name = void 0
      let nav = this.$store.state.productNav
      if (nav.length) {
        name = ''
        if (this.id !== void 0) {
          for (var i = 0; i < nav.length; i++) {
            if (nav[i].id === this.id) {
              name = nav[i].name
              break
            }
          }
        }
      }
      return name
    }
  },
  created() {
    this.getItems()
  },
  watch: {
    classifyName() {
      this.getItems()
    }
  },
  methods: {
    getItems() {
      if (this.classifyName === void 0) {
        return
      }
      this.items = []
      this.queryText = this.lang === 'cn' ? '正在查询...' : 'Querying...'
      this.paging.total = 0
      if (this.classifyName === '') {
        this.queryText =
          this.lang === 'cn'
            ? '无该品牌数据，正在跳转...'
            : 'There is no data about this brand. Jumping...'
        util.goBack(() => {
          this.$router.push('/product/all')
        })
        return
      }
      let pageData = {
        page_size: this.paging.size,
        page_no: this.paging.no,
        classify: this.classifyName
      }
      this.axios(this.api.productList.query(pageData)).then(res => {
        let data = res.data
        // console.log(data)
        if (data.code === '200') {
          let list = data.data.list
          if (list.length === 0) {
            this.queryText =
              this.lang === 'cn'
                ? `无${this.classifyName}产品`
                : `There are no products of ${this.classifyName}`
          } else {
            data.data.list.forEach((v, i) => {
              v.link = `/product/display/c${this.id}-p${v.id}`
            })
            this.queryText = ''
            this.items = data.data.list
            this.paging.total = data.data.total
          }
        }
      })
    },
    pagingPreClick() {
      this.paging.no--
      this.getItems()
    },
    pagingNextClick() {
      this.paging.no++
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
