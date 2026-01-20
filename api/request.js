/**
 * 请求中间层
 * 支持 Mock 模式，在发环境下使用本地模拟数据
 */

import { config, HTTP_STATUS, BUSINESS_CODE, WHITE_LIST, HEADERS } from './config.js'
import { mockRequest } from './mock/index.js'

// Token 存储 key
const TOKEN_KEY = 'waw_token'
const REFRESH_TOKEN_KEY = 'waw_refresh_token'

/**
 * 获取本地存储的 token
 */
const getToken = () => {
  return uni.getStorageSync(TOKEN_KEY) || ''
}

/**
 * 设置 token
 */
const setToken = (token) => {
  uni.setStorageSync(TOKEN_KEY, token)
}

/**
 * 获取 refresh token
 */
const getRefreshToken = () => {
  return uni.getStorageSync(REFRESH_TOKEN_KEY) || ''
}

/**
 * 设置 refresh token
 */
const setRefreshToken = (token) => {
  uni.setStorageSync(REFRESH_TOKEN_KEY, token)
}

/**
 * 清除 token
 */
const clearToken = () => {
  uni.removeStorageSync(TOKEN_KEY)
  uni.removeStorageSync(REFRESH_TOKEN_KEY)
}

/**
 * 检查是否已登录
 * @returns {boolean} - 是否已登录
 */
const isLoggedIn = () => {
  return !!getToken()
}

/**
 * 检查登录状态，未登录则跳转登录页
 * @param {Object} options - 配置选项
 * @param {string} options.tip - 提示文字
 * @param {boolean} options.redirect - 是否跳转登录页，默认true
 * @returns {boolean} - 是否已登录
 */
const checkLogin = (options = {}) => {
  const { tip = '请先登录', redirect = true } = options
  const loggedIn = isLoggedIn()

  if (!loggedIn && redirect) {
    uni.showToast({ title: tip, icon: 'none' })
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/login/index' })
    }, 1000)
  }

  return loggedIn
}

/**
 * 查是否是白名单接口
 */
const isWhiteList = (url) => {
  return WHITE_LIST.some(path => url.includes(path))
}

/**
 * 请求拦截器
 * @param {Object} options - 请求配置
 * @returns {Object} - 处理后的请求配置
 */
const requestInterceptor = (options) => {
  // 添加基 URL
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
    // GET 请求只设置 Accept，避免 Content-Type 引起的问题
    options.header = {
      'Accept': 'application/json',
      ...options.header
    }
  }

  // 添加 token (非白名单接口)
  if (!isWhiteList(options.url)) {
    const token = getToken()
    if (token) {
      options.header['Authorization'] = `Bearer ${token}`
      // 调试：打印token信息（仅显示前20字符）
      if (config.debug) {
        console.log('🔑 Token attached:', token.substring(0, 20) + '...')
        // 解析JWT payload查看用户信息
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          console.log('👤 Token payload:', payload)
        } catch (e) {
          console.warn('⚠️ Failed to parse token payload')
        }
      }
    } else {
      // 调试：没有token的警告
      if (config.debug) {
        console.warn('⚠️ No token found for protected route:', options.url)
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

  // 调试模式打印请求信息
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
 * @param {Object} response - 响应数据
 * @param {Object} options - 原始请求配置
 * @returns {Promise} - 处理后的响应
 */
const responseInterceptor = (response, options) => {
  const { statusCode, data } = response

  // 调试模式打印响应信息
  if (config.debug) {
    console.log('📦 Response:', {
      url: options.url,
      statusCode,
      data
    })
  }

  // HTTP 状码处理
  if (statusCode === HTTP_STATUS.SUCCESS || statusCode === HTTP_STATUS.CREATED) {
    // 兼容两种响应格式:
    // 1. { code: 0, data: {...}, message: '' } - 包装格式
    // 2. { token, refreshToken, ... } - 直接数据格式

    // 如果有 code 字段，按业务状码处理
    if (typeof data.code !== 'undefined') {
      if (data.code === BUSINESS_CODE.SUCCESS) {
        return Promise.resolve(data)
      }

      // Token 过期处理
      if (data.code === BUSINESS_CODE.TOKEN_EXPIRED || data.code === BUSINESS_CODE.TOKEN_INVALID) {
        return handleTokenExpired(options)
      }

      // 设计师未关联门店
      if (data.code === BUSINESS_CODE.DESIGNER_NO_SHOP) {
        uni.showToast({
          title: '该设计师暂未关联门店，无法预约',
          icon: 'none',
          duration: 3000
        })
        return Promise.reject({
          code: data.code,
          message: data.message || '设计师未关联门店',
          data: data.data
        })
      }

      // 其他业务错误
      return Promise.reject({
        code: data.code,
        message: data.message || '请求失败',
        data: data.data
      })
    }

    // 没有 code 字段，说明后端直接返回数据（如登录接口）
    // 包装成统格式返回
    return Promise.resolve({
      code: 0,
      data: data,
      message: 'success'
    })
  }

  // HTTP 错误处理
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
      // 尝试刷新 token
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        const res = await refreshTokenRequest(refreshToken)
        if (res.code === BUSINESS_CODE.SUCCESS) {
          setToken(res.data.token)
          setRefreshToken(res.data.refreshToken)

          // 重新执行队列中的请求
          refreshSubscribers.forEach(cb => cb(res.data.token))
          refreshSubscribers = []

          // 重新发起原请求
          return request(options)
        }
      }

      // 刷新失败，跳转登录
      handleLogout()
    } catch (error) {
      handleLogout()
    } finally {
      isRefreshing = false
    }
  } else {
    // 正在刷新 token，将请求加入队列
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
      url: '/pages/index/index'
    })
  }, 1500)
}

