uni.utils = {
  toast(title = '', icon = 'none', duration = 2000) {
    uni.showToast({
      icon,
      title,
      duration,
      mask: true
    })
  }
}
