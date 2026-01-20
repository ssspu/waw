/**
 * 加载状态组合式函数
 */
import { ref } from 'vue'

export const useLoading = (initialValue = false) => {
  const loading = ref(initialValue)

  const startLoading = (title = '加载中...') => {
    loading.value = true
    uni.showLoading({
      title,
      mask: true
    })
  }

  const stopLoading = () => {
    loading.value = false
    uni.hideLoading()
  }

  const withLoading = async (asyncFn, title = '加载中...') => {
    try {
      startLoading(title)
      return await asyncFn()
    } finally {
      stopLoading()
    }
  }

  return {
    loading,
    startLoading,
    stopLoading,
    withLoading
  }
}
