import axios from 'axios'
import { ElMessage } from 'element-plus'

// Mock模式开关 - 设为true时不发送真实请求，直接使用页面中的mock数据
const MOCK_MODE = true

const baseURL = 'https://bioflex.cn/api'

const request = axios.create({
  baseURL,
  timeout: 30000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // Mock模式下直接拒绝请求，触发各页面的catch fallback
    if (MOCK_MODE) {
      return Promise.reject(new Error('Mock mode enabled'))
    }
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const { code, data, message } = response.data
    if (code === 0 || code === 200) {
      return response.data
    }
    ElMessage.error(message || '请求失败')
    return Promise.reject(new Error(message))
  },
  error => {
    // Mock模式下不显示错误提示
    if (MOCK_MODE) {
      return Promise.reject(error)
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    ElMessage.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default request
