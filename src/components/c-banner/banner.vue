<template>
  <div class="banner" @mouseenter="clear" @mouseleave="set">
    <ul class="banner-items">
      <li
        class="banner-item"
        v-for="item in items"
        :class="{active: item.active}"
      >
        <a v-if="item.link" :href="item.link" target="_blank"><img :src="item.img"></a>
        <img v-if="!item.link" :src="item.img">
      </li>
    </ul>
    <!-- dot -->
    <ul class="banner-dot">
      <li
        v-for="(item,index) in items"
        :class="{active: item.active}"
        @click="bannerDot(index)"
      >
      </li>
    </ul>
    <div class="banner-btns">
      <div class="banner-btn f-left" @click="pre">
        <span class="icon-back"></span>
      </div>
      <div class="banner-btn f-right" @click="next">
        <span class="icon-right"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      timer: {},
      index: 0
    }
  },
  computed: mapGetters({
    items: 'banner'
  }),
  created() {
    this.set()
  },
  destroyed() {
    this.clear()
  },
  methods: {
    pre() {
      let index = this.index
      if (index === 0) {
        index = this.items.length - 1
      } else {
        index--
      }
      this.bannerDot(index)
    },
    next() {
      let index = this.index
      if (index === this.items.length - 1) {
        index = 0
      } else {
        index++
      }
      this.bannerDot(index)
    },
    bannerDot(index) {
      if (index === this.index) {
        return
      }
      this.items[this.index].active = false
      this.items[index].active = true
      this.index = index
    },
    bannerAuto() {
      if (this.items.length <= 1) {
        return
      }
      this.items[this.index].active = false
      this.index++
      if (this.index >= this.items.length) {
        this.index = 0
      }
      this.items[this.index].active = true
    },
    clear() {
      clearInterval(this.timer)
    },
    set() {
      // console.log(this.items)
      if (!this.items || this.items.length <= 0) {
        return
      }
      this.timer = setInterval(this.bannerAuto, 2500)
    }
  }
}
</script>

<style>
.banner {
  position: relative;
  line-height: 0;
  overflow: hidden;
  height: 451px;
  width: 925px;
}
.banner img {
  width: 100%;
}
.banner-items {
  height: 100%;
}
.banner-item {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: all 0.8s;
}
.banner-item.active {
  z-index: 1;
  opacity: 1
}
.banner-dot {
  z-index: 2;
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 10px;
  right: 0;
}
.banner-dot li {
  transition: all 0.2s;
  font-size: 0;
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  border: 1px solid #fff;
  background: rgba(255,255,255,0.8)
}
.banner:hover .banner-dot li{
  width: 10px;
  height: 10px;
}
.banner-dot li.active {
  border-color: #fff;
  background: none;
}
/*banner-btns*/
.banner:hover .banner-btns{
  opacity: 1;
}
.banner-btns {
  opacity: 0;
  position: absolute;
  height: 50px;
  top: 50%;
  margin-top: -25px;
  left: 2%;
  width: 96%;
  transition: all 0.2s;
}
.banner-btn {
  cursor: pointer;
  width: 20px;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  line-height: 50px;
  text-align: center;
  color: #fff;
  transition: all 0.2s;
}
.banner-btn:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
