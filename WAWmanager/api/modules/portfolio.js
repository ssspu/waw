/**
 * 作品集管理 API
 * 包含作品发布、管理、统计等接口（商家端发布，用户端展示）
 */
import { get, post, put, del } from '../request'

// ==================== 作品列表 ====================

/**
 * 获取作品列表
 * @param {Object} params - {
 *   page: 1,
 *   pageSize: 20,
 *   technicianId?: string, // 技师ID
 *   categoryId?: string, // 分类ID
 *   status: 'published' | 'draft' | 'offline' | 'all',
 *   keyword?: string
 * }
 */
export const getPortfolioList = (params = {}) => {
  return get('/portfolio', params)
}

/**
 * 获取作品详情
 * @param {string} id - 作品ID
 */
export const getPortfolioDetail = (id) => {
  return get(`/portfolio/${id}`)
}

/**
 * 获取技师作品列表
 * @param {string} technicianId - 技师ID
 * @param {Object} params - 分页参数
 */
export const getTechnicianPortfolio = (technicianId, params = {}) => {
  return get(`/portfolio/technician/${technicianId}`, params)
}

/**
 * 获取店铺作品列表
 * @param {Object} params - 分页参数
 */
export const getShopPortfolio = (params = {}) => {
  return get('/portfolio/shop', params)
}

// ==================== 作品发布 ====================

/**
 * 发布作品
 * @param {Object} data - {
 *   title: '作品标题',
 *   description: '作品描述',
 *   categoryId: '分类ID',
 *   technicianId: '技师ID',
 *   images: ['图片URL'], // 至少1张，最多9张
 *   video?: { url: '视频URL', cover: '封面URL', duration: 30 },
 *   tags: ['标签1', '标签2'],
 *   serviceId?: '关联服务ID',
 *   beforeAfter?: { // 前后对比
 *     before: '前图URL',
 *     after: '后图URL'
 *   },
 *   customerInfo?: { // 顾客信息（需顾客授权）
 *     gender: 'male' | 'female',
 *     hairType: '发质类型',
 *     faceShape: '脸型'
 *   },
 *   status: 'published' | 'draft' // 直接发布或保存草稿
 * }
 */
export const createPortfolio = (data) => {
  return post('/portfolio', data)
}

/**
 * 更新作品
 * @param {string} id - 作品ID
 * @param {Object} data - 作品数据
 */
export const updatePortfolio = (id, data) => {
  return put(`/portfolio/${id}`, data)
}

/**
 * 删除作品
 * @param {string} id - 作品ID
 */
export const deletePortfolio = (id) => {
  return del(`/portfolio/${id}`)
}

/**
 * 批量删除作品
 * @param {Object} data - { ids: ['id1', 'id2'] }
 */
export const batchDeletePortfolio = (data) => {
  return del('/portfolio/batch', data)
}

// ==================== 作品状态 ====================

/**
 * 发布作品（将草稿发布）
 * @param {string} id - 作品ID
 */
export const publishPortfolio = (id) => {
  return put(`/portfolio/${id}/publish`)
}

/**
 * 下架作品
 * @param {string} id - 作品ID
 * @param {Object} data - { reason?: '下架原因' }
 */
export const offlinePortfolio = (id, data = {}) => {
  return put(`/portfolio/${id}/offline`, data)
}

/**
 * 重新上架作品
 * @param {string} id - 作品ID
 */
export const onlinePortfolio = (id) => {
  return put(`/portfolio/${id}/online`)
}

/**
 * 批量上架/下架
 * @param {Object} data - { ids: ['id1', 'id2'], action: 'online' | 'offline' }
 */
export const batchUpdateStatus = (data) => {
  return put('/portfolio/batch-status', data)
}

/**
 * 设为精选/取消精选
 * @param {string} id - 作品ID
 * @param {boolean} featured - 是否精选
 */
export const setFeatured = (id, featured) => {
  return put(`/portfolio/${id}/featured`, { featured })
}

/**
 * 置顶/取消置顶
 * @param {string} id - 作品ID
 * @param {boolean} pinned - 是否置顶
 */
export const setPinned = (id, pinned) => {
  return put(`/portfolio/${id}/pinned`, { pinned })
}

// ==================== 作品分类 ====================

/**
 * 获取作品分类列表
 */
export const getCategories = () => {
  return get('/portfolio/categories', {}, { loading: false })
}

/**
 * 创建作品分类
 * @param {Object} data - { name: '分类名称', icon?: '图标', sort?: 0 }
 */
export const createCategory = (data) => {
  return post('/portfolio/categories', data)
}

/**
 * 更新作品分类
 * @param {string} id - 分类ID
 * @param {Object} data - 分类数据
 */
export const updateCategory = (id, data) => {
  return put(`/portfolio/categories/${id}`, data)
}

/**
 * 删除作品分类
 * @param {string} id - 分类ID
 */
export const deleteCategory = (id) => {
  return del(`/portfolio/categories/${id}`)
}

/**
 * 排序分类
 * @param {Object} data - { ids: ['id1', 'id2', 'id3'] } 按顺序排列
 */
