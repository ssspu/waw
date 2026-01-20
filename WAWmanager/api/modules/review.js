/**
 * 评价管理 API
 * 包含服务评价、评价回复、评价统计等接口
 */
import { get, post, put, del } from '../request'

// ==================== 评价列表 ====================

/**
 * 获取评价列表
 * @param {Object} params - {
 *   page: 1,
 *   pageSize: 20,
 *   rating: 5 | 4 | 3 | 2 | 1, // 星级筛选
 *   hasImage: boolean, // 有图评价
 *   hasReply: boolean, // 是否已回复
 *   type: 'service' | 'technician' | 'shop', // 评价类型
 *   startDate: '2024-01-01',
 *   endDate: '2024-01-31'
 * }
 */
export const getReviewList = (params = {}) => {
  return get('/reviews', params)
}

/**
 * 获取评价详情
 * @param {string} id - 评价ID
 */
export const getReviewDetail = (id) => {
  return get(`/reviews/${id}`)
}

/**
 * 获取订单评价
 * @param {string} orderId - 订单ID
 */
export const getOrderReview = (orderId) => {
  return get(`/reviews/order/${orderId}`)
}

/**
 * 获取服务评价列表
 * @param {string} serviceId - 服务ID
 * @param {Object} params - 分页参数
 */
export const getServiceReviews = (serviceId, params = {}) => {
  return get(`/reviews/service/${serviceId}`, params)
}

/**
 * 获取技师评价列表
 * @param {string} technicianId - 技师ID
 * @param {Object} params - 分页参数
 */
export const getTechnicianReviews = (technicianId, params = {}) => {
  return get(`/reviews/technician/${technicianId}`, params)
}

/**
 * 获取店铺评价列表
 * @param {Object} params - 分页参数
 */
export const getShopReviews = (params = {}) => {
  return get('/reviews/shop', params)
}

// ==================== 商家点评顾客 ====================

/**
 * 商家点评顾客
 * @param {string} orderId - 订单ID
 * @param {Object} data - {
 *   rating: 5, // 1-5星
 *   tags: ['守时', '配合度高'], // 评价标签
 *   content: '顾客很配合，期待下次光临', // 评价内容
 *   isAnonymous: false // 是否匿名
 * }
 */
export const createCustomerReview = (orderId, data) => {
  return post(`/reviews/customer/${orderId}`, data)
}

/**
 * 获取顾客评价标签
 */
export const getCustomerReviewTags = () => {
  return get('/reviews/tags/customer', {}, { loading: false })
}

/**
 * 获取顾客被评价列表
 * @param {string} customerId - 顾客ID
 * @param {Object} params - 分页参数
 */
export const getCustomerReceivedReviews = (customerId, params = {}) => {
  return get(`/reviews/customer/${customerId}/received`, params)
}

// ==================== 评价回复 ====================

/**
 * 回复评价
 * @param {string} reviewId - 评价ID
 * @param {Object} data - { content: '感谢您的好评' }
 */
export const replyReview = (reviewId, data) => {
  return post(`/reviews/${reviewId}/reply`, data)
}

/**
 * 修改回复
 * @param {string} reviewId - 评价ID
 * @param {Object} data - { content: '修改后的回复内容' }
 */
export const updateReply = (reviewId, data) => {
  return put(`/reviews/${reviewId}/reply`, data)
}

/**
 * 删除回复
 * @param {string} reviewId - 评价ID
 */
export const deleteReply = (reviewId) => {
  return del(`/reviews/${reviewId}/reply`)
}

/**
 * 获取待回复评价列表
 * @param {Object} params - 分页参数
 */
export const getPendingReplyReviews = (params = {}) => {
  return get('/reviews/pending-reply', params)
}

// ==================== 评价申诉 ====================

/**
 * 申诉评价
 * @param {string} reviewId - 评价ID
 * @param {Object} data - {
 *   reason: 'false_review' | 'malicious' | 'unrelated' | 'other',
 *   description: '申诉说明',
 *   evidence: ['图片URL'] // 证据图片
 * }
 */
