/**
 * 通用模块 API
 * 包含公共配置、首页数据、搜索、地区等接口
 */

import { post, get, upload } from '../request.js'

const COMMON_PREFIX = '/common'

export default {
  /**
   * 获取应用配置
   * 包含版本信息、功能开关、协议链接等
   */
  getConfig() {
    return get(`${COMMON_PREFIX}/config`, {}, { showLoading: false })
  },

  /**
   * 获取首页数据
   * 包含 banner、推荐设计师、热门品牌等
   */
  getHomeData() {
    return get(`${COMMON_PREFIX}/home`)
  },

  /**
   * 获取 Banner 列表
   * @param {Object} params - { position?: 位置(home/brand/designer) }
   */
  getBanners(params = {}) {
    return get(`${COMMON_PREFIX}/banners`, params)
  },

  /**
   * 获取分类列表
   * @param {Object} params - { type?: 类型(service/designer) }
   */
  getCategories(params = {}) {
    return get(`${COMMON_PREFIX}/categories`, params)
  },

  /**
   * 搜索
   * @param {Object} params - { keyword, type?: 类型(all/designer/brand/service), page, pageSize }
   */
  search(params) {
    return get(`${COMMON_PREFIX}/search`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取搜索热词
   */
  getHotKeywords() {
    return get(`${COMMON_PREFIX}/hot-keywords`, {}, { showLoading: false })
  },

  /**
   * 获取搜索历史
   */
  getSearchHistory() {
    return get(`${COMMON_PREFIX}/search-history`, {}, { showLoading: false })
  },

  /**
   * 清空搜索历史
   */
  clearSearchHistory() {
    return post(`${COMMON_PREFIX}/search-history/clear`)
  },

  /**
   * 获取地区列表
   * @param {Object} params - { parentId?: 父级ID，不传获取省份 }
   */
  getRegions(params = {}) {
    return get(`${COMMON_PREFIX}/regions`, params)
  },

  /**
   * 获取热门城市
   */
  getHotCities() {
    return get(`${COMMON_PREFIX}/hot-cities`)
  },

  /**
   * 上传文件
   * @param {string} filePath - 文件路径
   * @param {Object} options - { type?: 类型(image/video), category?: 分类 }
   */
  uploadFile(filePath, options = {}) {
    return upload(`${COMMON_PREFIX}/upload`, filePath, options)
  },

  /**
   * 批量上传图片
   * @param {Array} filePaths - 图片路径数组
   * @param {Object} options - 上传选项
   */
  async uploadImages(filePaths, options = {}) {
    const results = []
    for (const filePath of filePaths) {
      const res = await upload(`${COMMON_PREFIX}/upload`, filePath, {
        type: 'image',
        ...options
      })
      results.push(res)
    }
    return results
  },

  /**
   * 获取协议内容
   * @param {string} type - 协议类型(user/privacy/service)
   */
  getAgreement(type) {
    return get(`${COMMON_PREFIX}/agreement/${type}`)
  },

  /**
   * 获取关于我们
   */
  getAbout() {
    return get(`${COMMON_PREFIX}/about`)
  },

  /**
   * 检查更新
   * @param {Object} params - { platform: 平台(ios/android), version: 当前版本 }
   */
  checkUpdate(params) {
    return get(`${COMMON_PREFIX}/check-update`, params)
  },

  /**
   * 获取客服信息
   */
  getCustomerService() {
    return get(`${COMMON_PREFIX}/customer-service`)
  },

  /**
   * 获取银行列表
   */
  getBanks() {
    return get(`${COMMON_PREFIX}/banks`)
  },

  /**
   * 获取支付方式列表
   */
  getPaymentMethods() {
    return get(`${COMMON_PREFIX}/payment-methods`)
  },

  /**
   * 获取排行榜数据
   * @param {Object} params - { type?: 排行榜类型(rookie/pro/service) }
   */
  getRanking(params = {}) {
    return get(`${COMMON_PREFIX}/ranking`, params)
  },

  /**
   * 获取所有排行榜数据（一次性返回三个榜单）
   */
  getAllRanking() {
    return get(`${COMMON_PREFIX}/ranking/all`)
  }
}
