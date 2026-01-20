/**
 * 消息中心模块 API
 * 包含消息列表、详情、已读标记、删除等接口
 */

import { post, get, put, del } from '../request.js'

const MESSAGE_PREFIX = '/message'

export default {
  /**
   * 获取消息列表
   * @param {Object} params - { page, pageSize, type?: 消息类型(system/order/activity/coupon) }
   */
  getList(params = {}) {
    return get(`${MESSAGE_PREFIX}/list`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 获取消息详情
   * @param {string} messageId - 消息ID
   */
  getDetail(messageId) {
    return get(`${MESSAGE_PREFIX}/detail/${messageId}`)
  },

  /**
   * 标记消息为已读
   * @param {string} messageId - 消息ID
   */
  markAsRead(messageId) {
    return put(`${MESSAGE_PREFIX}/read/${messageId}`)
  },

  /**
   * 批量标记消息为已读
   * @param {Object} data - { ids: 消息ID数组 }
   */
  batchMarkAsRead(data) {
    return put(`${MESSAGE_PREFIX}/batch-read`, data)
  },

  /**
   * 标记所有消息为已读
   */
  markAllAsRead() {
    return put(`${MESSAGE_PREFIX}/read-all`)
  },

  /**
   * 删除消息
   * @param {string} messageId - 消息ID
   */
  delete(messageId) {
    return del(`${MESSAGE_PREFIX}/${messageId}`)
  },

  /**
   * 批量删除消息
   * @param {Object} data - { ids: 消息ID数组 }
   */
  batchDelete(data) {
    return post(`${MESSAGE_PREFIX}/batch-delete`, data)
  },

  /**
   * 清空所有消息
   * @param {Object} params - { type?: 消息类型，不传则清空全部 }
   */
  clearAll(params = {}) {
    return del(`${MESSAGE_PREFIX}/clear`, params)
  },

  /**
   * 获取未读消息数量
   */
  getUnreadCount() {
    return get(`${MESSAGE_PREFIX}/unread-count`, {}, { showLoading: false })
  },

  /**
   * 获取各类型消息未读数量
   * 返回 { system: 0, order: 0, activity: 0, coupon: 0 }
   */
  getUnreadCountByType() {
    return get(`${MESSAGE_PREFIX}/unread-count/types`, {}, { showLoading: false })
  },

  /**
   * 获取消息分组列表（按日期分组）
   * @param {Object} params - { page, pageSize }
   */
  getGroupedList(params = {}) {
    return get(`${MESSAGE_PREFIX}/grouped`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 20,
      ...params
    })
  }
}
