<template>
  <div class="home-information">
    <div class="home-information-wrap">
      <ul>
        <!-- us -->
        <li class="home-information-item home-us white-box">
          <h3 class="home-information-item-title">About Us</h3>
          <router-link to="/aboutus" class="home-information-item-more">
            MORE<span class="icon-more"></span>
          </router-link>
          <h4 class="home-information-item-h4">
            <router-link to="/aboutus/display/01">aressci</router-link>
          </h4>
          <p class="home-information-item-p">As Phoenixcontrols and Aircuity authorized distributor in China, we offer innovative, technologically sound airflow and pressurization. As Phoenixcontrols and Aircuity authorized distributor in China.</p>
        </li>
        <!-- news -->
        <li class="home-information-item home-news white-box">
          <h3 class="home-information-item-title">News</h3>
          <router-link to="news" class="home-information-item-more">
            MORE<span class="icon-more"></span>
          </router-link>
          <h4 class="home-information-item-h4">
            <router-link to="/news/display/01">Drivers will be busy</router-link>
          </h4>
          <h5 class="home-information-item-time">2017.02.10</h5>
          <p class="home-information-item-p">Formula 1 heads off on its official summer break at the end of this week but away from the cameras there will be plenty going on.</p>
        </li>
        <!-- product -->
        <li class="home-information-item home-product white-box">
          <h3 class="home-information-item-title">Our Products</h3>
          <router-link to="/product" class="home-information-item-more">
            MORE<span class="icon-more"></span>
          </router-link>
          <ul class="home-information-product-ul">
            <li v-for="item in productClassify">
              <router-link :to="item.link">{{item.fullName}}</router-link>
            </li>
          </ul>
          <ul class="home-information-product-dot" v-show="productPage">
            <li
              v-for="(item, index) in productPage"
              :class="{active: item.active}"
              @click="chagePage(index)"
            >
            </li>
          </ul>
          <div class="home-information-product-btn f-left" @click="productPre">
            <span class="icon-back"></span>
          </div>
          <div class="home-information-product-btn f-right" @click="productNext">
            <span class="icon-right"></span>
          </div>
        </li>
        <!-- service -->
        <li class="home-information-item home-service white-box">
          <h3 class="home-information-item-title">Service & Support</h3>
          <router-link to="" class="home-information-item-more">
            MORE<span class="icon-more"></span>
          </router-link>
          <ul class="home-information-product-ul">
            <li></span><router-link to="">Phoenixcontrols Precision Airflow Controls Products Service</router-link></li>
            <li><router-link to="">Dräger Gas Detectors Products Service</router-link></li>
            <li><router-link to="">Aircuity Critical Indoor Environmental Monitoring  Service </router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import slider from 'components/slider/slider'

export default {
  data() {
    return {
      items: [],
      // productIndex: 0,
      productClassifyAll: null,
      productClassify: null,
      productPage: null,
      productPageIndex: 0,
      productPageTotal: 0,
      num: 4
    }
  },
  created() {
    let arr = [
      {fullName: '4Phoenixcontrols Precision Airflow Controls', link: ''},
      {fullName: '5Precision Airflow Controls Products', link: ''},
      {fullName: '6Phoenixcontrols Airflow Controls Products', link: ''},
      {fullName: '7Products', link: ''},
      {fullName: '8Airflow Products', link: ''},
      {fullName: '9Phoenixcontrols Precision Airflow', link: ''}
    ]
    this.productClassifyAll = this.$store.state.porducts.concat(arr)
    this.showProductClassify()
    this.dotShow()
  },
  methods: {
    showProductClassify() {
      this.productClassify = this.productClassifyAll.slice(this.productPageIndex * this.num, (this.productPageIndex + 1) * this.num)
    },
    dotShow() {
      this.productPageTotal = Math.ceil(this.productClassifyAll.length / this.num)
      if (this.productPageTotal > 0) {
        this.productPage = []
        for (let i = 0; i < this.productPageTotal; i++) {
          let obj = {active: false}
          if (i === this.productPageIndex) {
            obj.active = true
          }
          this.productPage.push(obj)
        }
      }
    },
    chagePage(index) {
      if (index !== this.productPageIndex) {
        this.productPage[this.productPageIndex].active = false
        this.productPage[index].active = true
        this.productPageIndex = index
        this.showProductClassify()
      }
    },
    productPre() {
      let index = this.productPageIndex
      if (index === 0) {
        index = this.productPageTotal - 1
      } else {
        index--
      }
      this.chagePage(index)
    },
    productNext() {
      let index = this.productPageIndex
      if (index === this.productPageTotal - 1) {
        index = 0
      } else {
        index++
      }
      this.chagePage(index)
    }
  },
  components: {
    slider
  }
}
</script>

