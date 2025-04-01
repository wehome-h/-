import { http } from '@/utils/http'

/**
 * 获取验证码
 */
export const getCodeApi = params =>
  http.request({
    method: 'GET',
    url: '/code',
    params
  })

/**
 * 短信验证码登录
 */
export const loginByMobileApi = data =>
  http.request({
    method: 'POST',
    url: '/login',
    data
  })

/**
 * 手机号密码登录
 */
export const loginByPasswordApi = data =>
  http.request({
    method: 'POST',
    url: '/login/password',
    data
  })

/**
 * 获取用户信息
 */
export const getUserInfoApi = () =>
  http.request({
    method: 'GET',
    url: '/patient/myUser'
  })
