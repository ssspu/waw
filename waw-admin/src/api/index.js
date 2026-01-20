import request from './request'

// ==================== 认证模块 ====================
export const authApi = {
  login: (data) => request.post('/admin/auth/login', data),
  logout: () => request.post('/admin/auth/logout'),
  getInfo: () => request.get('/admin/auth/info'),
  changePassword: (data) => request.post('/admin/auth/change-password', data)
}

// ==================== 用户端数据管理 ====================

// 设计师管理 (对应用户端 /designer/*)
export const designerApi = {
  getList: (params) => request.get('/admin/designer/list', { params }),
  getDetail: (id) => request.get(`/admin/designer/${id}`),
  create: (data) => request.post('/admin/designer', data),
  update: (id, data) => request.put(`/admin/designer/${id}`, data),
  delete: (id) => request.delete(`/admin/designer/${id}`),
  audit: (id, data) => request.post(`/admin/designer/${id}/audit`, data),
  // 关联用户端接口
  getServices: (id, params) => request.get(`/designer/${id}/services`, { params }),
  getWorks: (id, params) => request.get(`/designer/${id}/works`, { params }),
  getReviews: (id, params) => request.get(`/designer/${id}/reviews`, { params })
}

// 服务管理 (对应用户端 /service/*)
export const serviceApi = {
  getList: (params) => request.get('/admin/service/list', { params }),
  getDetail: (id) => request.get(`/admin/service/${id}`),
  create: (data) => request.post('/admin/service', data),
  update: (id, data) => request.put(`/admin/service/${id}`, data),
  delete: (id) => request.delete(`/admin/service/${id}`),
  batchDelete: (ids) => request.post('/admin/service/batch-delete', { ids }),
  online: (id) => request.post(`/admin/service/${id}/online`),
  offline: (id, reason) => request.post(`/admin/service/${id}/offline`, { reason }),
  // 分类管理
  getCategories: () => request.get('/category/list'),
  createCategory: (data) => request.post('/admin/category', data),
  updateCategory: (id, data) => request.put(`/admin/category/${id}`, data),
  deleteCategory: (id) => request.delete(`/admin/category/${id}`)
}

// 品牌馆管理 (对应用户端 /brand/*)
export const brandApi = {
  getList: (params) => request.get('/admin/brand/list', { params }),
  getDetail: (id) => request.get(`/admin/brand/${id}`),
  create: (data) => request.post('/admin/brand', data),
  update: (id, data) => request.put(`/admin/brand/${id}`, data),
  delete: (id) => request.delete(`/admin/brand/${id}`),
  audit: (id, data) => request.post(`/admin/brand/${id}/audit`, data),
  // 关联用户端接口
  getDesigners: (id, params) => request.get(`/brand/${id}/designers`, { params }),
  getServices: (id, params) => request.get(`/brand/${id}/services`, { params }),
  getWorks: (id, params) => request.get(`/brand/${id}/works`, { params })
}

// 用户管理 (对应用户端 /user/*)
export const userApi = {
  getList: (params) => request.get('/admin/user/list', { params }),
  getDetail: (id) => request.get(`/admin/user/${id}`),
  disable: (id) => request.post(`/admin/user/${id}/disable`),
  enable: (id) => request.post(`/admin/user/${id}/enable`),
  // 用户资产
  getAsset: (id) => request.get(`/admin/user/${id}/asset`),
  getOrders: (id, params) => request.get(`/admin/user/${id}/orders`, { params }),
  getFavorites: (id, params) => request.get(`/admin/user/${id}/favorites`, { params }),
  // VIP管理
  getVipInfo: (id) => request.get(`/admin/user/${id}/vip`),
  setVip: (id, data) => request.post(`/admin/user/${id}/vip`, data)
}

// 作品集管理 (对应用户端 /portfolio/*)
export const portfolioApi = {
  getList: (params) => request.get('/admin/portfolio/list', { params }),
  getDetail: (id) => request.get(`/admin/portfolio/${id}`),
  audit: (id, data) => request.post(`/admin/portfolio/${id}/audit`, data),
  delete: (id) => request.delete(`/admin/portfolio/${id}`),
  getCategories: () => request.get('/portfolio/categories')
}

// ==================== 商家端数据管理 ====================

// 商家管理 (对应商家端认证)
export const merchantApi = {
  getList: (params) => request.get('/admin/merchant/list', { params }),
  getDetail: (id) => request.get(`/admin/merchant/${id}`),
  audit: (id, data) => request.post(`/admin/merchant/${id}/audit`, data),
  disable: (id) => request.post(`/admin/merchant/${id}/disable`),
  enable: (id) => request.post(`/admin/merchant/${id}/enable`),
  // 商家认证审核
  getAuthList: (params) => request.get('/admin/merchant/applications', { params }),
  getAuthDetail: (id) => request.get(`/admin/merchant/${id}`),
  approveAuth: (id) => request.post(`/admin/merchant/${id}/approve`),
  rejectAuth: (id, data) => request.post(`/admin/merchant/${id}/reject`, data)
}

