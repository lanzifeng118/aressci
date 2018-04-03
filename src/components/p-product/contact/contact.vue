<template>
  <div class="product-contact">
    <h3>{{text.title[lang]}}</h3>
    <ul v-if="lang === 'cn'">
      <li>
        我们的邮箱是<b>{{item.email}}</b>， 你可以<a :href="'mailto:' + item.email + '?subject=&body='">点击这里</a>很方便地发邮件给我们!
      </li>

      <li><h4>我们的电话 <b>{{item.telephone}}</b>. 你可以在工作时间 ({{item.worktime}})联系我们.</h4></li>
    </ul>
    <ul v-if="lang === 'en'">
      <li>
        Our emai is <b>{{item.email}}</b>. You can <a :href="'mailto:' + item.email + '?subject=&body='">Click Here</a> to send an emai to us directly!
      </li>
      <li><h4>Our phone number is <b>{{item.telephone}}</b>. You can call us during work time ({{item.worktime}}).</h4></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: {
        title: {
          cn: '联系我们',
          en: 'Contact Us'
        }
      }
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    item() {
      return this.$store.state.basicInfo
    }
  }
}
</script>

<style>
/*product-contact*/
.product-contact {
  width: 254px;
  height: 205px;
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #96d8ea;
}
.product-contact h3 {
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
}
.product-contact li {
  position: relative;
  display: block;
  color: #666;
  padding: 0 0 3px 12px;
  line-height: 1.5em;
}

.product-contact li::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #ccc;
  top: 7px;
  left: 0px;
}
.product-contact b {
  font-weight: bold;
  color: #0d93b8;
}
.product-contact a {
  font-weight: bold;
  display: inline-block;
}
.product-contact a:hover {
  color: #0d93b8;
}
</style>
