/**
 * 私人领地模块 API
 * 包含用户的专属设计师、品牌馆、服务记录等接口
 */

import { post, get } from '../request.js'

const TERRITORY_PREFIX = '/territory'

export default {
  // ============ 设计师领地 ============

  /**
   * 获取我的设计师列表（私人领地）
   * @param {Object} params - { page, pageSize, category?: 分类(hairstylist/beautician/makeup/nail/body) }
   */
  getMyDesigners(params = {}) {
    return get(`${TERRITORY_PREFIX}/designers`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 获取设计师服务记录
   * @param {string} designerId - 设计师ID
   * @param {Object} params - { page, pageSize }
   */
  getDesignerServiceRecords(designerId, params = {}) {
    return get(`${TERRITORY_PREFIX}/designers/${designerId}/records`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 移除私人领地设计师
   * @param {string} designerId - 设计师ID
   */
  removeDesigner(designerId) {
    return post(`${TERRITORY_PREFIX}/designers/${designerId}/remove`)
  },

  // ============ 品牌馆领地 ============

  /**
   * 获取我的品牌馆列表（私人领地）
   * @param {Object} params - { page, pageSize, category?: 分类(hair/beauty/makeup/nail/body) }
   */
  getMyBrands(params = {}) {
    return get(`${TERRITORY_PREFIX}/brands`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 获取品牌馆服务记录
   * @param {string} brandId - 品牌馆ID
   * @param {Object} params - { page, pageSize }
   */
  getBrandServiceRecords(brandId, params = {}) {
    return get(`${TERRITORY_PREFIX}/brands/${brandId}/records`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 移除私人领地品牌馆
   * @param {string} brandId - 品牌馆ID
   */
  removeBrand(brandId) {
    return post(`${TERRITORY_PREFIX}/brands/${brandId}/remove`)
  },

  // ============ 服务记录 ============

  /**
   * 获取服务记录列表
   * @param {Object} params - { page, pageSize, type?: 类型(designer/brand), category?: 服务分类 }
   */
  getServiceRecords(params = {}) {
    return get(`${TERRITORY_PREFIX}/records`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 获取服务记录详情
   * @param {string} recordId - 记录ID
   */
  getRecordDetail(recordId) {
    return get(`${TERRITORY_PREFIX}/records/${recordId}`)
  },

  // ============ 再次预约 ============

  /**
   * 基于服务记录再次预约
   * @param {string} recordId - 服务记录ID
   * @param {Object} data - { appointmentTime: 预约时间, remark?: 备注 }
   */
  reorder(recordId, data = {}) {
    return post(`${TERRITORY_PREFIX}/reorder/${recordId}`, {
      appointment_time: data.appointmentTime || data.appointment_time,
      remark: data.remark
    })
  },

  // ============ 推广分享 ============

  /**
   * 获取设计师推广信息
   * @param {string} designerId - 设计师ID
   */
  getDesignerShareInfo(designerId) {
    return get(`${TERRITORY_PREFIX}/share/designer/${designerId}`)
  },

  /**
   * 获取品牌馆推广信息
   * @param {string} brandId - 品牌馆ID
   */
  getBrandShareInfo(brandId) {
    return get(`${TERRITORY_PREFIX}/share/brand/${brandId}`)
  },

  /**
   * 记录分享行为
   * @param {Object} data - { type: 类型(designer/brand), targetId: 目标ID, channel: 分享渠道 }
   */
  recordShare(data) {
    return post(`${TERRITORY_PREFIX}/share/record`, data)
  },

  // ============ 统计数据 ============

  /**
   * 获取私人领地统计数据
   * 返回 { designerCount, brandCount, serviceCount, totalSpent }
   */
  getStatistics() {
    return get(`${TERRITORY_PREFIX}/statistics`)
  }
}
