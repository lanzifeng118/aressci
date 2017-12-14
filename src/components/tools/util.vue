<script>
let toast = {
  show(obj, text, icon) {
    if (!icon) {
      icon = 'warn'
    }
    obj.text = text
    obj.icon = icon
    obj.show = true
  },
  hide(obj) {
    setTimeout(() => {
      obj.show = false
    }, 800)
  },
  fade(obj, text, icon) {
    this.show(obj, text, icon)
    this.hide(obj)
  }
}

let req = {
  queryError(obj) {
    toast.fade(obj, 'Fail. Try Later!')
  },
  changeError(obj) {
    toast.fade(obj, '出错了，请稍后再试!', 'sad')
  }
}
export default {
  toast,
  req
}
</script>
