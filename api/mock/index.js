/**
 * Mock 数据统一入口
 * 提供模拟数据和请求拦截功能
 */

import authMock from './modules/auth.js'
import userMock from './modules/user.js'
import brandMock from './modules/brand.js'
import designerMock from './modules/designer.js'
import orderMock from './modules/order.js'
import couponMock from './modules/coupon.js'
import commonMock from './modules/common.js'
import serviceMock from './modules/service.js'
import messageMock from './modules/message.js'
import territoryMock from './modules/territory.js'
import settlementMock from './modules/settlement.js'
import chatMock from './modules/chat.js'
import portfolioMock from './modules/portfolio.js'

// 合并怉有 mock 数据
const mockData = {
  auth: authMock,
  user: userMock,
  brand: brandMock,
  designer: designerMock,
  order: orderMock,
  coupon: couponMock,
  common: commonMock,
  service: serviceMock,
  message: messageMock,
  territory: territoryMock,
  settlement: settlementMock,
  chat: chatMock,
  portfolio: portfolioMock
}

// 合并怉有路由处理
const mockRoutes = {
  ...authMock.routes,
  ...userMock.routes,
  ...brandMock.routes,
  ...designerMock.routes,
  ...orderMock.routes,
  ...couponMock.routes,
  ...commonMock.routes,
  ...serviceMock.routes,
  ...messageMock.routes,
  ...territoryMock.routes,
  ...settlementMock.routes,
  ...chatMock.routes,
  ...portfolioMock.routes
}

/**
 * 模拟网络延迟
 * @param {number} ms - 延迟毫秒数
 */
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 生成成功响应
 * @param {any} data - 响应数据
 * @param {string} message - 响应消息
 */
export const success = (data = null, message = '操作成功') => ({
  code: 0,
  message,
  data
})

/**
 * 生成失败响应
 * @param {string} message - 错误消息
 * @param {number} code - 错误码
 */
export const error = (message = '操作失败', code = -1) => ({
  code,
  message,
  data: null
})

/**
 * 生成分页数据
 * @param {Array} list - 数据列表
 * @param {number} page - 当前页
 * @param {number} pageSize - 每页数量
 */
export const paginate = (list, page = 1, pageSize = 10) => {
  const total = list.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const records = list.slice(start, end)

  return {
    list: records,
    records,
    total,
    page,
    pageSize,
    totalPages,
    hasMore: page < totalPages
  }
}

/**
 * Mock 请求处理器
 * @param {Object} options - 请求配置
 * @returns {Promise} - 模拟响应
 */
export const mockRequest = async (options) => {
  const { url, method = 'GET', data = {} } = options

  // 提取路径（去除 baseUrl 和查询参数）
  const path = url.replace(/^https?:\/\/[^/]+/, '').split('?')[0]

  // 查找匹配的路由
  const routeKey = `${method.toUpperCase()} ${path}`
  let handler = mockRoutes[routeKey]

  // 如果没有精确匹配，尝试模糊匹配（处理带 ID 的路由）
  if (!handler) {
    for (const [key, value] of Object.entries(mockRoutes)) {
      const [routeMethod, routePath] = key.split(' ')
      if (routeMethod !== method.toUpperCase()) continue

      // 将路由模式转换为正则表达式
      const pattern = routePath.replace(/:[\w]+/g, '([^/]+)')
      const regex = new RegExp(`^${pattern}$`)

      if (regex.test(path)) {
        handler = value
        // 提取路径参数
        const matches = path.match(regex)
        if (matches) {
          const paramNames = routePath.match(/:[\w]+/g) || []
          paramNames.forEach((name, index) => {
            data[name.slice(1)] = matches[index + 1]
          })
        }
        break
      }
    }
  }

  // 模拟网络延迟
  await delay(Math.random() * 300 + 100)

  if (handler) {
    try {
      const result = await handler(data, options)
      console.log('🎭 Mock Response:', { url, method, data, result })
      return result
    } catch (err) {
      console.error('🎭 Mock Error:', err)
      return error(err.message || '服务器错误', 500)
    }
  }

  // 未找到匹配的路由
  console.warn('🎭 Mock Route Not Found:', routeKey)
  return error('接口不存在', 404)
}

// 导出
export default {
  mockData,
  mockRoutes,
  mockRequest,
  success,
  error,
  paginate,
  delay
}

export {
  mockData,
  mockRoutes
}
