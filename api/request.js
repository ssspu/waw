/**
 * 请求中间层
 * 统一处理所有 HTTP 请求，包含拦截器、错误处理、token 管理等
 */

import { config, HTTP_STATUS, BUSINESS_CODE, WHITE_LIST, HEADERS } from './config.js'

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
 * 检查是否是白名单接口
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
  // 添加基础 URL
  if (!options.url.startsWith('http')) {
    options.url = config.baseUrl + options.url
  }

  // 设置默认请求头
  options.header = {
    ...HEADERS,
    ...options.header
  }

  // 添加 token (非白名单接口)
  if (!isWhiteList(options.url)) {
    const token = getToken()
    if (token) {
      options.header['Authorization'] = `Bearer ${token}`
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
    console.log('🚀 Request:', {
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

  // HTTP 状态码处理
  if (statusCode === HTTP_STATUS.SUCCESS || statusCode === HTTP_STATUS.CREATED) {
    // 业务状态码处理
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
      url: '/pages/login/index'
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
      handleLogout()
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

  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })

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

  return new Promise((resolve, reject) => {
    // 显示 loading (可选)
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
  setRefreshToken
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
  setRefreshToken
}
