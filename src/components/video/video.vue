<template>
  <div class="video">
    <h3 class="video-title">{{title}}</h3>
    <div class="video-wrap" @click="playToggle">
      <video :src="link" ref="video"></video>
      <div class="video-cover" v-show="coverShow">
        <div class="video-cover-btn">
          <span class="icon-play_fill"></span>
        </div>
      </div>
    </div>
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
</template>

<script>

export default {
  props: ['link', 'title', 'active'],
  data() {
    return {
      iconPlay: false,
      iconMuted: false,
      coverShow: true,
      time: {
        played: '00:00',
        total: '00:00',
        counter: {}
      }
    }
  },
  watch: {
    active: function() {
      if (!this.active) {
        clearInterval(this.time.counter)
      }
    }
  },
  destroyed() {
    clearInterval(this.time.counter)
  },
  methods: {
    calPlayedTime() {
      this.time.played = this.changeTime(this.$refs.video.currentTime)
      if (this.$refs.video.ended) {
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
      if (!this.$refs.video.paused) {
        this.$refs.video.pause()
        this.coverShow = true
        this.iconPlay = false
        clearInterval(this.time.counter)
      } else {
        this.$refs.video.play()
        this.time.total = this.changeTime(this.$refs.video.duration)
        this.time.played = this.changeTime(this.$refs.video.currentTime)
        this.time.counter = setInterval(this.calPlayedTime, 1000)
        this.coverShow = false
        this.iconPlay = true
      }
    },
    mutedToggle() {
      this.$refs.video.muted = !this.$refs.video.muted
      this.iconMuted = !this.iconMuted
    }
  }
}
</script>

<style>
.video {
  display: block;
  width: 420px;
  margin-bottom: 50px;
}
.video-wrap {
  text-align: center;
  background: #000;
  position: relative;
  line-height: 0;
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
  margin-left: -20px;
  margin-top: -20px;
  font-size: 40px;
  width: 60px;
  height: 60px;
  padding: 10px;
  border-radius: 30px;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
}
.video-title {
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
</style>
