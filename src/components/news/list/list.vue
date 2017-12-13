<template>
  <div class="news-list">
    <!-- position-all -->
    <div class="position news-position" v-if="all">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">Home</router-link>
      <span class="icon-right"></span>
      All News
    </div>
    <!-- position-list -->
    <div class="position news-position" v-if="!all">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">Home</router-link>
      <span class="icon-right"></span>
      <router-link to="/news">All News</router-link>
      <span class="icon-right"></span>
      {{position}}
    </div>
    <!-- news-list -->
    <div class="news-list-wrap">
      <ul class="f-clearfix">
        <li
          v-for="item in items"
          class="white-box news-list-item"
        >
          <router-link :to="item.link">
            <div class="news-list-img">
              <img :src="item.imgSrc">
            </div>
            <div class="news-list-text">
              <h3 class="news-list-text-title">{{item.title}}</h3>
              <h4 class="news-list-text-summary">{{item.summary}}</h4>
              <p class="news-list-text-time">{{item.time}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let dataAll = [
  {imgSrc: 'static/images/news-01.jpg', classify: '1', id: '01', title: 'Scaramucci sacked as Trump media chief', summary: 'White House communications director Anthony Scaramucci has been fired after fewer than 10 days in the post.', time: '2017.08.01'},
  {imgSrc: 'static/images/news-02.jpg', classify: '2', id: '02', title: 'What could change in the summer break?', summary: 'Floods in the western Indian state of Gujarat have killed 218 people, government officials have confirmed.', time: '2017.07.20'},
  {imgSrc: 'static/images/news-03.jpg', classify: '3', id: '03', title: 'Drivers and teams will be busy', summary: 'Formula 1 heads off on its official summer break at the end of this week but away from the cameras there will be plenty going on.', time: '2017.07.10'},
  {imgSrc: 'static/images/news-04.jpg', classify: '1', id: '04', title: 'Japan famous Nara deer face capture', summary: 'The free-roaming deer of Nara, Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks.', time: '2017.02.09'},
  {imgSrc: 'static/images/news-02.jpg', classify: '1', id: '05', title: 'What could change in the summer break?', summary: 'Floods in the western Indian state of Gujarat have killed 218 people, government officials have confirmed.', time: '2017.07.20'},
  {imgSrc: 'static/images/news-03.jpg', classify: '', id: '06', title: 'Drivers and teams will be busy', summary: 'Formula 1 heads off on its official summer break at the end of this week but away from the cameras there will be plenty going on.', time: '2017.07.10'}
]
dataAll.forEach((v, i) => {
  v.link = '/news/display/'+ v.classify + '-' + v.id
})

export default {
  data() {
    return {
      items: null,
      all: true,
      position: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let path = this.$route.path
      let allPath = '/news/all'
      let _this = this
      if (path === allPath) {
        this.all = true
        this.items = dataAll
      } else {
        this.all = false
        this.items = []
        this.$store.state.news.forEach((v, i) => {
          if (v.link === path) {
            dataAll.forEach((v1, i1) => {
              if (v1.classify === v.id) {
                _this.items.push(v1)
              }
            })
            _this.position = v.name
          }
        })
      }
    }
  },
  components: {
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
.news-list-wrap ul{
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
.news-list-img img {
  width: 100%;
}
.news-list-text {
  padding: 0 15px;
}
.news-list-text-title{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 0;
}
.news-list-text-summary {
  font-size: 13px;
  line-height: 20px;
  color: #666;
}
.news-list-text-time {
  font-size: 12px;
  color: #ccc;
  position: absolute;
  bottom: 20px;
  right: 25px;
}
</style>
