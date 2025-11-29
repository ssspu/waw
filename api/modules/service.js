/**
 * 服务模块 API
 * 包含服务项目列表、详情等接口
 */

import { post, get } from '../request.js'

const SERVICE_PREFIX = '/service'

export default {
  /**
   * 获取服务列表
   * @param {Object} params - { page, pageSize, categoryId?, keyword?, sortBy? }
   */
  getList(params = {}) {
    return get(`${SERVICE_PREFIX}/list`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取服务详情
   * @param {string} serviceId - 服务ID
   */
  getDetail(serviceId) {
    return get(`${SERVICE_PREFIX}/detail/${serviceId}`)
  },

  /**
   * 获取服务分类
   */
  getCategories() {
    return get(`${SERVICE_PREFIX}/categories`)
  },

  /**
   * 获取推荐服务
   * @param {Object} params - { limit?: 数量 }
   */
  getRecommend(params = {}) {
    return get(`${SERVICE_PREFIX}/recommend`, params)
  },

  /**
   * 获取热门服务
   * @param {Object} params - { limit?: 数量 }
   */
  getHot(params = {}) {
    return get(`${SERVICE_PREFIX}/hot`, params)
  },

  /**
   * 收藏服务
   * @param {string} serviceId - 服务ID
   */
  favorite(serviceId) {
    return post(`${SERVICE_PREFIX}/${serviceId}/favorite`)
  },

  /**
   * 取消收藏服务
   * @param {string} serviceId - 服务ID
   */
  unfavorite(serviceId) {
    return post(`${SERVICE_PREFIX}/${serviceId}/unfavorite`)
  },

  /**
   * 获取服务评价
   * @param {string} serviceId - 服务ID
   * @param {Object} params - { page, pageSize }
   */
  getReviews(serviceId, params = {}) {
    return get(`${SERVICE_PREFIX}/${serviceId}/reviews`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  }
}
