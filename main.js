import App from './App'

import '@/utils/utils'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPersistedState } from 'pinia-plugin-persistedstate'
export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  // pinia.use(piniaPluginPersistedstate)
  // uni-app 中本地存储使用的是 uni.setStorageSync 而插件中使用的是 localStorage.setItem，为此需要我们自定义配置本地址存储的方法
  pinia.use(
    // 自定义 Pinia 插件
    createPersistedState({
      // 自定义本地存储的逻辑
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        }
      }
    })
  )
  app.use(pinia)
  return {
    app
  }
}
// #endif
