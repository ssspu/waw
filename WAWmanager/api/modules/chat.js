/**
 * 私信/聊天 API
 * 包含会话管理、消息收发、用户端和商家端的即时通讯接口
 */
import { get, post, put, del } from '../request'

// ==================== 会话管理 ====================

/**
 * 获取会话列表
 * @param {Object} params - {
 *   page: 1,
 *   pageSize: 20,
 *   keyword: string // 搜索关键词
 * }
 */
export const getConversations = (params = {}) => {
  return get('/chat/conversations', params)
}

/**
 * 获取会话详情
 * @param {string} conversationId - 会话ID
 */
export const getConversation = (conversationId) => {
  return get(`/chat/conversations/${conversationId}`)
}

/**
 * 创建/获取会话（与指定用户）
 * @param {Object} data - {
 *   targetUserId: string, // 目标用户ID
 *   targetUserType: 'customer' | 'technician' // 用户类型
 * }
 */
export const createConversation = (data) => {
  return post('/chat/conversations', data)
}

/**
 * 删除会话
 * @param {string} conversationId - 会话ID
 */
export const deleteConversation = (conversationId) => {
  return del(`/chat/conversations/${conversationId}`)
}

/**
 * 置顶会话
 * @param {string} conversationId - 会话ID
 */
export const pinConversation = (conversationId) => {
  return put(`/chat/conversations/${conversationId}/pin`)
}

/**
 * 取消置顶会话
 * @param {string} conversationId - 会话ID
 */
export const unpinConversation = (conversationId) => {
  return put(`/chat/conversations/${conversationId}/unpin`)
}

/**
 * 设置会话免打扰
 * @param {string} conversationId - 会话ID
 * @param {boolean} mute - 是否免打扰
 */
export const setConversationMute = (conversationId, mute) => {
  return put(`/chat/conversations/${conversationId}/mute`, { mute })
}

/**
 * 清空会话聊天记录
 * @param {string} conversationId - 会话ID
 */
export const clearConversationHistory = (conversationId) => {
  return del(`/chat/conversations/${conversationId}/messages`)
}

// ==================== 消息收发 ====================

/**
 * 获取聊天记录
 * @param {string} conversationId - 会话ID
 * @param {Object} params - {
 *   page: 1,
 *   pageSize: 30,
 *   beforeMessageId: string // 加载更早的消息
 * }
 */
export const getMessages = (conversationId, params = {}) => {
  return get(`/chat/conversations/${conversationId}/messages`, params)
}

/**
 * 发送文本消息
 * @param {string} conversationId - 会话ID
 * @param {Object} data - { content: '消息内容' }
 */
export const sendTextMessage = (conversationId, data) => {
  return post(`/chat/conversations/${conversationId}/messages`, {
    type: 'text',
    ...data
  })
}

/**
 * 发送图片消息
 * @param {string} conversationId - 会话ID
 * @param {Object} data - { imageUrl: '图片URL', thumbnailUrl?: '缩略图URL' }
 */
export const sendImageMessage = (conversationId, data) => {
  return post(`/chat/conversations/${conversationId}/messages`, {
    type: 'image',
    ...data
  })
}

/**
 * 发送语音消息
 * @param {string} conversationId - 会话ID
 * @param {Object} data - { audioUrl: '语音URL', duration: 10 }
 */
export const sendAudioMessage = (conversationId, data) => {
  return post(`/chat/conversations/${conversationId}/messages`, {
    type: 'audio',
    ...data
  })
}

/**
 * 发送服务卡片消息
 * @param {string} conversationId - 会话ID
 * @param {Object} data - {
 *   serviceId: string,
 *   serviceName: '服务名称',
 *   serviceImage: '服务图片',
 *   price: 100,
 *   description: '服务描述'
 * }
 */
export const sendServiceCard = (conversationId, data) => {
  return post(`/chat/conversations/${conversationId}/messages`, {
    type: 'serviceCard',
    ...data
  })
}

/**
 * 发送预约卡片消息
 * @param {string} conversationId - 会话ID
 * @param {Object} data - {
 *   orderId: string,
 *   serviceName: '服务名称',
 *   appointmentTime: '2024-01-01 10:00',
 *   technicianName: '技师名称',
 *   status: 'pending' | 'confirmed'
 * }
 */
export const sendAppointmentCard = (conversationId, data) => {
  return post(`/chat/conversations/${conversationId}/messages`, {
    type: 'appointmentCard',
    ...data
  })
}

/**
 * 发送优惠券卡片消息
 * @param {string} conversationId - 会话ID
 * @param {Object} data - {
 *   couponId: string,
 *   couponName: '优惠券名称',
 *   couponValue: '满100减20',
 *   expiryDate: '2024-01-31'
 * }
 */
export const sendCouponCard = (conversationId, data) => {
  return post(`/chat/conversations/${conversationId}/messages`, {
    type: 'couponCard',
    ...data
  })
}

/**
 * 发送位置消息
 * @param {string} conversationId - 会话ID
 * @param {Object} data - {
 *   latitude: number,
 *   longitude: number,
 *   address: '地址',
 *   name: '位置名称'
 * }
 */
export const sendLocationMessage = (conversationId, data) => {
  return post(`/chat/conversations/${conversationId}/messages`, {
    type: 'location',
    ...data
  })
}

