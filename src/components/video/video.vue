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
    }
  },
  mounted () {
    this.$refs.video.addEventListener('contextmenu', (e) => {
      e.returnValue = false
      return false
    })
  },
  methods: {
    close() {
      this.$emit('close')
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
  text-align: center;
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
  text-align: center;
  background: #000;
}
.video-box video{
  vertical-align: middle;
  width: 100%;
  max-height: 400px;
}
</style>
