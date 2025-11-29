/**
 * 品牌馆模块 API
 * 包含品牌列表、详情、设计师、服务、预约等接口
 */

import { post, get } from '../request.js'

const BRAND_PREFIX = '/brand'

export default {
  /**
   * 获取品牌馆列表
   * @param {Object} params - { page, pageSize, keyword?, categoryId?, sortBy?, location? }
   */
  getList(params = {}) {
    return get(`${BRAND_PREFIX}/list`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取品牌馆详情
   * @param {string} brandId - 品牌ID
   */
  getDetail(brandId) {
    return get(`${BRAND_PREFIX}/detail/${brandId}`)
  },

  /**
   * 获取品牌馆基本信息
   * @param {string} brandId - 品牌ID
   */
  getInfo(brandId) {
    return get(`${BRAND_PREFIX}/info/${brandId}`)
  },

  /**
   * 获取品牌馆设计师列表
   * @param {string} brandId - 品牌ID
   * @param {Object} params - { page, pageSize }
   */
  getDesigners(brandId, params = {}) {
    return get(`${BRAND_PREFIX}/${brandId}/designers`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取品牌馆服务列表
   * @param {string} brandId - 品牌ID
   * @param {Object} params - { page, pageSize, categoryId? }
   */
  getServices(brandId, params = {}) {
    return get(`${BRAND_PREFIX}/${brandId}/services`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取品牌馆预约信息
   * @param {string} brandId - 品牌ID
   * @param {Object} params - { date?: 日期 }
   */
  getAppointments(brandId, params = {}) {
    return get(`${BRAND_PREFIX}/${brandId}/appointments`, params)
  },

  /**
   * 获取品牌馆作品集
   * @param {string} brandId - 品牌ID
   * @param {Object} params - { page, pageSize, type?: 作品类型 }
   */
  getWorks(brandId, params = {}) {
    return get(`${BRAND_PREFIX}/${brandId}/works`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取品牌馆评价列表
   * @param {string} brandId - 品牌ID
   * @param {Object} params - { page, pageSize, rating?: 评分筛选 }
   */
  getReviews(brandId, params = {}) {
    return get(`${BRAND_PREFIX}/${brandId}/reviews`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 关注品牌馆
   * @param {string} brandId - 品牌ID
   */
  follow(brandId) {
    return post(`${BRAND_PREFIX}/${brandId}/follow`)
  },

  /**
   * 取消关注品牌馆
   * @param {string} brandId - 品牌ID
   */
  unfollow(brandId) {
    return post(`${BRAND_PREFIX}/${brandId}/unfollow`)
  },

  /**
   * 收藏品牌馆
   * @param {string} brandId - 品牌ID
   */
  favorite(brandId) {
    return post(`${BRAND_PREFIX}/${brandId}/favorite`)
  },

  /**
   * 取消收藏品牌馆
   * @param {string} brandId - 品牌ID
   */
  unfavorite(brandId) {
    return post(`${BRAND_PREFIX}/${brandId}/unfavorite`)
  },

  /**
   * 获取附近品牌馆
   * @param {Object} params - { latitude, longitude, radius?: 范围(km) }
   */
  getNearby(params) {
    return get(`${BRAND_PREFIX}/nearby`, params)
  },

  /**
   * 获取推荐品牌馆
   * @param {Object} params - { limit?: 数量 }
   */
  getRecommend(params = {}) {
    return get(`${BRAND_PREFIX}/recommend`, params)
  }
}
