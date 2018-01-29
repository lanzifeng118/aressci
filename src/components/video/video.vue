<template>
  <div class="video">
    <div class="video-wrap">
      <!-- close-btn -->
      <div class="video-cover-close" @click="close">
        <span class="icon-round_close_fill"></span>
      </div>
      <h3 class="video-name">{{name}}</h3>
      <!-- box -->
      <div class="video-box">
        <div v-show="pause" class="video-box-icon" @click="play">
          <span class="icon-play_fill"></span>
        </div>
        <video controls :src="link" ref="video"></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['link', 'name'],
  data() {
    return {
      pause: true
    }
  },
  mounted() {
    let video = this.$refs.video
    video.addEventListener('contextmenu', this.cannot)
    video.addEventListener('pause', this.pauseLin)
    video.addEventListener('play', this.playLin)
  },
  destroyed() {
    let video = this.$refs.video
    video.removeEventListener('contextmenu', this.cannot)
    video.removeEventListener('pause', this.pause)
    video.removeEventListener('play', this.playLin)
  },
  methods: {
    cannot(e) {
      e.returnValue = false
      return false
    },
    pauseLin(e) {
      this.pause = true
      // console.log(this.pause)
    },
    playLin(e) {
      this.pause = false
    },
    close() {
      this.$emit('close')
    },
    play() {
      this.$refs.video.play()
    }
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
}
.video-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -300px;
  width: 600px;
  max-height: 95%;
  overflow: hidden;
  display: inline-block;
}
.video-name {
  text-align: center;
  padding: 15px 20px;
  font-size: 16px;
  background: #f5f5f5;
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
  width: 100%;
  background: #000;
}
.video-box video {
  vertical-align: middle;
  width: 100%;
  max-height: 400px;
}
.video-box-icon {
  cursor: pointer;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  margin-left: -30px;
  margin-top: -35px;
  width: 60px;
  height: 60px;
  font-size: 40px;
  border-radius: 30px;
  border: 1px solid #fff;
  text-align: center;
}
.video-box-icon span {
  line-height: 57px
}
</style>
