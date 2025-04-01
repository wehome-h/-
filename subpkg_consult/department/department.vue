<script setup>
  import { computed, ref } from 'vue'
  import { getDepartmentListApi } from '@/api/consult'

  defineProps({
    type: String,
    illnessType: String
  })

  const departmentList = ref([])
  const activeIndex = ref(0)

  async function getDepartmentList() {
    const res = await getDepartmentListApi()
    departmentList.value = res
  }
  getDepartmentList()

  function changeDepartment(index) {
    activeIndex.value = index
  }

  // 计算点击哪个部门
  const childDepartment = computed(() => {
    return departmentList.value[activeIndex.value]?.child
  })
</script>

<template>
  <view class="department-page">
    <scroll-view scroll-y class="department-primary">
      <view
        class="department-item"
        :class="{ active: activeIndex === index }"
        v-for="(item, index) in departmentList"
        :key="item.id"
        @click="changeDepartment(index)"
        >{{ item.name }}</view
      >
      <view class="department-item"></view>
    </scroll-view>
    <scroll-view class="department-secondary">
      <navigator
        v-for="item in childDepartment"
        :key="item.id"
        hover-class="none"
        :url="`/subpkg_consult/description/description?type=${type}&illnessType=${illnessType}&depId=${item.id}`"
        class="department-item"
      >
        {{ item.name }}
      </navigator>
    </scroll-view>
  </view>
</template>

<style lang="scss">
  @import './department.scss';
</style>
