/**
 * 入驻模块 API
 */

import { post, get, put, upload } from '../request.js'

const SETTLEMENT_PREFIX = '/settlement'

export default {
  // ============ 设计师入驻 ============

  /**
   * 获取设计师入驻进度
   */
  getDesignerProgress() {
    return get(`${SETTLEMENT_PREFIX}/designer/progress`)
  },

  /**
   * 提交设计师身份认证
   * @param {Object} data - { realName, idCardNo, idCardFront, idCardBack }
   */
  submitDesignerIdentity(data) {
    return post(`${SETTLEMENT_PREFIX}/designer/identity`, data)
  },

  /**
   * 提交设计师职业认证
   * @param {Object} data - { profession, certificates: [], experience, specialties: [], works: [] }
   */
  submitDesignerProfession(data) {
    return post(`${SETTLEMENT_PREFIX}/designer/profession`, data)
  },

  /**
   * 获取设计师合作协议
   */
  getDesignerAgreement() {
    return get(`${SETTLEMENT_PREFIX}/designer/agreement`)
  },

  /**
   * 同意设计师合作协议
   */
  agreeDesignerAgreement() {
    return post(`${SETTLEMENT_PREFIX}/designer/agreement/agree`)
  },

  /**
   * 提交设计师结算信息
   * @param {Object} data - { settlementType, accountName, bankName, branchName, accountNumber }
   */
  submitDesignerSettlement(data) {
    return post(`${SETTLEMENT_PREFIX}/designer/settlement`, data)
  },

  /**
   * 提交设计师入驻申请（终提交）
   */
  submitDesignerApplication() {
    return post(`${SETTLEMENT_PREFIX}/designer/submit`)
  },

  /**
   * 获取设计师入驻申请状
   * 返回 { status: pending/reviewing/approved/rejected, rejectReason? }
   */
  getDesignerStatus() {
    return get(`${SETTLEMENT_PREFIX}/designer/status`)
  },

  // ============ 门店入驻 ============

  /**
   * 获取门店入驻进度
   */
  getStoreProgress() {
    return get(`${SETTLEMENT_PREFIX}/store/progress`)
  },

  /**
   * 提交门店认证
   * @param {Object} data - { storeName, storeType, address, phone, logo, photos: [], introduction }
   */
  submitStoreInfo(data) {
    return post(`${SETTLEMENT_PREFIX}/store/info`, data)
  },

  /**
   * 提交门店执照认证
   * @param {Object} data - { licenseName, licenseNo, licensePhoto, legalPerson, legalIdCard }
   */
  submitStoreLicense(data) {
    return post(`${SETTLEMENT_PREFIX}/store/license`, data)
  },

  /**
   * 获取门店合作协议
   */
  getStoreAgreement() {
    return get(`${SETTLEMENT_PREFIX}/store/agreement`)
  },

  /**
   * 同意门店合作协议
   */
  agreeStoreAgreement() {
    return post(`${SETTLEMENT_PREFIX}/store/agreement/agree`)
  },

  /**
   * 提交门店结算信息
   * @param {Object} data - { settlementType, accountType, accountName, bankName, branchName, bankCity, accountNumber }
   */
  submitStoreSettlement(data) {
    return post(`${SETTLEMENT_PREFIX}/store/settlement`, data)
  },

  /**
   * 提交门店入驻申请（终提交）
   */
  submitStoreApplication() {
    return post(`${SETTLEMENT_PREFIX}/store/submit`)
  },

  /**
   * 获取门店入驻申请状
   * 返回 { status: pending/reviewing/approved/rejected, rejectReason? }
   */
  getStoreStatus() {
    return get(`${SETTLEMENT_PREFIX}/store/status`)
  },

  // ============ 用接口 ============

  /**
   * 上传入驻相关图片
   * @param {string} filePath - 图片路径
   * @param {Object} options - { type: 类型(idCard/license/certificate/work/logo/photo) }
   */
  uploadImage(filePath, options = {}) {
    return upload(`${SETTLEMENT_PREFIX}/upload`, filePath, options)
  },

  /**
   * 获取银行列表
   */
  getBankList() {
    return get(`${SETTLEMENT_PREFIX}/banks`)
  },

  /**
   * 获取银行支行列表
   * @param {Object} params - { bankCode, city }
   */
  getBranchList(params) {
    return get(`${SETTLEMENT_PREFIX}/branches`, params)
  },

  /**
   * 获取职业类型列表
   */
  getProfessionList() {
    return get(`${SETTLEMENT_PREFIX}/professions`)
  },

  /**
   * 获取门店类型列表
   */
  getStoreTypeList() {
    return get(`${SETTLEMENT_PREFIX}/store-types`)
  },

  /**
   * 撤入驻申请
   * @param {string} type - 类型(designer/store)
   */
  cancelApplication(type) {
    return post(`${SETTLEMENT_PREFIX}/${type}/cancel`)
  },

  /**
   * 重新提交入驻申请（被拒绝后）
   * @param {string} type - 类型(designer/store)
   */
  resubmitApplication(type) {
    return post(`${SETTLEMENT_PREFIX}/${type}/resubmit`)
  }
}
