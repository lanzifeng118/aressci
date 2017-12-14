<template>
  <div class="experience-category f-left">
    <ul>
      <li v-for="(item, index) in items" class="experience-category-item">
        <router-link :to="item.link">{{item.name}} <span class="icon-right"></span></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from 'components/tools/api'

export default {
  data() {
    return {
      items: null
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    getItems() {
      this.axios(api.experienceList.query()).then((res) => {
        let data = res.data
        if (data.code === '200') {
          let list = data.data.list
          list.forEach((v, i) => {
            v.link = `/experience/list/c${v.id}`
          })
          this.items = [{name: 'All Experience', link: '/experience/all'}].concat(data.data.list)
        }
      })
    }
  },
  components: {
  }
}
</script>

<style>
.experience-category {
  width: 220px;
  min-height: 100px;
}
.experience-category-item {

}
.experience-category-item a{
  position: relative;
  display: block;
  padding: 10px 10px;
  margin-bottom: 5px;
  border: 1px solid #efefef;
}
.experience-category-item a.active {
  background-color: #0d93b8;
  color: #f5f5f5;
  border-color: #0d93b8;
}
.experience-category-item span {
  position: absolute;
  top: 8px;
  right: 10px;
}
</style>
