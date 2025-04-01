<script setup>
  import { ref } from 'vue'
  import { onShow } from '@dcloudio/uni-app'
  import { getPatientListApi, delPatientApi } from '@/api/patient'

  const swipeOptions = ref([
    {
      text: '删除',
      style: {
        backgroundColor: '#dd524d'
      }
    }
  ])

  const pageShow = ref(false)

  const list = ref([])

  onShow(() => {
    getPatientList()
  })

  // 获取患者列表
  async function getPatientList() {
    const res = await getPatientListApi()
    list.value = res
    pageShow.value = true
  }

  // 删除患者
  async function onSwipeActionClick(id, index) {
    await delPatientApi(id)
    uni.utils.toast('删除成功！', 'success')
    list.value.splice(index, 1)
  }
</script>
<template>
  <scroll-page>
    <view v-if="pageShow" class="archive-page">
      <view class="archive-tips">最多可添加6人</view>

      <uni-swipe-action>
        <uni-swipe-action-item
          v-for="(item, index) in list"
          :key="item.id"
          :right-options="swipeOptions"
          @click="onSwipeActionClick(item.id, index)"
        >
          <view
            class="archive-card"
            :class="{ active: item.defaultFlag === 1 }"
          >
            <view class="archive-info">
              <text class="name">{{ item.name }}</text>
              <text class="id-card">{{
                item.idCard.replace(
                  /(\d{3})\d{11}(\d{3}[X\d])/,
                  '$1***********$2'
                )
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
      <view v-if="list.length < 6" class="archive-card">
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
  </scroll-page>
</template>

<style lang="scss">
  @import './index.scss';
</style>
