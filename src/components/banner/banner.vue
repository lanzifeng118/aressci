<template>
  <div class="banner" @mouseenter="clear" @mouseleave="set">
    <ul class="banner-items">
      <li
        class="banner-item"
        v-for="item in items"
        :class="{active: item.active}"
      >
        <a><img :src="item.src"></a>
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
  import banner01 from 'src/common/images/banner-01.jpg'
  import banner02 from 'src/common/images/banner-02.jpg'
  import banner03 from 'src/common/images/banner-03.jpg'

  export default {
    data() {
      return {
        items: [],
        bannerParams: {
          timer: {},
          index: 0
        }
      }
    },
    created() {
      let data = [
        {src: banner01, href: '/home'},
        {src: banner02, href: '/home'},
        {src: banner03, href: '/home'}
      ]
      data.forEach((v, i) => {
        if (i === 0) {
          v.active = true
        } else {
          v.active = false
        }
        this.items.push(v)
      })
      this.set()
    },
    destroyed() {
      this.clear()
    },
    methods: {
      pre() {
        let index = this.bannerParams.index
        if (index === 0) {
          index = this.items.length - 1
        } else {
          index--
        }
        this.bannerDot(index)
      },
      next() {
        let index = this.bannerParams.index
        if (index === this.items.length - 1) {
          index = 0
        } else {
          index++
        }
        this.bannerDot(index)
      },
      bannerDot(index) {
        if (index === this.bannerParams.index) {
          return
        }
        this.items[this.bannerParams.index].active = false
        this.items[index].active = true
        this.bannerParams.index = index
      },
      bannerAuto() {
        this.items[this.bannerParams.index].active = false
        this.bannerParams.index++
        if (this.bannerParams.index >= this.items.length) {
          this.bannerParams.index = 0
        }
        this.items[this.bannerParams.index].active = true
      },
      clear() {
        clearInterval(this.bannerParams.timer)
      },
      set() {
        this.bannerParams.timer = setInterval(this.bannerAuto, 2500)
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
.banner-item {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: all 0.8s;
}
.banner-item.active {
  opacity: 1
}
.banner-dot {
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
