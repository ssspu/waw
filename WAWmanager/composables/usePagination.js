/**
 * 分页组合式函数
 */
import { ref, computed } from 'vue'

export const usePagination = (fetchFn, options = {}) => {
  const {
    pageSize = 20,
    immediate = true
  } = options

  const list = ref([])
  const page = ref(1)
  const total = ref(0)
  const loading = ref(false)
  const refreshing = ref(false)
  const finished = ref(false)

  const hasMore = computed(() => list.value.length < total.value)

  /**
   * 加载数据
   */
  const load = async (append = false) => {
    if (loading.value) return

    loading.value = true

    try {
      const res = await fetchFn({
        page: page.value,
        pageSize
      })

      if (append) {
        list.value = [...list.value, ...(res.list || [])]
      } else {
        list.value = res.list || []
      }

      total.value = res.total || 0
      finished.value = list.value.length >= total.value

      return res
    } catch (error) {
      throw error
    } finally {
      loading.value = false
      refreshing.value = false
    }
  }

  /**
   * 加载更多
   */
  const loadMore = async () => {
    if (!hasMore.value || loading.value) return

    page.value++
    await load(true)
  }

  /**
   * 刷新
   */
  const refresh = async () => {
    refreshing.value = true
    page.value = 1
    await load(false)
    uni.stopPullDownRefresh()
  }

  /**
   * 重置
   */
  const reset = () => {
    list.value = []
    page.value = 1
    total.value = 0
    finished.value = false
  }

  // 立即加载
  if (immediate) {
    load()
  }

  return {
    list,
    page,
    total,
    loading,
    refreshing,
    finished,
    hasMore,
    load,
    loadMore,
    refresh,
    reset
  }
}
