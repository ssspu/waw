/**
 * 设计师模块 API
 * 包含设计师列表、详情、作品、预约等接口
 */

import { post, get } from '../request.js'

const DESIGNER_PREFIX = '/designer'

export default {
  /**
   * 获取设计师列表
   * @param {Object} params - { page, pageSize, keyword?, categoryId?, sortBy?, level? }
   */
  getList(params = {}) {
    return get(`${DESIGNER_PREFIX}/list`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取设计师详情
   * @param {string} designerId - 设计师ID
   */
  getDetail(designerId) {
    return get(`${DESIGNER_PREFIX}/detail/${designerId}`)
  },

  /**
   * 获取设计师基本信息
   * @param {string} designerId - 设计师ID
   */
  getInfo(designerId) {
    return get(`${DESIGNER_PREFIX}/info/${designerId}`)
  },

  /**
   * 获取设计师服务项目
   * @param {string} designerId - 设计师ID
   * @param {Object} params - { page, pageSize }
   */
  getServices(designerId, params = {}) {
    return get(`${DESIGNER_PREFIX}/${designerId}/services`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取设计师作品集
   * @param {string} designerId - 设计师ID
   * @param {Object} params - { page, pageSize, type?: 作品类型 }
   */
  getWorks(designerId, params = {}) {
    return get(`${DESIGNER_PREFIX}/${designerId}/works`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取设计师评价列表
   * @param {string} designerId - 设计师ID
   * @param {Object} params - { page, pageSize, rating?: 评分筛选 }
   */
  getReviews(designerId, params = {}) {
    return get(`${DESIGNER_PREFIX}/${designerId}/reviews`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取设计师可预约时间
   * @param {string} designerId - 设计师ID
   * @param {Object} params - { date: 日期(YYYY-MM-DD) }
   */
  getAvailableTime(designerId, params) {
    return get(`${DESIGNER_PREFIX}/${designerId}/available-time`, params)
  },

  /**
   * 预约设计师
   * @param {string} designerId - 设计师ID
   * @param {Object} data - { serviceId, appointmentTime, remark? }
   */
  appointment(designerId, data) {
    return post(`${DESIGNER_PREFIX}/${designerId}/appointment`, data)
  },

  /**
   * 关注设计师
   * @param {string} designerId - 设计师ID
   */
  follow(designerId) {
    return post(`${DESIGNER_PREFIX}/${designerId}/follow`)
  },

  /**
   * 取消关注设计师
   * @param {string} designerId - 设计师ID
   */
  unfollow(designerId) {
    return post(`${DESIGNER_PREFIX}/${designerId}/unfollow`)
  },

  /**
   * 收藏设计师
   * @param {string} designerId - 设计师ID
   */
  favorite(designerId) {
    return post(`${DESIGNER_PREFIX}/${designerId}/favorite`)
  },

  /**
   * 取消收藏设计师
   * @param {string} designerId - 设计师ID
   */
  unfavorite(designerId) {
    return post(`${DESIGNER_PREFIX}/${designerId}/unfavorite`)
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
  }
}
