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
          v-for="itemLevel2 in classifyItems"
        >
          <router-link :to="itemLevel2.link" class="f-clearfix">
            <img :src="itemLevel2.imgSrc" :alt="itemLevel2.name">
            <div class="product-list-show-item-text">
              <h4 :title="itemLevel2.name">{{itemLevel2.name}}</h4>
              <p>Vantage solutions unify Phoenix Controls suite of scalable products for airflow control and system integration, monitoring, and management. The products range from precision valve controllers to network integration hardware and front-end displays of actionable data. Applications are standalone or implemented at the room, floor, or building level. Vantage solutions can complement existing building management systems by providing facilities the information. building management systems by providing facilities the information</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="paging" v-show="paging">
      <ul class="paging-ul noselect">
        <li
          :class="{grey: pagingPre}"
          @click="pagingPreClick"
        >
          <span class="icon-back"></span>
        </li>
        <li
          v-for="(item, index) in paging"
          :class="{active: item.active}"
          @click="pagingChange(index)"
        >
          {{item.num}}
        </li>
        <li
          :class="{grey: pagingNext}"
          @click="pagingNextClick"
        >
          <span class="icon-right"></span>
        </li>
      </ul>
    </div>
  </div>
  <div class="f-right">
    <product-contact></product-contact>
    <product-video></product-video>
  </div>
</div>
</template>

<script>
import productVideo from 'components/product/video/video'
import productContact from 'components/product/contact/contact'
export default {
  data() {
    return {
      classifyName: null,
      classifyItemsAll: null,
      classifyItems: null,
      paging: null,
      pagingTotal: 0,
      pagingPre: true,
      pagingNext: true,
      pagingIndex: 0,
      pagingNum: 5
    }
  },
  created() {
    this.getClassifyItems()
    this.pagingInit()
  },
  watch: {
    '$route' (to, from) {
      this.getClassifyItems()
      this.pagingInit()
    }
  },
  methods: {
    getClassifyItems() {
      this.pagingIndex = 0
      let _this = this
      let path = this.$route.path.toLowerCase()
      let listPath = '/product/list'
      _this.classifyItemsAll = []
      this.$store.state.porducts.forEach((v, i) => {
        if (path === listPath) {
          // all
          _this.classifyName = null
          _this.classifyItemsAll = _this.classifyItemsAll.concat(v.classifyLevel1)
        } else {
          // some
          if (v.link.toLowerCase() === path) {
            _this.classifyName = v.name
            _this.classifyItemsAll = v.classifyLevel1
          }
        }
      })
    },
    pagingInit() {
      this.pagingTotal = Math.ceil(this.classifyItemsAll.length / this.pagingNum)
      if (this.pagingTotal > 0) {
        this.paging = []
        for (let i = 0; i < this.pagingTotal; i++) {
          var obj = {num: i + 1, active: false}
          if (i === this.pagingIndex) {
            obj.active = true
          }
          this.paging.push(obj)
        }
        this.pagingPreNext()
      }
    },
    pagingPreNext() {
      this.showClassifyItems()
      if (this.pagingIndex === 0) {
        this.pagingPre = true
      } else {
        this.pagingPre = false
      }
      if (this.pagingIndex === this.pagingTotal - 1) {
        this.pagingNext = true
      } else {
        this.pagingNext = false
      }
    },
    showClassifyItems() {
      this.classifyItems = this.classifyItemsAll.slice(this.pagingIndex * this.pagingNum, this.pagingIndex * this.pagingNum + this.pagingNum)
    },
    pagingChange(index) {
      this.paging[this.pagingIndex].active = false
      this.pagingIndex = index
      this.paging[this.pagingIndex].active = true
      this.pagingPreNext()
    },
    pagingPreClick() {
      if (this.pagingIndex > 0) {
        this.paging[this.pagingIndex].active = false
        this.pagingIndex--
        this.paging[this.pagingIndex].active = true
        this.pagingPreNext()
      }
    },
    pagingNextClick() {
      if (this.pagingIndex < this.pagingTotal - 1) {
        this.paging[this.pagingIndex].active = false
        this.pagingIndex++
        this.paging[this.pagingIndex].active = true
        this.pagingPreNext()
      }
    }
  },
  components: {
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
