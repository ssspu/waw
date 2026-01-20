/**
 * 订单管理相关 API
 * 包含订单CRUD、状态管理、评价、统计等接口
 *
 * 后端接口文档: API-DOCUMENTATION(1)(2).md
 */
import { get, post, put } from '../request'

// ==================== 订单列表 ====================

/**
 * 获取订单列表
 * @param {Object} params - {
 *   page: 1,
 *   pageSize: 20,
 *   status: 'pending' | 'confirmed' | 'serving' | 'completed' | 'cancelled' | 'all',
 *   date?: '2024-01-01',
 *   startDate?: '2024-01-01',
 *   endDate?: '2024-01-31',
 *   technicianId?: string,
 *   keyword?: string
 * }
 */
export const getOrderList = (params = {}) => {
  return get('/order/list', params)
}

/**
 * 获取订单详情
 * @param {string} id - 订单ID
 */
export const getOrderDetail = (id) => {
  return get(`/order/detail/${id}`)
}

// ==================== 订单操作 ====================

/**
 * 创建订单
 * @param {Object} data - {
 *   designer_id: '设计师用户ID',
 *   service_id: '服务SPU ID',
 *   sku_id?: '服务SKU ID',
 *   appointment_time: '预约时间 ISO格式',
 *   remark?: '备注',
 *   coupon_id?: '优惠券ID'
 * }
 */
export const createOrder = (data) => {
  return post('/order/create', data)
}

/**
 * 接单
 * @param {string} id - 订单ID
 */
export const acceptOrder = (id) => {
  return put(`/order/confirm/${id}`)
}

/**
 * 拒绝订单
 * @param {string} id - 订单ID
 * @param {Object} data - { reason: '拒绝原因' }
 */
export const rejectOrder = (id, data) => {
  return post(`/order/${id}/reject`, data)
}

/**
 * 开始服务
 * @param {string} id - 订单ID
 */
export const startService = (id) => {
  return put(`/order/start/${id}`)
}

/**
 * 完成服务
 * @param {string} id - 订单ID
 * @param {Object} data - { actualAmount?: number, remark?: string }
 */
export const completeService = (id, data = {}) => {
  return put(`/order/complete/${id}`, data)
}

/**
 * 取消订单
 * @param {string} id - 订单ID
 * @param {Object} data - { reason: '取消原因' }
 */
export const cancelOrder = (id, data) => {
  return put(`/order/cancel/${id}`, data)
}

// ==================== 预约修改 ====================

/**
 * 修改预约时间
 * @param {string} id - 订单ID
 * @param {Object} data - {
 *   appointmentDate: '2024-01-02',
 *   appointmentTime: '14:00',
 *   reason?: '修改原因'
 * }
 */
export const modifyAppointment = (id, data) => {
  return put(`/order/${id}/appointment`, data)
}

/**
 * 更换技师
 * @param {string} id - 订单ID
 * @param {Object} data - { technicianId: '新技师ID', reason?: '更换原因' }
 */
export const changeTechnician = (id, data) => {
  return put(`/order/${id}/technician`, data)
}

// ==================== 支付相关 ====================

/**
 * 确认支付
 * @param {string} id - 订单ID
 * @param {Object} data - {
 *   paymentMethod: 'wechat' | 'alipay' | 'cash' | 'card',
 *   amount: 100,
 *   transactionId?: '交易流水号'
 * }
 */
export const confirmPayment = (id, data) => {
  return post(`/order/${id}/payment`, data)
}

/**
 * 申请退款
 * @param {string} id - 订单ID
 * @param {Object} data - { reason: '退款原因', amount: 100 }
 */
export const applyRefund = (id, data) => {
  return post(`/order/refund/${id}`, data)
}

/**
 * 同意退款
 * @param {string} id - 订单ID
 * @param {Object} data - { reason?: '处理说明' }
 */
export const approveRefund = (id, data = {}) => {
  return post(`/order/admin/refund/${id}/approve`, data)
}

/**
 * 拒绝退款
 * @param {string} id - 订单ID
 * @param {Object} data - { reason?: '处理说明' }
 */
export const rejectRefund = (id, data = {}) => {
  return post(`/order/admin/refund/${id}/reject`, data)
}

// ==================== 订单评价 ====================

/**
 * 商家点评顾客
 * @param {string} orderId - 订单ID
 * @param {Object} data - {
 *   rating: 5, // 1-5星
 *   tags: ['守时', '配合度高'],
 *   content: '评价内容',
 *   isAnonymous: false
 * }
 */
export const reviewCustomer = (orderId, data) => {
  return post(`/order/${orderId}/review/customer`, data)
}

/**
 * 回复顾客评价
 * @param {string} orderId - 订单ID
 * @param {Object} data - { content: '回复内容' }
 */
export const replyReview = (orderId, data) => {
  return post(`/order/${orderId}/review/reply`, data)
}

// ==================== 订单统计 ====================

/**
 * 获取订单统计
 * @param {Object} params - { period: 'today' | 'week' | 'month' }
 */
export const getOrderStats = (params = {}) => {
  return get('/order/statistics', params)
}

/**
 * 导出订单数据
 * @param {Object} params - {
 *   startDate: '2024-01-01',
 *   endDate: '2024-01-31',
 *   status?: 'all',
 *   format: 'excel' | 'csv'
 * }
 */
export const exportOrders = (params) => {
  return get('/order/export', params)
}

// ==================== 核销相关 ====================

/**
 * 获取今日核销记录
 */
export const getVerifyRecords = (params = {}) => {
  return get('/order/verify/records', params)
}

/**
 * 获取待核销订单列表
 */
export const getPendingVerifyOrders = (params = {}) => {
  return get('/order/verify/pending', params)
}

/**
 * 扫码核销
 * @param {string} code - 核销码
 */
export const verifyByCode = (code) => {
  return post('/order/verify/code', { code })
}

/**
 * 手机号核销
 * @param {Object} data - { orderId, phoneSuffix }
 */
export const verifyByPhone = (data) => {
  return post('/order/verify/phone', data)
}
