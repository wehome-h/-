<script setup>
  import { reactive, ref } from 'vue'
  import { useUserStore } from '@/store/user'
  import { loginByPasswordApi } from '@/api/user'

  const userStore = useUserStore()

  const form = ref(null)
  const formData = reactive({
    mobile: '13230000005',
    password: 'abc12345'
  })

  const rules = {
    mobile: {
      rules: [
        { required: true, errorMessage: '请输入手机号码！' },
        { pattern: /^1\d{10}$/, errorMessage: '请输入正确的手机号码！' }
      ]
    },
    password: {
      rules: [{ required: true, errorMessage: '请输入密码！' }]
    }
  }

  const isAgress = ref(false)
  function agress() {
    isAgress.value = !isAgress.value
  }

  // 登录
  async function onLogin() {
    await form.value.validate()
    if (!isAgress.value) {
      return uni.utils.toast('请勾选用户同意协议')
    }
    const res = await loginByPasswordApi(formData)
    userStore.token = res.token
    // 登录成功跳转回去
    uni[userStore.openType]({
      url: userStore.redirectURL
    })
  }
</script>
<template>
  <uni-forms class="login-form" ref="form" :model="formData" :rules="rules">
    <uni-forms-item name="mobile">
      <uni-easyinput
        v-model="formData.mobile"
        :input-border="false"
        :clearable="false"
        placeholder="请输入手机号"
        placeholder-style="color: #C3C3C5"
      />
    </uni-forms-item>
    <uni-forms-item name="password">
      <uni-easyinput
        v-model="formData.password"
        type="password"
        placeholder="请输入密码"
        :input-border="false"
        placeholder-style="color: #C3C3C5"
      />
    </uni-forms-item>
    <view class="agreement">
      <radio :checked="isAgress" color="#16C2A3" @click="agress" />
      我已同意
      <text class="link">用户协议</text>
      及
      <text class="link">隐私协议</text>
    </view>

    <button class="uni-button" @click="onLogin">登 录</button>
    <navigator hover-class="none" class="uni-navigator" url=" ">
      忘记密码？
    </navigator>
  </uni-forms>
</template>

<script>
  export default {
    options: {
      styleIsolation: 'shared'
    }
  }
</script>

<style lang="scss">
  @import './styles.scss';
</style>
