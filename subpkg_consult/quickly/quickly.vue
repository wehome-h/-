<script setup>
  defineProps({
    type: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <scroll-page>
    <view class="quickly-page">
      <image class="quickly-banner" src="/static/images/quickly-consult.png" />
      <view class="quickly-tips">
        <text class="highlight">20s</text>
        快速匹配专业医生
      </view>
      <uni-list :border="false" class="consult-type">
        <uni-list-item
          :to="`/subpkg_consult/department/department?type=${type}&illnessType=1`"
          title="三甲图文问诊"
          note="三甲主治及以上级别医生"
          show-arrow
          thumb="/static/images/consult-type-1.png"
          thumb-size="lg"
        />
      </uni-list>
      <uni-list :border="false" class="consult-type">
        <uni-list-item
          :to="`/subpkg_consult/department/department?type=${type}&illnessType=0`"
          title="普通图文问诊"
          note="二甲主治及以上级别医生"
          show-arrow
          thumb="/static/images/consult-type-2.png"
          thumb-size="lg"
        />
      </uni-list>
    </view>
  </scroll-page>
</template>

<style lang="scss">
  @import './quickly.scss';
</style>
