/**
 * 私信/聊天模块 API
 * 包含会话列表、聊天记录、发送消息等接口
 */

import { post, get, put, del } from '../request.js'

const CHAT_PREFIX = '/chat'

export default {
  /**
   * 获取会话列表
   * @param {Object} params - { page, pageSize }
   */
  getConversations(params = {}) {
    return get(`${CHAT_PREFIX}/conversations`, {
      page: 1,
      pageSize: 20,
      ...params
    })
  },

  /**
   * 获取会话详情
   * @param {string} conversationId - 会话ID
   */
  getConversation(conversationId) {
    return get(`${CHAT_PREFIX}/conversations/${conversationId}`)
  },

  /**
   * 创建/获取与某用户的会话
   * @param {Object} data - { targetType: 类型(designer/brand/user), targetId: 目标ID }
   */
  createConversation(data) {
    return post(`${CHAT_PREFIX}/conversations`, data)
  },

  /**
   * 获取聊天记录
   * @param {string} conversationId - 会话ID
   * @param {Object} params - { page, pageSize, beforeMsgId?: 获取此消息之前的记录 }
   */
  getMessages(conversationId, params = {}) {
    return get(`${CHAT_PREFIX}/conversations/${conversationId}/messages`, {
      page: 1,
      pageSize: 20,
      ...params
    })
  },

  /**
   * 发送消息
   * @param {string} conversationId - 会话ID
   * @param {Object} data - { type: 消息类型(text/image/service), content: 消息内容, extra?: 附加数据 }
   */
  sendMessage(conversationId, data) {
    return post(`${CHAT_PREFIX}/conversations/${conversationId}/messages`, data)
  },

  /**
   * 标记会话已读
   * @param {string} conversationId - 会话ID
   */
  markAsRead(conversationId) {
    return put(`${CHAT_PREFIX}/conversations/${conversationId}/read`)
  },

  /**
   * 标记所有会话已读
   */
  markAllAsRead() {
    return put(`${CHAT_PREFIX}/conversations/read-all`)
  },

  /**
   * 删除会话
   * @param {string} conversationId - 会话ID
   */
  deleteConversation(conversationId) {
    return del(`${CHAT_PREFIX}/conversations/${conversationId}`)
  },

  /**
   * 删除消息
   * @param {string} conversationId - 会话ID
   * @param {string} messageId - 消息ID
   */
  deleteMessage(conversationId, messageId) {
    return del(`${CHAT_PREFIX}/conversations/${conversationId}/messages/${messageId}`)
  },

  /**
   * 撤回消息（2分钟内）
   * @param {string} conversationId - 会话ID
   * @param {string} messageId - 消息ID
   */
  recallMessage(conversationId, messageId) {
    return post(`${CHAT_PREFIX}/conversations/${conversationId}/messages/${messageId}/recall`)
  },

  /**
   * 获取未读消息总数
   */
  getUnreadCount() {
    return get(`${CHAT_PREFIX}/unread-count`, {}, { showLoading: false })
  },

  /**
   * 置顶会话
   * @param {string} conversationId - 会话ID
   */
  pinConversation(conversationId) {
    return put(`${CHAT_PREFIX}/conversations/${conversationId}/pin`)
  },

  /**
   * 取消置顶
   * @param {string} conversationId - 会话ID
   */
  unpinConversation(conversationId) {
    return del(`${CHAT_PREFIX}/conversations/${conversationId}/pin`)
  },

  /**
   * 设置会话免打扰
   * @param {string} conversationId - 会话ID
   * @param {boolean} mute - 是否免打扰
   */
  setMute(conversationId, mute) {
    return put(`${CHAT_PREFIX}/conversations/${conversationId}/mute`, { mute })
  },

  /**
   * 举报用户/消息
   * @param {Object} data - { conversationId, messageId?, reason, description? }
   */
  report(data) {
    return post(`${CHAT_PREFIX}/report`, data)
  },

  /**
   * 拉黑用户
   * @param {Object} data - { targetType, targetId }
   */
  block(data) {
    return post(`${CHAT_PREFIX}/block`, data)
  },

  /**
   * 取消拉黑
   * @param {Object} data - { targetType, targetId }
   */
  unblock(data) {
    return post(`${CHAT_PREFIX}/unblock`, data)
  },

  /**
   * 获取黑名单列表
   * @param {Object} params - { page, pageSize }
   */
  getBlockList(params = {}) {
    return get(`${CHAT_PREFIX}/block-list`, {
      page: 1,
      pageSize: 20,
      ...params
    })
  },

  /**
   * 发送服务卡片消息
   * @param {string} conversationId - 会话ID
   * @param {Object} data - { serviceId, designerId? }
   */
  sendServiceCard(conversationId, data) {
    return post(`${CHAT_PREFIX}/conversations/${conversationId}/service-card`, data)
  },

  /**
   * 发送预约卡片消息
   * @param {string} conversationId - 会话ID
   * @param {Object} data - { orderId }
   */
  sendAppointmentCard(conversationId, data) {
    return post(`${CHAT_PREFIX}/conversations/${conversationId}/appointment-card`, data)
  }
}
