/**
 * 员工/技师管理相关 API
 * 包含员工CRUD、技师管理、审批、排班等接口
 *
 * 后端接口文档: API-DOCUMENTATION(1)(2).md
 */
import { get, post, put, del } from '../request'

// ==================== 员工管理 ====================

/**
 * 获取员工列表
 * @param {Object} params - {
 *   page: 1,
 *   pageSize: 20,
 *   status: 'active' | 'disabled' | 'all',
 *   roleId?: string,
 *   keyword?: string
 * }
 */
export const getStaffList = (params = {}) => {
  return get('/staff', params)
}

/**
 * 添加员工
 * @param {Object} data - {
 *   platformAccount: '平台账号',
 *   name: '员工名称',
 *   roleId: '角色ID',
 *   phone?: '手机号',
 *   avatar?: '头像'
 * }
 */
export const addStaff = (data) => {
  return post('/staff', data)
}

/**
 * 启用员工
 * @param {string} id - 员工ID
 */
export const enableStaff = (id) => {
  return put(`/staff/${id}/enable`)
}

/**
 * 停用员工
 * @param {string} id - 员工ID
 */
export const disableStaff = (id) => {
  return put(`/staff/${id}/disable`)
}

/**
 * 获取员工详情
 * @param {string} id - 员工ID
 */
export const getStaffDetail = (id) => {
  return get(`/staff/${id}`)
}

/**
 * 删除员工
 * @param {string} id - 员工ID
 */
export const deleteStaff = (id) => {
  return del(`/staff/${id}`)
}

// ==================== 技师管理 ====================

/**
 * 获取技师列表
 * @param {Object} params - {
 *   status: 'active' | 'pending' | 'resigned' | 'all',
 *   type: 'hairdresser' | 'beautician' | 'makeup' | 'nail',
 *   position?: 'manager' | 'director' | 'designer'
 * }
 */
export const getTechnicianList = (params = {}) => {
  return get('/designer/list', params)
}

/**
 * 添加技师
 * @param {Object} data - {
 *   name: '姓名',
 *   type: 'hairdresser',
 *   position: 'designer',
 *   level: 'senior',
 *   phone: '手机号',
 *   avatar?: '头像',
 *   idCard?: '身份证号',
 *   skills?: ['剪发', '染发'],
 *   introduction?: '个人简介'
 * }
 */
export const addTechnician = (data) => {
  return post('/designer', data)
}

/**
 * 确认技师入职
 * @param {string} id - 技师ID
 */
export const confirmTechnicianEntry = (id) => {
  return post(`/designer/technicians/${id}/confirm-entry`)
}

/**
 * 技师离职
 * @param {string} id - 技师ID
 * @param {Object} data - { resignDate: '2024-01-01', reason?: '离职原因' }
 */
export const resignTechnician = (id, data) => {
  return post(`/designer/technicians/${id}/resign`, data)
}

// ==================== 技师档案 ====================

/**
 * 获取技师档案
 * @param {string} userId - 用户ID
 */
export const getTechnicianProfile = (userId) => {
  return get(`/designer/${userId}`)
}

/**
 * 更新技师档案
 * @param {Object} data - {
 *   name: '姓名',
 *   gender: 'male' | 'female',
 *   age: 25,
 *   birthday: '1999-01-01',
 *   workYears: 5,
 *   level: 'senior',
 *   phone: '手机号',
 *   email: '邮箱',
 *   idCard: '身份证号',
 *   address: '联系地址',
 *   entryDate: '2020-01-01',
 *   remark: '备注'
 * }
 */
export const updateTechnicianProfile = (data) => {
  return put('/designer/me', data)
}

// ==================== 技师业绩 ====================

/**
 * 获取技师业绩统计
 * @param {string} technicianId - 技师ID
 * @param {Object} params - { period: 'day' | 'week' | 'month' }
 */
export const getTechnicianPerformance = (technicianId, params = {}) => {
  return get(`/designer/technicians/${technicianId}/performance`, params)
}

/**
 * 获取技师排行榜
 * @param {Object} params - {
 *   sortBy: 'revenue' | 'orders' | 'rating',
 *   period: 'week' | 'month',
 *   limit: 10
 * }
 */
export const getTechnicianRanking = (params = {}) => {
  return get('/designer/technicians/ranking', params)
}
