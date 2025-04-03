<script setup>
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useConsultStore } from '@/store/consult'

  const { initalValue, illnessInfo } = storeToRefs(useConsultStore())

  const props = defineProps({
    type: String,
    illnessType: String,
    depId: String
  })

  // 病情描述数据
  // const illnessInfo = ref({
  //   illnessDesc: '',
  //   illnessTime: null,
  //   consultFlag: null,
  //   pictures: []
  // })

  if (illnessInfo.value.illnessDesc) {
    uni.showModal({
      title: '温馨提示',
      content: '是否恢复之前填写的病情信息？',
      confirmText: '确认',
      confirmColor: '#16c2a3',
      cancelColor: '#848484',
      success: ({ confirm }) => {
        // 清空 pinia 中记录的数据
        if (!confirm) illnessInfo.value = { ...initalValue.value }
      }
    })
  }

  // 患病时长
  const illnessTimes = [
    {
      value: 1,
      text: '一周内'
    },
    {
      value: 2,
      text: '一月内'
    },
    {
      value: 3,
      text: '半年内'
    },
    {
      value: 4,
      text: '半年以上'
    }
  ]

  // 是否就诊过
  const consultFlags = [
    {
      value: 1,
      text: '就诊过'
    },
    {
      value: 0,
      text: '没有就诊过'
    }
  ]

  const isNextStep = computed(() => {
    return (
      illnessInfo.value.illnessDesc !== '' &&
      illnessInfo.value.illnessTime !== null &&
      illnessInfo.value.consultFlag !== null
    )
  })

  // 选择患病时长
  function selectIllnessTime(value) {
    // 记录用户选择的数据
    illnessInfo.value.illnessTime = value
  }

  // 是否就诊过
  function selectConsultFlag(value) {
    illnessInfo.value.consultFlag = value
  }

  // 下一步
  function nextStep() {
    // 将地址中的参数存入 pinia
    const consultStore = useConsultStore()
    consultStore.type = props.type
    consultStore.illnessType = props.illnessType
    consultStore.depId = props.depId

    uni.navigateTo({
      url: '/subpkg_consult/patient/patient'
    })
  }
</script>

<template>
  <scroll-page>
    <view class="description-page">
      <!-- 在线医生 -->
      <view class="doctor-online">
        <image
          src="/static/uploads/doctor-avatar-2.png"
          class="doctor-avatar"
        />
        <view class="doctor-info">
          <view class="name">在线医生</view>
          <view class="message">
            请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
          </view>
          <view class="tips">
            <text class="iconfont icon-shield"></text>
            内容仅医生可见
          </view>
        </view>
      </view>
      <!-- 患者信息 -->
      <view class="patient-info">
        <view class="description">
          <uni-easyinput
            v-model="illnessInfo.illnessDesc"
            type="textarea"
            :styles="{ backgroundColor: '#f6f6f6' }"
            :input-border="false"
            placeholder-style="font-size: 30rpx; color: #979797"
            placeholder="请详细描述您的病情,病情描述不能为空"
          />
        </view>

        <view class="title">本次患病多久了？</view>
        <view class="tags">
          <text
            class="tag"
            :class="{ active: item.value === illnessInfo.illnessTime }"
            v-for="(item, index) in illnessTimes"
            :key="item.value"
            @click="selectIllnessTime(item.value)"
            >{{ item.text }}</text
          >
        </view>

        <view class="title">此次病情是否去医院就诊过？</view>
        <view class="tags">
          <text
            class="tag"
            :class="{ active: item.value === illnessInfo.consultFlag }"
            v-for="(item, index) in consultFlags"
            :key="item.value"
            @click="selectConsultFlag(item.value)"
            >{{ item.text }}</text
          >
        </view>
      </view>
      <!-- 上传图片 -->
      <view class="patient-picture">
        <uni-file-picker
          v-model="illnessInfo.pictures"
          title="上传病情相关图片 (仅医生可见)"
          limit="8"
          :image-styles="{ width: '160rpx', height: '160rpx' }"
          file-extname="png,jpg,gif,webp"
        />
      </view>
    </view>
    <!-- 下一步操作 -->
    <view class="next-step">
      <button class="uni-button" :disabled="!isNextStep" @click="nextStep">
        下一步
      </button>
    </view>
  </scroll-page>
</template>

<style lang="scss">
  @import './description.scss';
</style>
