/**
 * 消息通知 API
 * 包含系统消息、订单通知、营销消息等接口
 *
 * 文档接口状态（已实现 6/6 + 额外 5 个）：
 * - GET /message/list - 获取消息列表 ✅
 * - GET /message/detail/{id} - 获取消息详情 ✅
 * - PUT /message/read/{id} - 标记消息已读 ✅
 * - PUT /message/read-all - 标记全部已读 ✅
 * - DELETE /message/{id} - 删除消息 ✅
 * - GET /message/unread-count - 获取未读消息数 ✅
 * - PUT /message/batch-read - 批量标记已读 ✅ (额外)
 * - POST /message/batch-delete - 批量删除消息 ✅ (额外)
 * - DELETE /message/clear - 清空消息 ✅ (额外)
 * - GET /message/unread-count/types - 获取各类型未读数量 ✅ (额外)
 * - GET /message/grouped - 获取消息分组列表 ✅ (额外)
 */
import { get, post, put, del } from '../request'

// ==================== 文档接口 ====================

/**
 * 获取消息列表
 * @param {Object} params - { page, pageSize, type: 'order'|'system'|'marketing' }
 */
export const getMessageList = (params = {}) => {
  return get('/message/list', params)
}

/**
 * 获取消息详情
 * @param {number} id - 消息ID
 */
export const getMessageDetail = (id) => {
  return get(`/message/detail/${id}`)
}

/**
 * 标记消息已读
 * @param {number} id - 消息ID
 */
export const markAsRead = (id) => {
  return put(`/message/read/${id}`, {}, { loading: false })
}

/**
 * 标记全部已读
 */
export const markAllAsRead = () => {
  return put('/message/read-all', {}, { loading: false })
}

/**
 * 删除消息
 * @param {number} id - 消息ID
 */
export const deleteMessage = (id) => {
  return del(`/message/${id}`)
}

/**
 * 获取未读消息数
 */
export const getUnreadCount = () => {
  return get('/message/unread-count', {}, { loading: false })
}

// ==================== 额外实现的接口 ====================

/**
 * 批量标记已读
 * @param {Object} data - { ids: [] }
 */
export const batchMarkAsRead = (data) => {
  return put('/message/batch-read', data, { loading: false })
}

/**
 * 批量删除消息
 * @param {Object} data - { ids: [] }
 */
export const batchDeleteMessages = (data) => {
  return post('/message/batch-delete', data)
}

/**
 * 清空消息
 * @param {string} type - 消息类型，不传则清空全部
 */
export const clearMessages = (type) => {
  return del('/message/clear', { type })
}

/**
 * 获取各类型未读数量
 */
export const getUnreadCountByType = () => {
  return get('/message/unread-count/types', {}, { loading: false })
}

/**
 * 获取消息分组列表
 * @param {Object} params - { page, pageSize }
 */
export const getMessageGroups = (params = {}) => {
  return get('/message/grouped', params)
}
