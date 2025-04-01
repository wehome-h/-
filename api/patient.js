import { http } from '@/utils/http'

/**
 * 添加患者
 */
export const addPatientApi = data =>
  http.request({
    method: 'POST',
    url: '/patient/add',
    data
  })

/**
 * 获取患者（家庭档案）列表
 */
export const getPatientListApi = () =>
  http.request({
    method: 'GET',
    url: '/patient/mylist',
    custom: {
      loading: false
    }
  })

/**
 * 删除患者（家庭档案）
 */
export const delPatientApi = id =>
  http.request({
    method: 'DELETE',
    url: `/patient/del/${id}`
  })

export const getPatientDetailApi = id =>
  http.request({
    method: 'GET',
    url: `/patient/info/${id}`
  })

/**
 * 问诊-编辑患者信息
 */
export const updatePatientApi = data =>
  http.request({
    method: 'PUT',
    url: '/patient/update',
    data
  })
