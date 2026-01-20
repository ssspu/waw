/**
 * 员工/技师管理模块 Mock 数据
 * 商家端员工和技师管理，技师对应用户端的设计师
 */

import { success, error, paginate, generateId, formatNow } from '../utils.js'

// 员工列表
const staffList = [
  {
    id: 'S001',
    name: '王经理',
    phone: '13800000001',
    avatar: '',
    position: '管理员',
    role: 'admin', // admin/manager/staff
    status: 'active', // active/inactive
    joinTime: '2024-01-01 10:00:00',
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 'S002',
    name: '张小红',
    phone: '13800000002',
    avatar: '',
    position: '前台',
    role: 'staff',
    status: 'active',
    joinTime: '2024-03-15 10:00:00',
    createTime: '2024-03-15 10:00:00'
  },
  {
    id: 'S003',
    name: '刘小芳',
    phone: '13800000003',
    avatar: '',
    position: '收银员',
    role: 'staff',
    status: 'inactive',
    joinTime: '2024-05-01 10:00:00',
    leaveTime: '2025-10-01 10:00:00',
    createTime: '2024-05-01 10:00:00'
  }
]

// 技师列表 - 与用户端designer数据对应
const technicians = [
  {
    id: 'T001',
    userId: 'M002', // 对应商家端用户
    designerId: '1', // 对应用户端设计师ID
    name: '李天天',
    phone: '13800138002',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png',
    gender: 'M',
    age: 32,
    birthday: '1993-05-15',
    workYears: 12,
    level: '高级',
    position: 'shop_manager', // shop_manager/director/designer
    positionName: '店长',
    type: 'hairdresser', // hairdresser/beautician/makeup/manicurist
    typeName: '美发师',
    idCard: '510***********1234',
    address: '成都市锦江区xxx',
    email: 'ltt@example.com',
    status: 'active', // pending/active/inactive
    joinTime: '2024-02-15 10:00:00',
    // 业绩数据
    rating: 4.9,
    serviceCount: 1256,
    monthlyIncome: 28000,
    worksCount: 89,
    followersCount: 568,
    // 擅长技能
    specialties: ['精剪', '烫染', '护理'],
    // 简介
    introduction: '从业12年，擅长各类发型设计，为您打造最适合的造型。',
    // 证书
    certificates: ['高级美发师证', '造型师资格证'],
    notes: '',
    createTime: '2024-02-15 10:00:00'
  },
  {
    id: 'T002',
    userId: 'M003',
    designerId: '2',
    name: '张小雨',
    phone: '13800138003',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png',
    gender: 'F',
    age: 28,
    birthday: '1997-08-20',
    workYears: 8,
    level: '高级',
    position: 'director',
    positionName: '总监',
    type: 'hairdresser',
    typeName: '美发师',
    idCard: '510***********5678',
    address: '成都市武侯区xxx',
    email: 'zxy@example.com',
    status: 'active',
    joinTime: '2024-03-20 10:00:00',
    rating: 4.8,
    serviceCount: 986,
    monthlyIncome: 22000,
    worksCount: 67,
    followersCount: 423,
    specialties: ['烫发', '染发', '造型'],
    introduction: '专注烫染8年，让您的发色更加自然出众。',
    certificates: ['高级美发师证', '色彩顾问证'],
    notes: '',
    createTime: '2024-03-20 10:00:00'
  },
  {
    id: 'T003',
    userId: 'M004',
    designerId: '3',
    name: '王大明',
    phone: '13800138004',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png',
    gender: 'M',
    age: 25,
    birthday: '2000-01-10',
    workYears: 5,
    level: '中级',
    position: 'designer',
    positionName: '设计师',
    type: 'hairdresser',
    typeName: '美发师',
    idCard: '510***********9012',
    address: '成都市青羊区xxx',
    email: 'wdm@example.com',
    status: 'active',
    joinTime: '2024-06-01 10:00:00',
    rating: 4.6,
    serviceCount: 456,
    monthlyIncome: 12000,
    worksCount: 35,
    followersCount: 189,
    specialties: ['剪发', '造型'],
    introduction: '年轻有活力，擅长时尚潮流发型。',
    certificates: ['中级美发师证'],
    notes: '',
    createTime: '2024-06-01 10:00:00'
  },
  {
    id: 'T004',
    userId: '',
    designerId: '',
    name: '林婉儿',
    phone: '13800138005',
    avatar: 'https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png',
    gender: 'F',
    age: 23,
    birthday: '2002-11-25',
    workYears: 3,
    level: '初级',
    position: 'designer',
    positionName: '设计师',
    type: 'beautician',
    typeName: '美容师',
    idCard: '',
    address: '',
    email: '',
    status: 'pending', // 待确认入职
    joinTime: '',
    rating: 0,
    serviceCount: 0,
    monthlyIncome: 0,
    worksCount: 0,
    followersCount: 0,
    specialties: ['护理', '美容'],
    introduction: '',
    certificates: [],
    notes: '新入职申请',
    createTime: '2025-12-10 10:00:00'
  },
  {
    id: 'T005',
    userId: '',
    designerId: '',
    name: '陈小强',
    phone: '13800138006',
    avatar: '',
    gender: 'M',
    age: 35,
    birthday: '1990-03-08',
    workYears: 10,
    level: '高级',
    position: 'designer',
    positionName: '设计师',
    type: 'hairdresser',
    typeName: '美发师',
    idCard: '',
    address: '',
    email: '',
    status: 'inactive', // 离职
    joinTime: '2023-05-01 10:00:00',
    leaveTime: '2025-09-01 10:00:00',
    rating: 4.5,
    serviceCount: 1200,
    monthlyIncome: 0,
    worksCount: 50,
    followersCount: 320,
    specialties: ['剪发', '烫发'],
    introduction: '',
    certificates: ['高级美发师证'],
    notes: '因个人原因离职',
    createTime: '2023-05-01 10:00:00'
  }
]

