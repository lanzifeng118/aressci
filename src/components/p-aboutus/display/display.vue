<template>
  <div class="about-display">
    <position>
      {{item.title}}
    </position>
    <div class="about-display-wrap">
      <div class="about-display-info">
        <h1>{{item.title}}</h1>
        <p v-if="item.brief">{{item.brief}}</p>
      </div>
      <div class="about-display-editor editor" v-html="item.detail"></div>
    </div>
    <toast
      v-show="toast.show"
      :text="toast.text"
      :icon="toast.icon"
    >
    </toast>
  </div>
</template>

<script>
import api from 'components/tools/api'
import apiEn from 'components/tools/api-en'
import util from 'components/tools/util'
import toast from 'components/toast/toast'
import position from 'components/p-aboutus/position/position'

export default {
  data() {
    return {
      item: {},
      // toast
      toast: {
        show: false,
        text: '',
        icon: ''
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.getItem()
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    api() {
      return this.$store.state.lang === 'cn' ? api : apiEn
    },
    id() {
      return parseInt(this.$route.params.id.slice(1))
    }
  },
  created() {
    this.getItem()
  },
  methods: {
    getItem() {
      if (!this.id) {
        return
      }
      this.axios(this.api.aboutus.queryById(this.id)).then((res) => {
        let data = res.data
        // console.log(data)
        if (data.code === '200') {
          if (data.data) {
            this.item = data.data
          } else {
            let text = this.lang === 'cn' ? '无此文章' : 'NO DATA EXIST'
            util.toast.fade(this.toast, text, 'close')
            this.goBack()
          }
        }
      })
    },
    goBack() {
      setTimeout(() => {
        this.$router.push('/aboutus/display')
      }, 700)
    }
  },
  components: {
    toast,
    position
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
</style>
