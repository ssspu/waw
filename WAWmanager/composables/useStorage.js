/**
 * 本地存储组合式函数
 */
import { ref, watch } from 'vue'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'

export const useStorage = (key, defaultValue = null) => {
  const data = ref(getStorage(key, defaultValue))

  // 监听数据变化，自动保存
  watch(
    data,
    (newValue) => {
      if (newValue === null || newValue === undefined) {
        removeStorage(key)
      } else {
        setStorage(key, newValue)
      }
    },
    { deep: true }
  )

  /**
   * 设置数据
   */
  const set = (value) => {
    data.value = value
  }

  /**
   * 清除数据
   */
  const clear = () => {
    data.value = null
    removeStorage(key)
  }

  return {
    data,
    set,
    clear
  }
}
