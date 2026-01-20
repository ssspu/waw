import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const loading = ref(false)
  const theme = ref('light') // light / dark
  const systemInfo = ref(null)
  const statusBarHeight = ref(0)
  const safeAreaInsets = ref({})

  // Actions
  /**
   * 设置加载状态
   */
  const setLoading = (status) => {
    loading.value = status
  }

  /**
   * 切换主题
   */
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  /**
   * 获取系统信息
   */
  const fetchSystemInfo = () => {
    const systemInfoSync = uni.getSystemInfoSync()
    systemInfo.value = systemInfoSync
    statusBarHeight.value = systemInfoSync.statusBarHeight || 0
    safeAreaInsets.value = systemInfoSync.safeAreaInsets || {}

    return systemInfoSync
  }

  /**
   * 初始化应用
   */
  const initApp = () => {
    fetchSystemInfo()

    // 检查是否有暗色模式设置
    const storedTheme = uni.getStorageSync('theme')
    if (storedTheme) {
      theme.value = storedTheme
    }
  }

  return {
    // State
    loading,
    theme,
    systemInfo,
    statusBarHeight,
    safeAreaInsets,

    // Actions
    setLoading,
    toggleTheme,
    fetchSystemInfo,
    initApp
  }
}, {
  persist: {
    key: 'app-store',
    storage: {
      getItem: (key) => uni.getStorageSync(key),
      setItem: (key, value) => uni.setStorageSync(key, value)
    },
    paths: ['theme']
  }
})
