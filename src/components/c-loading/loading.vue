<template>
  <div :class="'loading-dot loading-dot-' + size">
    <span class="loading-01" :style="'background-color:' + color"></span>
    <span class="loading-02" :style="'background-color:' + color"></span>
    <span class="loading-03" :style="'background-color:' + color" style="margin-right: 0;"></span>
  </div>
</template>

<script>
export default {
  props: {
    color: String,
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style>
.loading-dot.loading-dot-small span {
  width: 8px;
  height: 8px;
  margin-right: 5px;
}
.loading-dot.loading-dot-middle span {
  width: 10px;
  height: 10px;
  margin-right: 8px;
}
</style>
