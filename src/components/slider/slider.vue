<template>
  <div
    class="slider"
    :style="'width:'+boxWidth+'px; height:'+boxHeight+'px;'"
  >
    <div class="slider-items-wrap">
      <ul
        class="slider-items f-clearfix" :style="'width:'+itemsWidth+'px;left:'+itemsLeft+'px;'"
      >
        <li class="slider-item" v-for="item in items" :style="'width:'+boxWidth+'px;'">
          <h3 class="slider-item-title">
            <router-link to="/product">{{item.title}}</router-link>
          </h3>
          <div class="slider-item-img">
            <router-link to="/product"><img :src="item.imgSrc"></router-link>
          </div>
        </li>
      </ul>
    </div>
    <ul class="slider-dot">
      <li
        v-for="(item,index) in items"
        :data-index="index"
        :class="{active: item.active}"
        @click="change(index)"
      ></li>
    </ul>
    <button type="button" class="slider-btn left" @click="pre">
      <span class="icon-back"></span>
    </button>
    <button type="button" class="slider-btn right" @click="next">
      <span class="icon-right"></span>
    </button>
  </div>
</template>

<script>
export default {
  props: ['data', 'boxWidth', 'boxHeight'],
  data() {
    return {
      items: [],
      itemsLeft: 0,
      activeIndex: 0
    }
  },
  computed: {
    itemsWidth() {
      return this.boxWidth * this.items.length
    }
  },
  created() {
    this.data.forEach((v, i) => {
      if (i === this.activeIndex) {
        v.active = true
      } else {
        v.active = false
      }
      this.items.push(v)
    })
  },
  methods: {
    change(index) {
      if (index === this.activeIndex) {
        return
      }
      this.itemsLeft = -this.boxWidth * index
      this.items[this.activeIndex].active = false
      this.activeIndex = index
      this.items[this.activeIndex].active = true
    },
    pre() {
      if (this.activeIndex <= 0) {
        return
      }
      let index = this.activeIndex - 1
      this.change(index)
    },
    next() {
      if (this.activeIndex >= this.items.length - 1) {
        return
      }
      let index = this.activeIndex + 1
      this.change(index)
    }
  }
}
</script>

<style>
.slider {
  position: relative;
}
.slider-items-wrap {
  position: relative;
  overflow: hidden;
  height: 100%;
}
.slider-items {
  position: absolute;
  top: 0;
  transition: all 0.4s;
}
.slider-item-title {
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
}
.slider-item-img img{
  width: 100%;
}
.slider-item {
  float: left;
}
.slider-dot {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
}
.slider-dot li {
  background: #ccc;
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border: 1px solid #fff;
  transition: all 0.2s;
}
.slider-dot li:hover {
  background: #2d74b9;
}
.slider-dot li.active {
  background: none;
  border-color: #2d74b9;
}
.slider-btn {
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -25px;
  border: none;
  background-color: #ddd;
  font-size: 16px;
  width: 22px;
  height: 50px;
  color: #fff;
  opacity: 0;
  transition: all 0.2s;
}
.slider:hover .slider-btn {
  opacity: 1;
}
.slider-btn:hover {
  background-color: #bbb;
}
.slider-btn.right {
  right: 0;
  left: auto;
}
</style>
