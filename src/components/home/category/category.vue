<template>
  <div class="home-category" @mouseenter="clear" @mouseleave="set">
    <ul class="home-category-ul" :style="'top:' + top + 'px'" :class="{smooth: smooth}">
      <li class="home-category-li" v-for="item in products">
        <router-link :to="item.link"><img :src="item.logoBigSrc" alt=""></router-link>
      </li>
    </ul>
    <div class="home-category-btn up" @click="preClick">
      <span class="icon-up"></span>
    </div>
    <div class="home-category-btn down" @click="nextClick">
      <span class="icon-down"></span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showNum: 3,
        index: 1,
        top: -152,
        timer: null,
        smooth: true
      }
    },
    computed: {
      products() {
        let data = this.$store.state.porducts
        let items = []
        let logoBigSrc = ['/static/images/classify-phoneix.jpg', '/static/images/classify-drager.jpg', '/static/images/classify-a.jpg', '/static/images/classify-4.jpg', '/static/images/classify-5.jpg']
        data.forEach((value, index) => {
          value.logoBigSrc = logoBigSrc[index]
        })
        data = data.concat([{link: '', logoBigSrc: logoBigSrc[3]}, {link: '', logoBigSrc: logoBigSrc[4]}])
        if (data.length > 3) {
          items = data.slice(-1).concat(data).concat(data.slice(0, 2))
        } else {
          items = data
          this.top = 0
        }
        return items
      }
    },
    created() {
      this.set()
    },
    destroyed() {
      this.clear()
    },
    methods: {
      preClick() {
        if (this.index > 0) {
          this.index--
        }
        this.calTop(0)
      },
      nextClick() {
        if (this.index >= this.products.length - this.showNum) {
          return
        }
        this.autoPlay()
      },
      set() {
        if (this.timer) {
          this.clear()
        }
        this.timer = setInterval(this.autoPlay, 2000)
      },
      clear() {
        clearInterval(this.timer)
      },
      autoPlay() {
        if (this.index < this.products.length - this.showNum) {
          this.index++
        }

        this.calTop(1)
      },
      calTop(num) {
        var _this = this
        if (num === 1) {
          // next
          this.top = -this.index * 152
          if (this.index >= this.products.length - this.showNum) {
            setTimeout(() => {
              _this.smooth = false
              _this.index = 0
              _this.top = 0
            }, 700)
          } else {
            this.smooth = true
          }
        } else {
          // pre
          this.top = -this.index * 152
          if (this.index <= 0) {
            setTimeout(() => {
              _this.smooth = false
              _this.index = this.products.length - this.showNum
              _this.top = -this.index * 152
            }, 700)
          } else {
            this.smooth = true
          }
        }
      }
    }
  }
</script>

<style>
/*home-category*/
.home-category {
  position: relative;
  width: 294px;
  height: 451px;
  overflow: hidden;
}
.home-category-ul {
  position: absolute;
  left: 0;
}
.home-category-ul.smooth {
  transition: all 0.75s;
}
.home-category-li>a {
  border: 1px solid #efefef;
  position: relative;
  display: block;
  line-height: 0;
  margin-bottom: 5px;
  transition: all 0.2s;
}
.home-category-li:hover a {
  border-color: #ddd;
}
.home-category-btn {
  position: absolute;
  left: 50%;
  width: 50px;
  line-height: 16px;
  margin-left: -25px;
  background-color: #ddd;
  color: #fff;
  text-align: center;
  opacity: 0;
  transition: all 0.2s;
  cursor: pointer;
}
.home-category:hover .home-category-btn  {
  opacity: 1;
}
.home-category-btn:hover {
  background-color: #ccc;
}
.home-category-btn.up {
  top: 0;
}
.home-category-btn.down {
  bottom: 0;
}
</style>
