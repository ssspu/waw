/**
 * 请求中间层
 * 支持 Mock 模式，与用户端保持一致的请求架构
 */

import { config, HTTP_STATUS, BUSINESS_CODE, WHITE_LIST, HEADERS } from './config.js'
import { mockRequest } from './mock/index.js'

// Token 存储 key（与用户端保持一致）
const TOKEN_KEY = 'waw_manager_token'
const REFRESH_TOKEN_KEY = 'waw_manager_refresh_token'
const SHOP_ID_KEY = 'shop_id'

/**
 * 获取本地存储的 token
 */
export const getToken = () => {
  return uni.getStorageSync(TOKEN_KEY) || ''
}

/**
 * 设置 token
 */
export const setToken = (token) => {
  uni.setStorageSync(TOKEN_KEY, token)
}

/**
 * 获取 refresh token
 */
export const getRefreshToken = () => {
  return uni.getStorageSync(REFRESH_TOKEN_KEY) || ''
}

/**
 * 设置 refresh token
 */
export const setRefreshToken = (token) => {
  uni.setStorageSync(REFRESH_TOKEN_KEY, token)
}

/**
 * 获取 shop_id
 */
export const getShopId = () => {
  return uni.getStorageSync(SHOP_ID_KEY) || ''
}

/**
 * 设置 shop_id
 */
export const setShopId = (shopId) => {
  uni.setStorageSync(SHOP_ID_KEY, shopId)
}

/**
 * 清除 token
 */
export const clearToken = () => {
  uni.removeStorageSync(TOKEN_KEY)
  uni.removeStorageSync(REFRESH_TOKEN_KEY)
  uni.removeStorageSync(SHOP_ID_KEY)
}

/**
 * 检查是否是白名单接口
 */
const isWhiteList = (url) => {
  return WHITE_LIST.some(path => url.includes(path))
}

/**
 * 请求拦截器
 */
const requestInterceptor = (options) => {
  // 添加基础 URL
  if (!options.url.startsWith('http')) {
    options.url = config.baseUrl + options.url
  }

  // 设置默认请求头 (GET 请求不设置 Content-Type)
  if (options.method !== 'GET') {
    options.header = {
      ...HEADERS,
      ...options.header
    }
  } else {
    options.header = {
      'Accept': 'application/json',
      ...options.header
    }
  }

  // 添加 token (非白名单接口)
  if (!isWhiteList(options.url)) {
    const token = getToken()
    const shopId = getShopId()
    if (token) {
      options.header['Authorization'] = `Bearer ${token}`
      if (config.debug) {
        console.log('🔑 Token attached:', token.substring(0, 20) + '...')
      }
    } else if (config.debug) {
      console.warn('⚠️ No token found for protected route:', options.url)
    }
    // 添加 shop_id 到请求头
    if (shopId) {
      options.header['X-Shop-Id'] = shopId
      if (config.debug) {
        console.log('🏪 Shop ID attached:', shopId)
      }
    }
  }

  // 添加时间戳防止缓存
  if (options.method === 'GET') {
    options.data = {
      ...options.data,
      _t: Date.now()
    }
  }

  if (config.debug) {
    console.log('📤 Request:', {
      url: options.url,
      method: options.method,
      data: options.data,
      header: options.header
    })
  }

  return options
}

/**
 * 响应拦截器
 */
const responseInterceptor = (response, options) => {
  const { statusCode, data } = response

  if (config.debug) {
    console.log('📦 Response:', {
      url: options.url,
      statusCode,
      data
    })
  }

  // HTTP 状态码处理
  if (statusCode === HTTP_STATUS.SUCCESS || statusCode === HTTP_STATUS.CREATED) {
    // 兼容两种响应格式
    if (typeof data.code !== 'undefined') {
      if (data.code === BUSINESS_CODE.SUCCESS) {
        return Promise.resolve(data)
      }

      // Token 过期处理
      if (data.code === BUSINESS_CODE.TOKEN_EXPIRED || data.code === BUSINESS_CODE.TOKEN_INVALID) {
        return handleTokenExpired(options)
      }

      // 其他业务错误
      return Promise.reject({
        code: data.code,
        message: data.message || '请求失败',
        data: data.data
      })
    }

    // 没有 code 字段，直接返回数据
    return Promise.resolve({
      code: 0,
      data: data,
      message: 'success'
    })
  }

  return handleHttpError(statusCode, data)
}

/**
 * 处理 Token 过期
 */
let isRefreshing = false
let refreshSubscribers = []

const handleTokenExpired = async (options) => {
  if (!isRefreshing) {
    isRefreshing = true

    try {
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        const res = await refreshTokenRequest(refreshToken)
        if (res.code === BUSINESS_CODE.SUCCESS) {
          setToken(res.data.token)
          setRefreshToken(res.data.refreshToken)

          refreshSubscribers.forEach(cb => cb(res.data.token))
          refreshSubscribers = []

          return request(options)
        }
      }

      handleLogout()
    } catch (error) {
      handleLogout()
    } finally {
      isRefreshing = false
    }
  } else {
    return new Promise((resolve) => {
      refreshSubscribers.push((token) => {
        options.header['Authorization'] = `Bearer ${token}`
        resolve(request(options))
      })
    })
  }
}

