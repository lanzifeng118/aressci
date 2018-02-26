<template>
  <div class="header">
    <div class="header-box wrap f-clearfix">
      <!-- header-logo -->
      <div class="header-logo f-left">
        <router-link to="/home"><img v-if="basicInfo.logo" :src="basicInfo.logo"></router-link>
      </div>
      <h1 class="header-company f-left"><router-link to="/home" :style="'font-size:' + companySize">{{basicInfo.full_name}}</router-link></h1>
      <div class="f-right">
        <!--header-version-->
        <div v-if="lang === 'cn'" class="header-version">
          <p><img src="static/images/icon-Chinese.png" alt=""></p>
          <p><a href="/en" target="_blank"><img src="static/images/icon-English.png" alt=""></a></p>
        </div>
        <div v-if="lang === 'en'" class="header-version">
          <p><a href="/" target="_blank"><img src="static/images/icon-Chinese.png" alt=""></a></p>
          <p><img src="static/images/icon-English.png" alt=""></p>
        </div>
        <!-- header-search -->
        <div class="header-search">
          <div class="header-search-box f-clearfix">
            <input ref="searchInput" class="header-search-input f-left" v-model.trim="searchText">
            <div class="header-search-submit f-right" @click="searchSubmit">
              <span class="icon-search"></span>
              <span v-if="lang === 'cn'">搜索</span>
              <span v-if="lang === 'en'">SEARCH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-nav></v-nav>
  </div>
</template>

<script>
import vNav from 'components/c-nav/nav'

export default {
  data() {
    return {
      searchText: '',
      listHeight: 0
    }
  },
  computed: {
    basicInfo() {
      return this.$store.state.basicInfo
    },
    lang() {
      return this.$store.state.lang
    },
    companySize() {
      return this.$store.state.lang === 'cn' ? '26px' : '28px'
    }
  },
  created() {
  },
  mounted() {
    window.addEventListener('keyup', this.enterSubmit)
  },
  destroyed() {
    window.removeEventListener('keyup', this.enterSubmit)
  },
  methods: {
    enterSubmit(e) {
      if (e.keyCode === 13 && this.$refs.searchInput === document.activeElement) {
        this.searchSubmit()
      }
    },
    searchSubmit() {
      this.$router.push(`/product/search/${this.searchText}`)
    }
  },
  components: {
    vNav
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
  font-size: 0;
  height: 80px;
  overflow: hidden;
}
.header-logo img {
  width: auto;
  height: 80px;
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
</style>
