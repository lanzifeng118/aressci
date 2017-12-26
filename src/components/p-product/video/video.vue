<template>
  <div class="product-video" v-if="items.length > 0">
    <h2 class="product-video-name">产品视频</h2>
    <div class="product-video-btns" v-if="items.length > 3">
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
    <div class="product-video-wrap" :style="'height:' + wrapHeight + 'px'">
      <ul
        class="product-video-items"
        :style="'top:'+params.top+'px; height:'+itemsHeight+'px;'"
      >
        <li
          class="product-video-item white-box"
          v-for="(item,index) in items"
          @click="showCover(index)"
        >
          <div class="product-video-item-img">
            <img :src="item.img">
            <div class="product-video-item-icon">
              <span class="icon-play_fill"></span>
            </div>
          </div>

          <div class="product-video-item-text">
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- videoCover -->
    <div class="product-video-cover" v-show="videoCover.show">
      <div class="product-video-cover-wrap">
        <div class="product-video-cover-close" @click="closeCover">
          <span class="icon-round_close_fill"></span>
        </div>
        <v-video
          :link="videoCover.link"
          :name="videoCover.name"
          :active="videoCover.active"
          v-if="videoCover.show"
        >
        </v-video>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'components/tools/api'

import vVideo from 'components/video/video'

export default {
  props: ['classify'],
  data() {
    return {
      liLength: 3,
      items: [],
      video: '',
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
        name: '',
        active: false
      }
    }
  },
  watch: {
    classify() {
      this.getItems()
    }
  },
  computed: {
    wrapHeight() {
      let length = this.items.length
      let itemHeight = this.params.height + this.params.padding
      return length < 3 ? itemHeight * length : itemHeight * this.liLength
    },
    itemsHeight() {
      return (this.params.height + this.params.padding) * this.items.length
    },
    criticalTop() {
      return (this.params.height + this.params.padding) * (this.items.length - this.liLength) - this.params.padding
    }
  },
  created() {
    this.getItems()
    // this.set()
  },
  destroyed() {
    this.clear()
  },
  methods: {
    getItems() {
      let productVideo = api.productVideo
      let obj = this.classify ? productVideo.queryByClassify(this.classify) : productVideo.query()
      this.axios(obj).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          let list = data.data.list
          if (list.length > this.liLength) {
            this.items = list.slice(-1).concat(list).concat(list.slice(0, this.liLength))
          } else {
            this.items = list
            this.params.top = 0
          }
        }
      })
    },
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
      this.videoCover.link = this.items[index].video
      this.videoCover.name = this.items[index].name
      this.videoCover.active = true
      this.videoCover.show = true
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
.product-video {
  width: 254px;
  padding: 10px 0;
  border: 1px solid #efefef;
  position: relative;
}
.product-video-btns {
  position: absolute;
  right: 10px;
  top: 5px;
}
.product-video-btns button {
  float: left;
  width: 20px;
  height: 20px;
  border: none;
  color: #999;
  background: none;
  transition: all 0.2s;
}
.product-video-btns button:hover {
  color: #0d93b8;
}
.product-video-btns button:nth-child(2) {
  border-left: none;
}
.product-video-btns span {
  display: inline-block;
  line-height: 20px;
}
.product-video-btns span.icon-stop {
  font-size: 18px;
}
.product-video-name {
  font-weight: bold;
  margin-bottom: 12px;
  padding-left: 10px;
}
.product-video-wrap {
  position: relative;
  overflow: hidden;
  line-height: 0;
}
.product-video-items {
  padding: 0 10px;
  position: absolute;
}
.product-video-item {
  width: 234px;
  margin-bottom: 14px;
  position: relative;
  cursor: pointer;
}
.product-video-item-img {
  position: relative;
  line-height: 0;
  height: 141px;
  overflow: hidden;
}
.product-video-item-img img {
  width: 100%;
}
.product-video-item-icon {
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
.product-video-item:hover .product-video-item-icon {
  border-color: #2d74b9;
  background: #2d74b9;
}
.product-video-item-text {
  padding: 25px 0;
  border-top: none;
  text-align: center;
}
.product-video-cover {
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.5);
  z-index:9;
}
.product-video-cover-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -210px;
}
.product-video-cover-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 22px;
  z-index: 99;
  transition: all 0.2s;
}
.product-video-cover-close:hover {
  color: #2d74b9;
}
</style>
