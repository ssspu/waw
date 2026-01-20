/**
 * 本地存储工具
 */

const STORAGE_PREFIX = 'mf_'

/**
 * 设置存储
 */
export const setStorage = (key, value) => {
  const storageKey = STORAGE_PREFIX + key
  if (typeof value === 'object') {
    uni.setStorageSync(storageKey, JSON.stringify(value))
  } else {
    uni.setStorageSync(storageKey, value)
  }
}

/**
 * 获取存储
 */
export const getStorage = (key, defaultValue = null) => {
  const storageKey = STORAGE_PREFIX + key
  try {
    const value = uni.getStorageSync(storageKey)
    if (!value) return defaultValue

    // 尝试解析 JSON
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  } catch (e) {
    return defaultValue
  }
}

/**
 * 移除存储
 */
export const removeStorage = (key) => {
  const storageKey = STORAGE_PREFIX + key
  uni.removeStorageSync(storageKey)
}

/**
 * 清空所有存储
 */
export const clearStorage = () => {
  uni.clearStorageSync()
}

/**
 * 获取存储信息
 */
export const getStorageInfo = () => {
  return uni.getStorageInfoSync()
}

/**
 * 异步设置存储
 */
export const setStorageAsync = (key, value) => {
  return new Promise((resolve, reject) => {
    const storageKey = STORAGE_PREFIX + key
    const data = typeof value === 'object' ? JSON.stringify(value) : value

    uni.setStorage({
      key: storageKey,
      data,
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 异步获取存储
 */
export const getStorageAsync = (key, defaultValue = null) => {
  return new Promise((resolve) => {
    const storageKey = STORAGE_PREFIX + key

    uni.getStorage({
      key: storageKey,
      success: (res) => {
        try {
          resolve(JSON.parse(res.data))
        } catch {
          resolve(res.data)
        }
      },
      fail: () => resolve(defaultValue)
    })
  })
}

/**
 * 带过期时间的存储
 */
export const setStorageWithExpire = (key, value, expireMs) => {
  const data = {
    value,
    expire: Date.now() + expireMs
  }
  setStorage(key, data)
}

/**
 * 获取带过期时间的存储
 */
export const getStorageWithExpire = (key, defaultValue = null) => {
  const data = getStorage(key)

  if (!data || !data.expire) {
    return defaultValue
  }

  if (Date.now() > data.expire) {
    removeStorage(key)
    return defaultValue
  }

  return data.value
}
