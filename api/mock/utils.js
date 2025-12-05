/**
 * Mock 工具函数
 * 提供通用的响应生成和数据处理函数
 */

/**
 * 模拟网络延迟
 * @param {number} ms - 延迟毫秒数
 */
export const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 生成成功响应
 * @param {any} data - 响应数据
 * @param {string} message - 响应消息
 */
export const success = (data = null, message = '操作成功') => ({
  code: 0,
  message,
  data
})

/**
 * 生成失败响应
 * @param {string} message - 错误消息
 * @param {number} code - 错误码
 */
export const error = (message = '操作失败', code = -1) => ({
  code,
  message,
  data: null
})

/**
 * 生成分页数据
 * @param {Array} list - 数据列表
 * @param {number} page - 当前页
 * @param {number} pageSize - 每页数量
 */
export const paginate = (list, page = 1, pageSize = 10) => {
  const total = list.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const records = list.slice(start, end)

  return {
    list: records,
    records,
    total,
    page: Number(page),
    pageSize: Number(pageSize),
    totalPages,
    hasMore: page < totalPages
  }
}

/**
 * 生成随机ID
 * @param {string} prefix - ID前缀
 */
export const generateId = (prefix = '') => {
  return prefix + Date.now() + Math.random().toString(36).slice(2, 8)
}

/**
 * 格式化当前时间
 */
export const formatNow = () => {
  return new Date().toISOString().replace('T', ' ').slice(0, 19)
}

export default {
  delay,
  success,
  error,
  paginate,
  generateId,
  formatNow
}
