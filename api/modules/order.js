/**
 * 订单模块 API
 * 包含订单列表、详情、创建、取消、评价等接口
 */

import { post, get, put } from '../request.js'

const ORDER_PREFIX = '/order'

export default {
  /**
   * 获取订单列表
   * @param {Object} params - { status?: 订单状态, page: 页码, pageSize: 每页数量 }
   * status: all-全部, pending_payment-待付款, confirmed-已确认, pending_use-待使用, completed-已完成, cancelled-已取消
   */
  getList(params = {}) {
    return get(`${ORDER_PREFIX}/list`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取订单详情
   * @param {string} orderId - 订单ID
   */
  getDetail(orderId) {
    return get(`${ORDER_PREFIX}/detail/${orderId}`)
  },

  /**
   * 创建订单
   * @param {Object} data - { serviceId, designerId, appointmentTime, couponId?, remark? }
   */
  create(data) {
    return post(`${ORDER_PREFIX}/create`, data)
  },

  /**
   * 取消订单
   * @param {string} orderId - 订单ID
   * @param {Object} data - { reason: 取消原因 }
   */
  cancel(orderId, data) {
    return put(`${ORDER_PREFIX}/cancel/${orderId}`, data)
  },

  /**
   * 订单支付
   * @param {string} orderId - 订单ID
   * @param {Object} data - { paymentMethod: 支付方式(wechat/alipay) }
   */
  pay(orderId, data) {
    return post(`${ORDER_PREFIX}/pay/${orderId}`, data)
  },

  /**
   * 确认订单完成
   * @param {string} orderId - 订单ID
   */
  complete(orderId) {
    return put(`${ORDER_PREFIX}/complete/${orderId}`)
  },

  /**
   * 提交订单评价
   * @param {string} orderId - 订单ID
   * @param {Object} data - { rating: 评分1-5, content: 评价内容, images?: 图片数组, anonymous?: 是否匿名 }
   */
  review(orderId, data) {
    return post(`${ORDER_PREFIX}/review/${orderId}`, data)
  },

  /**
   * 获取订单评价详情
   * @param {string} orderId - 订单ID
   */
  getReview(orderId) {
    return get(`${ORDER_PREFIX}/review/${orderId}`)
  },

  /**
   * 申请退款
   * @param {string} orderId - 订单ID
   * @param {Object} data - { reason: 退款原因, description?: 详细说明 }
   */
  refund(orderId, data) {
    return post(`${ORDER_PREFIX}/refund/${orderId}`, data)
  },

  /**
   * 获取订单统计
   * 返回各状态订单数量
   */
  getStatistics() {
    return get(`${ORDER_PREFIX}/statistics`)
  },

  /**
   * 再次预约（基于历史订单）
   * @param {string} orderId - 历史订单ID
   */
  reorder(orderId) {
    return post(`${ORDER_PREFIX}/reorder/${orderId}`)
  }
}
