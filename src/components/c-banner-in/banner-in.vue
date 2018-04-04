<template>
<div class="banner-in">
  <a v-if="item.link" :href="item.link" target="_blank"><img v-if="item.img" :src="item.img"></a>
  <img v-if="!item.link && item.img" :src="item.img">
</div>
</template>

<script>
import { mapGetters } from 'vuex'

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
  computed: mapGetters(['api']),
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      if (!this.page) {
        return
      }
      this.axios(this.api[`${this.page}Banner`].query()).then((res) => {
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
  font-size: 0;
}
</style>
