<template>
  <!-- nav -->
  <div class="nav">
    <ul class="nav-ul wrap f-clearfix">
      <li class="nav-li" v-for="(item, index) in navItems" @mouseenter="showList(index)" @mouseleave="hideList(index)">
        <div @click="hideList(index)" class="nav-li-div">
          <router-link :to="item.link">{{item.name}}</router-link>
        </div>
        <!-- classify -->
        <div class="nav-li-list" v-if="item.list && item.list.length > 0" :style="{height: listHeight + 'px'}">
          <div class="wrap">
            <ul class="nav-li-level level01">
              <li v-for="listValue in item.list">
                <div @click="hideList(index)" class="nav-li-level-classify">
                  <router-link :to="listValue.link">
                    <img v-if="listValue.logo" :src="listValue.logo" :alt="listValue.name">
                  </router-link>
                </div>
                <!-- product -->
                <ul v-if="listValue.product" class="nav-li-level level02" :style="{height: listHeight + 'px'}">
                  <li v-for="itemLevel1 in listValue.product">
                    <div @click="hideList(index)">
                      <router-link :to="itemLevel1.link">
                        {{itemLevel1.name}}
                      </router-link>
                    </div>
                    <div class="nav-li-product-img">
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
</template>

<script>
import api from 'components/tools/api'
import apiEn from 'components/tools/api-en'

export default {
  data() {
    return {
      listHeight: 0
    }
  },
  computed: {
    api() {
      return this.$store.state.lang === 'cn' ? api : apiEn
    },
    navItems() {
      return this.$store.state.navItems
    }
  },
  created() {
    this.getNav()
  },
  methods: {
    getNav() {
      // { prdcount: '8' }
      this.axios(this.api.nav.query())
        .then(res => {
          let data = res.data
          // console.log(data)
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
        })
        .catch(err => {
          console.log(err)
        })
    },
    showList(index) {
      if (index === 1) {
        let height = 36 * this.navItems[1].list.length + 20
        this.listHeight = height > 280 ? height : 280
      }
    },
    hideList(index) {
      if (index === 1) {
        this.listHeight = 0
      }
    }
  }
}
</script>

<style>
/*nav*/
.nav {
  position: relative;
  background-color: #0d93b8;
}
.nav-ul {
  z-index: 9;
}
.nav-li {
  float: left;
}
.nav-li:nth-child(1) {
  width: 160px;
}
.nav-li:nth-child(2) {
  width: 185px;
}
.nav-li:nth-child(3) {
  width: 270px;
}
.nav-li:nth-child(4) {
  width: 256px;
}
.nav-li:nth-child(5) {
  width: 160px;
}
.nav-li:nth-child(6) {
  width: 195px;
}

.nav-li-div > a {
  padding: 0 15px;
  background-color: #0d93b8;
  display: block;
  text-align: center;
  line-height: 40px;
  color: #fff;
  text-align: center;
  transition: all 0.2s;
}
.nav-li:hover > div > a {
  background-color: #008cb3;
}
.nav-li-div > a.active {
  background-color: #007c9e !important;
}
/*nav-li-list */
.nav-li-list {
  z-index: 2;
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  top: 40px;
  left: 0;
  width: 100%;
  overflow: hidden;
  transition: all 0.2s;
}
.nav-li:hover {
  background-color: #222;
}
.nav-li:hover .nav-li-list {
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
.nav-li-list > .wrap {
  height: 100%;
}
.nav-li-level {
  height: 100%;
  padding: 10px 0;
  background: rgba(255, 255, 255, 0.5);
}
.nav-li-level li a {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 8px 25px;
}
.nav-li-level li:hover > div > a {
  background-color: #fff;
}
.nav-li-level-classify img {
  height: 28px;
}
/*level01*/
.nav-li-level.level01 > li > div > a {
  padding: 3px 25px;
  text-align: right;
  border-color: #fff;
}
.nav-li-level.level01 > li:hover > div > a {
  padding-right: 20px;
}
.nav-li-level.level01 {
  position: relative;
  width: 280px;
}
/*level02*/
.nav-li-level.level02 {
  /* overflow-y: hidden; */
  background: rgba(220, 220, 220, 0.8);
  position: absolute;
  top: 0;
  left: 280px;
}
.nav-li-level.level02 li {
  width: 0;
  overflow: hidden;
}
.nav-li-level.level01 > li:hover .nav-li-level.level02 > li {
  width: 280px;
}
.nav-li-product-img {
  display: none;
  position: absolute;
  top: 0;
  left: 280px;
  height: 100%;
  width: 280px;
  text-align: center;
  padding-top: 50px;
  background-color: rgba(205, 205, 205, 0.8);
}
.nav-li-product-img img {
  height: 180px;
}
.nav-li-level.level02 > li:hover .nav-li-product-img {
  display: block;
}
</style>
