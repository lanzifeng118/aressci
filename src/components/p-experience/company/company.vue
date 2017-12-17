<template>
  <div class="experience-item-box">
    <h2 v-if="all"><router-link :to="'/experience/list/c' + experience.id">{{experience.name}} <span class="icon-more"></span></router-link></h2>
    <h2 v-if="!all">{{experience.name}}</h2>
    <ul class="experience-item-title f-clearfix">
      <li
        v-for="(item, index) in experience.classify"
        @click="change(index)"
        :class="{active: activeIndex === index}"
      >
        {{item.name}}
      </li>
    </ul>
    <div class="experience-item-logo">
      <ul
        v-for="(item, index) in experience.classify"
        class="f-clearfix"
        v-show="activeIndex === index"
      >
        <!-- all -->
        <li v-for="(itemLogo, indexLogo) in item.logo" v-if="all && indexLogo < 8"><img :src="itemLogo"></li>
        <!-- list -->
        <li v-for="(itemLogo, indexLogo) in item.logo" v-if="!all"><img :src="itemLogo"></li>
      </ul>
    </div>
    <!-- more -->
    <div class="experience-item-more" v-if="all">
      <router-link :to="'/experience/list/c' + experience.id">MORE <span class="icon-more"></span></router-link>
    </div>
  </div>
</template>

<script>

export default {
  props: ['experience', 'all'],
  data() {
    return {
      activeIndex: 0
    }
  },
  watch: {
    '$route' (to, from) {
      this.init()
    }
  },
  created() {
    console.log(this.experience)
    this.init()
  },
  methods: {
    init() {
      this.activeIndex = 0
    },
    change(num) {
      this.activeIndex = num
    }
  },
  components: {
  }
}
</script>

<style>
.experience-item-box {
  border: 1px solid #efefef;
  position: relative;
  margin-bottom: 40px;
}
.experience-item-box h2 {
  position: absolute;
  font-size: 14px;
  line-height: 40px;
  padding: 0 15px;
}
.experience-item-box h2 a {
  font-weight: bold;
  color: #0d93b8;
  display: block;
  color: #0d93b8;
}
.experience-item-box h2 a:hover {
  color: #007c9e;
}
.experience-item-box h2 span {
  font-size: 12px;
}
/*title*/
.experience-item-title {
  border-bottom: 1px solid #efefef;
  background: #f6f6f6;
  height: 40px;
}
.experience-item-title li {
  float: right;
  padding: 0 5px;
  cursor: pointer;
  border-left: 1px solid #efefef;
  width: 130px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  line-height: 39px;
}
.experience-item-title li:hover {
  color: #0d93b8;
}
.experience-item-title li.active {
  background-color: #fff;
  margin-top: -1px;
  border-top: 2px solid #0d93b8;
  color: #0d93b8;
  height: 41px;
}
.experience-item-logo {
  width: 940px;
  padding: 20px 0 10px 0;
  margin: 0 auto;
}
.experience-item-logo ul{
  width: 950px;
}
.experience-item-logo li {
  width: 227px;
  padding: 10px 0;
  text-align: center;
  float: left;
  margin: 0 10px 10px 0;
  border: 1px solid #f1f1f1;
}
.experience-item-logo li img {
  width: 150px;
}
.experience-item-more {
  margin-bottom: 15px;
  margin-top: -15px;
  text-align: center;
}
.experience-item-more a {
  padding-right: 20px;
  display: block;
  color: #999;
  margin: 0 auto;
  font-size: 12px;
}
.experience-item-more a:hover {
  color: #0d93b8;
}
</style>
