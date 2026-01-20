import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getServiceList,
  getServiceDetail,
  createService,
  updateService,
  deleteService
} from '@/api'

export const useServiceStore = defineStore('service', () => {
  // State
  const serviceList = ref([])
  const currentService = ref(null)
  const loading = ref(false)
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(20)

  // Getters
  const hasMore = computed(() => serviceList.value.length < total.value)

  // Actions
  /**
   * 获取服务列表
   */
  const fetchServiceList = async (params = {}, append = false) => {
    loading.value = true
    try {
      const res = await getServiceList({
        page: page.value,
        pageSize: pageSize.value,
        ...params
      })

      if (append) {
        serviceList.value = [...serviceList.value, ...res.list]
      } else {
        serviceList.value = res.list || []
      }

      total.value = res.total || 0

      return res
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 加载更多
   */
  const loadMore = async (params = {}) => {
    if (!hasMore.value || loading.value) return

    page.value++
    await fetchServiceList(params, true)
  }

  /**
   * 刷新列表
   */
  const refresh = async (params = {}) => {
    page.value = 1
    await fetchServiceList(params, false)
  }

  /**
   * 获取服务详情
   */
  const fetchServiceDetail = async (id) => {
    loading.value = true
    try {
      const res = await getServiceDetail(id)
      currentService.value = res
      return res
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 创建服务
   */
  const addService = async (data) => {
    try {
      const res = await createService(data)

      // 添加到列表头部
      serviceList.value.unshift(res)
      total.value++

      return res
    } catch (error) {
      throw error
    }
  }

  /**
   * 更新服务
   */
  const modifyService = async (id, data) => {
    try {
      const res = await updateService(id, data)

      // 更新列表中的数据
      const index = serviceList.value.findIndex(item => item.id === id)
      if (index !== -1) {
        serviceList.value[index] = { ...serviceList.value[index], ...data }
      }

      // 更新当前服务
      if (currentService.value?.id === id) {
        currentService.value = { ...currentService.value, ...data }
      }

      return res
    } catch (error) {
      throw error
    }
  }

  /**
   * 删除服务
   */
  const removeService = async (id) => {
    try {
      await deleteService(id)

      // 从列表中移除
      serviceList.value = serviceList.value.filter(item => item.id !== id)
      total.value--

      return true
    } catch (error) {
      throw error
    }
  }

  /**
   * 清空当前服务
   */
  const clearCurrentService = () => {
    currentService.value = null
  }

  return {
    // State
    serviceList,
    currentService,
    loading,
    total,
    page,
    pageSize,

    // Getters
    hasMore,

    // Actions
    fetchServiceList,
    loadMore,
    refresh,
    fetchServiceDetail,
    addService,
    modifyService,
    removeService,
    clearCurrentService
  }
})
