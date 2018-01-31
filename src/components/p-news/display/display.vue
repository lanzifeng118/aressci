<template>
  <div class="news-display">
    <div class="position news-position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">
        <span v-if="lang === 'cn'">首页</span>
        <span v-if="lang === 'en'">Home</span>
      </router-link>
      <span class="icon-right"></span>
      <router-link to="/news">
        <span v-if="lang === 'cn'">所有新闻</span>
        <span v-if="lang === 'en'">All News</span>
      </router-link>
      <span class="icon-right" v-if="classifyId"></span>
      <router-link :to="'/news/lsit/c' + classifyId" v-if="classifyId">{{item.classify}}</router-link>
      <span class="icon-right"></span>
      {{item.name}}
    </div>
    <div class="news-display-wrap">
      <div class="news-display-info">
        <h1>{{item.name}}</h1>
        <h5>{{item.modifytime}}</h5>
        <p v-if="item.brief">{{item.brief}}</p>
      </div>
      <div class="news-display-editor editor" v-html="item.detail"></div>
    </div>
  </div>
</template>

<script>
import api from 'components/tools/api'
import apiEn from 'components/tools/api-en'

export default {
  data() {
    return {
      item: {}
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    api() {
      return this.$store.state.lang === 'cn' ? api : apiEn
    },
    classifyId() {
      let newsClassify = this.$store.state.newsClassify
      let id = ''
      newsClassify.forEach((v, i) => {
        v.border = false
        if (v.name === this.item.classify) {
          id = v.id
          v.border = true
        }
      })
      if (!id && newsClassify.length > 0) {
        newsClassify[0].border = true
      }
      return id
    }
  },
  watch: {
    '$route' (to, from) {
      this.getItem()
    }
  },
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      let id = parseInt(this.$route.params.id.slice(1))
      this.axios(this.api.newsList.queryById(id)).then((res) => {
        let data = res.data
        // console.log(data)
        if (data.code === '200') {
          data.data.modifytime = data.data.modifytime.replace(/\s.+$/g, '')
          this.item = data.data
        }
      })
    }
  },
  components: {
  }
}
</script>

<style>
.news-display-wrap {
  margin-left: 50px;
  width: 956px;
}
.news-display-info {
  margin-bottom: 20px;
}
.news-display-info h1 {
  color: #0d93b8;
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
}
.news-display-info h5 {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
.news-display-info p {
  padding: 5px 10px;
  line-height: 1.5em;
  color: #999;
  border-left: 2px solid #ebebeb;
  background-color: #f9f9f9;
}
</style>
