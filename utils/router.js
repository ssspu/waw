/**
 * 路由管理系统
 * 统一管理所有页面路径,方便后续分包调整
 */

// 路由配置表
export const ROUTES = {
  // ==================== 主包 - 登录模块 ====================
  LOGIN_INDEX: '/pages/login/index',
  LOGIN_PASSWORD: '/pages/login/password',
  LOGIN_REGISTER: '/pages/login/register',
  LOGIN_RESET_PASSWORD: '/pages/login/reset-password',

  // ==================== 主包 - TabBar 页面 ====================
  INDEX: '/pages/index/index',
  MESSAGE_INDEX: '/pages/message/index',
  MINE_INDEX: '/pages/mine/index',

  // ==================== 主包 - 核心功能页面 ====================
  MAIN_INDEX: '/pages/main/index',
  MAIN_SEARCH: '/pages/main/search',
  MESSAGE_DETAIL: '/pages/message/detail',

  // ==================== 主包 - 设计师模块 ====================
  DESIGNER_DETAIL: '/pages/designer/detail',
  DESIGNER_INFO: '/pages/designer/info',

  // ==================== 主包 - 品牌模块 ====================
  BRAND_DETAIL: '/pages/brand/detail',
  BRAND_INFO: '/pages/brand/info',

  // ==================== 子包:order - 订单模块 ====================
  ORDER_INDEX: '/packageOrder/pages/order/index',
  ORDER_DETAIL: '/packageOrder/pages/order/detail',
  ORDER_DETAIL_PENDING_USE: '/packageOrder/pages/order/detail-pending-use',
  ORDER_DETAIL_PENDING_CONFIRM: '/packageOrder/pages/order/detail-pending-confirm',
  ORDER_DETAIL_PENDING_REVIEW: '/packageOrder/pages/order/detail-pending-review',
  ORDER_SERVICE_REVIEW: '/packageOrder/pages/order/service-review',
  ORDER_DETAIL_AFTER_SALE: '/packageOrder/pages/order/detail-after-sale',
  ORDER_REFUND: '/packageOrder/pages/order/refund',
  ORDER_PURCHASE: '/packageOrder/pages/order/purchase',

  // ==================== 子包:mine - 我的子功能模块 ====================
  MINE_CUSTOMER_SERVICE: '/packageMine/pages/mine/customer-service',
  MINE_ASSET: '/packageMine/pages/mine/asset',
  MINE_ASSET_DETAIL: '/packageMine/pages/mine/asset-detail',
  MINE_PROMOTION: '/packageMine/pages/mine/promotion',
  MINE_SHARE_PROMOTION: '/packageMine/pages/mine/share-promotion',
  MINE_BEANS: '/packageMine/pages/mine/beans',
  MINE_BALANCE: '/packageMine/pages/mine/balance',
  MINE_PLATFORM_REWARD: '/packageMine/pages/mine/platform-reward',
  MINE_QR_CODE_CARD: '/packageMine/pages/mine/qr-code-card',
  MINE_FAVORITES: '/packageMine/pages/mine/favorites',
  MINE_BROWSE_RECORDS: '/packageMine/pages/mine/browse-records',
  MINE_FOLLOW_LIST: '/packageMine/pages/mine/follow-list',
  MINE_APPLY_SETTLEMENT: '/packageMine/pages/mine/apply-settlement',
  MINE_DESIGNER_SETTLEMENT: '/packageMine/pages/mine/designer-settlement',
  MINE_STORE_SETTLEMENT: '/packageMine/pages/mine/store-settlement',
  MINE_VIP: '/packageMine/pages/mine/vip',

  // ==================== 子包:setting - 设置模块 ====================
  SETTING_INDEX: '/packageSetting/pages/setting/index',
  SETTING_PERSONAL_INFO: '/packageSetting/pages/setting/personal-info',
  SETTING_ACCOUNT_SECURITY: '/packageSetting/pages/setting/account-security',
  SETTING_EDIT_PHONE: '/packageSetting/pages/setting/edit-phone',
  SETTING_EDIT_PASSWORD: '/packageSetting/pages/setting/edit-password',
  SETTING_APPLY_CERTIFICATION: '/packageSetting/pages/setting/apply-certification',
  SETTING_ADDRESS_MANAGEMENT: '/packageSetting/pages/setting/address-management',
  SETTING_EDIT_ADDRESS: '/packageSetting/pages/setting/edit-address',
  SETTING_PAYMENT_SETTINGS: '/packageSetting/pages/setting/payment-settings',
  SETTING_PRIVACY_SETTINGS: '/packageSetting/pages/setting/privacy-settings',
  SETTING_FEEDBACK: '/packageSetting/pages/setting/feedback',
  SETTING_ABOUT: '/packageSetting/pages/setting/about',
  SETTING_AGREEMENT: '/packageSetting/pages/setting/agreement',
  SETTING_BANK_CARDS: '/packageSetting/pages/setting/bank-cards',
  SETTING_ADD_BANK_CARD: '/packageSetting/pages/setting/add-bank-card',

  // ==================== 子包:settlement - 入驻申请模块 ====================
  DESIGNER_SETTLEMENT_IDENTITY: '/packageSettlement/pages/designer-settlement/identity',
  DESIGNER_SETTLEMENT_PROFESSION: '/packageSettlement/pages/designer-settlement/profession',
  DESIGNER_SETTLEMENT_AGREEMENT: '/packageSettlement/pages/designer-settlement/agreement',
  DESIGNER_SETTLEMENT_SETTLEMENT: '/packageSettlement/pages/designer-settlement/settlement',
  STORE_SETTLEMENT_STORE: '/packageSettlement/pages/store-settlement/store',
  STORE_SETTLEMENT_LICENSE: '/packageSettlement/pages/store-settlement/license',
  STORE_SETTLEMENT_AGREEMENT: '/packageSettlement/pages/store-settlement/agreement',
  STORE_SETTLEMENT_SETTLEMENT: '/packageSettlement/pages/store-settlement/settlement',
  SETTLEMENT_SUCCESS: '/packageSettlement/pages/settlement-success/index',

  // ==================== 子包:others - 其他低频模块 ====================
  COUPON_INDEX: '/packageOthers/pages/coupon/index',
  PORTFOLIO_INDEX: '/packageOthers/pages/portfolio/index',
  PORTFOLIO_DETAIL: '/packageOthers/pages/portfolio/detail',
  TERRITORY_INDEX: '/packageOthers/pages/territory/index',
  TERRITORY_BRAND_STORE: '/packageOthers/pages/territory/brand-store',
}

