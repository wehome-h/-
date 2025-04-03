import { http } from '@/utils/http'

/**
 * 三方支付
 */
export const orderPayApi = data =>
  http.request({
    method: 'POST',
    url: '/patient/consult/pay',
    data
  })
