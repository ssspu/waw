/**
 * 时间/排班管理 API
 * 包含营业时间、预约管理、工作排班等接口
 *
 * 后端接口文档: API-DOCUMENTATION(1)(2).md
 */
import { get, post, put } from '../request'

// ==================== 营业时间管理 ====================

/**
 * 获取营业时间配置
 */
export const getBusinessHours = () => {
  return get('/schedule/business-hours')
}

/**
 * 更新营业时间配置
 * @param {Object} data - {
 *   weekdays: [{ day: 1, startTime: '09:00', endTime: '21:00', isOpen: true }],
 *   holidays: [{ date: '2024-01-01', isOpen: false, reason: '元旦休息' }]
 * }
 */
export const updateBusinessHours = (data) => {
  return put('/schedule/business-hours', data)
}

/**
 * 设置休息日
 * @param {Object} data - { date: '2024-01-01', reason: '休息原因' }
 */
export const setRestDay = (data) => {
  return post('/schedule/rest-days', data)
}

// ==================== 预约管理 ====================

/**
 * 获取今日预约列表
 */
export const getTodayAppointments = (params = {}) => {
  return get('/schedule/appointments/today', params)
}

/**
 * 获取预约列表
 * @param {Object} params - { date: '2024-01-01', status?: 'pending' | 'confirmed' | 'completed' }
 */
export const getAppointmentsByDate = (params) => {
  return get('/schedule/appointments', params)
}

/**
 * 获取可预约时间段
 * @param {Object} params - { date: '2024-01-01', serviceId?: string, technicianId?: string }
 */
export const getAvailableTimeSlots = (params) => {
  return get('/schedule/available-slots', params)
}

// ==================== 工作排班 ====================

/**
 * 获取排班列表
 * @param {Object} params - { date?: '2024-01-01', month?: '2024-01' }
 */
export const getScheduleList = (params = {}) => {
  return get('/schedule/work-schedule', params)
}

/**
 * 创建排班
 * @param {Object} data - {
 *   technicianId: '技师ID',
 *   date: '2024-01-01',
 *   shifts: [{ startTime: '09:00', endTime: '18:00' }]
 * }
 */
export const createSchedule = (data) => {
  return post('/schedule/work-schedule', data)
}
