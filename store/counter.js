import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 用法1：组合式语法
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const increment = () => {
    count.value++
  }

  const doubleCount = computed(() => {
    return count.value * 2
  })

  return { count, doubleCount, increment }
})

// 用法2：选项式语法
/* export const useCounterStore = defineStore('counter', {
  state() {
    return {
      count: 1
    }
  },
  actions: {
    increment(value) {
      this.count += value
    }
  },
  getters: {
    doubleCount() {
      this.count * 2
    }
  }
}) */
