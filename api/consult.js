import { http } from '@/utils/http'

export const getDepartmentListApi = () =>
  http.request({
    method: 'GET',
    url: '/dep/all'
  })

/**
 * 生成预付订单
 */
export const preOrderApi = params =>
  http.request({
    method: 'GET',
    url: '/patient/consult/order/pre',
    params
  })

/**
 * 创建支付订单
 */
export const createOrderApi = data =>
  http.request({
    method: 'POST',
    url: '/patient/consult/order',
    data
  })
