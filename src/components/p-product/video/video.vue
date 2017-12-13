<template>
  <div class="home-video">
    <h2 class="home-video-title">Product Video</h2>
    <div class="home-video-btns">
      <button type="button" name="button" @mouseenter="clear">
        <span class="icon-stop"></span>
      </button>
      <button type="button" @mouseenter="changeDireciton(1)">
        <span class="icon-triangle_up_fill"></span>
      </button>
      <button type="button" @mouseenter="changeDireciton(0)">
        <span class="icon-triangle_down_fill"></span>
      </button>
    </div>
    <!-- items -->
    <div class="home-video-wrap">
      <ul
        class="home-video-items"
        :style="'top:'+params.top+'px; height:'+itemHeight+'px;'"
      >
        <li
          class="home-video-item white-box"
          v-for="(item,index) in items"
          @click="showCover(index)"
        >
          <div class="home-video-item-img">
            <img :src="item.Imgsrc">
            <div class="home-video-item-icon">
              <span class="icon-play_fill"></span>
            </div>
          </div>

          <div class="home-video-item-text">
            <p>{{item.title}}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- videoCover -->
    <div class="home-video-cover" v-show="videoCover.show">
      <div class="home-video-cover-wrap">
        <div class="home-video-cover-close" @click="closeCover">
          <span class="icon-round_close_fill"></span>
        </div>
        <v-video
          :link="videoCover.link"
          :title="videoCover.title"
          :active="videoCover.active"
          v-if="videoCover.show"
        >
        </v-video>
      </div>
    </div>
  </div>
</template>

<script>
import vVideo from 'components/video/video'
import videoImg01 from 'src/common/images/video-01.jpg'
import videoImg02 from 'src/common/images/video-02.jpg'
import videoImg03 from 'src/common/images/video-03.jpg'
import videoImg04 from 'src/common/images/video-04.jpg'
import videoImg05 from 'src/common/images/video-05.jpg'

export default {
  data() {
    return {
      liLength: 3,
      items: [],
      videoSrc: '',
      params: {
        timer: null,
        width: 234,
        height: 193,
        top: -193,
        padding: 14,
        index: 0,
        direction: true
      },
      // videoCover
      videoCover: {
        show: false,
        play: false,
        link: '',
        title: '',
        active: false
      }
    }
  },
  computed: {
    itemHeight() {
      return (this.params.height + this.params.padding) * this.items.length
    },
    criticalTop() {
      return (this.params.height + this.params.padding) * (this.items.length - this.liLength) - this.params.padding
    }
  },
  created() {
    let data = [
      {Imgsrc: videoImg01, title: '01Fume Hood Controls', videoSrc: 'static/video-01.mp4'},
      {Imgsrc: videoImg02, title: 'Sensor Suite', videoSrc: 'static/video-01.mp4'},
      {Imgsrc: videoImg03, title: 'Room Sensor', videoSrc: 'static/video-01.mp4'},
      {Imgsrc: videoImg04, title: 'Sensor Suite Sensors', videoSrc: 'static/video-01.mp4'},
      {Imgsrc: videoImg05, title: 'Dashboards', videoSrc: 'static/video-01.mp4'},
      {Imgsrc: videoImg03, title: '06Room Sensor', videoSrc: 'static/video-01.mp4'}
    ]
    if (data.length > this.liLength) {
      this.items = data.slice(-1).concat(data).concat(data.slice(0, this.liLength))
    } else {
      this.items = data
      this.params.top = 0
    }
    // this.set()
  },
  destroyed() {
    this.clear()
  },
  methods: {
    changeDireciton(param) {
      if (this.params.timer) {
        this.clear()
      }
      if (param) {
        this.params.direction = true
      } else {
        this.params.direction = false
      }
      this.set()
    },
    set() {
      if (this.items.length <= this.liLength) {
        return
      }
      this.params.timer = setInterval(this.auto, 30)
    },
    clear() {
      clearInterval(this.params.timer)
      this.params.timer = null
    },
    auto() {
      if (this.params.direction) {
        if (this.params.top <= -this.criticalTop) {
          this.params.top = -this.params.height
        }
        this.params.top -= 2
      } else {
        if (this.params.top >= -this.params.height) {
          this.params.top = -this.criticalTop
        }
        this.params.top += 2
      }
    },
    showCover(index) {
      this.videoCover.active = true
      this.videoCover.show = true
      this.videoCover.link = this.items[index].videoSrc
      this.videoCover.title = this.items[index].title
    },
    closeCover() {
      this.videoCover.active = false
      this.videoCover.show = false
      this.videoCover.link = ''
    }
  },
  components: {
    vVideo
  }
}
</script>

<style>
.home-video {
  width: 254px;
  padding: 10px 0;
  border: 1px solid #efefef;
  position: relative;
}
.home-video-btns {
  position: absolute;
  right: 10px;
  top: 5px;
}
.home-video-btns button {
  float: left;
  width: 20px;
  height: 20px;
  border: none;
  color: #999;
  background: none;
  transition: all 0.2s;
}
.home-video-btns button:hover {
  color: #0d93b8;
}
.home-video-btns button:nth-child(2) {
  border-left: none;
}
.home-video-btns span {
  display: inline-block;
  line-height: 20px;
}
.home-video-btns span.icon-stop {
  font-size: 18px;
}
.home-video-title {
  font-weight: bold;
  margin-bottom: 12px;
  padding-left: 10px;
}
.home-video-wrap {
  position: relative;
  overflow: hidden;
  line-height: 0;
  height: 621px;
}
.home-video-items {
  padding: 0 10px;
  position: absolute;
}
.home-video-item {
  width: 234px;
  margin-bottom: 14px;
  position: relative;
  cursor: pointer;
}
.home-video-item-img {
  position: relative;
  line-height: 0;
}
.home-video-item-img img {
  width: 100%;
}
.home-video-item-icon {
  position: absolute;
  left: 20px;
  bottom: 10px;
  width: 32px;
  height: 22px;
  border: 2px solid #fff;
  color: #fff;
  text-align: center;
  line-height: 20px;
  border-radius: 12px;
  transition: all 0.2s;
}
.home-video-item:hover .home-video-item-icon {
  border-color: #2d74b9;
  background: #2d74b9;
}
.home-video-item-text {
  padding: 25px 0;
  border-top: none;
  text-align: center;
}
.home-video-cover {
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.5);
  z-index:9;
}
.home-video-cover-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -210px;
}
.home-video-cover-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 22px;
  z-index: 99;
  transition: all 0.2s;
}
.home-video-cover-close:hover {
  color: #2d74b9;
}
</style>
