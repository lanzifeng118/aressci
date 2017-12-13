<template>
<div class="footer">
  <div class="footer-top wrap">
    <ul class="f-clearfix">
      <li>
        <a href="mailto:lanzifeng118@163.com?subject=Here is a web page you might be interested in seeing&body=Hello">
          <span class="icon icon-mail"></span>Email Page
        </a>
      </li>
      <li><a href="javascrip: void(0);" @click="print"><span class="icon icon-Print"></span>Print Page</a></li>
      <li class="footer-link">
        <a href="javascrip: void(0);"><span class="icon icon-share"></span>Friend Links</a>
        <ul class="footer-link-ul">
          <li><a href="https://www.phoenixcontrols.com/" target="_blank"><span class="icon icon-dot"></span>Phoenix Controls</a></li>
          <li><a href="http://www.drager.net/" target="_blank"><span class="icon icon-dot"></span>Drager</a></li>
          <li><a href="http://www.drager.net/" target="_blank"><span class="icon icon-dot"></span>Aircuity</a></li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="footer-bottom">
    <div class="wrap footer-nav">
      <ul>
        <li v-for="item in items">
          <router-link :to="item.link">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="wrap">
      <ul class="footer-info">
        <li><span class="icon icon-people_fill"></span>Linkman: Eric</li>
        <li><span class="icon icon-phone"></span>15989023422</li>
        <li><span class="icon icon-mail"></span>kcisand@mail.com</li>
      </ul>
      <p class="footer-copyright">Copyright © 2017 Air Safety Controls and Energy Saving All rights reserved.</p>
    </div>
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
    items() {
      return this.$store.state.mainNav
    }
  },
  methods: {
    print() {
      window.print()
    }
  }
}

</script>

<style>
.footer-bottom {
  border-top: 1px solid #e5e5e5;
  padding: 20px 0;
}
/*top*/
.footer-top {
  text-align: right;
  font-size: 13px;
  margin-bottom: 5px;
}
.footer-top>ul>li {
  float: right;
  line-height: 26px;
  margin-left: 15px;
}
.footer-top a {
  display: block;
  color: #666;
}
.footer-top>ul>li:hover>a {
  color: #0d93b8;
}
.footer-top span.icon {
  margin-right: 3px;
}
/*link*/
.footer-link {
  position: relative;
}
.footer-link-ul {
  position: absolute;
  bottom: 26px;
  left: -10px;
  background-color: rgba(245, 245, 245, 0.7);
}
.footer-link-ul a {
  display: block;
  width: 180px;
  text-align: left;
  overflow: hidden;
  height: 0px;
  padding: 0 10px;
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.2s;
}
.footer-link:hover .footer-link-ul a {
  height: 24px;
}
.footer-link:hover ul {
  padding: 5px 0;
}
.footer-link:hover ul a:hover{
  text-decoration: underline;
}
/*footer-nav*/
.footer-nav ul{
  text-align: center;
  margin-bottom: 10px;
}
.footer-nav li {
  font-size: 13px;
  display: inline-block;
}
.footer-nav a {
  display: block;
  color: #666;
  border-right: 2px solid #eee;
  padding: 0px 18px;
}
.footer-nav a:hover {
  color: #0d93b8;
}
.footer-nav li:last-child a {
  border: none;
}

.footer-copyright {
  color: #aaa;
  text-align: center;
  font-size: 12px;
}
.footer-info {
  margin-bottom: 10px;
  text-align: center;
}
.footer-info li{
  font-size: 13px;
  display: inline-block;
  padding: 5px 10px;
  color: #999;
}

</style>
