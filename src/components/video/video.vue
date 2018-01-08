<template>
  <div class="video">
    <div class="video-wrap" :style="'margin-top:' +  marginTop + 'px'">
      <!-- close-btn -->
      <div class="video-cover-close" @click="close">
        <span class="icon-round_close_fill"></span>
      </div>
      <h3 class="video-name">{{name}}</h3>
      <!-- box -->
      <div class="video-box" @click="playToggle">
        <video :src="link" ref="video"></video>
        <div class="video-cover" v-show="coverShow"><span class="video-cover-btn icon-play_fill"></span></div>
        <div class="video-loading" v-show="isWaiting"><loading color="#eee" size="middle"></loading></div>
      </div>
      <div class="video-buffer">
          <div class="video-buffer-ok" :style="'width:' + bufferWidth + '%;'"></div>
          <div class="video-buffer-done" :style="'width:' + playedWidth + '%;'"></div>
      </div>
      <!-- bottom -->
      <div class="video-bottom f-clearfix">
        <div class="video-btn-play f-left" @click="playToggle">
          <span :class="[iconPlay? 'icon-stop' : 'icon-play_fill']"></span>
        </div>
        <div class="video-time f-left">
          <span>{{time.played}}</span>
          <span class="icon-slash"></span>
          <span>{{time.total}}</span>
        </div>
        <div class="video-btn-muted f-right" @click="mutedToggle">
          <span :class="[iconMuted? 'icon-muted' : 'icon-notification_fill']"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from 'components/tools/global'
import loading from 'components/c-loading/loading'

export default {
  props: ['link', 'name'],
  data() {
    return {
      isWaiting: false,
      // marginTop
      videoHeight: 200,
      iconPlay: false,
      iconMuted: false,
      coverShow: true,
      time: {
        played: '00:00',
        total: '00:00',
        counter: {}
      },
      duration: 0,
      played: 0,
      buffer: 0
    }
  },
  computed: {
    marginTop() {
      return (global.winHeigth - this.videoHeight - 110) / 2
    },
    bufferWidth() {
      let width = 0
      if (this.duration > 0) {
        width = (this.buffer / this.duration * 100).toFixed(2)
      }
      console.log(width + 'bufferWidth')
      return width
    },
    playedWidth() {
      let width = 0
      if (this.duration > 0) {
        width = (this.played / this.duration * 100).toFixed(2)
      }
      return width
    }
  },
  destroyed() {
    clearInterval(this.time.counter)
  },
  mounted() {
    let video = this.$refs.video
    video.addEventListener('waiting', () => {
      console.log('waiting')
      if (!this.coverShow) {
        this.isWaiting = true
      }
    })
    video.addEventListener('progress', () => {
      this.buffer = video.buffered.end(0)
      console.log(this.buffer)
    })
    video.addEventListener('canplay', () => {
      console.log('canplay')
      this.isWaiting = false
    })
    video.addEventListener('durationchange', () => {
      let winWidth = global.winWidth * 0.95
      let winHeigth = global.winHeigth * 0.95
      let videoHeight = 200

      if (video.videoWidth > winWidth) {
        videoHeight = winWidth / video.videoWidth * video.videoHeight
        if (videoHeight > winHeigth) {
          videoHeight = winHeigth - 110
          video.style.height = videoHeight + 'px'
        }
      } else {
        videoHeight = video.videoHeight
      }
      this.videoHeight = videoHeight
      this.duration = video.duration
      this.time.total = this.changeTime(video.duration)
    })
  },
  methods: {
    calPlayedTime() {
      let video = this.$refs.video
      this.played = video.currentTime
      this.time.played = this.changeTime(video.currentTime)
      // console.log(video.buffered.start(0))
      // console.log(video.buffered.end(0))
      if (video.ended) {
        clearInterval(this.time.counter)
        this.coverShow = true
        this.iconPlay = false
        this.time.played = '00:00'
      }
    },
    changeTime(time) {
      let min = Math.floor(time / 60)
      let second = Math.ceil(time % 60)
      if (min <= 9) {
        min = '0' + min
      }
      if (second <= 9) {
        second = '0' + second
      }
      return min + ':' + second
    },
    playToggle() {
      console.log(this.$refs.video.videoHeight)
      if (!this.$refs.video.duration) {
        return
      }
      if (!this.$refs.video.paused) {
        this.$refs.video.pause()
        this.coverShow = true
        this.iconPlay = false
        clearInterval(this.time.counter)
      } else {
        this.$refs.video.play()
        this.time.played = this.changeTime(this.$refs.video.currentTime)
        this.time.counter = setInterval(this.calPlayedTime, 1000)
        this.coverShow = false
        this.iconPlay = true
      }
    },
    mutedToggle() {
      this.$refs.video.muted = !this.$refs.video.muted
      this.iconMuted = !this.iconMuted
    },
    close() {
      this.$emit('close')
    }
  },
  components: {
    loading
  }
}
</script>

<style>
.video {
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.5);
  z-index:9;
  text-align: center;
}
.video-wrap {
  max-width: 95%;
  max-height: 95%;
  overflow: hidden;
  position: relative;
  display: inline-block;
}
.video-cover-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 22px;
  z-index: 99;
  transition: all 0.2s;
}
.video-cover-close:hover {
  color: #2d74b9;
}

.video-box {
  min-width: 400px;
  min-height: 200px;
  text-align: center;
  background: #000;
  position: relative;
  line-height: 0;
}
.video-box video{
  max-width: 100%;
  max-height: 100%;
}
.video-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.3)
}
.video-cover-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -30px;
  margin-top: -30px;
  font-size: 40px;
  width: 60px;
  height: 60px;
  padding: 10px;
  border-radius: 30px;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
}
.video-name {
  padding: 15px 20px;
  font-size: 16px;
  background: #f5f5f5;
}
.video-bottom {
  background: #000;
  height: 50px;
  color: #fff;
}
.video-time {
  color: #999;
  line-height: 50px;
  margin-left: 20px;
}
.video-time .icon-slash {
  font-size: 12px;
}
.video-btn-muted span,
.video-btn-play  span {
  display: inline-block;
  cursor: pointer;
  width: 42px;
  line-height: 50px;
  font-size: 22px;
  text-align: center;
}
.video-btn-play  span.icon-stop {
  font-size: 30px;
  vertical-align: -5px;
}
.video-btn-muted {
  margin-right: 10px;
}
.video-btn-muted span {
  font-size: 18px;
}
.video-btn-muted span.icon-muted {
  font-size: 16px;
}
.video-loading {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 5;
  background-color: rgba(0,0,0,0.5);
  z-index:9;

}
.video-loading .loading-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -27px;
  margin-top: -5px;
}
.video-buffer {
  position: relative;
  height: 3px;
  background: #222;
}
.video-buffer-ok,
.video-buffer-done {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #393939;
}
.video-buffer-done {
  background: #555;
}
</style>
