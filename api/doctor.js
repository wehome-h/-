import { http } from '@/utils/http'

/**
 * 医生文章列表
 */
export const getFeedListApi = params =>
  http.request({
    method: 'GET',
    url: '/patient/home/knowledge',
    params
  })

/**
 * 医生列表
 */
export const getDoctorListApi = params =>
  http.request({
    method: 'GET',
    url: '/home/page/doc',
    params
  })

/**
 * 关注医生
 */
export const followDoctorApi = data =>
  http.request({
    method: 'POST',
    url: '/like',
    data
  })
