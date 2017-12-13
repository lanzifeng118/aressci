<template>
  <div class="about-display">
    <div class="position about-position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">Home</router-link>
      <span class="icon-right"></span>
      <router-link to="/aboutus">About Us</router-link>
      <span class="icon-right"></span>
      {{item.title}}
    </div>
    <div class="about-display-wrap">
      <div class="about-display-info">
        <h1>{{item.title}}</h1>
        <p v-if="item.summary">{{item.summary}}</p>
      </div>
      <div class="about-display-editor" v-html="item.detail"></div>
    </div>
  </div>
</template>

<script>
let aboutDisplay = {
  '01': {
    title: 'Air Safety Controls and Energy Saving',
    summary: 'As Phoenixcontrols and Aircuity authorized distributor in China, we offer innovative, technologically sound airflow and pressurization. As Phoenixcontrols and Aircuity authorized distributor in China.',
    detail: '<h1>Anthony Scaramucci</h1><p>The free-roaming deer of Nara, Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks. Favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p><p>The free-roaming deer of Nara, Japan have become an Instagram favourite for their and their apparent habit of bowing to get snacks. Favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p><h1>Instagram favourite</h1><p>Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks. Favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p><p>The free-roaming deer of Nara, Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p>'
  },
  '02': {
    title: 'Enterprise Culture',
    summary: '',
    detail: '<h1>Anthony Scaramucci</h1><p>The free-roaming deer of Nara, Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks. Favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p><p>The free-roaming deer of Nara, Japan have become an Instagram favourite for their and their apparent habit of bowing to get snacks. Favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p><h1>Instagram favourite</h1><p>Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks. Favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p><p>The free-roaming deer of Nara, Japan have become an Instagram favourite for their endearing boldness and their apparent habit of bowing to get snacks.</p>'
  },
  '03': {
    title: 'Contact Us',
    summary: '',
    detail: '<p>Our emai is kcisand@mail.com. </p><p>Our phone number is 15989235411. You can call us during work time (9:00am - 6:00pm).</p>'
  }
}
export default {
  data() {
    return {
      item: null
    }
  },
  watch: {
    '$route' (to, from) {
      this.getItem()
    }
  },
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      this.item = aboutDisplay[this.$route.params.id]
    }
  },
  components: {
  }
}
</script>

<style>
.about-display-wrap {
  margin-left: 50px;
  width: 956px;
}
.about-display-info {
  margin-bottom: 20px;
}
.about-display-info h1 {
  color: #0d93b8;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}

.about-display-info p {
  padding: 5px 10px;
  line-height: 1.5em;
  color: #999;
  border-left: 2px solid #ebebeb;
  background-color: #f9f9f9;
}
.about-display-editor h1{
  font-size: 15px;
  padding-left: 10px;
  border-left: 2px solid #0d93b8;
  margin: 15px 0;
}
.about-display-editor p {
  padding-left: 10px;
  color: #666;
  margin: 8px 0;
  line-height: 1.5em;
}
</style>
