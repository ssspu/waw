/**
 * 用户模块 API
 * 包含用户信息、资产、收藏、关注、地址等接口
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
      page: 1,
      pageSize: 10,
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
      page: 1,
      pageSize: 10,
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
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 批量取消关注
   * @param {Object} data - { ids: [], type }
   */
  batchUnfollow(data) {
    return post(`${USER_PREFIX}/follows/batch-remove`, data)
  },

  // ============ 浏览记录 ============

  /**
   * 获取浏览记录
   * @param {Object} params - { page, pageSize, type?: 类型 }
   */
  getBrowseRecords(params = {}) {
    return get(`${USER_PREFIX}/browse-records`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 清空浏览记录
   */
  clearBrowseRecords() {
    return del(`${USER_PREFIX}/browse-records`)
  },

  // ============ 地址管理 ============

  /**
   * 获取地址列表
   */
  getAddressList() {
    return get(`${USER_PREFIX}/address`)
  },

  /**
   * 获取地址详情
   * @param {string} addressId - 地址ID
   */
  getAddressDetail(addressId) {
    return get(`${USER_PREFIX}/address/${addressId}`)
  },

  /**
   * 新增地址
   * @param {Object} data - { name, phone, province, city, district, detail, isDefault? }
   */
  addAddress(data) {
    return post(`${USER_PREFIX}/address`, data)
  },

  /**
   * 更新地址
   * @param {string} addressId - 地址ID
   * @param {Object} data - 地址数据
   */
  updateAddress(addressId, data) {
    return put(`${USER_PREFIX}/address/${addressId}`, data)
  },

  /**
   * 删除地址
   * @param {string} addressId - 地址ID
   */
  deleteAddress(addressId) {
    return del(`${USER_PREFIX}/address/${addressId}`)
  },

  /**
   * 设置默认地址
   * @param {string} addressId - 地址ID
   */
  setDefaultAddress(addressId) {
    return put(`${USER_PREFIX}/address/${addressId}/default`)
  },

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

  /**
   * 删除银行卡
   * @param {string} cardId - 银行卡ID
   */
  deleteBankCard(cardId) {
    return del(`${USER_PREFIX}/bank-cards/${cardId}`)
  },

  // ============ 会员相关 ============

  /**
   * 获取会员信息
   */
  getVipInfo() {
    return get(`${USER_PREFIX}/vip`)
  },

  /**
   * 获取会员等级列表
   */
  getVipLevels() {
    return get(`${USER_PREFIX}/vip/levels`)
  },

  /**
   * 开通/续费会员
   * @param {Object} data - { levelId, months, paymentMethod }
   */
  buyVip(data) {
    return post(`${USER_PREFIX}/vip/buy`, data)
  },

  // ============ 入驻申请 ============

  /**
   * 提交设计师入驻申请
   * @param {Object} data - 入驻信息
   */
  applyDesigner(data) {
    return post(`${USER_PREFIX}/apply/designer`, data)
  },

  /**
   * 提交店铺入驻申请
   * @param {Object} data - 入驻信息
   */
  applyStore(data) {
    return post(`${USER_PREFIX}/apply/store`, data)
  },

  /**
   * 获取入驻申请状态
   * @param {string} type - 类型(designer/store)
   */
  getApplyStatus(type) {
    return get(`${USER_PREFIX}/apply/${type}/status`)
  },

  // ============ 隐私设置 ============

  /**
   * 获取隐私设置
   */
  getPrivacySettings() {
    return get(`${USER_PREFIX}/privacy`)
  },

  /**
   * 更新隐私设置
   * @param {Object} data - { showOnlineStatus?, showBrowseHistory?, allowRecommend? }
   */
  updatePrivacySettings(data) {
    return put(`${USER_PREFIX}/privacy`, data)
  },

  // ============ 反馈 ============

  /**
   * 提交意见反馈
   * @param {Object} data - { type, content, images?, contact? }
   */
  submitFeedback(data) {
    return post(`${USER_PREFIX}/feedback`, data)
  },

  // ============ 余额相关 ============

  /**
   * 获取余额详情
   */
  getBalance() {
    return get(`${USER_PREFIX}/balance`)
  },

  /**
   * 获取余额变动记录
   * @param {Object} params - { page, pageSize, type?: 类型(income/expense), month?: 月份筛选 }
   */
  getBalanceRecords(params = {}) {
    return get(`${USER_PREFIX}/balance/records`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 余额充值
   * @param {Object} data - { amount, paymentMethod }
   */
  rechargeBalance(data) {
    return post(`${USER_PREFIX}/balance/recharge`, data)
  },

  // ============ 美豆相关 ============

  /**
   * 获取美豆余额
   */
  getBeans() {
    return get(`${USER_PREFIX}/beans`)
  },

  /**
   * 获取美豆变动记录
   * @param {Object} params - { page, pageSize, type?: 类型(earn/spend), month?: 月份筛选 }
   */
  getBeansRecords(params = {}) {
    return get(`${USER_PREFIX}/beans/records`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 美豆兑换
   * @param {Object} data - { type: 兑换类型(coupon/service), targetId: 目标ID, amount: 美豆数量 }
   */
  exchangeBeans(data) {
    return post(`${USER_PREFIX}/beans/exchange`, data)
  },

  /**
   * 签到获取美豆
   */
  signIn() {
    return post(`${USER_PREFIX}/beans/sign`)
  },

  /**
   * 获取签到状态
   */
  getSignStatus() {
    return get(`${USER_PREFIX}/beans/sign-status`)
  },

  /**
   * 获取签到日历
   * @param {Object} params - { year, month }
   */
  getSignCalendar(params = {}) {
    return get(`${USER_PREFIX}/beans/sign-calendar`, params)
  },

  // ============ 推广佣金相关 ============

  /**
   * 获取推广佣金概览
   */
  getPromotion() {
    return get(`${USER_PREFIX}/promotion`)
  },

  /**
   * 获取推广佣金记录
   * @param {Object} params - { page, pageSize, type?: 类型(invite/order), month?: 月份筛选 }
   */
  getPromotionRecords(params = {}) {
    return get(`${USER_PREFIX}/promotion/records`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 获取邀请码
   */
  getInviteCode() {
    return get(`${USER_PREFIX}/promotion/invite-code`)
  },

  /**
   * 获取邀请记录列表
   * @param {Object} params - { page, pageSize }
   */
  getInviteList(params = {}) {
    return get(`${USER_PREFIX}/promotion/invites`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 推广佣金提现
   * @param {Object} data - { amount, bankCardId }
   */
  withdrawPromotion(data) {
    return post(`${USER_PREFIX}/promotion/withdraw`, data)
  },

  /**
   * 获取推广规则
   */
  getPromotionRules() {
    return get(`${USER_PREFIX}/promotion/rules`)
  },

  // ============ 平台奖励相关 ============

  /**
   * 获取平台奖励概览
   */
  getPlatformReward() {
    return get(`${USER_PREFIX}/platform-reward`)
  },

  /**
   * 获取平台奖励记录
   * @param {Object} params - { page, pageSize, type?: 奖励类型, month?: 月份筛选 }
   */
  getPlatformRewardRecords(params = {}) {
    return get(`${USER_PREFIX}/platform-reward/records`, {
      page: 1,
      pageSize: 10,
      ...params
    })
  },

  /**
   * 领取平台奖励
   * @param {string} rewardId - 奖励ID
   */
  claimPlatformReward(rewardId) {
    return post(`${USER_PREFIX}/platform-reward/claim/${rewardId}`)
  },

  // ============ 二维码名片相关 ============

  /**
   * 获取用户二维码名片
   */
  getQrCode() {
    return get(`${USER_PREFIX}/qr-code`)
  },

  /**
   * 生成二维码
   * @param {Object} data - { type?: 类型(personal/invite), style?: 样式 }
   */
  generateQrCode(data = {}) {
    return post(`${USER_PREFIX}/qr-code/generate`, data)
  },

  /**
   * 保存二维码名片
   * @param {Object} data - { qrCodeUrl }
   */
  saveQrCode(data) {
    return post(`${USER_PREFIX}/qr-code/save`, data)
  },

  // ============ 账号注销 ============

  /**
   * 申请注销账号
   * @param {Object} data - { reason?, code: 验证码 }
   */
  applyDeactivation(data) {
    return post(`${USER_PREFIX}/deactivation/apply`, data)
  },

  /**
   * 取消注销申请
   */
  cancelDeactivation() {
    return post(`${USER_PREFIX}/deactivation/cancel`)
  },

  /**
   * 获取注销申请状态
   */
  getDeactivationStatus() {
    return get(`${USER_PREFIX}/deactivation/status`)
  }
}
