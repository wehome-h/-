<script setup>
  import { ref } from 'vue'
  import { useConsultStore } from '@/store/consult'
  import { preOrderApi, createOrderApi } from '@/api/consult'
  import { getPatientDetailApi } from '@/api/patient'
  import { orderPayApi } from '@/api/payment'

  const { type, patientId, illnessInfo, illnessType, depId } = useConsultStore()

  const payInfo = ref({})
  const patientDetail = ref({})
  const orderId = ref('')
  // 支付组件引用
  const paymentRef = ref()

  // 生成预付订单
  async function preOrder() {
    const res = await preOrderApi({
      type
    })
    payInfo.value = res
  }
  preOrder()

  // 获取患者信息
  async function getPatientDetail() {
    const res = await getPatientDetailApi(patientId)
    patientDetail.value = res
  }
  getPatientDetail()

  // 生成待付订单
  async function createOrder() {
    if (orderId.value !== '') return uni.utils.toast('订单不能重复创建！')

    const pictures = illnessInfo.pictures.map(item => ({
      id: item.uuid,
      url: item.url
    }))
    const res = await createOrderApi({
      type,
      patientId,
      illnessType,
      depId,
      ...illnessInfo,
      pictures
    })
    orderId.value = res.id

    // 创建完订单后，清空pinia中缓存的数据
    const consultStore = useConsultStore()
    consultStore.illnessInfo = consultStore.initalValue
    consultStore.type = ''
    consultStore.illnessType = ''
    consultStore.depId = ''
    consultStore.patientId = ''

    // 选择支付渠道
    paymentRef.value.open()
  }

  // 当支付弹层关闭时
  async function onPaymentClose() {
    const { confirm } = await uni.showModal({
      title: '关闭支付',
      content: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
      cancelText: '仍要关闭',
      cancelColor: '#848484',
      confirmText: '继续支付',
      confirmColor: '#16C2A3'
    })

    if (!confirm) paymentRef.value.close()
  }

  // 支付
  async function pay({ index }) {
    if (index === 0) return uni.utils.toast('暂不支持微信支付')

    const res = await orderPayApi({
      paymentMethod: index,
      orderId: orderId.value,
      payCallback: 'http://localhost:5173/#/subpkg_consult/room/room'
    })

    /*
      支付测试账号：
      askgxl8276@sandbox.com 111111
      scobys4865@sandbox.com 111111
    */

    // #ifdef H5
    // 引导用户支付（地址跳转方式）
    window.location.href = res.payUrl
    // #endif

    // #ifdef MP-WEIXIN
    // 引导用户支付（wx.requestPayment 微信小程序方式）
    wx.requestPayment({
      // 4个参数 后端返回
    })
    // #endif

    // APP SDK
  }
</script>

<template>
  <scroll-page>
    <view class="payment-page">
      <uni-section
        title-font-size="32rpx"
        title-color="#121826"
        padding="30rpx"
        :title="`图文问诊 ${payInfo.payment}元`"
      >
        <uni-list :border="false">
          <uni-list-item
            title="极速问诊"
            note="自动分配医生"
            thumb="/static/uploads/doctor-avatar.jpg"
            thumb-size="lg"
          />
          <uni-list-item
            title="优惠券"
            show-arrow
            :right-text="`-¥${payInfo.couponDeduction}`"
          />
          <uni-list-item title="积分抵扣">
            <template #footer>
              <view class="uni-list-text-red"
                >-¥{{ payInfo.pointDeduction }}</view
              >
            </template>
          </uni-list-item>
          <uni-list-item title="实付款">
            <template #footer>
              <view class="uni-list-text-red"
                >¥{{ payInfo.actualPayment }}</view
              >
            </template>
          </uni-list-item>
        </uni-list>
      </uni-section>

      <view class="dividing-line"></view>

      <uni-section
        title-font-size="32rpx"
        title-color="#121826"
        padding="30rpx"
        title="患者资料"
      >
        <uni-list :border="false">
          <uni-list-item title="患者信息">
            <template #footer>
              <view class="uni-list-text-gray">
                {{ patientDetail.name }} | {{ patientDetail.genderValue }} |
                {{ patientDetail.age }}岁
              </view>
            </template>
          </uni-list-item>
          <uni-list-item
            border
            title="病情描述"
            :note="illnessInfo.illnessDesc"
          />
        </uni-list>
      </uni-section>

      <!-- <view class="payment-agreement">
        <radio color="#20c6b2" value="1" />
        我已同意<text style="color: #20c6b2">支付协议</text>
      </view> -->
    </view>
    <!-- 下一步操作 -->
    <view class="next-step">
      <view class="total-amount">
        合计: <text class="number">¥{{ payInfo.actualPayment }}</text>
      </view>
      <button class="uni-button" @click="createOrder">立即支付</button>
    </view>
  </scroll-page>

  <!-- 支付渠道 -->
  <custom-payment
    @close="onPaymentClose"
    @confirm="pay"
    :amount="payInfo.actualPayment"
    :order-id="orderId"
    ref="paymentRef"
  />
</template>

<style lang="scss">
  @import './payment.scss';
</style>
