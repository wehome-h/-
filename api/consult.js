import { http } from '@/utils/http'

export const getDepartmentListApi = () =>
  http.request({
    method: 'GET',
    url: '/dep/all'
  })
