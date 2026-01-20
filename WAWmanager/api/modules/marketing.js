/**
 * 营销推广相关 API
 *
 * 后端接口文档: API-DOCUMENTATION(1)(2).md
 */
import { get, post, put } from '../request'

/**
 * 获取优惠券列表
 */
export const getCouponList = (params = {}) => {
  return get('/coupon/list', params)
}

/**
 * 创建优惠券
 * @param {Object} data - {
 *   name: '优惠券名称',
 *   type: 'discount' | 'amount',
 *   value: 10,
 *   minAmount: 100,
 *   startTime: '2024-01-01',
 *   endTime: '2024-12-31',
 *   totalCount: 100
 * }
 */
export const createCoupon = (data) => {
  return post('/marketing/coupons', data)
}

/**
 * 获取分销设置
 */
export const getDistributionSettings = () => {
  return get('/marketing/distribution/settings')
}

/**
 * 更新分销设置
 */
export const updateDistributionSettings = (data) => {
  return put('/marketing/distribution/settings', data)
}

/**
 * 获取分销商列表
 */
export const getDistributorList = (params = {}) => {
  return get('/marketing/distributors', params)
}

/**
 * 更新优惠券状态（开始/停止发放）
 */
export const updateCouponStatus = (id, status) => {
  return put(`/coupon/${id}/status`, { status })
}

/**
 * 删除优惠券
 */
export const deleteCouponById = (id) => {
  return post(`/coupon/${id}/delete`)
}
