/**
 * 订单模块 API
 * 包含订单列表详情创建取消评价等接口
 */

import { post, get, put } from '../request.js'

const ORDER_PREFIX = '/order'

export default {
  /**
   * 获取订单列表
   * @param {Object} params - { status?: 订单状态, page: 页码, pageSize: 每页数量 }
   * status: PENDING_PAYMENT-待付款, CONFIRMED-已付款, PENDING_USE-待使用, IN_SERVICE-服务中, COMPLETED-已完成, CANCELLED-已取消, REFUNDING-退款中, REFUNDED-已退款
   * 不传status或传空值表示查询全部订单
   */
  getList(params = {}) {
    const requestParams = {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10
    }
    // 只有当status有值且不是'all'时才传递status参数
    if (params.status && params.status !== 'all') {
      requestParams.status = params.status
    }
    return get(`${ORDER_PREFIX}/list`, requestParams)
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
   * @param {Object} data - { serviceId, designerId, appointmentTime, skuId?, couponId?, remark? }
   */
  create(data) {
    // 转换为后端期望的 snake_case 格式
    const requestData = {
      designer_id: data.designerId || data.designer_id,
      service_id: data.serviceId || data.service_id,
      appointment_time: data.appointmentTime || data.appointment_time,
      remark: data.remark
    }
    if (data.skuId || data.sku_id) {
      requestData.sku_id = data.skuId || data.sku_id
    }
    if (data.couponId || data.coupon_id) {
      requestData.coupon_id = data.couponId || data.coupon_id
    }
    return post(`${ORDER_PREFIX}/create`, requestData)
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
    return post(`${ORDER_PREFIX}/pay/${orderId}`, {
      payment_method: data.paymentMethod || data.payment_method
    })
  },

  /**
   * 确认预约（商家确认）
   * @param {string} orderId - 订单ID
   */
  confirm(orderId) {
    return put(`${ORDER_PREFIX}/confirm/${orderId}`)
  },

  /**
   * 始服务
   * @param {string} orderId - 订单ID
   */
  startService(orderId) {
    return put(`${ORDER_PREFIX}/start/${orderId}`)
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
   * 申请款
   * @param {string} orderId - 订单ID
   * @param {Object} data - { reason: 款原因, description?: 详细说明 }
   */
  refund(orderId, data) {
    return post(`${ORDER_PREFIX}/refund/${orderId}`, data)
  },

  /**
   * 获取订单统计
   * 返回各状订单数量
   */
  getStatistics() {
    return get(`${ORDER_PREFIX}/statistics`)
  },

  /**
   * 再次预约（基于历史订单）
   * @param {string} orderId - 历史订单ID
   * @param {Object} data - { appointmentTime: 新预约时间, remark?: 备注 }
   */
  reorder(orderId, data = {}) {
    return post(`${ORDER_PREFIX}/reorder/${orderId}`, {
      appointment_time: data.appointmentTime || data.appointment_time,
      remark: data.remark
    })
  }
}