export const appealReview = (reviewId, data) => {
  return post(`/reviews/${reviewId}/appeal`, data)
}

/**
 * 获取申诉记录
 * @param {string} reviewId - 评价ID
 */
export const getAppealRecord = (reviewId) => {
  return get(`/reviews/${reviewId}/appeal`)
}

/**
 * 获取申诉列表
 * @param {Object} params - { status: 'pending' | 'approved' | 'rejected' }
 */
export const getAppealList = (params = {}) => {
  return get('/reviews/appeals', params)
}

// ==================== 评价统计 ====================

/**
 * 获取评价统计概览
 */
export const getReviewStats = () => {
  return get('/reviews/stats')
}

/**
 * 获取评价趋势
 * @param {Object} params - { period: 'week' | 'month' | 'year' }
 */
export const getReviewTrend = (params = {}) => {
  return get('/reviews/stats/trend', params)
}

/**
 * 获取评分分布
 */
export const getRatingDistribution = () => {
  return get('/reviews/stats/distribution')
}

/**
 * 获取技师评价统计
 * @param {Object} params - { month?: '2024-01' }
 */
export const getTechnicianReviewStats = (params = {}) => {
  return get('/reviews/stats/technician', params)
}

/**
 * 获取服务评价统计
 * @param {Object} params - { month?: '2024-01' }
 */
export const getServiceReviewStats = (params = {}) => {
  return get('/reviews/stats/service', params)
}

/**
 * 获取评价关键词分析
 */
export const getReviewKeywords = () => {
  return get('/reviews/stats/keywords')
}

/**
 * 获取差评分析
 * @param {Object} params - { month?: '2024-01' }
 */
export const getNegativeReviewAnalysis = (params = {}) => {
  return get('/reviews/stats/negative', params)
}

// ==================== 评价设置 ====================

/**
 * 获取评价设置
 */
export const getReviewSettings = () => {
  return get('/reviews/settings')
}

/**
 * 更新评价设置
 * @param {Object} data - {
 *   autoReplyEnabled: boolean, // 自动回复开关
 *   autoReplyContent: string, // 自动回复内容
 *   notifyOnNewReview: boolean, // 新评价通知
 *   notifyOnNegativeReview: boolean, // 差评通知
 *   negativeThreshold: 3 // 差评阈值（几星以下算差评）
 * }
 */
export const updateReviewSettings = (data) => {
  return put('/reviews/settings', data)
}

/**
 * 获取自动回复模板列表
 */
export const getAutoReplyTemplates = () => {
  return get('/reviews/templates')
}

/**
 * 创建自动回复模板
 * @param {Object} data - {
 *   name: '好评回复',
 *   ratingRange: [4, 5], // 适用星级范围
 *   content: '感谢您的好评，期待再次为您服务！'
 * }
 */
export const createAutoReplyTemplate = (data) => {
  return post('/reviews/templates', data)
}

/**
 * 更新自动回复模板
 * @param {string} id - 模板ID
 * @param {Object} data - 模板数据
 */
export const updateAutoReplyTemplate = (id, data) => {
  return put(`/reviews/templates/${id}`, data)
}

/**
 * 删除自动回复模板
 * @param {string} id - 模板ID
 */
export const deleteAutoReplyTemplate = (id) => {
  return del(`/reviews/templates/${id}`)
}

// ==================== 评价标签 ====================

/**
 * 获取评价标签列表
 * @param {string} type - 'positive' | 'negative' | 'neutral'
 */
export const getReviewTags = (type) => {
  return get('/reviews/tags', { type }, { loading: false })
}

/**
 * 获取服务评价标签
 */
export const getServiceReviewTags = () => {
  return get('/reviews/tags/service', {}, { loading: false })
}

/**
 * 获取技师评价标签
 */
export const getTechnicianReviewTags = () => {
  return get('/reviews/tags/technician', {}, { loading: false })
}

/**
 * 获取店铺评价标签
 */
export const getShopReviewTags = () => {
  return get('/reviews/tags/shop', {}, { loading: false })
}
