<script setup>
  import { computed, ref } from 'vue'
  import { useConsultStore } from '@/store/consult'
  import { onShow } from '@dcloudio/uni-app'
  import { getPatientListApi } from '@/api/patient'

  const consultStore = useConsultStore()

  // 侧滑按钮配置
  const swipeOptions = ref([
    {
      text: '删除',
      style: {
        backgroundColor: '#dd524d'
      }
    }
  ])

  // 患者列表
  const patientList = ref([])
  // 索引
  const patientIndex = ref(0)

  const isShowPage = ref(false)

  // 获取患者列表
  async function getPatientList() {
    const res = await getPatientListApi()
    patientList.value = res
    isShowPage.value = true
  }

  onShow(() => {
    getPatientList()
  })

  // 选择患者
  function selectPatient(index) {
    patientIndex.value = index
  }

  // 当前患者的id
  const patientId = computed(() => {
    return patientList.value[patientIndex.value]?.id
  })

  function nextStep() {
    // 把患者id存储到pinia中
    consultStore.patientId = patientId.value

    uni.navigateTo({
      url: '/subpkg_consult/payment/payment'
    })
  }
</script>
<template>
  <scroll-page v-if="isShowPage">
    <view class="patient-page">
      <view class="page-header">
        <view class="patient-title"> 请选择患者信息 </view>
        <view class="patient-tips">
          以便医生给出更准确的治疗，信息仅医生可见
        </view>
      </view>
      <uni-swipe-action>
        <uni-swipe-action-item
          :right-options="swipeOptions"
          v-for="(item, index) in patientList"
          :key="item.id"
        >
          <view
            class="archive-card"
            :class="{ active: patientIndex === index }"
            @click="selectPatient(index)"
          >
            <view class="archive-info">
              <text class="name">{{ item.name }}</text>
              <text class="id-card">{{
                item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2')
              }}</text>
              <text v-if="item.defaultFlag === 1" class="default">默认</text>
            </view>
            <view class="archive-info">
              <text class="gender">{{ item.genderValue }}</text>
              <text class="age">{{ item.age }}岁</text>
            </view>
            <navigator
              hover-class="none"
              class="edit-link"
              :url="`/subpkg_archive/form/index?id=${item.id}`"
            >
              <uni-icons
                type="icon-edit"
                size="20"
                color="#16C2A3"
                custom-prefix="iconfont"
              />
            </navigator>
          </view>
        </uni-swipe-action-item>
      </uni-swipe-action>

      <!-- 添加按钮 -->
      <view v-if="true" class="archive-card">
        <navigator
          class="add-link"
          hover-class="none"
          url="/subpkg_archive/form/index"
        >
          <uni-icons color="#16C2A3" size="24" type="plusempty" />
          <text class="label">添加患者</text>
        </navigator>
      </view>
    </view>
    <!-- 下一步操作 -->
    <view class="next-step">
      <button class="uni-button" @click="nextStep">下一步</button>
    </view>
  </scroll-page>
</template>

<style lang="scss">
  @import './patient.scss';
</style>
