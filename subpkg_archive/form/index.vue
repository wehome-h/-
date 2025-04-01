<script setup>
  import { ref, reactive } from 'vue'
  import {
    addPatientApi,
    getPatientDetailApi,
    updatePatientApi
  } from '@/api/patient'

  const props = defineProps({
    id: {
      type: String,
      default: ''
    }
  })

  const form = ref(null)
  const formData = reactive({
    name: '',
    idCard: '',
    gender: null,
    defaultFlag: 1
  })

  const rules = {
    name: {
      rules: [
        { required: true, errorMessage: '请输入姓名！' },
        {
          pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
          errorMessage: '请输入正确格式的姓名！'
        }
      ]
    },
    idCard: {
      rules: [
        { required: true, errorMessage: '请输入身份证！' },
        {
          pattern:
            /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
          errorMessage: '请输入正确格式的身份证！'
        }
      ]
    },
    gender: {
      rules: [
        { required: true, errorMessage: '请选择性别！' },
        { pattern: /^0|1$/, errorMessage: '请选择性别！' },
        {
          validateFunction(rule, value, data, callback) {
            console.log(rule, value, data)
            const genderFlag = data.idCard.slice(16, 17)
            if (genderFlag % 2 !== value) {
              callback('性别与身份证不一致！')
            }
            return true
          }
        }
      ]
    }
  }

  // 是否默认就诊人
  function changeDefault(e) {
    formData.defaultFlag = e.detail.value ? 1 : 0
  }

  // 保存
  async function onSubmit() {
    await form.value.validate()
    formData.id ? updatePatient() : addPatient()
  }

  // 添加患者
  async function addPatient() {
    await addPatientApi(formData)
    uni.utils.toast('添加成功！', 'success')
    uni.navigateBack()
  }

  // 编辑患者
  async function updatePatient() {
    await updatePatientApi(formData)
    uni.utils.toast('编辑成功！', 'success')
    uni.navigateBack()
  }

  // 获取患者详情
  async function getPatientDetail(id) {
    const res = await getPatientDetailApi(id)
    const { genderValue, age, ...rest } = res
    Object.assign(formData, { ...rest })
  }

  if (props.id) {
    getPatientDetail(props.id)
  }
  uni.setNavigationBarTitle({
    title: `${props.id ? '编辑' : '添加'}患者`
  })
</script>

<template>
  <scroll-page>
    <view class="archive-page">
      <uni-forms
        :model="formData"
        :rules="rules"
        border
        label-width="220rpx"
        ref="form"
      >
        <uni-forms-item label="患者姓名" name="name">
          <uni-easyinput
            v-model="formData.name"
            placeholder-style="color: #C3C3C5; font-size: 32rpx"
            :styles="{ color: '#121826' }"
            :input-border="false"
            :clearable="false"
            placeholder="请填写真实姓名"
          />
        </uni-forms-item>
        <uni-forms-item label="患者身份证号" name="idCard">
          <uni-easyinput
            v-model="formData.idCard"
            placeholder-style="color: #C3C3C5; font-size: 32rpx"
            :styles="{ color: '#121826' }"
            :input-border="false"
            :clearable="false"
            placeholder="请填写身份证号"
          />
        </uni-forms-item>
        <uni-forms-item label="患者性别" name="gender">
          <uni-data-checkbox
            v-model="formData.gender"
            selectedColor="#16C2A3"
            :localdata="[
              { text: '男', value: 1 },
              { text: '女', value: 0 }
            ]"
          />
        </uni-forms-item>
        <uni-forms-item label="默认就诊人" name="name">
          <view class="uni-switch">
            <switch
              :checked="Boolean(formData.defaultFlag)"
              color="#20c6b2"
              style="transform: scale(0.7)"
              @change="changeDefault"
            />
          </view>
        </uni-forms-item>
        <button class="uni-button" @click="onSubmit">保存</button>
      </uni-forms>
    </view>
  </scroll-page>
</template>

<style lang="scss">
  @import './index.scss';
</style>
