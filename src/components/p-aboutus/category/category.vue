<template>
  <div class="about-category f-left">
    <ul>
      <li v-for="(item, index) in items" class="about-category-item">
        <router-link :to="item.link">{{item.title}} <span class="icon-right"></span></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: mapGetters({
    items: 'aboutusNav'
  }),
  methods: {

  },
  components: {
  }
}
</script>

<style>
.about-category {
  width: 220px;
}
.about-category-item {

}
.about-category-item a{
  position: relative;
  display: block;
  padding: 10px 25px 10px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
  border: 1px solid #efefef;
}
.about-category-item a.active {
  background-color: #0d93b8;
  color: #f5f5f5;
  border-color: #0d93b8;
}
.about-category-item span {
  position: absolute;
  top: 8px;
  right: 10px;
}
</style>
