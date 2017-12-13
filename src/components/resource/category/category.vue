<template>
<div class="resource-category">
  <ul class="resource-category-ul level01">
    <li v-for="(item, index) in items">
      <span
        class="icon"
        @click="toggle(index)"
        :class="[item.open ? 'icon-minus': 'icon-add']">
      </span>
      <router-link :to="item.link">
        {{item.name}}
      </router-link>
      <ul
        class="resource-category-ul level02"
        v-if="item.classifyLevel1"
        v-show="item.open"
      >
        <li v-for="itemLevel2 in item.classifyLevel1">
          <router-link
            :to="itemLevel2.link"
            :src="itemLevel2.name"
          >
            {{itemLevel2.name}}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.openItem()
    }
  },
  created() {
    let arr = [
      {
        name: 'Phoenix Controls',
        link: '/resource/phoenix',
        open: false,
        classifyLevel1: [
          {name: 'Ask the Expert', link: 'ask'},
          {name: 'Case Studies', link: 'case'},
          {name: 'Industry Links', link: 'industrylinks'},
          {name: 'Industry Terms', link: 'industryterms'},
          {name: 'PC Optimizer Airflow & Energy Modeling', link: 'PCoptimizer'}
        ]
      },
      {
        name: 'Drager',
        link: '/resource/drager',
        open: false
      },
      {
        name: 'Aircuity',
        link: '/resource/aircuity',
        open: false
      }
    ]
    this.items = arr
    this.openItem()
  },
  methods: {
    openItem() {
      let _this = this
      let path = this.$route.path.toLowerCase()
      let typeArr = ['phoenix', 'drager', 'aircuity']

      typeArr.forEach((v, i) => {
        if (path.indexOf('/resource/' + v) >= 0) {
          _this.items[i].open = true
          _this.$set(_this.items, i, _this.items[i])
        } else {
          _this.items[i].open = false
          _this.$set(_this.items, i, _this.items[i])
        }
      })
    },
    toggle(index) {
      var obj = this.items[index]
      obj.open = !obj.open
      this.$set(this.items, index, obj)
    }
  }
}
</script>

<style>
.resource-category {
  width: 220px;
  float: left;
}
.resource-category-ul a {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 6px 0;
}
.resource-category-ul a.router-link-exact-active {
  color: #0d93b8;
}
.resource-category-ul .icon {
  font-size: 14px;
}
.resource-category-ul.level01>li {
  padding-bottom: 8px;
}
.resource-category-ul.level01>li>span {
  float: left;
  cursor: pointer;
}
.resource-category-ul.level01>li>span:hover {
  color: #0d93b8;
}
.resource-category-ul.level01>li>a {
  padding-bottom: 8px;
  padding-top: 0px;
  font-weight: bold;
}
.resource-category-ul.level02>li>a {
  font-size: 13px;
}
.resource-category-ul.level02 {
  padding-left: 20px;
}

</style>
