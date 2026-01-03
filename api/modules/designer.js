/**
 * 设计师模块 API
 */

import { post, get } from '../request.js'

const DESIGNER_PREFIX = '/designer'

/**
 * 将 UUID 转换为无连字符格式
 * @param {string} id - UUID (可能带连字符)
 * @returns {string} 32位无连字符的UUID
 */
const formatUuidNoHyphen = (id) => {
  if (!id) return id
  return String(id).replace(/-/g, '')
}

/**
 * 将数字ID转换为UUID格式
 * 后端要求 designer_id 为 UUID 格式（如 00000000-0000-0000-0000-000000000013）
 * @param {string|number} id - 设计师ID
 * @returns {string} UUID格式的ID
 */
const formatDesignerId = (id) => {
  if (!id) return id
  // 如果已经是UUID格式（包含-），直接返回
  if (String(id).includes('-')) return id
  // 将数字转换为固定长度的UUID格式
  const numStr = String(id)
  const padded = numStr.padStart(12, '0')
  return `00000000-0000-0000-${padded.slice(0, 4)}-${padded.slice(4)}`
}

export default {
  /**
   * 获取设计师列表
   * @param {Object} params - 查询参数
   * @param {string} [params.shop_id] - 门店ID（UUID格式）。不传：查询个人设计师；传入：查询该门店旗下设计师
   * @param {number} [params.professional_level] - 专业等级筛选（1-10）
   * @param {number} [params.min_rating] - 最低评分筛选（0-5）
   * @param {number} [params.page=1] - 页码
   * @param {number} [params.pageSize=10] - 每页数量，最大100
   */
  getList(params = {}) {
    const queryParams = {
      page: Number(params.page) || 1,
      pageSize: Math.min(Number(params.pageSize) || 10, 100)
    }
    if (params.shop_id) {
      queryParams.shop_id = params.shop_id
    }
    if (params.professional_level) {
      queryParams.professional_level = Number(params.professional_level)
    }
    if (params.min_rating !== undefined && params.min_rating !== null) {
      queryParams.min_rating = Number(params.min_rating)
    }
    return get(`${DESIGNER_PREFIX}/list`, queryParams)
  },

  /**
   * 获取设计师详情
   * @param {string} designerId - 设计师ID
   * 注意: 后端没有 /designer/{id} 接口，要过 /designer/list 获取全部数据后在客户端筛
   */
  getDetail(designerId) {
    // 由于 /designer/list 接口不支持按 designer_id 筛，获取全部数据后在客户端过滤
    return get(`${DESIGNER_PREFIX}/list`, {
      page: 1,
      pageSize: 50
    })
  },

  /**
   * 获取设计师基本信息
   * @param {string} designerId - 设计师ID
   * 注意: 后端没有 /designer/info/{id} 接口，要过 /designer/list 获取全部数据后在客户端筛
   */
  getInfo(designerId) {
    return get(`${DESIGNER_PREFIX}/list`, {
      page: 1,
      pageSize: 50
    })
  },

  /**
   * 获取设计师服务项目
   * @param {string} userId - 设计师的 user_id (UUID格式)
   * @param {Object} params - { page, pageSize }
   * 注意: 使用路径参数 /designer/{user_id}/services
   */
  getServices(userId, params = {}) {
    const formattedId = formatUuidNoHyphen(userId)
    return get(`${DESIGNER_PREFIX}/${formattedId}/services`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10
    })
  },

  /**
   * 获取设计师作品集
   * @param {string} userId - 设计师的 user_id (UUID格式)
   * @param {Object} params - { page, pageSize, type?: 作品类型 }
   */
  getWorks(userId, params = {}) {
    const formattedId = formatUuidNoHyphen(userId)
    return get(`${DESIGNER_PREFIX}/${formattedId}/works`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 获取设计师评价列表
   * @param {string} userId - 设计师的 user_id (UUID格式)
   * @param {Object} params - { page, pageSize, rating?: 评分筛 }
   */
  getReviews(userId, params = {}) {
    const formattedId = formatUuidNoHyphen(userId)
    return get(`${DESIGNER_PREFIX}/${formattedId}/reviews`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 获取设计师可预约时间
   * @param {string} userId - 设计师的 user_id (UUID格式)
   * @param {Object} params - { date: 日期(YYYY-MM-DD) }
   * 注意: 路径参数虽然叫 designer_id，但实际要传 user_id
   */
  getAvailableTime(userId, params) {
    const formattedId = formatUuidNoHyphen(userId)
    return get(`${DESIGNER_PREFIX}/${formattedId}/available-time`, {
      date: params.date || ''
    })
  },

  /**
   * 预约设计师
   * @param {string} userId - 设计师的 user_id (UUID格式)
   * @param {Object} data - { serviceId, appointmentTime, remark? }
   */
  appointment(userId, data) {
    const formattedId = formatUuidNoHyphen(userId)
    return post(`${DESIGNER_PREFIX}/${formattedId}/appointment`, data)
  },

  /**
   * 关注设计师
   * @param {string} userId - 设计师的 user_id (UUID格式)
   */
  follow(userId) {
    const formattedId = formatUuidNoHyphen(userId)
    return post(`${DESIGNER_PREFIX}/${formattedId}/follow`)
  },

  /**
   * 取消关注设计师
   * @param {string} userId - 设计师的 user_id (UUID格式)
   */
  unfollow(userId) {
    const formattedId = formatUuidNoHyphen(userId)
    return post(`${DESIGNER_PREFIX}/${formattedId}/unfollow`)
  },

  /**
   * 收藏设计师
   * @param {string} userId - 设计师的 user_id (UUID格式)
   */
  favorite(userId) {
    const formattedId = formatUuidNoHyphen(userId)
    return post(`${DESIGNER_PREFIX}/${formattedId}/favorite`)
  },

  /**
   * 取消收藏设计师
   * @param {string} userId - 设计师的 user_id (UUID格式)
   */
  unfavorite(userId) {
    const formattedId = formatUuidNoHyphen(userId)
    return post(`${DESIGNER_PREFIX}/${formattedId}/unfavorite`)
  },

  /**
   * 获取推荐设计师
   * @param {Object} params - { limit?: 数量 }
   */
  getRecommend(params = {}) {
    return get(`${DESIGNER_PREFIX}/recommend`, params)
  },

  /**
   * 获取热门设计师
   * @param {Object} params - { limit?: 数量 }
   */
  getHot(params = {}) {
    return get(`${DESIGNER_PREFIX}/hot`, params)
  },

  /**
   * 获取设计师档案信息（用于 portfolio-section 展示）
   * @param {string} userId - 设计师的 user_id (UUID格式)
   * @returns {Object} { serviceInfo, serviceFeatures, environmentFacilities, questions }
   */
  getPortfolioInfo(userId) {
    const formattedId = formatUuidNoHyphen(userId)
    return get(`${DESIGNER_PREFIX}/${formattedId}/portfolio`)
  }
}
