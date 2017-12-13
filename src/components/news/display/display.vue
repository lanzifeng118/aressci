<template>
  <div class="news-display">
    <div class="position news-position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">Home</router-link>
      <span class="icon-right"></span>
      <router-link to="/news">All News</router-link>
      <span class="icon-right"></span>
      {{item.title}}
    </div>
    <div class="news-display-wrap">
      <div class="news-display-info">
        <h1>{{item.title}}</h1>
        <h5>{{item.time}}</h5>
        <p>{{item.summary}}</p>
      </div>
      <div class="news-display-editor" v-html="item.detail"></div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      item: null
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
      this.item = {
        imgSrc: 'static/images/news-01.jpg',
        title: 'Scaramucci sacked as Trump media chief',
        summary: 'White House communications director Anthony Scaramucci has been fired after fewer than 10 days in the post.White House communications director Anthony Scaramucci has been fired after fewer than 10 days in the post.',
        time: '2017.08.01',
        detail: '<h1>Anthony Scaramucci</h1><p>The free-roaming deer of Nara, Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks. Favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p><p>The free-roaming deer of Nara, Japan have become an Instagram favourite for their and their apparent habit of bowing to get snacks. Favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p><h1>Instagram favourite</h1><p>Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks. Favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p><p>The free-roaming deer of Nara, Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p>'
      }
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
.news-display-editor h1{
  font-size: 15px;
  padding-left: 10px;
  border-left: 2px solid #0d93b8;
  margin: 15px 0;
}
.news-display-editor p {
  padding-left: 10px;
  color: #666;
  margin: 8px 0;
  line-height: 1.5em;
}
</style>
