<template>
  <div class="home-news">
    <div class="title-warp">
      <h2 class="title">NEWS</h2>
      <router-link to="news" class="more">MORE<span class="icon-right"></span></router-link>
    </div>
    <div class="home-news-wrap">
      <ul class="f-clearfix">
        <li
          v-for="item in items"
          class="white-box home-news-item"
        >
          <div class="home-news-img">
            <router-link to="news"><img :src="item.imgSrc" alt="" width="296" height="220"></router-link>
          </div>
          <div class="home-news-text">
            <h3 class="home-news-text-title">
              <router-link to="news">{{item.title}}</router-link>
            </h3>
            <h4 class="home-news-text-summary">{{item.summary}}</h4>
            <p class="home-news-text-time">{{item.time}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import newsImg01 from 'src/common/images/news-01.jpg'
import newsImg02 from 'src/common/images/news-02.jpg'
import newsImg03 from 'src/common/images/news-03.jpg'
import newsImg04 from 'src/common/images/news-04.jpg'

export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    let data = [
      {imgSrc: newsImg01, title: 'Scaramucci sacked as Trump media chief', summary: 'White House communications director Anthony Scaramucci has been fired after fewer than 10 days in the post.', time: '2017.08.01'},
      {imgSrc: newsImg02, title: 'What could change in the summer break?', summary: 'Floods in the western Indian state of Gujarat have killed 218 people, government officials have confirmed.', time: '2017.07.20'},
      {imgSrc: newsImg03, title: 'Drivers and teams will be busy', summary: 'Formula 1 heads off on its official summer break at the end of this week but away from the cameras there will be plenty going on.', time: '2017.07.10'},
      {imgSrc: newsImg04, title: 'Japan famous Nara deer face capture', summary: 'The free-roaming deer of Nara, Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks.', time: '2017.02.09'}
    ]
    this.items = data
  }
}
</script>

<style>
.home-news {
  margin-bottom: 80px;
}
.home-news-wrap {
  width: 1240px;
}
.home-news-item.white-box {
  position: relative;
  float: left;
  margin-right: 14px;
  width: 296px;
  height: 415px;
}
.home-news-text {
  padding: 0 25px;
}
.home-news-text-title{
}
.home-news-text-title a {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 15px 0;
}
.home-news-text-summary {
  line-height: 1.5em;
  color: #666;
}
.home-news-img {
  margin-bottom: 10px;
}
.home-news-text-time {
  font-size: 12px;
  color: #ccc;
  position: absolute;
  bottom: 20px;
  right: 25px;
}
</style>
