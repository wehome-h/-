<script setup>
  import { computed, ref } from 'vue'

  import customPassword from './components/password.vue'
  import customMobile from './components/mobile.vue'

  // 标签页要展示的内容
  const tabMetas = [
    { title: '密码登录', subTitle: '验证码登录' },
    { title: '验证码登录', subTitle: '密码登录' }
  ]

  // 记录索引值
  const tabIndex = ref(0)

  // 根据索引计算出展示的 tabMeta
  const tabMeta = computed(() => {
    return tabMetas[tabIndex.value]
  })

  // 切换登录方式
  function changeTabMeta() {
    // tabIndex.value = tabIndex.value === 0 ? 1 : 0
    tabIndex.value = Math.abs(tabIndex.value - 1)
  }
</script>
<template>
  <view class="user-login">
    <view class="login-type">
      <view class="title">{{ tabMeta.title }}</view>
      <view class="type" @click="changeTabMeta">
        <text>{{ tabMeta.subTitle }}</text>
        <uni-icons color="#3c3e42" type="forward" />
      </view>
    </view>

    <custom-mobile v-if="tabIndex === 0"></custom-mobile>

    <custom-password v-else-if="tabIndex === 1"></custom-password>
  </view>
  <!-- 社交账号登录 -->
  <view class="social-login">
    <view class="legend">
      <text class="text">其它方式登录</text>
    </view>
    <view class="social-account">
      <view class="icon">
        <uni-icons color="#00b0fb" size="30" type="qq" />
      </view>
      <view class="icon">
        <uni-icons color="#fb6622" size="30" type="weibo" />
      </view>
      <view class="icon">
        <uni-icons color="#07C160" size="30" type="weixin" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
  @import './login.scss';
</style>
