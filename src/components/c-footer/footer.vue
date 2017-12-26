<template>
<div class="footer">
  <div class="footer-top wrap">
    <ul class="f-clearfix">
      <li>
        <a :href="'mailto:?' + basicInfo.email + '&subject=Here is a web page you might be interested in seeing&body=Hello'">
          <span class="icon icon-mail"></span>邮件
        </a>
      </li>
      <li><a href="javascrip: void(0);" @click="print"><span class="icon icon-Print"></span>打印页面</a></li>
      <li class="footer-link">
        <a href="javascrip: void(0);"><span class="icon icon-share"></span>友情链接</a>
        <ul class="footer-link-ul">
          <li v-for="itemF in friendLinkItems"><a :href="itemF.link" target="_blank"><span class="icon icon-dot"></span>{{itemF.name}}</a></li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="footer-bottom">
    <div class="wrap footer-nav">
      <ul>
        <li v-for="item in navItems">
          <router-link :to="item.link">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="wrap">
      <ul class="footer-info">
        <li><span class="icon icon-people_fill"></span>联系人: {{basicInfo.linkman}}</li>
        <li><span class="icon icon-phone"></span>{{basicInfo.telephone}}</li>
        <li><span class="icon icon-mail"></span>{{basicInfo.email}}</li>
      </ul>
      <p class="footer-copyright">Copyright © 2017 {{basicInfo.full_name}} All rights reserved.</p>
    </div>
  </div>
</div>
</template>

<script>
import api from 'components/tools/api'

export default {
  data() {
    return {
      friendLinkItems: []
    }
  },
  computed: {
    basicInfo() {
      return this.$store.state.basicInfo
    },
    navItems() {
      let navItems = [
        {name: '首页', link: '/home'},
        {
          name: '产品',
          link: '/product'
        },
        {
          name: '项目经验',
          link: '/experience'
        },
        {name: '服务与支持', link: '/support'},
        {name: '新闻', link: '/news'},
        {name: '关于我们', link: '/aboutus'}
      ]
      let aboutusId = this.$store.state.aboutusId
      if (aboutusId) {
        navItems[5].link = `/aboutus/display/c${aboutusId}`
      }
      return navItems
    }
  },
  created() {
    this.getFriendLink()
  },
  methods: {
    getFriendLink() {
      this.axios(api.friendlink.query()).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          this.friendLinkItems = data.data.list
        }
      })
    },
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
