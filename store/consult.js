import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConsultStore = defineStore(
  'consult',
  () => {
    // 患者并且初始数据
    const initalValue = ref({
      illnessDesc: '',
      illnessTime: null,
      consultFlag: null,
      pictures: []
    })

    // 患者病情数据
    const illnessInfo = ref({ ...initalValue.value })

    const type = ref('')
    const illnessType = ref('')
    const depId = ref('')

    const patientId = ref('')

    return { illnessInfo, initalValue, type, illnessType, depId, patientId }
  },
  {
    persist: {
      paths: ['illnessInfo', 'type', 'illnessType', 'depId', 'patientId']
    }
  }
)
