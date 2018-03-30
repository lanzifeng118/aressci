  <template>
  <div class="home-information">
    <div class="home-information-wrap">
      <ul>
        <!-- us -->
        <li class="home-information-item home-us white-box">
          <h3 class="home-information-item-title">{{text.aboutusTitle[lang]}}</h3>
          <router-link v-if="aboutusId" :to="'/aboutus/display/c' + aboutusId" class="home-information-item-more">
            {{text.more[lang]}}<span class="icon-more"></span>
          </router-link>
          <h4 class="home-information-item-h4">
            <router-link to="/aboutus/display">{{basicInfo.name}}</router-link>
          </h4>
          <p class="home-information-item-p" v-html="basicInfo.brief"></p>
        </li>

        <!-- news -->
        <li class="home-information-item home-news white-box">
          <news></news>
        </li>

        <!-- product -->
        <li class="home-information-item home-product white-box">
          <h3 class="home-information-item-title">{{text.productTitle[lang]}}</h3>
          <router-link to="/product" class="home-information-item-more">
            {{text.more[lang]}}<span class="icon-more"></span>
          </router-link>
          <ul class="home-information-product-ul">
            <li v-for="item in product.slice" :title="item.full_name">
              <router-link :to="item.link">
                <h5>{{item.name}}</h5>                
                <p>{{item.full_name}}</p>
              </router-link>
            </li>
          </ul>
          <ul class="home-information-product-dot" v-show="product.page">
            <li
              v-for="(item, index) in product.page"
              :class="{active: item.active}"
              @click="chagePage(index)"
            > 
            </li>
          </ul>
          <div v-show="product.page" class="home-information-product-btn f-left" @click="productPre">
            <span class="icon-back"></span>
          </div>
          <div v-show="product.page" class="home-information-product-btn f-right" @click="productNext">
            <span class="icon-right"></span>
          </div>
        </li>

        <!-- service -->
        <li class="home-information-item home-service white-box">
          <support></support>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import slider from 'components/slider/slider'
import news from 'components/p-home/news/news'
import support from 'components/p-home/support/support'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      product: {
        slice: [],
        index: 0,
        num: 4,
        total: 0,
        page: null
      },
      text: {
        aboutusTitle: {
          cn: '关于我们',
          en: 'About us'
        },
        productTitle: {
          cn: '我们的产品',
          en: 'Our Products'
        },
        more: {
          cn: '更多',
          en: 'MORE'
        }
      }
    }
  },
  computed: mapState(['lang', 'productClassify', 'basicInfo', 'aboutusId']),
  watch: {
    productClassify() {
      this.getProductSlice()
    }
  },
  created() {
    console.log(this.a)
    this.getProductSlice()
  },
  methods: {
    getProductSlice() {
      let product = this.product
      let pClassify = this.productClassify
      let pClassifyLength = pClassify.length
      if (pClassifyLength === 0) {
        return
      }
      product.slice = pClassify.slice(product.index * product.num, (product.index + 1) * product.num)
      if (pClassifyLength > product.num) {
        this.dotShow()
      }
    },
    dotShow() {
      let product = this.product
      product.total = Math.ceil(this.productClassify.length / product.num)
      product.page = []
      for (let i = 0; i < product.total; i++) {
        let obj = {active: false}
        if (i === product.index) {
          obj.active = true
        }
        product.page.push(obj)
      }
    },
    chagePage(index) {
      let product = this.product
      if (index !== product.index) {
        product.page[product.index].active = false
        product.page[index].active = true
        product.index = index
        this.getProductSlice()
      }
    },
    productPre() {
      let product = this.product
      let index = product.index
      if (index === 0) {
        index = product.total - 1
      } else {
        index--
      }
      this.chagePage(index)
    },
    productNext() {
      let product = this.product
      let index = product.index
      if (index === product.total - 1) {
        index = 0
      } else {
        index++
      }
      this.chagePage(index)
    }
  },
  components: {
    slider,
    support,
    news
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
  border-top-color: #cff5ff;
  margin-right: 14px;
  display: table-cell;
  position: relative;
  width: 296px;
  padding: 35px 25px 0 25px;
  height: 293px;
}
.home-information-item-title {
  color: #0d93b8;
  text-align: center;
  margin-bottom: 25px;
  font-weight: bold;
}
.home-information-item-h4 {
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 15px;
}
.home-information-item-h4 > a {
  text-overflow: ellipsis;
  width: 244px;
  overflow: hidden;
  white-space: nowrap;
  display: block;
}
.home-information-item-p {
  line-height: 1.5em;
  max-height: 146px;
  overflow: hidden;
  color: #555;
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
  width: 244px;
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
.home-information-product-ul li p {
  color: #777;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.home-information-product-dot {
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 15px;
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

.home-information-item-more {
  position: absolute;
  z-index: 3;
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
