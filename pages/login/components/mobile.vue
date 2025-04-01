<script setup>
  import { computed, reactive, ref } from 'vue'
  import { useUserStore } from '@/store/user'
  import { getCodeApi, loginByMobileApi } from '@/api/user'

  const userStore = useUserStore()

  const form = ref(null)
  const formData = reactive({
    mobile: '13230000005',
    code: ''
  })
  const rules = {
    mobile: {
      rules: [
        { required: true, errorMessage: '请输入手机号码！' },
        { pattern: /^1\d{10}$/, errorMessage: '请输入正确的手机号码！' }
      ]
    },
    code: {
      rules: [{ required: true, errorMessage: '请输入验证码！' }]
    }
  }
  const isAgree = ref(false)

  // 登录
  async function onLogin() {
    await form.value.validate()
    if (!isAgree.value) {
      return uni.utils.toast('请勾选用户同意协议')
    }
    const res = await loginByMobileApi(formData)
    userStore.token = res.token
    // 登录成功跳转回去
    uni[userStore.openType]({
      url: userStore.redirectURL
    })
  }

  let timerId = null
  const countDownTime = ref(10)
  // 获取验证码
  async function getCode() {
    await form.value.validateField(['mobile'])

    const { code } = await getCodeApi({
      mobile: formData.mobile,
      type: 'login'
    })
    formData.code = code

    if (timerId) return
    countDownTime.value--
    timerId = setInterval(() => {
      if (countDownTime.value <= 1) {
        clearInterval(timerId)
        timerId = null
        countDownTime.value = 10
        return
      }
      countDownTime.value--
    }, 1000)
  }

  // 同意
  function agress() {
    isAgree.value = !isAgree.value
  }

  const showCountDown = computed(() => {
    return countDownTime.value === 10
      ? '获取验证码'
      : `重新获取(${
          countDownTime.value < 10
            ? '0' + countDownTime.value
            : countDownTime.value
        })`
  })
</script>

<template>
  <uni-forms class="login-form" ref="form" :model="formData" :rules="rules">
    <uni-forms-item name="mobile">
      <uni-easyinput
        v-model="formData.mobile"
        :input-border="false"
        :clearable="false"
        :maxlength="11"
        placeholder="请输入手机号"
        placeholder-style="color: #C3C3C5"
      />
    </uni-forms-item>
    <uni-forms-item name="code">
      <uni-easyinput
        v-model="formData.code"
        :input-border="false"
        :clearable="false"
        :maxlength="6"
        placeholder="请输入验证码"
        placeholder-style="color: #C3C3C5"
      />
      <text class="text-button" @click="getCode">{{ showCountDown }}</text>
    </uni-forms-item>

    <view class="agreement">
      <radio :checked="isAgree" color="#16C2A3" @click="agress" />
      我已同意
      <text class="link">用户协议</text>
      及
      <text class="link">隐私协议</text>
    </view>

    <button class="uni-button" @click="onLogin">登 录</button>
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

  .countdown {
  }
</style>
