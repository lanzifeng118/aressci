<template>
<div class="product-display">
  <div class="product-position position">
    <span class="icon-location_fill icon"></span>
    <router-link to="/">Home</router-link>
    <span class="icon-right"></span>
    <router-link to="/product">All Products Categories</router-link>
    <span class="icon-right"></span>
    <router-link :to="classify.link">{{classify.name}}</router-link>
    <span class="icon-right"></span>
    {{item.name}}
  </div>
  <div class="product-display-wrap f-left">
    <div class="product-display-summary f-clearfix">
      <img :src="item.imgSrc" alt="" class="f-left">
      <div class="product-display-summary-text">
        <h4>{{item.name}}</h4>
        <p>Vantage solutions unify Phoenix Controls suite of scalable products for airflow control and system integration, monitoring, and management. The products range from precision valve controllers to network integration hardware and front-end displays of actionable data. Applications are standalone or implemented at the room, floor.</p>
      </div>
    </div>
    <div class="product-display-box">
      <ul class="product-display-tab f-clearfix">
        <li :class="{active: tabShow[0]}" @click="show(0)">Product Info</li>
        <li :class="{active: tabShow[1]}" @click="show(1)">Resources</li>
      </ul>
      <div class="product-display-detail">
        <!-- info -->
        <div class="product-display-info" v-show="tabShow[0]">
          <p>Many times during an HVAC project implementation, the building management system (BMS) vendor suggests providing their generic controller for controlling third party devices such as air flow control valves. While this may reduce the upfront third party integration costs for the project, it typically increases the project’s start-up labor time and long term device maintenance costs. In addition, building owners often lack the device data they get from vendor supplied device controllers to support initiatives such as identifying opportunities for energy cost savings and reducing device downtime.
          </p>
          <p>Phoenix Controls offers multiple application specific valve-mounted controllers that are designed for pressurized spaces. Each controller monitors flow feedback and provides actuation control for repositioning the Phoenix Controls valves. Besides offering high performance, the valve controller reports back to the BMS or other front end system information about valve performance and room environment, providing facility staff and building owners insights on possible issues as well as areas of energy waste.</p>
          <h3>Controller Products</h3>
          <ul>
            <li>Celeris - For high speed actuation applications such as wet chemistry laboratory fume hood exhaust control. Celeris is used to ensure safety of the user at the fume hood.</li>
            <li>Traccel - For tracking pair room pressurization applications. Used when supply and exhaust in a space must maintain a specified pressure balance (i.e., negative or positive pressurized room).</li>
          </ul>
          <p>A typical research university can spend as much as one half to two-thirds of their entire annual utility budget on buildings containing research labs. Campus administrators need cost effective data analytic front end solutions that can be deployed quickly and can identify areas of energy waste.</p>
          <p>Phoenix Controls offers two front end solutions, Supervisor and Portal, that help facility staffs and building owners maintain their laboratory equipment while being able to support energy cost savings initiatives. Supervisor and Portal can help reduce energy spend on pressurized laboratories in the following ways:</p>
          <ul>
            <li>These solutions optimize air change rates in the spaces by helping staff quickly understand what is driving exhaust rates such as fume hood usage, air quality or thermal demand</li>
            <li>Identify high exhaust rates due to fume hood demand even when fume hoods are not being used</li>
            <li>Analyze which fume hoods are causing the most demand and rank them so that users can quickly identify opportunities to reduce air change rates</li>
            <li>Help facilities quantify their cost savings since these solutions can track the amount of air being supplied and exhausted in the space</li>
            <li>By entering the campus’ cost per CFM, the system calculates the total cost per lab as well as identify the drivers for the cost, such as fume hood usage or air quality</li>
          </ul>
          <p>By identifying these cost drivers, facilities can identify areas of cost savings and achieve a short payback period in their investment in front end data analytics software.</p>
        </div>
        <!-- resources -->
        <div class="product-display-resources" v-show="tabShow[1]">
          <h3>Product Documentations</h3>
          <table class="product-display-resources-table">
            <thead>
              <tr>
                <th width="70">Type</th>
                <th>Name</th>
                <th width="70">Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="type"><span class="icon-pdf"></span></td>
                <td class="name pointer">
                  <a href="/static/test.pdf" target="_blank">Low-Pressure Accel II Valves, CVV, 2-Pos, Base Upgrade PDS (MKT-0274)</a></td>
                <td class="size">1MB</td>
              </tr>
              <tr>
                <td class="type"><span class="icon-pdf"></span></td>
                <td class="name">
                  <a href="/static/test.pdf" target="_blank">Medium-Pressure Accel II Controllers Constant Volume, 2-Position, Base Upgradable Product Data Sheet (MKT-0278)</a></td>
                <td class="size">1MB</td>
              </tr>
              <tr>
                <td class="type"><span class="icon-pdf"></span></td>
                <td class="name pointer">
                  <a href="/static/test.pdf" target="_blank">Sentry Fume Hood Display Installation Guide (MKT-0388)</a></td>
                <td class="size">3MB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="f-right">
    <product-contact></product-contact>
    <product-video></product-video>
  </div>
