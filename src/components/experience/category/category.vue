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
export default {
  data() {
    return {
      items: null
    }
  },
  created() {
    this.items = [{name: 'All Experience', link: '/experience/all'}].concat(this.$store.state.experience)
  },
  methods: {

  },
  components: {
  }
}
</script>

<style>
.experience-category {
  width: 220px;
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
