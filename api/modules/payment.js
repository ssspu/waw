/**
 * 支付模块 API
 * 包含微信支付预下单、查询支付状态、退款等接口
 */

import { post, get } from '../request.js'

const PAYMENT_PREFIX = '/payment'

export default {
  /**
   * 微信支付预下单
   * @param {string} orderId - 订单ID (UUID格式)
   * @returns {Promise} 返回支付参数
   */
  prepay(orderId) {
    return post(`${PAYMENT_PREFIX}/wechat/prepay`, {
      order_id: orderId
    })
  },

  /**
   * 查询微信支付订单状态
   * @param {string} orderId - 订单ID (UUID格式)
   * @returns {Promise} 返回支付状态
   */
  queryStatus(orderId) {
    return get(`${PAYMENT_PREFIX}/wechat/query/${orderId}`)
  },

  /**
   * 申请微信退款
   * @param {string} orderId - 订单ID (UUID格式)
   * @param {string} reason - 退款原因（可选，最多80字）
   * @returns {Promise} 返回退款结果
   */
  refund(orderId, reason = '') {
    return post(`${PAYMENT_PREFIX}/wechat/refund`, {
      order_id: orderId,
      reason: reason
    })
  },

  /**
   * VIP微信支付预下单
   * @param {string} vipOrderId - VIP订单ID (UUID格式)
   * @returns {Promise} 返回支付参数
   */
  vipPrepay(vipOrderId) {
    return post(`${PAYMENT_PREFIX}/wechat/vip/prepay`, {
      vip_order_id: vipOrderId
    })
  },

  /**
   * 查询VIP微信支付订单状态
   * @param {string} vipOrderId - VIP订单ID (UUID格式)
   * @returns {Promise} 返回支付状态
   */
  vipQueryStatus(vipOrderId) {
    return get(`${PAYMENT_PREFIX}/wechat/vip/query/${vipOrderId}`)
  }
}