/**
 * 刷新 Token 请求
 */
const refreshTokenRequest = (refreshToken) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: config.baseUrl + '/auth/refresh-token',
      method: 'POST',
      data: { refreshToken },
      header: HEADERS,
      success: (res) => resolve(res.data),
      fail: (err) => reject(err)
    })
  })
}

/**
 * 处理登出
 */
const handleLogout = () => {
  clearToken()
  uni.showToast({
    title: '登录已过期，请重新登录',
    icon: 'none',
    duration: 2000
  })
  setTimeout(() => {
    uni.reLaunch({
      url: '/pages/auth/login'
    })
  }, 1500)
}

/**
 * 处理 HTTP 错误
 */
const handleHttpError = (statusCode, data) => {
  let message = '网络请求失败'

  switch (statusCode) {
    case HTTP_STATUS.UNAUTHORIZED:
      message = '未授权，请登录'
      // 开发环境跳过登录跳转
      if (!config.skipAuth) {
        handleLogout()
      }
      break
    case HTTP_STATUS.FORBIDDEN:
      message = '拒绝访问'
      break
    case HTTP_STATUS.NOT_FOUND:
      message = '请求资源不存在'
      break
    case HTTP_STATUS.SERVER_ERROR:
      message = '服务器错误'
      break
    default:
      message = data?.message || `请求失败(${statusCode})`
  }

  // 开发环境跳过401时不显示toast
  if (!(statusCode === HTTP_STATUS.UNAUTHORIZED && config.skipAuth)) {
    uni.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  }

  return Promise.reject({
    code: statusCode,
    message,
    data: null
  })
}

/**
 * 核心请求方法
 */
const request = (options) => {
  options = requestInterceptor(options)

  if (config.useMock) {
    return handleMockRequest(options)
  }

  return handleRealRequest(options)
}

/**
 * Mock 请求处理
 */
const handleMockRequest = async (options) => {
  if (options.showLoading !== false) {
    uni.showLoading({
      title: options.loadingText || '加载中...',
      mask: true
    })
  }

  try {
    const result = await mockRequest(options)

    if (config.debug) {
      console.log('🎭 Mock Response:', {
        url: options.url,
        method: options.method,
        result
      })
    }

    if (result.code === 0 || result.code === 200) {
      return Promise.resolve(result)
    }

    return Promise.reject({
      code: result.code,
      message: result.message || '请求失败',
      data: result.data
    })
  } catch (error) {
    if (config.debug) {
      console.error('🎭 Mock Error:', error)
    }
    return Promise.reject({
      code: -1,
      message: error.message || 'Mock 请求失败',
      data: null
    })
  } finally {
    if (options.showLoading !== false) {
      uni.hideLoading()
    }
  }
}

/**
 * 真实请求处理
 */
const handleRealRequest = (options) => {
  return new Promise((resolve, reject) => {
    if (options.showLoading !== false) {
      uni.showLoading({
        title: options.loadingText || '加载中...',
        mask: true
      })
    }

    uni.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data,
      header: options.header,
      timeout: options.timeout || config.timeout,
      success: (response) => {
        responseInterceptor(response, options)
          .then(resolve)
          .catch(reject)
      },
      fail: (error) => {
        if (config.debug) {
          console.error('❌ Request Error:', error)
        }

        uni.showToast({
          title: '网络连接失败',
          icon: 'none',
          duration: 2000
        })

        reject({
          code: -1,
          message: error.errMsg || '网络连接失败',
          data: null
        })
      },
      complete: () => {
        if (options.showLoading !== false) {
          uni.hideLoading()
        }
      }
    })
  })
}

/**
 * GET 请求
 */
export const get = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'GET',
    data,
    ...options
  })
}

/**
 * POST 请求
 */
export const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

/**
 * PUT 请求
 */
export const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

/**
 * DELETE 请求
 */
export const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'DELETE',
    data,
    ...options
  })
}

/**
 * 文件上传
 */
export const upload = (url, filePath, formData = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    const token = getToken()

    if (options.showLoading !== false) {
      uni.showLoading({
        title: '上传中...',
        mask: true
      })
    }

    uni.uploadFile({
      url: config.baseUrl + url,
      filePath,
      name: options.name || 'file',
      formData,
      header: {
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        if (res.statusCode === HTTP_STATUS.SUCCESS) {
          const data = JSON.parse(res.data)
          if (data.code === BUSINESS_CODE.SUCCESS || data.code === 0) {
            resolve(data)
          } else {
            reject(data)
          }
        } else {
          reject({
            code: res.statusCode,
            message: '上传失败'
          })
        }
      },
      fail: (err) => {
        reject({
          code: -1,
          message: err.errMsg || '上传失败'
        })
      },
      complete: () => {
        if (options.showLoading !== false) {
          uni.hideLoading()
        }
      }
    })
  })
}

export default {
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
  getShopId,
  setShopId
}
