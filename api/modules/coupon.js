/**
 * 优惠券模块 API
 * 包含优惠券列表、领取、使用等接口
 */

import { post, get } from '../request.js'

const COUPON_PREFIX = '/coupon'

export default {
  /**
   * 获取优惠券列表
   * @param {Object} params - { page, pageSize, status?: 状态(available/used/expired) }
   */
  getList(params = {}) {
    return get(`${COUPON_PREFIX}/list`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取可用优惠券列表（用于下单时选择）
   * @param {Object} params - { serviceId?, designerId?, amount?: 订单金额 }
   */
  getAvailable(params = {}) {
    return get(`${COUPON_PREFIX}/available`, params)
  },

  /**
   * 获取优惠券详情
   * @param {string} couponId - 优惠券ID
   */
  getDetail(couponId) {
    return get(`${COUPON_PREFIX}/detail/${couponId}`)
  },

  /**
   * 领取优惠券
   * @param {string} couponId - 优惠券ID
   */
  receive(couponId) {
    return post(`${COUPON_PREFIX}/receive/${couponId}`)
  },

  /**
   * 通过兑换码领取优惠券
   * @param {Object} data - { code: 兑换码 }
   */
  exchange(data) {
    return post(`${COUPON_PREFIX}/exchange`, data)
  },

  /**
   * 获取可领取的优惠券列表（优惠券中心）
   * @param {Object} params - { page, pageSize }
   */
  getReceivable(params = {}) {
    return get(`${COUPON_PREFIX}/receivable`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取优惠券使用规则
   * @param {string} couponId - 优惠券ID
   */
  getRules(couponId) {
    return get(`${COUPON_PREFIX}/rules/${couponId}`)
  },

  /**
   * 获取优惠券统计
   * 返回各状态优惠券数量
   */
  getStatistics() {
    return get(`${COUPON_PREFIX}/statistics`)
  }
}
