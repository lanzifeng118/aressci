<template>
<div class="banner-in">
  <a v-if="item.link" :href="item.link"><img v-if="item.img" :src="item.img"></a>
  <img v-if="!item.link && item.img" :src="item.img">
</div>
</template>

<script>
import api from 'components/tools/api'

export default {
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      item: {
        img: '',
        link: ''
      }
    }
  },
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      if (!this.page) {
        return
      }
      this.axios(api[`${this.page}Banner`].query()).then((res) => {
        let data = res.data
        if (data.code === '200') {
          this.item = data.data
        } else {
          // util.req.queryError(this.toast)
        }
      })
    }
  }
}
</script>

<style>
.banner-in {
  margin-bottom: 12px;
}
</style>
