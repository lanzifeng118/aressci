<template>
  <div class="news-list">
    <!-- all -->
    <position v-if="all" page="index"></position>
    <!-- list -->
    <position v-if="!all">
      {{classifyName}}
    </position>
    
    <!-- news-list -->
    <div class="news-list-wrap">
      <ul class="f-clearfix">
        <li v-for="item in items" class="white-box news-list-item">
          <router-link :to="item.link">
            <div class="news-list-img">
              <img v-if="item.img" :src="item.img">
            </div>
            <div class="news-list-text">
              <h3 class="news-list-text-title">{{item.name}}</h3>
              <h4 class="news-list-text-summary">{{item.brief}}</h4>
              <p class="news-list-text-time">{{item.modifytime}}</p>
            </div>
          </router-link>
        </li>
      </ul>
      <paging v-if="paging.total > 0" :paging="paging" @pagingNextClick="pagingNextClick" @pagingPreClick="pagingPreClick" @pagingChange="pagingChange">
      </paging>
    </div>
  </div>
</template>

<script>
import paging from 'components/c-paging/paging'
import position from 'components/p-news/position/position'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      items: null,
      all: true,
      id: 0,
      // paging
      paging: {
        size: 6,
        no: 0,
        total: 0
      }
    }
  },
  computed: {
    classifyName() {
      let name = ''
      let id = this.id
      if (id) {
        let classify = this.newsClassify
        for (var i = 0; i < classify.length; i++) {
          if (id === classify[i].id) {
            name = classify[i].name
            break
          }
        }
      }
      return name
    },
    ...mapGetters(['api', 'lang', 'newsClassify'])
  },
  watch: {
    $route(to, from) {
      this.getId()
      this.getAll()
      this.getItems()
    },
    classifyName() {
      if (this.all) {
        return
      }
      this.getItems()
    }
  },
  created() {
    this.getId()
    this.getAll()
    if (this.all) {
      this.getItems()
    }
  },
  methods: {
    getId() {
      let id = this.$route.params.id
      if (id) {
        this.id = parseInt(id.slice(1))
      } else {
        this.id = 0
      }
      this.newsClassify.forEach((v, i) => {
        v.border = false
      })
    },
    getAll() {
      if (this.$route.path === '/news/all') {
        this.all = true
      } else {
        this.all = false
      }
    },
    getItems() {
      let pageData = {
        page_size: this.paging.size,
        page_no: this.paging.no,
        classify: this.classifyName
      }
      // ajax
      this.axios(this.api.newsList.query(pageData)).then(res => {
        let data = res.data
        // console.log(data)
        if (data.code === '200') {
          let list = data.data.list
          list.forEach((v, i) => {
            v.modifytime = v.modifytime.replace(/\s.+$/g, '')
            v.link = `/news/display/p${v.id}`
          })
          this.items = data.data.list
          this.paging.total = data.data.total
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
    position
  }
}
</script>

<style>
.news-list {
  margin-left: 40px;
  width: 966px;
}
.news-list-content {
  margin: 30px 0;
}
.news-list-wrap {
  overflow: hidden;
}
.news-list-wrap ul {
  width: 988px;
}
.news-list-item.white-box {
  position: relative;
  float: left;
  margin: 0 20px 20px 0;
  width: 309px;
  height: 320px;
  overflow: hidden;
}
.news-list-item a {
  display: block;
  height: 100%;
}
.news-list-img {
  height: 156px;
  overflow: hidden;
  font-size: 0;
}
.news-list-img img {
  width: 100%;
}
.news-list-text {
  padding: 0 15px;
}
.news-list-text-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 0;
}
.news-list-text-summary {
  font-size: 13px;
  height: 82px;
  overflow: hidden;
  line-height: 20px;
  color: #666;
}
.news-list-text-time {
  width: 66px;
  font-size: 12px;
  color: #ccc;
  position: absolute;
  bottom: 20px;
  right: 25px;
}
</style>
