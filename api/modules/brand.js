/**
 * 品牌馆模块 API
 * 包含品牌列表详情设计师服务预约等接口
 *
 * 注意: 后端品牌馆相关接口实际路径:
 * - 列表: /shop/list (不是 /brand/list)
 * - 详情: /brand/info/{brandId}
 * - 其他子接口后端暂未实现
 */

import { post, get } from '../request.js'

const BRAND_PREFIX = '/brand'

/**
 * 将数字ID转换为UUID格式
 * 后端要求 brand_id 为 UUID 格式
 * @param {string|number} id - 品牌ID
 * @returns {string} UUID格式的ID
 */
const formatBrandId = (id) => {
  if (!id) return id
  if (String(id).includes('-')) return id
  const numStr = String(id)
  const padded = numStr.padStart(12, '0')
  return `00000000-0000-0000-${padded.slice(0, 4)}-${padded.slice(4)}`
}

export default {
  /**
   * 获取品牌馆列表
   * @param {Object} params - { page, pageSize, keyword?, categoryId?, sortBy?, location? }
   * 注意: 后端使用 /shop/list 接口
   */
  getList(params = {}) {
    return get(`/shop/list`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 获取品牌馆详情
   * @param {string} brandId - 品牌ID
   * 注意: 后端使用 /shop/list 接口，不支持按 id 筛，要在客户端过滤
   */
  getDetail(brandId) {
    // 由于 /shop/list 接口不支持按 id 筛，获取全部数据后在客户端过滤
    return get(`/shop/list`, {
      page: 1,
      pageSize: 50
    })
  },

  /**
   * 获取品牌馆基本信息
   * @param {string} brandId - 品牌ID
   * 注意: 后端使用 /shop/list 接口
   */
  getInfo(brandId) {
    return get(`/shop/list`, {
      page: 1,
      pageSize: 1,
      id: brandId
    })
  },

  /**
   * 获取品牌馆设计师列表
   * @param {string} brandId - 品牌ID
   * @param {Object} params - { page, pageSize }
   * 注意: 后端暂未实现 /brand/designers 接口
   */
  getDesigners(brandId, params = {}) {
    return Promise.resolve({
      code: 200,
      data: {
        list: [],
        total: 0,
        page: Number(params.page) || 1,
        pageSize: Number(params.pageSize) || 10,
        hasMore: false
      },
      message: 'success'
    })
  },

  /**
   * 获取品牌馆服务列表
   * @param {string} brandId - 品牌ID
   * @param {Object} params - { page, pageSize, categoryId? }
   * 注意: 后端暂未实现 /brand/services 接口
   */
  getServices(brandId, params = {}) {
    return Promise.resolve({
      code: 200,
      data: {
        list: [],
        total: 0,
        page: Number(params.page) || 1,
        pageSize: Number(params.pageSize) || 10,
        hasMore: false
      },
      message: 'success'
    })
  },

  /**
   * 获取品牌馆预约信息
   * @param {string} brandId - 品牌ID
   * @param {Object} params - { date?: 日期 }
   * 注意: 后端暂未实现 /brand/appointments 接口
   */
  getAppointments(brandId, params = {}) {
    return Promise.resolve({
      code: 200,
      data: {
        date: params.date || '',
        slots: [],
        hasAvailable: false
      },
      message: 'success'
    })
  },

  /**
   * 获取品牌馆作品集
   * @param {string} brandId - 品牌ID
   * @param {Object} params - { page, pageSize, type?: 作品类型 }
   * 注意: 后端暂未实现 /brand/works 接口，请使用 /portfolio/brand/{id}
   */
  getWorks(brandId, params = {}) {
    return get(`/portfolio/brand/${brandId}`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 获取品牌馆评价列表
   * @param {string} brandId - 品牌ID
   * @param {Object} params - { page, pageSize, rating?: 评分筛 }
   * 注意: 后端暂未实现 /brand/reviews 接口
   */
  getReviews(brandId, params = {}) {
    return Promise.resolve({
      code: 200,
      data: {
        list: [],
        total: 0,
        page: Number(params.page) || 1,
        pageSize: Number(params.pageSize) || 10,
        hasMore: false
      },
      message: 'success'
    })
  },

  /**
   * 关注品牌馆
   * @param {string} brandId - 品牌ID
   */
  follow(brandId) {
    return post(`${BRAND_PREFIX}/follow`, {
      brand_id: brandId
    })
  },

  /**
   * 取消关注品牌馆
   * @param {string} brandId - 品牌ID
   */
  unfollow(brandId) {
    return post(`${BRAND_PREFIX}/unfollow`, {
      brand_id: brandId
    })
  },

  /**
   * 收藏品牌馆
   * @param {string} brandId - 品牌ID
   */
  favorite(brandId) {
    return post(`${BRAND_PREFIX}/favorite`, {
      brand_id: brandId
    })
  },

  /**
   * 取消收藏品牌馆
   * @param {string} brandId - 品牌ID
   */
  unfavorite(brandId) {
    return post(`${BRAND_PREFIX}/unfavorite`, {
      brand_id: brandId
    })
  },

  /**
   * 获取附近门店
   * @param {Object} params - { latitude, longitude, radius_km?, page?, page_size? }
   * POST /api/v1/store/nearby
   */
  getNearbyStores(params = {}) {
    return post('/shop/nearby', {
      latitude: Number(params.latitude) || 0,
      longitude: Number(params.longitude) || 0,
      radius_km: Number(params.radius_km) || 5,
      page: Number(params.page) || 1,
      page_size: Number(params.page_size) || 20
    })
  },

  /**
   * 获取推荐品牌馆
   * @param {Object} params - { limit?: 数量 }
   */
  getRecommend(params = {}) {
    return get(`${BRAND_PREFIX}/recommend`, params)
  }
}