// 店铺管理 (对应商家端 /shop/*)
export const shopApi = {
  getList: (params) => request.get('/admin/store/list', { params }),
  getDetail: (id) => request.get(`/admin/store/${id}`),
  create: (data) => request.post('/admin/store', data),
  update: (id, data) => request.put(`/admin/store/${id}`, data),
  delete: (id) => request.delete(`/admin/store/${id}`),
  // 连锁店管理
  getChainList: (params) => request.get('/admin/store/chain/list', { params }),
  // 店铺状态
  open: (id) => request.post(`/admin/store/${id}/open`),
  close: (id, reason) => request.post(`/admin/store/${id}/close`, { reason })
}

// 技师管理 (对应商家端 /technician/*)
export const technicianApi = {
  getList: (params) => request.get('/admin/technician/list', { params }),
  getDetail: (id) => request.get(`/admin/technician/${id}`),
  create: (data) => request.post('/admin/technician', data),
  update: (id, data) => request.put(`/admin/technician/${id}`, data),
  delete: (id) => request.delete(`/admin/technician/${id}`),
  // 技师审核
  audit: (id, data) => request.post(`/admin/technician/${id}/audit`, data),
  // 技师业绩
  getPerformance: (id, params) => request.get(`/admin/technician/${id}/performance`, { params }),
  getOrders: (id, params) => request.get(`/admin/technician/${id}/orders`, { params }),
  getReviews: (id, params) => request.get(`/admin/technician/${id}/reviews`, { params }),
  // 类型和等级
  getTypes: () => request.get('/admin/technician/types'),
  getPositions: () => request.get('/admin/technician/positions'),
  getLevels: () => request.get('/admin/technician/levels')
}

// 员工管理 (对应商家端 /staff/*)
export const staffApi = {
  getList: (params) => request.get('/admin/staff/list', { params }),
  getDetail: (id) => request.get(`/admin/staff/${id}`),
  create: (data) => request.post('/admin/staff', data),
  update: (id, data) => request.put(`/admin/staff/${id}`, data),
  delete: (id) => request.delete(`/admin/staff/${id}`),
  enable: (id) => request.post(`/admin/staff/${id}/enable`),
  disable: (id) => request.post(`/admin/staff/${id}/disable`),
  getRoles: () => request.get('/admin/staff/roles')
}

// ==================== 订单管理 ====================

// 订单管理 (对应用户端和商家端 /order/*)
export const orderApi = {
  getList: (params) => request.get('/admin/order/list', { params }),
  getDetail: (id) => request.get(`/admin/order/${id}`),
  // 订单状态
  updateStatus: (id, status) => request.post(`/admin/order/${id}/status`, { status }),
  // 退款处理
  getRefundList: (params) => request.get('/admin/order/refund/list', { params }),
  handleRefund: (id, data) => request.post(`/admin/order/refund/${id}/handle`, data),
  getRefundDetail: (id) => request.get(`/admin/order/refund/${id}`),
  // 统计
  getStats: () => request.get('/admin/order/statistics'),
  getTrend: (params) => request.get('/admin/order/trend', { params }),
  getCountByStatus: () => request.get('/admin/order/count-by-status'),
  // 导出
  export: (params) => request.get('/admin/order/export', { params, responseType: 'blob' })
}

// ==================== 营销管理 ====================

// 优惠券管理 (对应商家端 /coupon/*)
export const couponApi = {
  getList: (params) => request.get('/admin/coupon/list', { params }),
  getDetail: (id) => request.get(`/admin/coupon/${id}`),
  create: (data) => request.post('/admin/coupon', data),
  update: (id, data) => request.put(`/admin/coupon/${id}`, data),
  delete: (id) => request.delete(`/admin/coupon/${id}`),
  // 状态管理
  start: (id) => request.post(`/admin/coupon/${id}/start`),
  stop: (id) => request.post(`/admin/coupon/${id}/stop`),
  // 领取记录
  getReceiveList: (id, params) => request.get(`/admin/coupon/${id}/receives`, { params }),
  // 统计
  getStats: (id) => request.get(`/admin/coupon/${id}/stats`)
}

// 分销管理 (对应商家端 /distribution/*)
export const distributionApi = {
  getSettings: () => request.get('/admin/distribution/settings'),
  updateSettings: (data) => request.put('/admin/distribution/settings', data),
  getDistributorList: (params) => request.get('/admin/distribution/distributors', { params }),
  getCommissionList: (params) => request.get('/admin/distribution/commissions', { params }),
  getExpenseList: (params) => request.get('/admin/distribution/expenses', { params })
}

// ==================== 财务管理 ====================