// 员工角色列表
const staffRoles = [
  { id: 'admin', name: '管理员', description: '拥有全部权限' },
  { id: 'manager', name: '店长', description: '管理门店日常运营' },
  { id: 'staff', name: '员工', description: '普通员工权限' }
]

// 技师职位列表
const technicianPositions = [
  { id: 'shop_manager', name: '店长' },
  { id: 'director', name: '总监' },
  { id: 'designer', name: '设计师' }
]

// 技师类型列表
const technicianTypes = [
  { id: 'hairdresser', name: '美发师' },
  { id: 'beautician', name: '美容师' },
  { id: 'makeup', name: '化妆师' },
  { id: 'manicurist', name: '美甲师' }
]

// Mock 数据
export const data = {
  staffList,
  technicians,
  staffRoles,
  technicianPositions,
  technicianTypes
}

// Mock 路由处理
export const routes = {
  // ========== 员工管理 ==========

  // 获取员工列表
  'GET /staff': (params) => {
    let list = [...staffList]

    // 按状态筛选
    if (params.status) {
      list = list.filter(s => s.status === params.status)
    }

    // 按角色筛选
    if (params.role) {
      list = list.filter(s => s.role === params.role)
    }

    // 关键词搜索
    if (params.keyword) {
      list = list.filter(s =>
        s.name.includes(params.keyword) ||
        s.phone.includes(params.keyword)
      )
    }

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取员工详情
  'GET /staff/:id': (params) => {
    const staff = staffList.find(s => s.id === params.id)
    return staff ? success(staff) : error('员工不存在')
  },

  // 添加员工
  'POST /staff': (params) => {
    // 检查手机号是否已存在
    if (staffList.find(s => s.phone === params.phone)) {
      return error('该手机号已存在')
    }

    const newStaff = {
      id: generateId('S'),
      ...params,
      status: 'active',
      joinTime: formatNow(),
      createTime: formatNow()
    }
    staffList.push(newStaff)
    return success(newStaff, '添加成功')
  },

  // 更新员工信息
  'PUT /staff/:id': (params) => {
    const staff = staffList.find(s => s.id === params.id)
    if (!staff) return error('员工不存在')
    Object.assign(staff, params)
    return success(staff, '更新成功')
  },

  // 删除员工
  'DELETE /staff/:id': (params) => {
    const index = staffList.findIndex(s => s.id === params.id)
    if (index === -1) return error('员工不存在')
    staffList.splice(index, 1)
    return success(null, '删除成功')
  },

  // ========== 技师管理 ==========

  // 获取技师列表
  'GET /technicians': (params) => {
    let list = [...technicians]

    // 按状态筛选
    if (params.status) {
      list = list.filter(t => t.status === params.status)
    }

    // 按职位筛选
    if (params.position) {
      list = list.filter(t => t.position === params.position)
    }

    // 按类型筛选
    if (params.type) {
      list = list.filter(t => t.type === params.type)
    }

    // 关键词搜索
    if (params.keyword) {
      list = list.filter(t =>
        t.name.includes(params.keyword) ||
        t.phone.includes(params.keyword)
      )
    }

    // 按职位排序（店长 > 总监 > 设计师）
    const positionOrder = { 'shop_manager': 1, 'director': 2, 'designer': 3 }
    list.sort((a, b) => positionOrder[a.position] - positionOrder[b.position])

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 获取技师详情
  'GET /technicians/:id': (params) => {
    const technician = technicians.find(t => t.id === params.id)
    return technician ? success(technician) : error('技师不存在')
  },

  // 获取技师档案
  'GET /technicians/:id/profile': (params) => {
    const technician = technicians.find(t => t.id === params.id)
    if (!technician) return error('技师不存在')

    // 返回完整档案信息
    return success({
      ...technician,
      // 业绩统计
      stats: {
        totalServiceCount: technician.serviceCount,
        monthlyServiceCount: Math.floor(technician.serviceCount / 12),
        totalIncome: technician.monthlyIncome * 12,
        averageRating: technician.rating
      }
    })
  },

  // 更新技师档案
  'PUT /technicians/:id/profile': (params) => {
    const technician = technicians.find(t => t.id === params.id)
    if (!technician) return error('技师不存在')
    Object.assign(technician, params)
    return success(technician, '更新成功')
  },

  // 确认技师入职
  'POST /technicians/:id/confirm': (params) => {
    const technician = technicians.find(t => t.id === params.id)
    if (!technician) return error('技师不存在')
    if (technician.status !== 'pending') {
      return error('该技师不是待确认状态')
    }

    technician.status = 'active'
    technician.joinTime = formatNow()

    return success(technician, '入职确认成功')
  },

  // 技师离职
  'POST /technicians/:id/leave': (params) => {
    const technician = technicians.find(t => t.id === params.id)
    if (!technician) return error('技师不存在')

    technician.status = 'inactive'
    technician.leaveTime = formatNow()
    technician.notes = params.reason || '离职'

    return success(technician, '离职处理成功')
  },

  // 删除技师
  'DELETE /technicians/:id': (params) => {
    const index = technicians.findIndex(t => t.id === params.id)
    if (index === -1) return error('技师不存在')
    technicians.splice(index, 1)
    return success(null, '删除成功')
  },

  // ========== 设计师管理（用户端视角）==========

  // 获取设计师列表
  'GET /designers': (params) => {
    // 只返回在职的技师作为设计师
    let list = technicians
      .filter(t => t.status === 'active' && t.type === 'hairdresser')
      .map(t => ({
        id: t.designerId || t.id,
        name: t.name,
        avatar: t.avatar,
        level: t.level,
        position: t.positionName,
        rating: t.rating,
        serviceCount: t.serviceCount,
        worksCount: t.worksCount,
        specialties: t.specialties,
        introduction: t.introduction
      }))

    return success(paginate(list, params.page || 1, params.pageSize || 20))
  },

  // 添加设计师
  'POST /designers': (params) => {
    const newTechnician = {
      id: generateId('T'),
      ...params,
      type: 'hairdresser',
      typeName: '美发师',
      status: 'pending',
      rating: 0,
      serviceCount: 0,
      monthlyIncome: 0,
      worksCount: 0,
      followersCount: 0,
      createTime: formatNow()
    }
    technicians.push(newTechnician)
    return success(newTechnician, '添加成功')
  },

  // 获取员工角色列表
  'GET /staff-roles': () => {
    return success(staffRoles)
  },

  // 获取技师职位列表
  'GET /technician-positions': () => {
    return success(technicianPositions)
  },

  // 获取技师类型列表
  'GET /technician-types': () => {
    return success(technicianTypes)
  },

  // 获取技师统计
  'GET /technicians/stats': () => {
    return success({
      total: technicians.length,
      pending: technicians.filter(t => t.status === 'pending').length,
      active: technicians.filter(t => t.status === 'active').length,
      inactive: technicians.filter(t => t.status === 'inactive').length,
      byType: {
        hairdresser: technicians.filter(t => t.type === 'hairdresser').length,
        beautician: technicians.filter(t => t.type === 'beautician').length,
        makeup: technicians.filter(t => t.type === 'makeup').length,
        manicurist: technicians.filter(t => t.type === 'manicurist').length
      }
    })
  }
}

export default {
  data,
  routes
}
