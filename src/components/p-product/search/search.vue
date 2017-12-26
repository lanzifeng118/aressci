<template>
<div class="product-list">
  <div class="product-position position">
    <span class="icon-location_fill icon"></span>
    <router-link to="/">Home</router-link>
    <span class="icon-right"></span>
    <router-link to="/product">All Products Categories</router-link>
    <span class="icon-right"></span>
    <span v-if="searchText">SEARCH-{{searchText}}</span>
    <span v-if="!searchText">SEARCH ALL</span>
  </div>
  <div class="product-list-show f-left">
    <div class="product-list-show-classify">
      <div class="product-list-show-none" v-if="items.length === 0">
        {{noneText}}
      </div>
      <ul class="product-list-show-items" v-if="items.length > 0">
        <li
          class="white-box"
          v-for="item in items"
        >
          <router-link :to="item.link" class="f-clearfix">
            <img :src="item.img" :alt="item.name">
            <div class="product-list-show-item-text">
              <h4 :title="item.name">{{item.name}}</h4>
              <p>{{item.brief}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <paging
      v-if="items.length > 0"
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
import productContact from 'components/p-product/contact/contact'
import api from 'components/tools/api'

export default {
  data() {
    return {
      items: [],
      id: 0,
      searchText: '',
      noneText: '',
      // paging
      paging: {
        size: 4,
        no: 0,
        list: []
      }
    }
  },
  created() {
    this.getItems()
  },
  watch: {
    '$route' (to, from) {
      this.getItems()
    }
  },
  methods: {
    getSearch() {
      this.searchText = this.$route.params.id
    },
    getItems() {
      this.getSearch()
      this.noneText = ''

      let pageData = {
        page_size: this.paging.size,
        page_no: this.paging.no,
        name: this.searchText
      }
      this.axios(api.productList.query(pageData)).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          let list = data.data.list
          if (list.length === 0) {
            this.items = list
            this.noneText = 'None'
          } else {
            this.paging.list = new Array(Math.ceil(data.data.total / this.paging.size))
            // 查询分类
            this.axios(api.productClassify.query()).then((resC) => {
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
    productContact
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
.product-list-show-none {
  color: #ccc;
  text-align: center;
  font-size: 20px;
  padding-top: 30px;
}
.product-list-show-items a {
  display: block;
  padding: 20px 16px;
  height: 100%;
}
.product-list-show-items li{
  margin-bottom: 15px;
  height: 205px;
  border-color: #e5e5e5;
}
.product-list-show-items li img {
  float: left;
  width: 220px;
}
.product-list-show-item-text {
  width: 430px;
  float: right;
}
.product-list-show-item-text h4 {
  margin-bottom: 8px;
  font-weight: bold;
}
.product-list-show-item-text p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;
   -webkit-box-orient: vertical;
  line-height: 1.5em;
}
.product-list-show-items li:hover p {
  color: #333;
}
</style>
