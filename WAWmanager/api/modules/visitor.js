/**
 * 访客记录 API
 * 包含访客记录查询、访客统计等接口
 *
 * 文档接口状态（0/2 已实现）：
 * - GET /visitor/list - 获取访客记录
 * - GET /visitor/stats - 获取访客统计
 */
import { get } from '../request'

// ==================== 文档接口 ====================

/**
 * 获取访客记录列表
 * @param {Object} params - { page, pageSize, startDate, endDate }
 * 响应: { list: [{ id, userId, userName, userAvatar, visitTime, source, duration }], total }
 */
export const getVisitorList = (params = {}) => {
  return get('/visitor/list', params)
}

/**
 * 获取访客统计
 * @param {Object} params - { startDate, endDate }
 * 响应: { totalVisitors, uniqueVisitors, avgDuration, trend: [] }
 */
export const getVisitorStats = (params = {}) => {
  return get('/visitor/stats', params)
}

// ==================== 扩展接口（非文档必需）====================

/**
 * 获取今日访客数
 */
export const getTodayVisitorCount = () => {
  return get('/visitor/today-count', {}, { loading: false })
}

/**
 * 获取访客来源分析
 * @param {Object} params - { period: 'week' | 'month' }
 */
export const getVisitorSourceAnalysis = (params = {}) => {
  return get('/visitor/source-analysis', params)
}

/**
 * 获取访客趋势
 * @param {Object} params - { period: 'week' | 'month' }
 */
export const getVisitorTrend = (params = {}) => {
  return get('/visitor/trend', params)
}
