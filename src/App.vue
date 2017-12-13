<template>
<div id="app">
  <v-header></v-header>
  <router-view keep-alive></router-view>
  <v-footer></v-footer>
</div>
</template>

<script>
import vHeader from 'components/header/header'
import vFooter from 'components/footer/footer'

export default {
  data() {
    return {
    }
  },
  created() {

  },
  components: {
    vHeader,
    vFooter
  }
}
</script>

<style>
@import "./common/common.css";
#app {

}

</style>
