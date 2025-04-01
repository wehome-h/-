import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')

    // 记录登录成功后要跳转的地址（默认值为首页）
    const redirectURL = ref('/pages/index/index')
    // 跳转地址时采用的 API 名称
    const openType = ref('switchTab')

    return { token, redirectURL, openType }
  },
  {
    // user 仓库全部数据都存储
    // persist: true,

    // 按需存储
    persist: {
      paths: ['token', 'redirectURL', 'openType']
    }
  }
)
