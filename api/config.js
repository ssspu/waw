/**
 * API 配置文件
 * 统管理有环境配置和接口地
 */

// 环境配置
const ENV = {
  development: {
    baseUrl: 'https://bioflex.cn/api',
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

// 当前环境 (可根据 uni-app 条件编译动切换)
let currentEnv = 'development'
// #ifdef H5
currentEnv = process.env.NODE_ENV || 'development'
// #endif

// 导出当前环境配置
export const config = ENV[currentEnv] || ENV.development

// HTTP 状码
export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}

// 业务状码
export const BUSINESS_CODE = {
  SUCCESS: 200,         // 成功 (后端返回 200 表示成功)
  TOKEN_EXPIRED: 10001, // token 过期
  TOKEN_INVALID: 10002, // token 无效
  PARAM_ERROR: 20001,   // 参数错误
  DATA_NOT_FOUND: 20002,  // 数据不存在
  DESIGNER_NO_SHOP: 50204  // 设计师未关联门店，暂时无法预约
}

// 不要 token 的接口白名单
export const WHITE_LIST = [
  '/auth/login',
  '/auth/register',
  '/auth/send-code',
  '/auth/reset-password',
  '/common/config',
  '/common/banner'
]

// 请求头配置
export const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export default {
  config,
  HTTP_STATUS,
  BUSINESS_CODE,
  WHITE_LIST,
  HEADERS
}