export const sortCategories = (data) => {
  return put('/portfolio/categories/sort', data)
}

// ==================== 作品标签 ====================

/**
 * 获取作品标签列表
 */
export const getTags = () => {
  return get('/portfolio/tags', {}, { loading: false })
}

/**
 * 创建作品标签
 * @param {Object} data - { name: '标签名称' }
 */
export const createTag = (data) => {
  return post('/portfolio/tags', data)
}

/**
 * 删除作品标签
 * @param {string} id - 标签ID
 */
export const deleteTag = (id) => {
  return del(`/portfolio/tags/${id}`)
}

/**
 * 获取热门标签
 * @param {number} limit - 数量限制
 */
export const getHotTags = (limit = 20) => {
  return get('/portfolio/tags/hot', { limit }, { loading: false })
}

// ==================== 作品互动数据（只读，用户端产生） ====================

/**
 * 获取作品互动数据
 * @param {string} id - 作品ID
 */
export const getInteractionData = (id) => {
  return get(`/portfolio/${id}/interaction`)
}

/**
 * 获取作品点赞列表
 * @param {string} id - 作品ID
 * @param {Object} params - 分页参数
 */
export const getLikeList = (id, params = {}) => {
  return get(`/portfolio/${id}/likes`, params)
}

/**
 * 获取作品收藏列表
 * @param {string} id - 作品ID
 * @param {Object} params - 分页参数
 */
export const getFavoriteList = (id, params = {}) => {
  return get(`/portfolio/${id}/favorites`, params)
}

/**
 * 获取作品评论列表
 * @param {string} id - 作品ID
 * @param {Object} params - 分页参数
 */
export const getCommentList = (id, params = {}) => {
  return get(`/portfolio/${id}/comments`, params)
}

/**
 * 回复作品评论
 * @param {string} portfolioId - 作品ID
 * @param {string} commentId - 评论ID
 * @param {Object} data - { content: '回复内容' }
 */
export const replyComment = (portfolioId, commentId, data) => {
  return post(`/portfolio/${portfolioId}/comments/${commentId}/reply`, data)
}

/**
 * 删除评论/回复
 * @param {string} portfolioId - 作品ID
 * @param {string} commentId - 评论ID
 */
export const deleteComment = (portfolioId, commentId) => {
  return del(`/portfolio/${portfolioId}/comments/${commentId}`)
}

// ==================== 作品统计 ====================

/**
 * 获取作品统计概览
 */
export const getPortfolioStats = () => {
  return get('/portfolio/stats')
}

/**
 * 获取作品趋势统计
 * @param {Object} params - { period: 'week' | 'month' }
 */
export const getPortfolioTrend = (params = {}) => {
  return get('/portfolio/stats/trend', params)
}

/**
 * 获取作品排行
 * @param {Object} params - {
 *   sortBy: 'views' | 'likes' | 'favorites' | 'comments',
 *   period: 'week' | 'month' | 'all',
 *   limit: 10
 * }
 */
export const getPortfolioRanking = (params = {}) => {
  return get('/portfolio/stats/ranking', params)
}

/**
 * 获取单个作品数据分析
 * @param {string} id - 作品ID
 * @param {Object} params - { period: 'week' | 'month' }
 */
export const getPortfolioAnalysis = (id, params = {}) => {
  return get(`/portfolio/${id}/analysis`, params)
}

// ==================== 作品审核（如需平台审核） ====================

/**
 * 获取待审核作品列表
 * @param {Object} params - 分页参数
 */
export const getPendingReviewList = (params = {}) => {
  return get('/portfolio/pending-review', params)
}

/**
 * 获取审核记录
 * @param {string} id - 作品ID
 */
export const getReviewHistory = (id) => {
  return get(`/portfolio/${id}/review-history`)
}

// ==================== 作品排序 ====================

/**
 * 调整作品排序
 * @param {Object} data - { ids: ['id1', 'id2', 'id3'] } 按顺序排列
 */
export const sortPortfolio = (data) => {
  return put('/portfolio/sort', data)
}

/**
 * 移动作品到指定位置
 * @param {string} id - 作品ID
 * @param {Object} data - { targetIndex: 0 } 目标位置
 */
export const movePortfolio = (id, data) => {
  return put(`/portfolio/${id}/move`, data)
}

// ==================== 草稿箱 ====================

/**
 * 获取草稿列表
 * @param {Object} params - 分页参数
 */
export const getDraftList = (params = {}) => {
  return get('/portfolio/drafts', params)
}

/**
 * 保存草稿
 * @param {Object} data - 作品数据
 */
export const saveDraft = (data) => {
  return post('/portfolio/drafts', data)
}

/**
 * 更新草稿
 * @param {string} id - 草稿ID
 * @param {Object} data - 作品数据
 */
export const updateDraft = (id, data) => {
  return put(`/portfolio/drafts/${id}`, data)
}

/**
 * 删除草稿
 * @param {string} id - 草稿ID
 */
export const deleteDraft = (id) => {
  return del(`/portfolio/drafts/${id}`)
}