</div>
</template>

<script>
import productVideo from 'components/product/video/video'
import productContact from 'components/product/contact/contact'
export default {
  data() {
    return {
      classify: {
        name: '',
        link: ''
      },
      item: {},
      tabShow: [true, false, false]
    }
  },
  created() {
    this.handleUrl()
  },
  watch: {
    '$route' (to, from) {
      this.handleUrl()
    }
  },
  methods: {
    handleUrl() {
      let _this = this
      this.$store.state.porducts.forEach((v, i) => {
        v.classifyLevel1.forEach((v1, i1) => {
          if (_this.$route.path.toLowerCase().indexOf(v1.link.toLowerCase()) >= 0) {
            _this.item = v1
            _this.classify.name = v.name
            _this.classify.link = v.link

            if (v1.link.toLowerCase() === _this.$route.path.toLowerCase()) {
              _this.show(0)
            } else {
              _this.show(1)
            }
          }
        })
      })
    },
    show(index) {
      let _this = this
      this.tabShow.forEach((v, i) => {
        let show = false
        if (i === index) {
          show = true
        }
        this.$set(_this.tabShow, i, show)
      })
    }
  },
  components: {
    productVideo,
    productContact
  }
}
</script>

<style>
.product-display {
  width: 976px;
  margin-left: 30px;
}
.product-display-wrap {
  width: 700px;
}
/*summary*/
.product-display-summary {
  margin-bottom: 20px;
}
.product-display-summary img{
  width: 220px;
  margin-right: 10px;
  margin-bottom: 5px;
}
.product-display-summary-text h4 {
  color: #0d93b8;
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;
}
.product-display-summary-text p {
  line-height: 1.5em;
}
.product-display-box {
  border: 1px solid #e5e5e5;
}
/*tab*/
.product-display-tab {
  height: 32px;
  background: #f6f6f6;
  border-bottom: 1px solid #E5E5E5;
}
.product-display-tab li{
  cursor: pointer;
  float: left;
  padding: 8px 12px;
  line-height: 16px;
  margin-top: -1px;
  border-right: 1px solid #E5E5E5;
}
.product-display-tab li:hover {
}
.product-display-tab li.active {
  background-color: #fff;
  padding: 6px 10px 10px 10px;
  border-top: 2px solid #0d93b8;
  color: #0d93b8;
}
.product-display-detail {
  line-height: 1.5em;
  margin-top: -1px;
  padding: 30px 25px;
}
.product-display-detail>div {
  min-height: 605px;
}
.product-display-info {
  color: #7d6666;
}
.product-display-info  h3 {
  color: #0d93b8;
  font-weight: bold;
  margin: 15px 0;
}
.product-display-info p {
  margin-bottom: 10px;
}
.product-display-info ul,
.product-display-how ul {
  margin: 10px 0 10px 15px;
}
.product-display-info li {
  position: relative;
  display: block;
  padding: 0 0 5px 12px;
  line-height: 1.5em;
}
.product-display-info li::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background: #86b513;
  top: 7px;
  left: 0px;
}
.product-display-resources h3 {
  color: #0d93b8;
  font-weight: bold;
  margin-bottom: 15px;
}
.product-display-resources-table th {
  border-top: 1px solid #efefef;
}
.product-display-resources-table th,
.product-display-resources-table td {
  padding: 6px 0;
  vertical-align: middle;
  border-bottom: 1px solid #efefef;
}
.product-display-resources-table td.type {
  color: #c00;
  text-align: center;
}
.product-display-resources-table td.size {
  text-align: center;
}
.product-display-resources-table td.name:hover {

}
</style>
