<template>
<div class="product-list-category">
  <ul class="product-list-category-ul level01">
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
        class="product-list-category-ul level02"
        v-if="item.product"
        v-show="item.open"
      >
        <li v-for="itemLevel2 in item.product">
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
    }
  },
  watch: {
    '$route' (to, from) {
      this.openItem()
    },
    items() {
      this.openItem()
    }
  },
  computed: {
    items() {
      return this.$store.state.productNav || []
    }
  },
  methods: {
    openItem() {
      let path = this.$route.path.toLowerCase()
      let allPath = '/product/all'
      let listPath = '/product/list'
      let displayPath = '/product/display'
      if (path === allPath) {
        // all
        this.items.forEach((v, i) => {
          if (v.open) {
            v.open = false
          }
        })
      } else if (path.indexOf(listPath) === 0) {
        // list
        this.items.forEach((v, i) => {
          if (v.link.toLowerCase() === path) {
            v.open = true
          } else {
            v.open = false
          }
        })
      } else if (path.indexOf(displayPath) >= 0) {
        this.items.forEach((v, i) => {
          if (path.indexOf(`c${v.id}-`) > 0) {
            v.open = true
          } else {
            v.open = false
          }
        })
      }
    },
    toggle(index) {
      var obj = this.items[index]
      obj.open = !obj.open
    }
  }
}
</script>

<style>
.product-list-category {
  width: 220px;
  min-height: 100px;
  float: left;
}
.product-list-category-ul a {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 6px 0;
}
.product-list-category-ul a.active {
  color: #0d93b8;
}
.product-list-category-ul .icon {
  font-size: 14px;
}
.product-list-category-ul.level01>li {
  padding-bottom: 8px;
}
.product-list-category-ul.level01>li>span {
  float: left;
  cursor: pointer;
}
.product-list-category-ul.level01>li>span:hover {
  color: #0d93b8;
}
.product-list-category-ul.level01>li>a {
  padding-bottom: 8px;
  padding-top: 0px;
  font-weight: bold;
}
.product-list-category-ul.level02>li>a {
  font-size: 13px;
}
.product-list-category-ul.level02 {
  padding-left: 20px;
}

</style>