// 财务管理 (对应商家端 /finance/*)
export const financeApi = {
  // 概览
  getOverview: () => request.get('/admin/finance/overview'),
  // 提现管理
  getWithdrawList: (params) => request.get('/admin/finance/withdraw/list', { params }),
  getWithdrawDetail: (id) => request.get(`/admin/finance/withdraw/${id}`),
  handleWithdraw: (id, data) => request.post(`/admin/finance/withdraw/${id}/handle`, data),
  // 结算管理
  getSettlementList: (params) => request.get('/admin/finance/settlement/list', { params }),
  getSettlementDetail: (id) => request.get(`/admin/finance/settlement/${id}`),
  settle: (id) => request.post(`/admin/finance/settlement/${id}/settle`),
  batchSettle: (ids) => request.post('/admin/finance/settlement/batch-settle', { ids }),
  // 收入明细
  getIncomeList: (params) => request.get('/admin/finance/income/list', { params }),
  // 交易明细
  getTransactionList: (params) => request.get('/admin/finance/transaction/list', { params }),
  // 统计
  getStats: (params) => request.get('/admin/finance/stats', { params }),
  // 导出
  exportWithdraw: (params) => request.get('/admin/finance/withdraw/export', { params, responseType: 'blob' }),
  exportSettlement: (params) => request.get('/admin/finance/settlement/export', { params, responseType: 'blob' })
}

// ==================== 顾客管理 ====================

// 顾客管理 (对应商家端 /customer/*)
export const customerApi = {
  getList: (params) => request.get('/admin/customer/list', { params }),
  getDetail: (id) => request.get(`/admin/customer/${id}`),
  // 顾客档案
  getProfile: (id) => request.get(`/admin/customer/${id}/profile`),
  // 服务记录
  getServiceHistory: (id, params) => request.get(`/admin/customer/${id}/services`, { params }),
  // 消费记录
  getTransactions: (id, params) => request.get(`/admin/customer/${id}/transactions`, { params }),
  // 标签管理
  getTags: () => request.get('/admin/customer/tags'),
  createTag: (data) => request.post('/admin/customer/tags', data),
  deleteTag: (id) => request.delete(`/admin/customer/tags/${id}`),
  // 统计
  getStats: () => request.get('/admin/customer/stats'),
  getGrowthTrend: (params) => request.get('/admin/customer/growth-trend', { params })
}

// ==================== 系统管理 ====================

// 系统配置
export const systemApi = {
  // 管理员管理
  getAdminList: (params) => request.get('/admin/system/admin/list', { params }),
  getAdminDetail: (id) => request.get(`/admin/system/admin/${id}`),
  createAdmin: (data) => request.post('/admin/system/admin', data),
  updateAdmin: (id, data) => request.put(`/admin/system/admin/${id}`, data),
  deleteAdmin: (id) => request.delete(`/admin/system/admin/${id}`),
  resetPassword: (id) => request.post(`/admin/system/admin/${id}/reset-password`),
  // 角色管理
  getRoleList: () => request.get('/admin/system/role/list'),
  createRole: (data) => request.post('/admin/system/role', data),
  updateRole: (id, data) => request.put(`/admin/system/role/${id}`, data),
  deleteRole: (id) => request.delete(`/admin/system/role/${id}`),
  getPermissions: () => request.get('/admin/system/permissions'),
  // 系统配置
  getConfig: () => request.get('/admin/system/config'),
  updateConfig: (data) => request.put('/admin/system/config', data),
  // 轮播图管理 (对应用户端 /common/banner)
  getBannerList: (params) => request.get('/admin/system/banner/list', { params }),
  getBannerDetail: (id) => request.get(`/admin/system/banner/${id}`),
  createBanner: (data) => request.post('/admin/system/banner', data),
  updateBanner: (id, data) => request.put(`/admin/system/banner/${id}`, data),
  deleteBanner: (id) => request.delete(`/admin/system/banner/${id}`),
  // 操作日志
  getLogList: (params) => request.get('/admin/system/log/list', { params })
}

// ==================== 通用接口 ====================

// 通用接口 (对应用户端 /common/*)
export const commonApi = {
  // 配置
  getConfig: () => request.get('/common/config'),
  // 地区
  getRegions: (parentId) => request.get('/common/regions', { params: { parentId } }),
  getHotCities: () => request.get('/common/hot-cities'),
  // 银行
  getBanks: () => request.get('/common/banks'),
  // 文件上传
  uploadFile: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return request.post('/common/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  uploadImages: (files) => {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })
    return request.post('/common/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

// ==================== 数据统计 ====================

// 数据统计 (对应商家端 /data/*)
export const statsApi = {
  // 总览
  getOverview: () => request.get('/admin/stats/overview'),
  // 订单统计
  getOrderStats: (params) => request.get('/admin/stats/order', { params }),
  // 收入统计
  getIncomeStats: (params) => request.get('/admin/stats/income', { params }),
  // 用户统计
  getUserStats: (params) => request.get('/admin/stats/user', { params }),
  // 商家统计
  getMerchantStats: (params) => request.get('/admin/stats/merchant', { params }),
  // 服务统计
  getServiceStats: (params) => request.get('/admin/stats/service', { params }),
  // 趋势分析
  getTrend: (type, params) => request.get(`/admin/stats/trend/${type}`, { params })
}
