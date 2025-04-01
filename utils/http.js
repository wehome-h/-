// 导入模块
import Request from 'luch-request'
import { useUserStore } from '@/store/user'

// tabBar页面路径
const tabBarList = [
  'pages/index/index',
  'pages/wiki/wiki',
  'pages/notify/notify',
  'pages/my/my'
]

// 接口白名单
const whiteList = ['/code', '/login', '/login/password']

// 实例化网络请求
const http = new Request({
  // 接口基地址
  baseURL: 'https://consult-api.itheima.net/',
  custom: {
    loading: true
  }
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    if (config.custom.loading) {
      uni.showLoading({
        title: '正在加载...',
        mask: true
      })
    }
    // 获取 token
    const userStore = useUserStore()
    const token = userStore.token
    // 默认的请求头
    const defaultHeader = {}
    // 判断是否存在token并且不在接口白名单中
    if (userStore.token && !whiteList.includes(config.url)) {
      defaultHeader.Authorization = 'Bearer ' + userStore.token
    }

    config.header = {
      ...defaultHeader,
      ...config.header
    }
    return config
  },
  config => {
    // 可使用async await 做异步操作
    return Promise.reject(config)
  }
)

http.interceptors.response.use(
  response => {
    uni.hideLoading()
    console.log('✔', response)
    if (response.data.code !== 10000) {
      uni.utils.toast(response.data.message, 'error', 3000)
      return Promise.reject(response.data)
    }
    return response.data.data
  },
  error => {
    uni.hideLoading()
    console.log('❌', error)
    if (error.statusCode === 401) {
      reLogin()
      return
    }
    uni.utils.toast(error.data.message, 'error', 3000)
    return Promise.reject(error)
  }
)

// token过期重新登录
function reLogin() {
  // 动态读取当前页面的路径
  const pageStack = getCurrentPages()
  // 从 pageStack 中获取最后一个页面
  const currentPage = pageStack.pop()
  // 完整的路由（包含地址中的参数）
  const redirectURL = currentPage.$page.fullPath
  // 是否为 tabBar 中定义的路径
  const openType = tabBarList.includes(currentPage.route)
    ? 'switchTab'
    : 'redirectTo'
  const userStore = useUserStore()
  userStore.redirectURL = redirectURL
  userStore.openType = openType
  // 跳转到登录页
  uni.redirectTo({
    url: '/pages/login/login'
  })
}

// 导出配置好的网络模块
export { http }
