/**
 * 客户/顾客管理相关 API
 * 包含顾客CRUD、档案管理、生日提醒、消费记录等接口
 *
 * 后端接口文档: API-DOCUMENTATION(1)(2).md
 */
import { get, post, put, del } from '../request'

// ==================== 顾客列表 ====================

/**
 * 获取顾客列表
 * @param {Object} params - {
 *   page: 1,
 *   pageSize: 20,
 *   type: 'all' | 'new' | 'old',
 *   keyword?: string,
 *   tagId?: string,
 *   sortBy?: 'visitCount' | 'totalAmount' | 'lastVisit',
 *   sortOrder?: 'asc' | 'desc'
 * }
 */
export const getCustomerList = (params = {}) => {
  return get('/customers', params)
}

/**
 * 搜索顾客
 * @param {string} keyword - 搜索关键词（手机号/姓名）
 */
export const searchCustomers = (keyword) => {
  return get('/customers', { keyword })
}

/**
 * 获取顾客详情
 * @param {string} id - 顾客ID
 */
export const getCustomerDetail = (id) => {
  return get(`/customers/${id}`)
}

// ==================== 顾客CRUD ====================

/**
 * 添加顾客（通过手机号搜索用户）
 * @param {Object} data - {
 *   phone: '手机号',
 *   remark?: '备注',
 *   tagIds?: ['标签ID']
 * }
 */
export const createCustomer = (data) => {
  return post('/customers', data)
}

/**
 * 更新顾客备注/标签
 * @param {string} id - 顾客ID
 * @param {Object} data - { remark?: string, tagIds?: ['标签ID'] }
 */
export const updateCustomer = (id, data) => {
  return put(`/customers/${id}`, data)
}

/**
 * 移除顾客
 * @param {string} id - 顾客ID
 */
export const deleteCustomer = (id) => {
  return del(`/customers/${id}`)
}

/**
 * 批量移除顾客
 * @param {Object} data - { ids: ['id1', 'id2'] }
 */
export const batchDeleteCustomers = (data) => {
  return del('/customers/batch', data)
}

// ==================== 顾客标签 ====================

/**
 * 获取标签列表
 */
export const getCustomerTags = () => {
  return get('/customers/tags', {}, { loading: false })
}

/**
 * 创建标签
 * @param {Object} data - { name: '标签名', color: '#FF5733' }
 */
export const createCustomerTag = (data) => {
  return post('/customers/tags', data)
}

/**
 * 更新标签
 * @param {string} tagId - 标签ID
 * @param {Object} data - { name: '标签名', color: '#FF5733' }
 */
export const updateCustomerTag = (tagId, data) => {
  return put(`/customers/tags/${tagId}`, data)
}

/**
 * 删除标签
 * @param {string} tagId - 标签ID
 */
export const deleteCustomerTag = (tagId) => {
  return del(`/customers/tags/${tagId}`)
}

/**
 * 设置顾客标签
 * @param {string} customerId - 顾客ID
 * @param {Object} data - { tagIds: ['id1', 'id2'] }
 */
export const setCustomerTags = (customerId, data) => {
  return put(`/customers/${customerId}/tags`, data)
}

// ==================== 生日提醒 ====================

/**
 * 获取生日提醒顾客列表
 * @param {Object} params - { days?: 7 } 未来多少天内过生日
 */
export const getBirthdayCustomers = (params = {}) => {
  return get('/customers/birthday', params)
}

/**
 * 发送生日祝福
 * @param {string} customerId - 顾客ID
 * @param {Object} data - {
 *   content: '祝福内容',
 *   couponId?: '优惠券ID'
 * }
 */
export const sendBirthdayWish = (customerId, data) => {
  return post(`/customers/${customerId}/birthday-wish`, data)
}

// ==================== 顾客统计 ====================

/**
 * 获取顾客统计概览
 */
export const getCustomerStats = () => {
  return get('/customers/stats')
}

/**
 * 获取流失顾客
 * @param {Object} params - { days?: 90, page?: 1, pageSize?: 20 }
 */
export const getChurnedCustomers = (params = {}) => {
  return get('/customers/churned', params)
}
