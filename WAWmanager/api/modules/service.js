/**
 * 服务管理相关 API
 * 包含服务CRUD、分类管理、上下架、推广等接口
 *
 * 后端接口文档: API-DOCUMENTATION(1)(2).md
 */
import { get, post, put, del } from '../request'

// ==================== 服务列表 ====================

/**
 * 获取服务列表
 * @param {Object} params - {
 *   page: 1,
 *   pageSize: 20,
 *   type: 'store' | 'home', // 门店服务/上门服务
 *   status: 'online' | 'offline' | 'all',
 *   categoryId?: string,
 *   keyword?: string
 * }
 */
export const getServiceList = (params = {}) => {
  return get('/service/list', params)
}

/**
 * 获取服务详情
 * @param {string} id - 服务ID
 */
export const getServiceDetail = (id) => {
  return get(`/service/detail/${id}`)
}

// ==================== 服务CRUD ====================

/**
 * 创建服务
 * @param {Object} data - {
 *   name: '服务名称',
 *   image_urls: ['图片URL'],
 *   tag_ids: ['标签ID'],
 *   pricing_mode: 1, // 1(固定价格) / 2(SKU定价)
 *   fixed_price: 100.00,
 *   fixed_ref_price: 120.00,
 *   detail_text: '服务详情描述',
 *   notice_text: '注意事项',
 *   duration_min: 60,
 *   is_seven_day_guarantee: false,
 *   skus: [{ name: 'SKU名称', price: 100.00, ref_price: 120.00, duration_min: 60 }]
 * }
 */
export const createService = (data) => {
  return post('/service', data)
}

/**
 * 更新服务
 * @param {string} id - 服务ID
 * @param {Object} data - 服务数据
 */
export const updateService = (id, data) => {
  return put(`/service/my/${id}`, data)
}

/**
 * 删除服务
 * @param {string} id - 服务ID
 */
export const deleteService = (id) => {
  return del(`/service/my/${id}`)
}

/**
 * 批量删除服务
 * @param {Object} data - { ids: ['id1', 'id2'] }
 */
export const batchDeleteServices = (data) => {
  return del('/service/my/batch', data)
}

/**
 * 复制服务
 * @param {string} id - 服务ID
 */
export const copyService = (id) => {
  return post(`/service/my/${id}/copy`)
}

// ==================== 服务状态 ====================

/**
 * 上架服务
 * @param {string} id - 服务ID
 */
export const onlineService = (id) => {
  return put(`/service/my/${id}/online`)
}

/**
 * 下架服务
 * @param {string} id - 服务ID
 * @param {Object} data - { reason?: '下架原因' }
 */
export const offlineService = (id, data = {}) => {
  return put(`/service/my/${id}/offline`, data)
}

/**
 * 批量上架/下架
 * @param {Object} data - { ids: ['id1', 'id2'], action: 'online' | 'offline' }
 */
export const batchUpdateServiceStatus = (data) => {
  return put('/service/my/batch-status', data)
}

/**
 * 设为推荐/取消推荐
 * @param {string} id - 服务ID
 * @param {boolean} recommended - 是否推荐
 */
export const setServiceRecommended = (id, recommended) => {
  return put(`/service/my/${id}/recommend`, { recommended })
}

/**
 * 设为热门/取消热门
 * @param {string} id - 服务ID
 * @param {boolean} hot - 是否热门
 */
export const setServiceHot = (id, hot) => {
  return put(`/service/my/${id}/hot`, { hot })
}

// ==================== 服务分类 ====================

/**
 * 获取服务分类列表
 */
export const getServiceCategories = () => {
  return get('/category/list', {}, { loading: false })
}

// ==================== 服务标签 ====================

/**
 * 获取服务包含标签
 */
export const getServiceIncludes = () => {
  return get('/service/tags/includes', {}, { loading: false })
}

/**
 * 获取服务事项（注意事项）
 */
export const getServiceNotices = () => {
  return get('/service/tags/notices', {}, { loading: false })
}

/**
 * 获取服务承诺标签
 */
export const getServicePromises = () => {
  return get('/service/tags/promises', {}, { loading: false })
}

// ==================== 套餐服务 ====================

/**
 * 获取套餐列表
 * @param {Object} params - 分页参数
 */
export const getPackageList = (params = {}) => {
  return get('/service/packages', params)
}

/**
 * 获取套餐详情
 * @param {string} id - 套餐ID
 */
export const getPackageDetail = (id) => {
  return get(`/service/packages/${id}`)
}

/**
 * 创建套餐
 * @param {Object} data - {
 *   name: '套餐名称',
 *   description: '套餐描述',
 *   image_urls: ['图片URL'],
 *   package_price: 100.00,
 *   service_ids: ['服务ID'],
 *   valid_days: 30
 * }
 */
export const createPackage = (data) => {
  return post('/service/packages', data)
}

/**
 * 更新套餐
 * @param {string} id - 套餐ID
 * @param {Object} data - 套餐数据
 */
export const updatePackage = (id, data) => {
  return put(`/service/packages/${id}`, data)
}

/**
 * 删除套餐
 * @param {string} id - 套餐ID
 */
export const deletePackage = (id) => {
  return del(`/service/packages/${id}`)
}

// ==================== 服务技师关联 ====================

/**
 * 获取服务关联的技师列表
 * @param {string} serviceId - 服务ID
 */
export const getServiceTechnicians = (serviceId) => {
  return get(`/service/my/${serviceId}/technicians`)
}

/**
 * 设置服务关联技师
 * @param {string} serviceId - 服务ID
 * @param {Object} data - { technician_ids: ['id1', 'id2'], primary_technician_id?: 'id' }
 */
export const setServiceTechnicians = (serviceId, data) => {
  return put(`/service/my/${serviceId}/technicians`, data)
}
