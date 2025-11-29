/**
 * API 配置文件
 * 统一管理所有环境配置和接口地址
 */

// 环境配置
const ENV = {
  development: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 30000,
    debug: true
  },
  staging: {
    baseUrl: 'https://staging-api.waw.com/api',
    timeout: 30000,
    debug: true
  },
  production: {
    baseUrl: 'https://api.waw.com/api',
    timeout: 15000,
    debug: false
  }
}

// 当前环境 (可根据 uni-app 条件编译动态切换)
// #ifdef H5
const currentEnv = process.env.NODE_ENV || 'development'
// #endif
// #ifndef H5
const currentEnv = 'development' // 小程序环境默认开发模式，可根据需要修改
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
  SUCCESS: 0,           // 成功
  TOKEN_EXPIRED: 10001, // token 过期
  TOKEN_INVALID: 10002, // token 无效
  PARAM_ERROR: 20001,   // 参数错误
  DATA_NOT_FOUND: 20002 // 数据不存在
}

// 不需要 token 的接口白名单
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
