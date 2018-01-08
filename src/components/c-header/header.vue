<template>
  <div class="header">
    <div class="header-box wrap f-clearfix">
      <!-- header-logo -->
      <div class="header-logo f-left">
        <router-link to="/home"><img v-if="basicInfo.logo" :src="basicInfo.logo"></router-link>
      </div>
      <h1 class="header-company f-left"><router-link to="/home">{{basicInfo.full_name}}</router-link></h1>
      <!--header-version-->
      <div class="f-right">
        <div class="header-version">
          <p><img src="static/images/icon-Chinese.png" alt=""></p>
          <p><a href="http://lanzifeng.com/en" target="_blank"><img src="static/images/icon-English.png" alt=""></a></p>
        </div>
        <!-- header-search -->
        <div class="header-search">
          <div class="header-search-box f-clearfix">
            <input class="header-search-input f-left" v-model="searchText">
            <div class="header-search-submit f-right" @click="searchSubmit">
              <span class="icon-search"></span>
              搜索
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- header-nav -->
    <div class="header-nav">
      <ul class="header-nav-ul wrap f-clearfix">
        <li
          class="header-nav-li"
          v-for="(item, index) in navItems"
          @mouseenter="hoverInList(index)"
          @mouseleave="hoverOutList(index)"
        >
          <div
            @click="showListProduct"
            class="header-nav-li-div"
          >
            <router-link :to="item.link">{{item.name}}</router-link>
          </div>
          <!-- classify -->
          <div
            class="header-nav-li-list"
            v-if="item.list && item.list.length > 0"
            :style="'height:' +  listHeight + 'px'"
          >
            <div class="wrap">
              <ul class="header-nav-li-level level01">
                <li v-for="listValue in item.list">
                  <div @click="showListProduct" class="header-nav-li-level-classify">
                    <router-link :to="listValue.link" @click="showListProduct">
                      <img v-if="listValue.logo" :src="listValue.logo" :alt="listValue.name">
                    </router-link>
                  </div>
                  <!-- product -->
                  <ul
                    v-if="listValue.product"
                    class="header-nav-li-level level02"
                  >
                    <li v-for="itemLevel1 in listValue.product">
                      <div @click="showListProduct">
                        <router-link :to="itemLevel1.link">
                          {{itemLevel1.name}}
                        </router-link>
                      </div>
                      <div class="header-nav-li-product-img">
                        <img :src="itemLevel1.img" alt="">
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from 'components/tools/api'
export default {
  data() {
    return {
      // navItems
      navItems: [
        {name: '首页', link: '/home'},
        {
          name: '产品',
          link: '/product',
          list: []
        },
        {
          name: '项目经验',
          link: '/experience'
        },
        {name: '服务与支持', link: '/support'},
        {name: '新闻', link: '/news'},
        {name: '关于我们', link: '/aboutus'}
      ],

      searchText: '',
      listHeight: 0
    }
  },
  computed: {
    basicInfo() {
      return this.$store.state.basicInfo
    }
  },
  created() {
    console.log(this.basicInfo)
    this.getNav()
  },
  methods: {
    getNav() {
      this.axios(api.nav.query({prdcount: '2'})).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          let list = data.data.list
          if (list && list.length > 0) {
            list.forEach((v, i) => {
              v.link = `/product/list/c${v.id}`
              v.product.forEach((vP, iP) => {
                vP.link = `/product/display/c${v.id}-p${vP.id}`
              })
            })
            this.navItems[1].list = list
          }
          let aboutusId = data.data.aboutusId
          if (aboutusId) {
            this.$store.state.aboutusId = aboutusId
            this.navItems[5].link = `/aboutus/display/c${aboutusId}`
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    searchSubmit() {
      this.$router.push(`/product/search/${this.searchText}`)
    },
    hoverInList(index) {
      if (index === 1) {
        this.listHeight = 280
      }
    },
    hoverOutList(index) {
      if (index === 1) {
        this.listHeight = 0
      }
    },
    showListProduct() {
      this.listHeight = 0
    }
  }
}
</script>

<style>
  .header {
    position: relative;
    z-index: 3;
    background-color: #fff;
  }
  /*header-box*/
  .header-box {
    position: relative;
    height: 90px;
    padding: 5px 0;
  }
  .header-logo {
    font-size: 0
  }
  .header-logo img {
    max-width: 300px;
    max-height: 80px;
  }
  .header-version {
    margin-right: 1px;
    text-align: right;
    margin: 6px 0 8px 0;
    color: #ccc;
  }
  .header-version img {
    height: 20px;
  }
  .header-version p {
    display: inline-block;
    margin-left: 5px;
  }
  .header-company a{
    margin-left: 20px;
    line-height: 80px;
    color: #0d93b8;
    font-size: 28px;
  }
  /*header-search-box*/
  .header-search-box {
    position: relative;
  }
  .header-search-input {
    height: 37px;
    width: 200px;
    border: 1px solid #e0e0e0;
  }
  .header-search-submit {
    cursor: pointer;
    font-size: 12px;
    line-height: 35px;
    text-align: center;
    color: #666;
    width: 100px;
    transition: all 0.2s;
    border: 1px solid #e0e0e0;
    margin-left: -1px;
  }
  .header-search-box:hover  .header-search-input,
  .header-search-box:hover  .header-search-submit {
    border-color: #cdcdcd;
  }
  .header-search-submit:hover {
    background-color: #0d93b8;
    border-color: #0d93b8 !important;
    color: #fff;
  }
  /*header-nav*/
  .header-nav {
    position: relative;
    background-color: #0d93b8;
  }
  .header-nav-ul {
    z-index: 9;
  }
  .header-nav-li {
    display: inline-block;
    float: left;
  }
  .header-nav-li:nth-child(1) {
    width: 160px;
  }
  .header-nav-li:nth-child(2) {
    width: 185px;
  }
  .header-nav-li:nth-child(3) {
    width: 270px;
  }
  .header-nav-li:nth-child(4) {
    width: 256px;
  }
  .header-nav-li:nth-child(5) {
    width: 160px;
  }
  .header-nav-li:nth-child(6) {
    width: 195px;
  }

  .header-nav-li-div>a {
    padding: 0 15px;
    background-color: #0d93b8;
    display: block;
    text-align: center;
    line-height: 40px;
    color: #fff;
    text-align: center;
    transition: all 0.2s;
  }
  .header-nav-li:hover>div>a {
    background-color: #008cb3;
  }
  .header-nav-li-div>a.active {
    background-color: #007c9e !important;
  }
  /*header-nav-li-list */
  .header-nav-li-list {
    z-index: 2;
    position: absolute;
    background: rgba(255,255,255,0.7);
    top: 40px;
    left: 0;
    width: 100%;
    overflow: hidden;
    transition: all 0.2s;
  }
  .header-nav-li:hover {
    background-color: #222;
  }
  .header-nav-li:hover .header-nav-li-list {
    -webkit-box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  }
  .header-nav-li-list-wrap {
    width: 1000px;
    margin:  0 auto;
  }
  .header-nav-li-level {
    height: 280px;
    padding: 10px 0;
    background:  rgba(255,255,255,0.5);
  }
  .header-nav-li-level li a {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 8px 25px;
  }
  .header-nav-li-level li:hover>div>a {
    background-color: #fff;
  }
  .header-nav-li-level-classify img {
    height: 30px;
  }
  /*level01*/
  .header-nav-li-level.level01>li>div>a {
    text-align: right;
    border-color: #fff;
  }
  .header-nav-li-level.level01>li:hover>div>a {
    padding-right: 20px;
  }
  .header-nav-li-level.level01 {
    position: relative;
    width: 280px;
  }
  /*level02*/
  .header-nav-li-level.level02 {
    background: rgba(220,220,220,0.8);
    position: absolute;
    top: 0;
    left: 280px;
  }
  .header-nav-li-level.level02 li{
    width: 0;
    overflow: hidden;
  }
  .header-nav-li-level.level01>li:hover .header-nav-li-level.level02>li{
    width: 280px;
  }
  .header-nav-li-product-img {
    display: none;
    position: absolute;
    top: 0;
    left: 280px;
    height: 100%;
    width: 280px;
    text-align: center;
    padding-top: 50px;
    background-color: rgba(205,205,205,0.8);
  }
  .header-nav-li-product-img img{
    height: 180px;
  }
  .header-nav-li-level.level02>li:hover .header-nav-li-product-img{
    display: block;
  }
</style>
