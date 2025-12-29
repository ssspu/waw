/**
 * 用户模块 API
 * 包含用户信息、资产、收藏、关注、地倝等接口
 */

import { post, get, put, del, upload } from '../request.js'

const USER_PREFIX = '/user'

export default {
  /**
   * 获取用户信息
   */
  getInfo() {
    return get(`${USER_PREFIX}/info`)
  },

  /**
   * 更新用户信息
   * @param {Object} data - { nickname?, avatar?, gender?, birthday?, signature? }
   */
  updateInfo(data) {
    return put(`${USER_PREFIX}/info`, data)
  },

  /**
   * 上传头像
   * @param {string} filePath - 图片路径
   */
  uploadAvatar(filePath) {
    return upload(`${USER_PREFIX}/avatar`, filePath)
  },

  /**
   * 修改密码
   * @param {Object} data - { oldPassword, newPassword, confirmPassword }
   */
  changePassword(data) {
    return put(`${USER_PREFIX}/password`, data)
  },

  /**
   * 绑定手机号
   * @param {Object} data - { phone, code }
   */
  bindPhone(data) {
    return post(`${USER_PREFIX}/bindPhone`, data)
  },

  /**
   * 更换手机号
   * @param {Object} data - { oldPhone, oldCode, newPhone, newCode }
   */
  changePhone(data) {
    return put(`${USER_PREFIX}/phone`, data)
  },

  // ============ 资产相关 ============

  /**
   * 获取用户资产概览
   */
  getAsset() {
    return get(`${USER_PREFIX}/asset`)
  },

  /**
   * 获取资产明细
   * @param {Object} params - { page, pageSize, type?: 类型(income/expense) }
   */
  getAssetDetail(params = {}) {
    return get(`${USER_PREFIX}/asset/detail`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 提现申请
   * @param {Object} data - { amount, bankCardId }
   */
  withdraw(data) {
    return post(`${USER_PREFIX}/withdraw`, data)
  },

  // ============ 收藏相关 ============

  /**
   * 获取收藏列表
   * @param {Object} params - { page, pageSize, type?: 类型(designer/brand/service) }
   */
  getFavorites(params = {}) {
    return get(`${USER_PREFIX}/favorites`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 批量取消收藏
   * @param {Object} data - { ids: [], type }
   */
  batchUnfavorite(data) {
    return post(`${USER_PREFIX}/favorites/batch-remove`, data)
  },

  // ============ 关注相关 ============

  /**
   * 获取关注列表
   * @param {Object} params - { page, pageSize, type?: 类型(designer/brand) }
   */
  getFollowList(params = {}) {
    return get(`${USER_PREFIX}/follows`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  // 注意: 后端暂无批量取消关注接口 /user/follows/batch-remove
  // 请使用 designer/{id}/unfollow 或 brand/{id}/unfollow 单独取消

  // ============ 浏览记录 ============

  /**
   * 获取浏览记录
   * @param {Object} params - { page, pageSize, type?: 类型 }
   */
  getBrowseRecords(params = {}) {
    return get(`${USER_PREFIX}/browse-records`, {
      page: Number(params.page) || 1,
      pageSize: Number(params.pageSize) || 10,
      ...params
    })
  },

  /**
   * 清空浏览记录
   */
  clearBrowseRecords() {
    return del(`${USER_PREFIX}/browse-records`)
  },

  // ============ 地倝管理 ============

  /**
   * 获取地倝列表
   */
  getAddressList() {
    return get(`${USER_PREFIX}/address`)
  },

  // 注意: 后端暂无单独获取地倝详情接口，请从列表中筛选

  /**
   * 新增地倝
   * @param {Object} data - { name, phone, province, city, district, detail, isDefault? }
   */
  addAddress(data) {
    return post(`${USER_PREFIX}/address`, data)
  },

  /**
   * 更新地倝
   * @param {string} addressId - 地倝ID
   * @param {Object} data - 地倝数据
   */
  updateAddress(addressId, data) {
    return put(`${USER_PREFIX}/address/${addressId}`, data)
  },

  /**
   * 删除地倝
   * @param {string} addressId - 地倝ID
   */
  deleteAddress(addressId) {
    return del(`${USER_PREFIX}/address/${addressId}`)
  },

  // 注意: 后端暂无设置默认地倝接口，请通过 updateAddress 设置 isDefault 字段

  // ============ 银行卡管理 ============

  /**
   * 获取银行卡列表
   */
  getBankCards() {
    return get(`${USER_PREFIX}/bank-cards`)
  },

  /**
   * 添加银行卡
   * @param {Object} data - { cardNumber, bankName, holderName, phone }
   */
  addBankCard(data) {
    return post(`${USER_PREFIX}/bank-cards`, data)
  },

  // 注意: 后端暂无删除银行卡接口

  // ============ 会员相关 ============

  /**
   * 获取会员信息
   */
  getVipInfo() {
    return get(`${USER_PREFIX}/vip`)
  },

  // 注意: 后端暂无会员等级列表接口

  /**
   * 开通/续费会员
   * @param {Object} data - { levelId, months, paymentMethod }
   */
  buyVip(data) {
    return post(`${USER_PREFIX}/vip/buy`, data)
  },

  // ============ 入驻申请 (请使用 settlement 模块) ============
  // 注意: 入驻申请相关接口已迁移到 /api/settlement 模块
  // 设计师入驻: settlementApi.submitDesignerIdentity()
  // 店铺入驻: settlementApi.submitStoreInfo()

  // ============ 反馈 ============

  /**
   * 提交意见反馈
   * @param {Object} data - { type, content, images?, contact? }
   */
  submitFeedback(data) {
    return post(`${USER_PREFIX}/feedback`, data)
  }

  // ============ 以下接口后端暂不支持 ============
  // 余额相关: /user/balance/*
  // 美豆相关: /user/beans/*
  // 推广佣金: /user/promotion/*
  // 平台奖励: /user/platform-reward/*
  // 二维码名片: /user/qr-code/*
  // 账号注途: /user/deactivation/*
  // 设置相关: /user/settings/*
  // 缓存相关: /user/cache/*
}
