<script setup>
  import { ref } from 'vue'
  import { useUserStore } from '@/store/user'
  import { getUserInfoApi } from '@/api/user'

  const userStore = useUserStore()

  let userInfo = ref({})

  // 获取用户信息
  async function getUserInfo() {
    const res = await getUserInfoApi()
    userInfo.value = res
  }
  getUserInfo()

  // 退出登录
  function onLogout() {
    uni.showModal({
      title: '温馨提示！',
      content: '是否退出登录？',
      confirmColor: '#16c2a3',
      success: res => {
        if (res.confirm) {
          // 清除登录状态
          userStore.token = ''
          // 重置 pinia 的数据
          userStore.openType = 'switchTab'
          userStore.redirectURL = '/pages/index/index'
          // 跳转到登录页
          uni.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
</script>
<template>
  <scroll-page background-color="#F6F7F9">
    <view class="my-page">
      <!-- 用户资料（头像&昵称） -->
      <view class="user-profile">
        <image class="user-avatar" :src="userInfo.avatar"></image>
        <view class="user-info">
          <text class="nickname">{{ userInfo.account }}</text>
          <text class="iconfont icon-edit"></text>
        </view>
      </view>
      <!-- 用户数据 -->
      <view class="user-data">
        <navigator hover-class="none" url=" ">
          <text class="data-number">{{ userInfo.collectionNumber }}</text>
          <text class="data-label">收藏</text>
        </navigator>
        <navigator hover-class="none" url=" ">
          <text class="data-number">{{ userInfo.likeNumber }}</text>
          <text class="data-label">关注</text>
        </navigator>
        <navigator hover-class="none" url=" ">
          <text class="data-number">{{ userInfo.score }}</text>
          <text class="data-label">积分</text>
        </navigator>
        <navigator hover-class="none" url=" ">
          <text class="data-number">{{ userInfo.couponNumber }}</text>
          <text class="data-label">优惠券</text>
        </navigator>
      </view>
      <!-- 问诊医生 -->
      <custom-section :custom-style="{ paddingBottom: '20rpx' }" title="问诊中">
        <swiper
          class="uni-swiper"
          indicator-active-color="#2CB5A5"
          indicator-color="#EAF8F6"
          indicator-dots
        >
          <swiper-item>
            <view class="doctor-brief">
              <image
                class="doctor-avatar"
                src="/static/uploads/doctor-avatar.jpg"
              />
              <view class="doctor-info">
                <view class="meta">
                  <text class="name">王医生</text>
                  <text class="title">内分泌科 | 主任医师</text>
                </view>
                <view class="meta">
                  <text class="tag">三甲</text>
                  <text class="hospital">积水潭医院</text>
                </view>
              </view>
              <navigator class="doctor-contcat" hover-class="none" url=" ">
                进入咨询
              </navigator>
            </view>
          </swiper-item>
          <swiper-item>
            <view class="doctor-brief">
              <image
                class="doctor-avatar"
                src="/static/uploads/doctor-avatar.jpg"
              />
              <view class="doctor-info">
                <view class="meta">
                  <text class="name">王医生</text>
                  <text class="title">内分泌科 | 主任医师</text>
                </view>
                <view class="meta">
                  <text class="tag">三甲</text>
                  <text class="hospital">积水潭医院</text>
                </view>
              </view>
              <navigator class="doctor-contcat" hover-class="none" url=" ">
                进入咨询
              </navigator>
            </view>
          </swiper-item>
        </swiper>
      </custom-section>
      <!-- 药品订单 -->
      <custom-section show-arrow title="药品订单">
        <template #right>
          <navigator hover-class="none" url=" "> 全部订单 </navigator>
        </template>
        <view class="drug-order">
          <navigator hover-class="none" url=" ">
            <uni-badge :text="0" :offset="[3, 3]" absolute="rightTop">
              <image
                src="/static/images/order-status-1.png"
                class="status-icon"
              />
            </uni-badge>
            <text class="status-label">待付款</text>
          </navigator>
          <navigator hover-class="none" url=" ">
            <uni-badge text="2" :offset="[3, 3]" absolute="rightTop">
              <image
                src="/static/images/order-status-2.png"
                class="status-icon"
              />
            </uni-badge>
            <text class="status-label">待付款</text>
          </navigator>
          <navigator hover-class="none" url=" ">
            <uni-badge :text="0" :offset="[3, 3]" absolute="rightTop">
              <image
                src="/static/images/order-status-3.png"
                class="status-icon"
              />
            </uni-badge>
            <text class="status-label">待付款</text>
          </navigator>
          <navigator hover-class="none" url=" ">
            <uni-badge :text="0" :offset="[3, 3]" absolute="rightTop">
              <image
                src="/static/images/order-status-4.png"
                class="status-icon"
              />
            </uni-badge>
            <text class="status-label">待付款</text>
          </navigator>
        </view>
      </custom-section>
      <!-- 快捷工具 -->
      <custom-section title="快捷工具">
        <uni-list :border="false">
          <uni-list-item
            :border="false"
            title="我的问诊"
            show-arrow
            show-extra-icon
            :extra-icon="{
              customPrefix: 'icon-symbol',
              type: 'icon-symbol-tool-01'
            }"
          />
          <uni-list-item
            :border="false"
            title="我的处方"
            show-arrow
            show-extra-icon
            :extra-icon="{
              customPrefix: 'icon-symbol',
              type: 'icon-symbol-tool-02'
            }"
          />
          <uni-list-item
            to="/subpkg_archive/list/index"
            :border="false"
            title="家庭档案"
            show-arrow
            show-extra-icon
            :extra-icon="{
              customPrefix: 'icon-symbol',
              type: 'icon-symbol-tool-03'
            }"
          />
          <uni-list-item
            :border="false"
            title="地址管理"
            show-arrow
            show-extra-icon
            :extra-icon="{
              customPrefix: 'icon-symbol',
              type: 'icon-symbol-tool-04'
            }"
          />
          <uni-list-item
            :border="false"
            title="我的评价"
            show-arrow
            show-extra-icon
            :extra-icon="{
              customPrefix: 'icon-symbol',
              type: 'icon-symbol-tool-05'
            }"
          />
          <uni-list-item
            :border="false"
            title="官方客服"
            show-arrow
            show-extra-icon
            :extra-icon="{
              customPrefix: 'icon-symbol',
              type: 'icon-symbol-tool-06'
            }"
          />
          <uni-list-item
            :border="false"
            title="设置"
            show-arrow
            show-extra-icon
            :extra-icon="{
              customPrefix: 'icon-symbol',
              type: 'icon-symbol-tool-07'
            }"
          />
        </uni-list>
      </custom-section>
      <!-- 退出登录 -->
      <view class="logout-button" @click="onLogout">退出登录</view>
    </view>
  </scroll-page>
</template>

<style lang="scss">
  @import './my.scss';
</style>
