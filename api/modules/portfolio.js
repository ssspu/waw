/**
 * 作品集模块 API
 * 包含作品列表、详情、点赞、收藏、评论等接口
 */

import { post, get, del } from '../request.js'

const PORTFOLIO_PREFIX = '/portfolio'

export default {
  /**
   * 获取作品列表
   * @param {Object} params - { page, pageSize, category?: 分类(women/men/children), designerId?, brandId?, faceType?, hairVolume?, hairQuality?, hairThickness?, keyword? }
   */
  getList(params = {}) {
    return get(`${PORTFOLIO_PREFIX}/list`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取作品详情
   * @param {string} workId - 作品ID
   */
  getDetail(workId) {
    return get(`${PORTFOLIO_PREFIX}/detail/${workId}`)
  },

  /**
   * 获取作品分类
   */
  getCategories() {
    return get(`${PORTFOLIO_PREFIX}/categories`)
  },

  /**
   * 获取筛选条件
   * 返回脸型、发量、发质、粗细等筛选选项
   */
  getFilters() {
    return get(`${PORTFOLIO_PREFIX}/filters`)
  },

  /**
   * 点赞作品
   * @param {string} workId - 作品ID
   */
  like(workId) {
    return post(`${PORTFOLIO_PREFIX}/${workId}/like`)
  },

  /**
   * 取消点赞
   * @param {string} workId - 作品ID
   */
  unlike(workId) {
    return del(`${PORTFOLIO_PREFIX}/${workId}/like`)
  },

  /**
   * 收藏作品
   * @param {string} workId - 作品ID
   */
  favorite(workId) {
    return post(`${PORTFOLIO_PREFIX}/${workId}/favorite`)
  },

  /**
   * 取消收藏
   * @param {string} workId - 作品ID
   */
  unfavorite(workId) {
    return del(`${PORTFOLIO_PREFIX}/${workId}/favorite`)
  },

  /**
   * 获取作品评论列表
   * @param {string} workId - 作品ID
   * @param {Object} params - { page, pageSize, sortBy?: 排序(newest/hottest) }
   */
  getComments(workId, params = {}) {
    return get(`${PORTFOLIO_PREFIX}/${workId}/comments`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 发表评论
   * @param {string} workId - 作品ID
   * @param {Object} data - { content, replyTo?: 回复的评论ID }
   */
  addComment(workId, data) {
    return post(`${PORTFOLIO_PREFIX}/${workId}/comments`, data)
  },

  /**
   * 删除评论
   * @param {string} workId - 作品ID
   * @param {string} commentId - 评论ID
   */
  deleteComment(workId, commentId) {
    return del(`${PORTFOLIO_PREFIX}/${workId}/comments/${commentId}`)
  },

  /**
   * 点赞评论
   * @param {string} workId - 作品ID
   * @param {string} commentId - 评论ID
   */
  likeComment(workId, commentId) {
    return post(`${PORTFOLIO_PREFIX}/${workId}/comments/${commentId}/like`)
  },

  /**
   * 分享作品
   * @param {string} workId - 作品ID
   * @param {Object} data - { channel: 分享渠道(wechat/moments/weibo/copy) }
   */
  share(workId, data) {
    return post(`${PORTFOLIO_PREFIX}/${workId}/share`, data)
  },

  /**
   * 获取推荐作品
   * @param {Object} params - { limit, excludeId?: 排除的作品ID }
   */
  getRecommend(params = {}) {
    return get(`${PORTFOLIO_PREFIX}/recommend`, {
      limit: 6,
      ...params
    })
  },

  /**
   * 获取热门作品
   * @param {Object} params - { limit, category? }
   */
  getHot(params = {}) {
    return get(`${PORTFOLIO_PREFIX}/hot`, {
      limit: 10,
      ...params
    })
  },

  /**
   * 获取设计师作品集
   * @param {string} designerId - 设计师ID
   * @param {Object} params - { page, pageSize, category? }
   */
  getByDesigner(designerId, params = {}) {
    return get(`${PORTFOLIO_PREFIX}/designer/${designerId}`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取品牌馆作品集
   * @param {string} brandId - 品牌馆ID
   * @param {Object} params - { page, pageSize, category? }
   */
  getByBrand(brandId, params = {}) {
    return get(`${PORTFOLIO_PREFIX}/brand/${brandId}`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 举报作品
   * @param {string} workId - 作品ID
   * @param {Object} data - { reason, description? }
   */
  report(workId, data) {
    return post(`${PORTFOLIO_PREFIX}/${workId}/report`, data)
  }
}
