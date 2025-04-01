<script setup>
  import { computed, ref } from 'vue'
  import feedList from './components/feed-list.vue'
  import doctorList from './components/doctor-list.vue'
  import { getFeedListApi, getDoctorListApi } from '@/api/doctor'

  // 获取安全区域数据
  const { safeAreaInsets } = uni.getWindowInfo()

  // 标签页索引值
  const tabIndex = ref(0)
  // 标签页数据
  const feedTabs = ref([
    {
      label: '推荐',
      type: 'recommend',
      current: 1,
      hasMore: true,
      list: [],
      rendered: true
    },
    {
      label: '关注',
      type: 'like',
      current: 1,
      hasMore: true,
      list: [],
      rendered: false
    },
    {
      label: '减脂',
      type: 'fatReduction',
      current: 1,
      hasMore: true,
      list: [],
      rendered: false
    },
    {
      label: '饮食',
      type: 'food',
      current: 1,
      hasMore: true,
      list: [],
      rendered: false
    }
  ])

  const doctorData = ref([])

  // 当前标签页的 type
  const feedType = computed(() => {
    return feedTabs.value[tabIndex.value].type
  })
  // 当前标签页的 current
  const feedCurrent = computed(() => {
    return feedTabs.value[tabIndex.value].current
  })
  // 每次请求5条数据
  const feedPageSize = ref(5)

  // 切换标签页
  function onFeedTabChange({ index }) {
    tabIndex.value = index

    // 获取标签页数据
    if (!feedTabs.value[index].rendered) getFeedList()

    // 标记组件是否被渲染过
    feedTabs.value[tabIndex.value].rendered = true
  }

  // 获取知识列表
  async function getFeedList() {
    const res = await getFeedListApi({
      type: feedType.value,
      current: feedCurrent.value,
      pageSize: feedPageSize.value
    })

    // 过滤掉 html 标签
    res.rows.forEach(item => {
      item.content = item.content.replace(/<[^>]+>/g, '')
    })

    const list = feedTabs.value[tabIndex.value].list
    feedTabs.value[tabIndex.value].list = [...list, ...res.rows]

    // 让页面加1，保证下一页的请求
    feedTabs.value[tabIndex.value].current++

    const current = feedTabs.value[tabIndex.value].current

    feedTabs.value[tabIndex.value].hasMore = current <= res.pageTotal
  }
  getFeedList()

  // 滚动加载更多
  function onScrollToLower() {
    // 没有数据就不必发请求了
    if (!feedTabs.value[tabIndex.value].hasMore) return

    // 加载更多
    getFeedList()
  }

  // 获取医生列表
  async function getDoctorList() {
    const res = await getDoctorListApi({
      current: 1,
      pageSize: 5
    })
    doctorData.value = res.rows
  }
  getDoctorList()
</script>

<template>
  <scroll-page @scrolltolower="onScrollToLower">
    <view
      class="index-page"
      :style="{ backgroundPositionY: -48 + safeAreaInsets.top + 'px' }"
    >
      <!-- 页面导航 -->
      <view
        :style="{ paddingTop: safeAreaInsets.top + 'px' }"
        class="page-navbar"
      >
        优医
      </view>

      <!-- 搜索栏 -->
      <view class="search-bar">
        <input
          placeholder-class="input-placeholder"
          placeholder="搜一搜: 疾病/症状/医生/健康知识"
          class="input"
          type="text"
        />
        <view class="icon-search">
          <uni-icons size="22" color="#C3C3C5" type="search" />
        </view>
      </view>
      <!-- 快速入口 -->
      <view class="quick-entry">
        <navigator hover-class="none" class="quick-entry-item">
          <image
            class="quick-entry-icon"
            src="/static/images/quick-entry-1.png"
          />
          <text class="label">问医生</text>
          <text class="small">按科室查问医生</text>
        </navigator>
        <navigator
          hover-class="none"
          class="quick-entry-item"
          url="/subpkg_consult/quickly/quickly?type=2"
        >
          <image
            class="quick-entry-icon"
            src="/static/images/quick-entry-2.png"
          />
          <text class="label">极速问诊</text>
          <text class="small">20s医生极速回复</text>
        </navigator>
        <navigator hover-class="none" class="quick-entry-item">
          <image
            class="quick-entry-icon"
            src="/static/images/quick-entry-3.png"
          />
          <text class="label">开药门诊</text>
          <text class="small">线上买药更方便</text>
        </navigator>
      </view>
      <!-- 快速查看 -->
      <view class="quick-view">
        <navigator
          hover-class="none"
          class="quick-view-item"
          url="/subpkg_medicine/order_list/index"
        >
          <image
            class="quick-view-icon"
            src="/static/images/quick-view-1.png"
          />
          <text class="label">药品订单</text>
        </navigator>
        <navigator
          hover-class="none"
          class="quick-view-item"
          url="/subpkg_archive/list/index"
        >
          <image
            class="quick-view-icon"
            src="/static/images/quick-view-2.png"
          />
          <text class="label">健康档案</text>
        </navigator>
        <navigator hover-class="none" class="quick-view-item">
          <image
            class="quick-view-icon"
            src="/static/images/quick-view-3.png"
          />
          <text class="label">我的处方</text>
        </navigator>
        <navigator hover-class="none" class="quick-view-item">
          <image
            class="quick-view-icon"
            src="/static/images/quick-view-4.png"
          />
          <text class="label">疾病查询</text>
        </navigator>
      </view>
      <!-- 广告位 -->
      <view class="banner-placeholder">
        <swiper
          class="uni-swiper"
          indicator-dots
          indicator-color="#ffffff99"
          indicator-active-color="#fff"
          circular
        >
          <swiper-item>
            <navigator hover-class="none" class="navigator" url=" ">
              <image class="banner-image" src="/static/images/banner-1.png" />
            </navigator>
          </swiper-item>
          <swiper-item>
            <navigator hover-class="none" class="navigator" url=" ">
              <image
                class="banner-image"
                src="/static/images/banner-1.png"
                mode="aspectFill"
              />
            </navigator>
          </swiper-item>
        </swiper>
      </view>
      <view
        class="doctor-feeds"
        :style="{ marginTop: -safeAreaInsets.top + 'px' }"
      >
        <custom-sticky :offset-top="safeAreaInsets.top + 'px'">
          <custom-tabs @click="onFeedTabChange" :list="feedTabs" />
        </custom-sticky>

        <view
          v-for="(item, index) in feedTabs"
          :key="item.label"
          v-show="tabIndex === index"
        >
          <!-- 医生列表 -->
          <doctor-list
            v-if="feedType === 'recommend'"
            :list="doctorData"
          ></doctor-list>

          <!-- 医生文章列表 -->
          <feed-list v-if="item.rendered" :list="item.list"></feed-list>
        </view>
      </view>
    </view>
  </scroll-page>
</template>

<style lang="scss">
  @import './index.scss';
</style>