/**
 * 处理 HTTP 错误
 */
const handleHttpError = (statusCode, data) => {
  let message = '网络请求失败'
  let showToast = true

  switch (statusCode) {
    case HTTP_STATUS.UNAUTHORIZED:
      // 未登录状态下收到401，只提示不报错
      message = '请先登录'
      uni.showToast({
        title: message,
        icon: 'none',
        duration: 1500
      })
      // 返回一个静默的reject，不触发控制台错误
      return Promise.resolve({
        code: 401,
        message,
        data: null,
        needLogin: true
      })
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

  if (showToast) {
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
 * @param {Object} options - 请求配置
 * @returns {Promise} - 请求结果
 */
const request = (options) => {
  // 应用请求拦截器
  options = requestInterceptor(options)

  // Mock 模式处理
  if (config.useMock) {
    return handleMockRequest(options)
  }

  return handleRealRequest(options)
}

/**
 * Mock 请求处理
 * @param {Object} options - 请求配置
 * @returns {Promise} - 模拟响应
 */
const handleMockRequest = async (options) => {
  // 显示 loading (可)
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

    // 模拟响应拦截器处理
    if (result.code === 0) {
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
 * @param {Object} options - 请求配置
 * @returns {Promise} - 请求结果
 */
const handleRealRequest = (options) => {
  return new Promise((resolve, reject) => {
    // 显示 loading (可)
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
const get = (url, data = {}, options = {}) => {
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
const post = (url, data = {}, options = {}) => {
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
const put = (url, data = {}, options = {}) => {
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
const del = (url, data = {}, options = {}) => {
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
const upload = (url, filePath, formData = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    const token = getToken()

    if (options.showLoading !== false) {
      uni.showLoading({
        title: '上传中...',
        mask: true
      })
    }

    // 获取文件扩展名，用于设置正确的Content-Type
    const getFileExtension = (path) => {
      const match = path.match(/\.(\w+)(\?|$)/)
      return match ? match[1].toLowerCase() : 'png'
    }

    const ext = getFileExtension(filePath)
    const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp'
    }

    uni.uploadFile({
      url: config.baseUrl + url,
      filePath,
      name: options.name || 'file',
      formData: {
        ...formData,
        filename: `upload.${ext}`
      },
      header: {
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        if (res.statusCode === HTTP_STATUS.SUCCESS) {
          const data = JSON.parse(res.data)
          if (data.code === BUSINESS_CODE.SUCCESS) {
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
  isLoggedIn,
  checkLogin
}

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
  isLoggedIn,
  checkLogin
}
