/**
 * API 配置文件
 * 统一管理所有环境配置和接口地址
 * 此配置文件同时支持用户端和商家端
 */

// 环境配置
const ENV = {
  development: {
    baseUrl: '/backend',
    timeout: 30000,
    debug: true,
    useMock: false // 开启 Mock，使用模拟数据
  },
  staging: {
    baseUrl: 'https://bioflex.cn/api',
    timeout: 30000,
    debug: true,
    useMock: false
  },
  production: {
    baseUrl: 'https://bioflex.cn/api',
    timeout: 15000,
    debug: false,
    useMock: false
  }
}

// 当前环境 (可根据 uni-app 条件编译动态切换)
let currentEnv = 'development'
// #ifdef H5
currentEnv = process.env.NODE_ENV || 'development'
// #endif

// #ifdef MP-WEIXIN
// 小程序环境使用完整 URL
ENV.development.baseUrl = 'https://bioflex.cn/api'
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

// 业务状态码
export const BUSINESS_CODE = {
  SUCCESS: 200,         // 成功 (后端返回 200 表示成功)
  TOKEN_EXPIRED: 10001, // token 过期
  TOKEN_INVALID: 10002, // token 无效
  PARAM_ERROR: 20001,   // 参数错误
  DATA_NOT_FOUND: 20002,  // 数据不存在
  DESIGNER_NO_SHOP: 50204,  // 设计师未关联门店，暂时无法预约
  SHOP_NOT_VERIFIED: 50301, // 店铺未认证
  SERVICE_OFFLINE: 50401,   // 服务已下架
  ORDER_STATUS_ERROR: 50501 // 订单状态错误
}

// 不需要 token 的接口白名单
export const WHITE_LIST = [
  '/auth/login',
  '/auth/register',
  '/auth/send-code',
  '/auth/reset-password',
  '/auth/wx-login',
  '/auth/wx-phone-login',
  '/common/config',
  '/common/banner',
  '/common/regions',
  '/common/banks'
]

// 请求头配置
export const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

// 订单状态枚举
export const ORDER_STATUS = {
  PENDING_PAYMENT: 'PENDING_PAYMENT',   // 待付款
  PENDING_CONFIRM: 'PENDING_CONFIRM',   // 待确认（商家确认预约）
  CONFIRMED: 'CONFIRMED',               // 已确认
  PENDING_USE: 'PENDING_USE',           // 待使用
  IN_SERVICE: 'IN_SERVICE',             // 服务中
  COMPLETED: 'COMPLETED',               // 已完成
  CANCELLED: 'CANCELLED',               // 已取消
  REFUNDING: 'REFUNDING',               // 退款中
  REFUNDED: 'REFUNDED'                  // 已退款
}

// 订单状态映射（用于商家端）
export const ORDER_STATUS_MAP = {
  [ORDER_STATUS.PENDING_PAYMENT]: { label: '待付款', color: '#ff9800' },
  [ORDER_STATUS.PENDING_CONFIRM]: { label: '待确认', color: '#2196f3' },
  [ORDER_STATUS.CONFIRMED]: { label: '已确认', color: '#4caf50' },
  [ORDER_STATUS.PENDING_USE]: { label: '待使用', color: '#9c27b0' },
  [ORDER_STATUS.IN_SERVICE]: { label: '服务中', color: '#00bcd4' },
  [ORDER_STATUS.COMPLETED]: { label: '已完成', color: '#8bc34a' },
  [ORDER_STATUS.CANCELLED]: { label: '已取消', color: '#9e9e9e' },
  [ORDER_STATUS.REFUNDING]: { label: '退款中', color: '#f44336' },
  [ORDER_STATUS.REFUNDED]: { label: '已退款', color: '#607d8b' }
}

// 消息类型枚举
export const MESSAGE_TYPES = {
  SYSTEM: 'system',       // 系统消息
  ORDER: 'order',         // 订单消息
  ACTIVITY: 'activity',   // 活动消息
  COUPON: 'coupon',       // 优惠券消息
  REVIEW: 'review',       // 评价消息
  FINANCE: 'finance'      // 财务消息
}

// 技师类型枚举
export const TECHNICIAN_TYPES = {
  HAIRSTYLIST: 'hairstylist',   // 美发师
  BEAUTICIAN: 'beautician',     // 美容师
  MAKEUP: 'makeup',             // 化妆师
  NAIL: 'nail',                 // 美甲师
  BODY: 'body'                  // 美体师
}

// 技师职位枚举
export const TECHNICIAN_POSITIONS = {
  MANAGER: 'manager',           // 店长
  DIRECTOR: 'director',         // 总监
  DESIGNER: 'designer',         // 设计师
  STYLIST: 'stylist',           // 发型师
  ASSISTANT: 'assistant'        // 助理
}

export default {
  config,
  HTTP_STATUS,
  BUSINESS_CODE,
  WHITE_LIST,
  HEADERS,
  ORDER_STATUS,
  ORDER_STATUS_MAP,
  MESSAGE_TYPES,
  TECHNICIAN_TYPES,
  TECHNICIAN_POSITIONS
}
