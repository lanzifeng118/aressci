<template>
  <div class="news-category f-left">
    <ul>
      <li v-for="(item, index) in items" class="news-category-item">
        <router-link :to="item.link" :class="{activeD: active[index]}">{{item.name}}<span class="icon-right"></span></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: null,
      active: {}
    }
  },
  watch: {
    '$route' (to, from) {
      this.displayActive()
    }
  },
  created() {
    let category = this.$store.state.news
    this.items = [{name: 'All News', link: '/news/all'}].concat(category)
    this.displayActive()
  },
  methods: {
    displayActive() {
      this.active = {}
      let path = this.$route.path
      if (path.indexOf('/news/display') === 0) {
        let id = this.$route.params.id
        let arr = id.split('-')
        if (arr[0]) {
          this.active[arr[0]] = true
        }
      }
    }
  },
  components: {
  }
}
</script>

<style>
.news-category {
  width: 220px;
}
.news-category-item {

}
.news-category-item a{
  position: relative;
  display: block;
  padding: 10px 10px;
  margin-bottom: 5px;
  border: 1px solid #efefef;
}
.news-category-item a.active, .news-category-item a.activeD {
  background-color: #0d93b8;
  color: #f5f5f5;
  border-color: #0d93b8;
}
.news-category-item span {
  position: absolute;
  top: 8px;
  right: 10px;
}
</style>
