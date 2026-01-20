/**
 * 管理后台相关 API
 * 需要 ADMIN 角色才能访问
 *
 * 后端接口文档: 商家注册流程改造-前端接口变更.md
 */
import { get, post } from '../request'

// ==================== 商家认证审核 ====================

/**
 * 获取商家认证申请列表
 * @param {Object} params - {
 *   status?: 'pending' | 'approved' | 'rejected',  // 筛选状态
 *   page?: number,      // 页码，默认 1
 *   pageSize?: number   // 每页数量，默认 20
 * }
 */
export const getMerchantApplications = (params = {}) => {
  return get('/admin/merchant/applications', params)
}

/**
 * 获取商家认证详情
 * @param {string} id - 认证申请ID
 */
export const getMerchantApplicationDetail = (id) => {
  return get(`/admin/merchant/${id}`)
}

/**
 * 审核通过
 * 审核通过后，系统自动：
 * 1. 创建店铺
 * 2. 将用户角色升级为 MERCHANT
 *
 * @param {string} id - 认证申请ID
 */
export const approveMerchantApplication = (id) => {
  return post(`/admin/merchant/${id}/approve`)
}

/**
 * 审核拒绝
 * @param {string} id - 认证申请ID
 * @param {Object} data - { reason: '拒绝原因' }
 */
export const rejectMerchantApplication = (id, data) => {
  return post(`/admin/merchant/${id}/reject`, data)
}
