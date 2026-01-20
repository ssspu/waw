/**
 * WAW Manager 商家端 API 配置文件
 * 与用户端共用同一套后端接口，确保数据互通
 */

// 环境配置
const ENV = {
  development: {
    baseUrl: '/backend',  // 开发环境使用代理，避免CORS
    timeout: 30000,
    debug: true,
    useMock: false,
    skipAuth: true,  // 开发环境跳过Token验证
    // 开发环境测试数据（可选）
    devToken: '',  // 如果需要，可以在这里填入测试 token
    devShopId: ''  // 如果需要，可以在这里填入测试 shop_id
  },
  staging: {
    baseUrl: 'https://bioflex.cn/api',
    timeout: 30000,
    debug: true,
    useMock: false,
    skipAuth: false
  },
  production: {
    baseUrl: 'https://bioflex.cn/api',
    timeout: 15000,
    debug: false,
    useMock: false,
    skipAuth: false
  }
}

// 当前环境
let currentEnv = 'development'
// #ifdef H5
currentEnv = process.env.NODE_ENV || 'development'
// #endif

// 导出当前环境配置
export const config = ENV[currentEnv] || ENV.development

// HTTP 状态码
export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}

// 业务状态码（与用户端保持一致）
export const BUSINESS_CODE = {
  SUCCESS: 200,
  TOKEN_EXPIRED: 10001,
  TOKEN_INVALID: 10002,
  PARAM_ERROR: 20001,
  DATA_NOT_FOUND: 20002,
  DESIGNER_NO_SHOP: 50204,
  SHOP_NOT_VERIFIED: 50301,
  SERVICE_OFFLINE: 50401,
  ORDER_STATUS_ERROR: 50501,
  PERMISSION_DENIED: 40301
}

// 不需要 token 的接口白名单
export const WHITE_LIST = [
  '/auth/login',
  '/auth/register',
  '/auth/send-code',
  '/auth/reset-password',
  '/auth/wx-login',
  '/auth/wx-phone-login',
  '/auth/merchant/login/code',
  '/auth/merchant/login/password',
  '/common/config',
  '/common/banner',
  '/common/regions',
  '/common/banks',
  '/manager/auth/login',
  '/manager/auth/wx-login',
  '/manager/auth/send-code'
]

// 请求头配置
export const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

// ============ 商家端特有枚举 ============

// 订单状态枚举
export const ORDER_STATUS = {
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  PENDING_CONFIRM: 'PENDING_CONFIRM',
  CONFIRMED: 'CONFIRMED',
  PENDING_USE: 'PENDING_USE',
  IN_SERVICE: 'IN_SERVICE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REFUNDING: 'REFUNDING',
  REFUNDED: 'REFUNDED'
}

// 订单状态映射
export const ORDER_STATUS_MAP = {
  [ORDER_STATUS.PENDING_PAYMENT]: { label: '待付款', color: '#ff9800' },
  [ORDER_STATUS.PENDING_CONFIRM]: { label: '待接单', color: '#2196f3' },
  [ORDER_STATUS.CONFIRMED]: { label: '已确认', color: '#4caf50' },
  [ORDER_STATUS.PENDING_USE]: { label: '待服务', color: '#9c27b0' },
  [ORDER_STATUS.IN_SERVICE]: { label: '服务中', color: '#00bcd4' },
  [ORDER_STATUS.COMPLETED]: { label: '已完成', color: '#8bc34a' },
  [ORDER_STATUS.CANCELLED]: { label: '已取消', color: '#9e9e9e' },
  [ORDER_STATUS.REFUNDING]: { label: '退款中', color: '#f44336' },
  [ORDER_STATUS.REFUNDED]: { label: '已退款', color: '#607d8b' }
}

// 店铺状态枚举
export const SHOP_STATUS = {
  PENDING: 'pending',      // 待审核
  OPEN: 'open',           // 营业中
  CLOSED: 'closed',       // 休息中
  SUSPENDED: 'suspended'  // 已停业
}

// 店铺状态映射
export const SHOP_STATUS_MAP = {
  pending: { label: '待审核', color: '#ff9800' },
  open: { label: '营业中', color: '#4caf50' },
  closed: { label: '休息中', color: '#9e9e9e' },
  suspended: { label: '已停业', color: '#f44336' }
}

// 商家认证状态枚举
export const MERCHANT_AUTH_STATUS = {
  NOT_SUBMITTED: 'not_submitted',  // 未提交
  PENDING: 'pending',              // 待审核
  APPROVED: 'approved',            // 已通过
  REJECTED: 'rejected'             // 已拒绝
}

// 商家认证状态映射
export const MERCHANT_AUTH_STATUS_MAP = {
  not_submitted: { label: '未提交', color: '#909399' },
  pending: { label: '待审核', color: '#ff9800' },
  approved: { label: '已通过', color: '#4caf50' },
  rejected: { label: '已拒绝', color: '#f44336' }
}

// 店铺类型枚举
export const BRAND_TYPE = {
  STORE: 'store',        // 门店商家
  PERSONAL: 'personal'   // 个人设计师
}

// 店铺类型映射
export const BRAND_TYPE_MAP = {
  store: { label: '门店商家', icon: 'shop' },
  personal: { label: '个人设计师', icon: 'user' }
}

// 营业状态枚举
export const BUSINESS_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  BUSY: 'busy'
}

// 服务状态枚举
export const SERVICE_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  DRAFT: 'draft'
}

// 员工状态枚举
export const STAFF_STATUS = {
  ACTIVE: 'active',
  DISABLED: 'disabled',
  PENDING: 'pending'
}

// 技师状态枚举
export const TECHNICIAN_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  RESIGNED: 'resigned'
}

// 技师类型枚举
export const TECHNICIAN_TYPES = {
  HAIRSTYLIST: 'hairstylist',
  BEAUTICIAN: 'beautician',
  MAKEUP: 'makeup',
  NAIL: 'nail',
  BODY: 'body'
}

// 技师职位枚举
export const TECHNICIAN_POSITIONS = {
  MANAGER: 'manager',
  DIRECTOR: 'director',
  DESIGNER: 'designer',
  STYLIST: 'stylist',
  ASSISTANT: 'assistant'
}

// 消息类型枚举
export const MESSAGE_TYPES = {
  SYSTEM: 'system',
  ORDER: 'order',
  ACTIVITY: 'activity',
  COUPON: 'coupon',
  REVIEW: 'review',
  FINANCE: 'finance',
  MARKETING: 'marketing'
}

// 优惠券状态枚举
export const COUPON_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  DEPLETED: 'depleted'
}

// 提现状态枚举
export const WITHDRAW_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed'
}

// 作品状态枚举
export const PORTFOLIO_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  OFFLINE: 'offline',
  PENDING: 'pending'
}

export default {
  config,
  HTTP_STATUS,
  BUSINESS_CODE,
  WHITE_LIST,
  HEADERS,
  ORDER_STATUS,
  ORDER_STATUS_MAP,
  SHOP_STATUS,
  SHOP_STATUS_MAP,
  MERCHANT_AUTH_STATUS,
  MERCHANT_AUTH_STATUS_MAP,
  BRAND_TYPE,
  BRAND_TYPE_MAP,
  BUSINESS_STATUS,
  SERVICE_STATUS,
  STAFF_STATUS,
  TECHNICIAN_STATUS,
  TECHNICIAN_TYPES,
  TECHNICIAN_POSITIONS,
  MESSAGE_TYPES,
  COUPON_STATUS,
  WITHDRAW_STATUS,
  PORTFOLIO_STATUS
}