/**
 * 路由导航方法封装
 */
export const RouterUtil = {
  /**
   * 跳转到指定页面
   * @param {string} routeName - 路由名称(ROUTES中的key)
   * @param {object} params - 路由参数
   */
  navigateTo(routeName, params = {}) {
    const url = this._buildUrl(routeName, params)
    if (url) {
      uni.navigateTo({ url })
    }
  },

  /**
   * 重定向到指定页面
   * @param {string} routeName - 路由名称
   * @param {object} params - 路由参数
   */
  redirectTo(routeName, params = {}) {
    const url = this._buildUrl(routeName, params)
    if (url) {
      uni.redirectTo({ url })
    }
  },

  /**
   * 关闭所有页面,打值到应用内的某个页面
   * @param {string} routeName - 路由名称
   * @param {object} params - 路由参数
   */
  reLaunch(routeName, params = {}) {
    const url = this._buildUrl(routeName, params)
    if (url) {
      uni.reLaunch({ url })
    }
  },

  /**
   * 切换到 tabBar 页面
   * @param {string} routeName - 路由名称
   */
  switchTab(routeName) {
    const url = ROUTES[routeName]
    if (url) {
      uni.switchTab({ url })
    } else {
      console.error(`[RouterUtil] Route not found: ${routeName}`)
    }
  },

  /**
   * 返回上一页
   * @param {number} delta - 返回的页面数
   */
  navigateBack(delta = 1) {
    uni.navigateBack({ delta })
  },

  /**
   * 构建完整URL(带参数)
   * @private
   */
  _buildUrl(routeName, params) {
    const path = ROUTES[routeName]
    if (!path) {
      console.error(`[RouterUtil] Route not found: ${routeName}`)
      return null
    }

    // 构建查询参数
    const queryString = Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&')

    return queryString ? `${path}?${queryString}` : path
  },

  /**
   * 获取路由路径
   * @param {string} routeName - 路由名称
   */
  getPath(routeName) {
    return ROUTES[routeName] || null
  }
}

// 默认导出
export default {
  ROUTES,
  RouterUtil
}
