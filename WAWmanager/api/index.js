/**
 * API 统一导出入口
 * WAW Manager 商家端
 *
 * 使用方式:
 *
 * 方式一：按模块导入
 * import { authApi, orderApi, shopApi } from '@/api'
 * authApi.phoneLogin({ phone: '13800138000', code: '123456' })
 *
 * 方式二：导入全部
 * import api from '@/api'
 * api.auth.phoneLogin({ phone: '13800138000', code: '123456' })
 *
 * 方式三：导入请求工具
 * import { request, get, post } from '@/api'
 * get('/custom/endpoint', { id: 1 })
 *
 * 方式四：按需导入具体方法
 * import { getOrderList, getShopInfo } from '@/api'
 */

// ============ 导入请求核心 ============
import request, {
  get,
  post,
  put,
  del,
  upload,
  getToken,
  setToken,
  clearToken,
  setRefreshToken,
  getRefreshToken
} from './request.js'

// ============ 导入配置 ============
import {
  config,
  HTTP_STATUS,
  BUSINESS_CODE,
  WHITE_LIST,
  HEADERS,
  ORDER_STATUS,
  ORDER_STATUS_MAP,
  SHOP_STATUS,
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
} from './config.js'

// ============ 导入各业务模块 API ============

// 认证模块
import * as authModule from './modules/auth.js'

// 店铺模块
import * as shopModule from './modules/shop.js'

// 服务模块
import * as serviceModule from './modules/service.js'

// 订单模块
import * as orderModule from './modules/order.js'

// 顾客模块
import * as customerModule from './modules/customer.js'

// 员工/技师模块
import * as staffModule from './modules/staff.js'

// 财务模块
import * as financeModule from './modules/finance.js'

// 营销模块
import * as marketingModule from './modules/marketing.js'

// 代理模块
import * as agentModule from './modules/agent.js'

// 管理后台模块
import * as adminModule from './modules/admin.js'

// 通用模块
import * as commonModule from './modules/common.js'

// 时间/排班模块
import * as scheduleModule from './modules/schedule.js'

// 评价模块
import * as reviewModule from './modules/review.js'

// 消息模块
import * as messageModule from './modules/message.js'

// 聊天模块
import * as chatModule from './modules/chat.js'

// 统计模块
import * as statisticsModule from './modules/statistics.js'

// 作品集模块
import * as portfolioModule from './modules/portfolio.js'

// 设置模块
import * as settingsModule from './modules/settings.js'

// ============ 构建API对象 ============

// 认证相关 API
const authApi = {
  ...authModule
}

// 店铺相关 API
const shopApi = {
  ...shopModule
}

// 服务相关 API
const serviceApi = {
  ...serviceModule
}

// 订单相关 API
const orderApi = {
  ...orderModule
}

// 顾客相关 API
const customerApi = {
  ...customerModule
}

// 员工/技师相关 API
const staffApi = {
  ...staffModule
}

// 财务相关 API
const financeApi = {
  ...financeModule
}

// 营销相关 API
const marketingApi = {
  ...marketingModule
}

// 代理相关 API
const agentApi = {
  ...agentModule
}

// 管理后台相关 API
const adminApi = {
  ...adminModule
}

// 通用 API
const commonApi = {
  ...commonModule
}

// 排班相关 API
const scheduleApi = {
  ...scheduleModule
}

// 评价相关 API
const reviewApi = {
  ...reviewModule
}

// 消息相关 API
const messageApi = {
  ...messageModule
}

// 聊天相关 API
const chatApi = {
  ...chatModule
}

// 统计相关 API
const statisticsApi = {
  ...statisticsModule
}

// 作品集相关 API
const portfolioApi = {
  ...portfolioModule
}

// 设置相关 API
const settingsApi = {
  ...settingsModule
}

// ============ 统一 API 对象 ============
const api = {
  auth: authApi,
  shop: shopApi,
  service: serviceApi,
  order: orderApi,
  customer: customerApi,
  staff: staffApi,
  finance: financeApi,
  marketing: marketingApi,
  agent: agentApi,
  admin: adminApi,
  common: commonApi,
  schedule: scheduleApi,
  review: reviewApi,
  message: messageApi,
  chat: chatApi,
  statistics: statisticsApi,
  portfolio: portfolioApi,
  settings: settingsApi
}

// ============ 默认导出 ============
export default api

// ============ 具名导出 - 各模块 API ============
export {
  authApi,
  shopApi,
  serviceApi,
  orderApi,
  customerApi,
  staffApi,
  financeApi,
  marketingApi,
  agentApi,
  adminApi,
  commonApi,
  scheduleApi,
  reviewApi,
  messageApi,
  chatApi,
  statisticsApi,
  portfolioApi,
  settingsApi
}

// ============ 具名导出 - 请求工具 ============
export {
  request,
  get,
  post,
  put,
  del,
  upload,
  getToken,
  setToken,
  clearToken,
  setRefreshToken,
  getRefreshToken
}

// ============ 具名导出 - 配置 ============
export {
  config,
  HTTP_STATUS,
  BUSINESS_CODE,
  WHITE_LIST,
  HEADERS,
  ORDER_STATUS,
  ORDER_STATUS_MAP,
  SHOP_STATUS,
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

// ============ 导出所有模块的具体方法（方便按需导入）============
export * from './modules/auth.js'
export * from './modules/shop.js'
export * from './modules/service.js'
export * from './modules/order.js'
export * from './modules/customer.js'
export * from './modules/staff.js'
export * from './modules/finance.js'
export * from './modules/marketing.js'
export * from './modules/agent.js'
export * from './modules/admin.js'
export * from './modules/common.js'
export * from './modules/schedule.js'
export * from './modules/review.js'
export * from './modules/message.js'
export * from './modules/chat.js'
export * from './modules/statistics.js'
export * from './modules/portfolio.js'
export * from './modules/settings.js'
