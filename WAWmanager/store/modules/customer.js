import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getCustomerList,
  getCustomerDetail,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomers
} from '@/api'

export const useCustomerStore = defineStore('customer', () => {
  // State
  const customerList = ref([])
  const currentCustomer = ref(null)
  const loading = ref(false)
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(20)

  // Getters
  const hasMore = computed(() => customerList.value.length < total.value)

  // Actions
  /**
   * 获取客户列表
   */
  const fetchCustomerList = async (params = {}, append = false) => {
    loading.value = true
    try {
      const res = await getCustomerList({
        page: page.value,
        pageSize: pageSize.value,
        ...params
      })

      if (append) {
        customerList.value = [...customerList.value, ...res.list]
      } else {
        customerList.value = res.list || []
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
    await fetchCustomerList(params, true)
  }

  /**
   * 刷新列表
   */
  const refresh = async (params = {}) => {
    page.value = 1
    await fetchCustomerList(params, false)
  }

  /**
   * 获取客户详情
   */
  const fetchCustomerDetail = async (id) => {
    loading.value = true
    try {
      const res = await getCustomerDetail(id)
      currentCustomer.value = res
      return res
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 创建客户
   */
  const addCustomer = async (data) => {
    try {
      const res = await createCustomer(data)

      // 添加到列表头部
      customerList.value.unshift(res)
      total.value++

      return res
    } catch (error) {
      throw error
    }
  }

  /**
   * 更新客户
   */
  const modifyCustomer = async (id, data) => {
    try {
      const res = await updateCustomer(id, data)

      // 更新列表中的数据
      const index = customerList.value.findIndex(item => item.id === id)
      if (index !== -1) {
        customerList.value[index] = { ...customerList.value[index], ...data }
      }

      // 更新当前客户
      if (currentCustomer.value?.id === id) {
        currentCustomer.value = { ...currentCustomer.value, ...data }
      }

      return res
    } catch (error) {
      throw error
    }
  }

  /**
   * 删除客户
   */
  const removeCustomer = async (id) => {
    try {
      await deleteCustomer(id)

      // 从列表中移除
      customerList.value = customerList.value.filter(item => item.id !== id)
      total.value--

      return true
    } catch (error) {
      throw error
    }
  }

  /**
   * 搜索客户
   */
  const search = async (keyword) => {
    loading.value = true
    try {
      const res = await searchCustomers(keyword)
      customerList.value = res.list || []
      total.value = res.total || 0
      return res
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * 清空当前客户
   */
  const clearCurrentCustomer = () => {
    currentCustomer.value = null
  }

  return {
    // State
    customerList,
    currentCustomer,
    loading,
    total,
    page,
    pageSize,

    // Getters
    hasMore,

    // Actions
    fetchCustomerList,
    loadMore,
    refresh,
    fetchCustomerDetail,
    addCustomer,
    modifyCustomer,
    removeCustomer,
    search,
    clearCurrentCustomer
  }
})
