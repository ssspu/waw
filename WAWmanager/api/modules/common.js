/**
 * 通用功能 API
 * 包含文件上传、应用配置、地区数据、搜索等通用接口
 */
import { get, post, upload } from '../request'

// ==================== 应用配置 ====================

/**
 * 获取应用配置
 */
export const getAppConfig = () => {
  return get('/common/config', {}, { loading: false })
}

/**
 * 获取首页数据
 */
export const getHomeData = () => {
  return get('/common/home')
}

/**
 * 获取 Banner 列表
 * @param {Object} params - { position: 'home' | 'service' | 'marketing' }
 */
export const getBanners = (params = {}) => {
  return get('/common/banners', params, { loading: false })
}

// ==================== 文件上传 ====================

/**
 * 上传单个文件
 * @param {string} filePath - 文件路径
 * @param {Object} options - 上传选项
 */
export const uploadFile = (filePath, options = {}) => {
  return upload({
    url: '/common/upload',
    filePath,
    name: options.name || 'file',
    formData: options.formData || {}
  })
}

/**
 * 批量上传图片
 * @param {Array} filePaths - 图片路径数组
 * @param {Object} options - 上传选项
 */
export const uploadImages = async (filePaths, options = {}) => {
  const results = []
  for (const filePath of filePaths) {
    try {
      const result = await uploadFile(filePath, {
        ...options,
        formData: { type: 'image', ...options.formData }
      })
      results.push(result)
    } catch (error) {
      results.push({ error: error.message, filePath })
    }
  }
  return results
}

/**
 * 上传视频
 * @param {string} filePath - 视频路径
 * @param {Object} options - 上传选项
 */
export const uploadVideo = (filePath, options = {}) => {
  return upload({
    url: '/common/upload/video',
    filePath,
    name: options.name || 'video',
    formData: { type: 'video', ...options.formData },
    loadingText: '视频上传中...'
  })
}

// ==================== 地区数据 ====================

/**
 * 获取地区列表
 * @param {Object} params - { parentId: string } 父级地区ID
 */
export const getRegions = (params = {}) => {
  return get('/common/regions', params, { loading: false })
}

/**
 * 获取省份列表
 */
export const getProvinces = () => {
  return get('/common/regions/provinces', {}, { loading: false })
}

/**
 * 获取城市列表
 * @param {string} provinceId - 省份ID
 */
export const getCities = (provinceId) => {
  return get('/common/regions/cities', { provinceId }, { loading: false })
}

/**
 * 获取区县列表
 * @param {string} cityId - 城市ID
 */
export const getDistricts = (cityId) => {
  return get('/common/regions/districts', { cityId }, { loading: false })
}

/**
 * 获取热门城市
 */
export const getHotCities = () => {
  return get('/common/regions/hot-cities', {}, { loading: false })
}

/**
 * 根据经纬度获取地址信息
 * @param {Object} params - { latitude, longitude }
 */
export const getAddressByLocation = (params) => {
  return get('/common/location/address', params)
}

// ==================== 分类数据 ====================

/**
 * 获取服务分类列表
 * @param {Object} params - { parentId?: string }
 */
export const getServiceCategories = (params = {}) => {
  return get('/common/categories/service', params, { loading: false })
}

/**
 * 获取所有服务分类（树形结构）
 */
export const getServiceCategoryTree = () => {
  return get('/common/categories/service/tree', {}, { loading: false })
}

/**
 * 获取技能标签列表
 */
export const getSkillTags = () => {
  return get('/common/tags/skills', {}, { loading: false })
}

/**
 * 获取服务特色标签
 */
export const getFeatureTags = () => {
  return get('/common/tags/features', {}, { loading: false })
}

/**
 * 获取环境设施标签
 */
export const getFacilityTags = () => {
  return get('/common/tags/facilities', {}, { loading: false })
}

// ==================== 搜索相关 ====================

/**
 * 全局搜索
 * @param {Object} params - { keyword, type: 'all' | 'customer' | 'order' | 'service' }
 */
export const globalSearch = (params) => {
  return get('/common/search', params)
}

/**
 * 获取搜索热词
 */
export const getHotKeywords = () => {
  return get('/common/search/hot-keywords', {}, { loading: false })
}

/**
 * 获取搜索历史
 */
export const getSearchHistory = () => {
  return get('/common/search/history', {}, { loading: false })
}

/**
 * 保存搜索历史
 * @param {string} keyword - 搜索关键词
 */
export const saveSearchHistory = (keyword) => {
  return post('/common/search/history', { keyword }, { loading: false })
}

/**
 * 清空搜索历史
 */
export const clearSearchHistory = () => {
  return post('/common/search/history/clear', {}, { loading: false })
}

// ==================== 协议和文档 ====================

/**
 * 获取协议内容
 * @param {string} type - 协议类型: 'user' | 'privacy' | 'merchant' | 'service'
 */
export const getAgreement = (type) => {
  return get('/common/agreement', { type })
}

/**
 * 获取关于我们
 */
export const getAboutUs = () => {
  return get('/common/about')
}

/**
 * 获取帮助中心列表
 */
export const getHelpList = (params = {}) => {
  return get('/common/help', params)
}

/**
 * 获取帮助详情
 */
export const getHelpDetail = (id) => {
  return get(`/common/help/${id}`)
}

// ==================== 银行相关 ====================

/**
 * 获取银行列表
 */
export const getBankList = () => {
  return get('/common/banks', {}, { loading: false })
}

/**
 * 获取银行支行列表
 * @param {Object} params - { bankCode, cityCode }
 */
export const getBankBranches = (params) => {
  return get('/common/banks/branches', params)
}

// ==================== 系统相关 ====================

/**
 * 检查更新
 * @param {Object} params - { version, platform }
 */
export const checkUpdate = (params) => {
  return get('/common/update/check', params, { loading: false })
}

/**
 * 获取客服信息
 */
export const getCustomerService = () => {
  return get('/common/customer-service', {}, { loading: false })
}

/**
 * 提交意见反馈
 * @param {Object} data - { type, content, images, contact }
 */
export const submitFeedback = (data) => {
  return post('/common/feedback', data)
}

/**
 * 获取系统公告列表
 */
export const getNoticeList = (params = {}) => {
  return get('/common/notices', params)
}

/**
 * 获取系统公告详情
 */
export const getNoticeDetail = (id) => {
  return get(`/common/notices/${id}`)
}

// ==================== 字典数据 ====================

/**
 * 获取字典数据
 * @param {string} type - 字典类型: 'gender' | 'jobTitle' | 'technicianType' | 'orderStatus' 等
 */
export const getDictionary = (type) => {
  return get('/common/dictionary', { type }, { loading: false })
}

/**
 * 获取职位等级列表
 */
export const getJobLevels = () => {
  return get('/common/dictionary', { type: 'jobLevel' }, { loading: false })
}

/**
 * 获取技师类型列表
 */
export const getTechnicianTypes = () => {
  return get('/common/dictionary', { type: 'technicianType' }, { loading: false })
}

/**
 * 获取员工角色列表
 */
export const getStaffRoles = () => {
  return get('/common/dictionary', { type: 'staffRole' }, { loading: false })
}
