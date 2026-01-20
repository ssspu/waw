/**
 * 数据统计 API
 * 包含业绩统计、客流统计、收入统计、排行榜等接口
 *
 * 后端接口文档: API-DOCUMENTATION(1)(2).md
 */
import { get } from '../request'

/**
 * 获取今日概览
 * 注意：/statistics/today 后端未实现，使用 /order/statistics 替代
 */
export const getTodayOverview = () => {
  return get('/order/statistics')
}

/**
 * 获取营业额统计
 * @param {Object} params - { period: 'day' | 'week' | 'month' | 'year' }
 */
export const getRevenueStats = (params = {}) => {
  return get('/statistics/revenue', params)
}

/**
 * 获取订单统计
 * @param {Object} params - { period?: string, startDate?: string, endDate?: string }
 */
export const getOrderStats = (params = {}) => {
  return get('/statistics/orders', params)
}

/**
 * 获取顾客统计
 * @param {Object} params - { period?: string, startDate?: string, endDate?: string }
 */
export const getCustomerStats = (params = {}) => {
  return get('/statistics/customers', params)
}

/**
 * 获取技师业绩统计
 * @param {Object} params - { period?: string, startDate?: string, endDate?: string }
 */
export const getTechnicianStats = (params = {}) => {
  return get('/statistics/technicians', params)
}

/**
 * 导出报表
 * @param {Object} params - {
 *   type: 'revenue' | 'orders' | 'customers' | 'technicians',
 *   format: 'excel' | 'pdf'
 * }
 */
export const exportReport = (params) => {
  return get('/statistics/export', params)
}

/**
 * 获取总览数据
 * @param {Object} params - { period: 'today' | 'week' | 'month' | 'year' }
 * 注意：/statistics/today 后端未实现，使用 /order/statistics 替代
 */
export const getOverview = (params = {}) => {
  return get('/order/statistics', params)
}

/**
 * 获取收入构成
 * @param {Object} params - { period: 'today' | 'week' | 'month' | 'year' }
 */
export const getRevenueComposition = (params = {}) => {
  return get('/statistics/revenue', params)
}

/**
 * 获取热门服务排行
 * @param {Object} params - { period: 'today' | 'week' | 'month' | 'year', limit: number }
 */
export const getHotServiceRanking = (params = {}) => {
  return get('/statistics/orders', params)
}

/**
 * 获取客户消费分析
 * @param {Object} params - { period: 'today' | 'week' | 'month' | 'year' }
 */
export const getCustomerConsumptionAnalysis = (params = {}) => {
  return get('/statistics/customers', params)
}