<style>
.home-information {
  margin-bottom: 20px;
}
.home-information-wrap {
  margin-left: -14px;
  width: 1254px;
}
.home-information-wrap>ul {
  display: table;
  border-collapse: separate;
  border-spacing: 14px;
}
.home-information-item.white-box {
  margin-right: 14px;
  display: table-cell;
  position: relative;
  width: 296px;
  padding: 35px 25px 0 25px;
  height: 293px;
}
.home-information-item-title {
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
}
.home-information-item-h4 {
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 20px;
}
.home-information-item-p {
  word-break: break-all;
  line-height: 1.5em;
  color: #555;
}
.home-information-item-time {
  text-align: right;
  margin-bottom: 15px;
  color: #ccc;
  font-size: 12px;

}
/*us*/
.home-us.white-box {
  border-top-color: #cff5ff;
}
.home-us.white-box .home-information-item-title {
  color: #0d93b8;
}
/*news*/
.home-news.white-box {
  border-top-color: #cff5ff;
}
.home-news.white-box .home-information-item-title {
  color: #0d93b8;
}
/*product*/
.home-product.white-box {
  border-top-color: #cff5ff;
}
.home-product.white-box .home-information-item-title {
  color: #0d93b8;
}
.home-information-product-img img {
  width: 100%;
}
.home-information-product-ul {
  margin-top: 10px;
}
.home-information-product-ul a {
  position: relative;
  color: #555;
  display: block;
  padding-bottom: 5px;
  line-height: 1.5em;
  padding-left: 12px;
}
.home-information-product-ul a::before {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: #555;
  top: 8px;
  left: 0px;

}
.home-information-product-ul a:hover {
  color: #0d93b8;
}
.home-information-product-ul li:hover {
  color: #0d93b8;
}
.home-information-product-dot {
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 32px;
  left: 0px;
}
.home-information-product-dot li {
  opacity: 0.5;
  cursor: pointer;
  display: inline-block;
  margin: 0 3px;
  width: 8px;
  height: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #ccc;
  transition: all 0.2s;
}
.home-product.white-box:hover .home-information-product-dot>li {
  width: 10px;
  height: 10px;
  opacity: 0.8;
}
.home-information-product-dot li:hover {
  background-color: #aaa;
  border-color: #aaa;
}
.home-information-product-dot li.active {
  background-color: #fff !important;
  border-color: #0d93b8 !important;
  cursor: default;
}
.home-information-product-btn {
  position: absolute;
  opacity: 0;
  height: 30px;
  top: 50%;
  margin-top: -15px;
  cursor: pointer;
  width: 18px;
  background: rgba(0, 0, 0, 0.1);
  line-height: 30px;
  text-align: center;
  color: #fff;
  transition: all 0.2s;
}
.home-information-product-btn.f-left {
  left: 0;
}
.home-information-product-btn.f-right {
  right: 0;
}
.home-product.white-box:hover .home-information-product-btn {
  opacity: 1;
}
.home-information-product-btn:hover {
  background: rgba(0, 0, 0, 0.2);
}
/*service*/
.home-service.white-box {
  border-top-color: #cff5ff;
}
.home-service.white-box .home-information-item-title {
  color: #0d93b8;
}

.home-information-item-more {
  position: absolute;
  opacity: 0.3;
  bottom: 15px;
  right: 20px;
  color: #aaa;
  font-size: 13px;
}
.home-information-item:hover .home-information-item-more {
  opacity: 1;
}
.home-information-item-more span {
  vertical-align: -1px;
  margin-left: 2px;
}
</style>