// ==================== 消息操作 ====================

/**
 * 撤回消息
 * @param {string} conversationId - 会话ID
 * @param {string} messageId - 消息ID
 */
export const recallMessage = (conversationId, messageId) => {
  return post(`/chat/conversations/${conversationId}/messages/${messageId}/recall`)
}

/**
 * 删除消息（仅本地删除）
 * @param {string} conversationId - 会话ID
 * @param {string} messageId - 消息ID
 */
export const deleteMessage = (conversationId, messageId) => {
  return del(`/chat/conversations/${conversationId}/messages/${messageId}`)
}

/**
 * 标记会话已读
 * @param {string} conversationId - 会话ID
 */
export const markConversationAsRead = (conversationId) => {
  return put(`/chat/conversations/${conversationId}/read`, {}, { loading: false })
}

/**
 * 标记所有会话已读
 */
export const markAllConversationsAsRead = () => {
  return put('/chat/conversations/read-all', {}, { loading: false })
}

// ==================== 未读消息 ====================

/**
 * 获取未读消息总数
 */
export const getUnreadCount = () => {
  return get('/chat/unread-count', {}, { loading: false })
}

/**
 * 获取各会话未读数
 */
export const getConversationUnreadCounts = () => {
  return get('/chat/conversations/unread-counts', {}, { loading: false })
}

// ==================== 快捷回复 ====================

/**
 * 获取快捷回复列表
 */
export const getQuickReplies = () => {
  return get('/chat/quick-replies')
}

/**
 * 创建快捷回复
 * @param {Object} data - { content: '快捷回复内容', shortcut?: '快捷键' }
 */
export const createQuickReply = (data) => {
  return post('/chat/quick-replies', data)
}

/**
 * 更新快捷回复
 * @param {string} id - 快捷回复ID
 * @param {Object} data - { content: '快捷回复内容' }
 */
export const updateQuickReply = (id, data) => {
  return put(`/chat/quick-replies/${id}`, data)
}

/**
 * 删除快捷回复
 * @param {string} id - 快捷回复ID
 */
export const deleteQuickReply = (id) => {
  return del(`/chat/quick-replies/${id}`)
}

/**
 * 排序快捷回复
 * @param {Object} data - { ids: ['id1', 'id2', 'id3'] } 按顺序排列的ID数组
 */
export const sortQuickReplies = (data) => {
  return put('/chat/quick-replies/sort', data)
}

// ==================== 黑名单管理 ====================

/**
 * 获取黑名单列表
 * @param {Object} params - 分页参数
 */
export const getBlockList = (params = {}) => {
  return get('/chat/block-list', params)
}

/**
 * 拉黑用户
 * @param {Object} data - { userId: string, reason?: string }
 */
export const blockUser = (data) => {
  return post('/chat/block', data)
}

/**
 * 取消拉黑
 * @param {string} userId - 用户ID
 */
export const unblockUser = (userId) => {
  return del(`/chat/block/${userId}`)
}

/**
 * 检查用户是否被拉黑
 * @param {string} userId - 用户ID
 */
export const checkBlocked = (userId) => {
  return get(`/chat/block/check/${userId}`, {}, { loading: false })
}

// ==================== 举报功能 ====================

/**
 * 举报用户/消息
 * @param {Object} data - {
 *   type: 'user' | 'message',
 *   targetId: string, // 用户ID或消息ID
 *   conversationId: string,
 *   reason: 'spam' | 'harassment' | 'fraud' | 'other',
 *   description: '详细描述',
 *   evidence: ['图片URL'] // 证据截图
 * }
 */
export const report = (data) => {
  return post('/chat/report', data)
}

// ==================== 聊天设置 ====================

/**
 * 获取聊天设置
 */
export const getChatSettings = () => {
  return get('/chat/settings')
}

/**
 * 更新聊天设置
 * @param {Object} data - {
 *   autoReplyEnabled: boolean, // 自动回复开关
 *   autoReplyContent: string, // 自动回复内容
 *   autoReplyDelay: number, // 自动回复延迟（秒）
 *   offlineAutoReply: boolean, // 离线自动回复
 *   offlineReplyContent: string, // 离线回复内容
 *   newMessageNotify: boolean, // 新消息通知
 *   notifySound: boolean // 消息提示音
 * }
 */
export const updateChatSettings = (data) => {
  return put('/chat/settings', data)
}

// ==================== 在线状态 ====================

/**
 * 更新在线状态
 * @param {Object} data - { online: boolean }
 */
export const updateOnlineStatus = (data) => {
  return put('/chat/online-status', data, { loading: false })
}

/**
 * 获取用户在线状态
 * @param {string} userId - 用户ID
 */
export const getUserOnlineStatus = (userId) => {
  return get(`/chat/online-status/${userId}`, {}, { loading: false })
}

// ==================== 聊天统计 ====================

/**
 * 获取聊天统计
 * @param {Object} params - { startDate, endDate }
 */
export const getChatStats = (params = {}) => {
  return get('/chat/stats', params)
}

/**
 * 获取客服响应时间统计
 * @param {Object} params - { month: '2024-01' }
 */
export const getResponseTimeStats = (params = {}) => {
  return get('/chat/stats/response-time', params)
}
