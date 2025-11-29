/**
 * API 统一导出入口
 *
 * 使用方式:
 *
 * 方式一：按模块导入
 * import { authApi, orderApi } from '@/api'
 * authApi.login({ phone: '13800138000', password: '123456' })
 *
 * 方式二：导入全部
 * import api from '@/api'
 * api.auth.login({ phone: '13800138000', password: '123456' })
 *
 * 方式三：导入请求工具
 * import { request, get, post } from '@/api'
 * get('/custom/endpoint', { id: 1 })
 */

// 导入请求核心
import request, {
  get,
  post,
  put,
  del,
  upload,
  getToken,
  setToken,
  clearToken,
  setRefreshToken
} from './request.js'

// 导入配置
import { config, HTTP_STATUS, BUSINESS_CODE, WHITE_LIST } from './config.js'

// 导入各业务模块 API
import authApi from './modules/auth.js'
import orderApi from './modules/order.js'
import brandApi from './modules/brand.js'
import designerApi from './modules/designer.js'
import userApi from './modules/user.js'
import couponApi from './modules/coupon.js'
import commonApi from './modules/common.js'
import serviceApi from './modules/service.js'

// 统一 API 对象
const api = {
  auth: authApi,
  order: orderApi,
  brand: brandApi,
  designer: designerApi,
  user: userApi,
  coupon: couponApi,
  common: commonApi,
  service: serviceApi
}

// 默认导出
export default api

// 具名导出 - 各模块 API
export {
  authApi,
  orderApi,
  brandApi,
  designerApi,
  userApi,
  couponApi,
  commonApi,
  serviceApi
}

// 具名导出 - 请求工具
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
  setRefreshToken
}

// 具名导出 - 配置
export {
  config,
  HTTP_STATUS,
  BUSINESS_CODE,
  WHITE_LIST
}
