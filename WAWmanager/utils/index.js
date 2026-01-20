// 统一导出所有工具函数
export * from './format'
export * from './validate'
export * from './storage'
export * from './platform'

/**
 * 防抖函数
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

/**
 * 节流函数
 */
export const throttle = (func, wait = 300) => {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last > wait) {
      last = now
      return func.apply(this, args)
    }
  }
}

/**
 * 生成UUID
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 深拷贝
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  const clone = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key])
    }
  }
  return clone
}

/**
 * 数组去重
 */
export const uniqueArray = (arr, key) => {
  if (key) {
    const map = new Map()
    return arr.filter(item => {
      if (!map.has(item[key])) {
        map.set(item[key], true)
        return true
      }
      return false
    })
  }
  return [...new Set(arr)]
}

/**
 * 获取文件扩展名
 */
export const getFileExt = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

/**
 * 获取文件名（不含扩展名）
 */
export const getFileName = (filename) => {
  return filename.replace(/\.[^/.]+$/, '')
}
