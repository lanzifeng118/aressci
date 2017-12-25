<template>
<div class="product-list">
  <div class="product-position position">
    <span class="icon-location_fill icon"></span>
    <router-link to="/">Home</router-link>
    <span class="icon-right"></span>
    <router-link to="/product">All Products Categories</router-link>
    <span class="icon-right" v-if="classifyName"></span>
    <span v-if="classifyName">{{classifyName}}</span>
  </div>
  <div class="product-list-show f-left">
    <div class="product-list-show-classify">
      <ul class="product-list-show-items">
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
      :paging="paging"
      @pagingNextClick="pagingNextClick"
      @pagingPreClick="pagingPreClick"
      @pagingChange="pagingChange"
    >
    </paging>
  </div>
  <div class="f-right">
    <product-contact></product-contact>
    <product-video v-if="classifyName" classify="classifyName"></product-video>
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
      id: '',
      // paging
      paging: {
        size: 4,
        no: 0,
        list: []
      }
    }
  },
  computed: {
    classifyName() {
      let name = ''
      let nav = this.$store.state.productNav
      if (nav) {
        for (var i = 0; i < nav.length; i++) {
          if (nav[i].id === this.id) {
            name = nav[i].name
            break
          }
        }
      }
      return name
    }
  },
  created() {
    this.getId()
  },
  watch: {
    '$route' (to, from) {
      this.getId()
      this.getItems()
    },
    classifyName() {
      this.getItems()
    }
  },
  methods: {
    getId() {
      this.id = parseInt(this.$route.params.id.slice(1))
    },
    getItems() {
      let pageData = {
        page_size: this.paging.size,
        page_no: this.paging.no,
        classify: this.classifyName
      }
      this.axios(api.productList.query(pageData)).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          this.paging.list = new Array(Math.ceil(data.data.total / this.paging.size))
          data.data.list.forEach((v, i) => {
            v.link = `/product/display/c${this.id}-p${v.id}`
          })
          this.items = data.data.list
        } else {
          // util.req.queryError(this.toast)
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
