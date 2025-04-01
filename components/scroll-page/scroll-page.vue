<script setup>
  defineProps({
    borderStyle: {
      type: [String, Boolean],
      default: false
    },
    // 下拉刷新
    refresherEnabled: {
      type: Boolean,
      default: false
    },
    // 控制下拉刷新 为false时则结束下来刷新
    refresherTriggered: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    }
  })

  const emit = defineEmits(['refresherrefresh', 'scrolltolower'])

  // 读取页面视口的高度
  const { windowHeight } = uni.getWindowInfo()

  console.log(windowHeight)
</script>

<template>
  <scroll-view
    scroll-y
    :refresherEnabled="refresherEnabled"
    :refresherTriggered="refresherTriggered"
    @refresherrefresh="emit('refresherrefresh', $event)"
    @scrolltolower="emit('scrolltolower', $event)"
    :style="{
      height: windowHeight + 'px',
      borderBottom: borderStyle,
      backgroundColor,
      boxSizing: 'border-box'
    }"
  >
    <view class="scroll-page-content">
      <slot></slot>
    </view>
  </scroll-view>
</template>

<script>
  export default {
    options: {
      styleIsolation: 'shared'
    }
  }
</script>

<style lang="scss">
  .scroll-page-content {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
