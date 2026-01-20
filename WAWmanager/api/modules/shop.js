/**
 * 店铺管理相关 API
 * 包含店铺信息、装修配置、关联门店、推广等接口
 *
 * 后端接口文档: API-DOCUMENTATION(1)(2).md
 */
import { get, post, put, del, upload } from '../request'

// ==================== 店铺基本信息 ====================

/**
 * 获取我的店铺（商家专用）
 * 需要 MERCHANT 角色才能访问
 */
export const getMyShop = () => {
  return get('/shop/my')
}

/**
 * 获取店铺信息（使用 getMyShop）
 * @deprecated 请使用 getMyShop() 代替
 */
export const getShopInfo = () => {
  return get('/shop/my')
}

/**
 * 获取店铺详情
 * @param {string} shopId - 店铺ID
 */
export const getShopDetail = (shopId) => {
  return get(`/shop/${shopId}`)
}

/**
 * 更新店铺信息
 * @param {string} shopId - 店铺ID
 * @param {Object} data - 店铺信息
 */
export const updateShopInfo = (shopId, data) => {
  return put(`/shop/${shopId}`, data)
}

/**
 * 上传店铺Logo
 * @param {string} filePath - 图片路径
 */
export const uploadShopLogo = (filePath) => {
  return upload({
    url: '/upload/image',
    filePath,
    name: 'file'
  })
}

/**
 * 上传店铺图片（环境图、门头图等）
 * @param {string} filePath - 图片路径
 * @param {string} type - 图片类型: 'environment' | 'storefront' | 'license'
 */
export const uploadShopImage = (filePath, type) => {
  return upload({
    url: '/upload/image',
    filePath,
    name: 'file',
    formData: { type }
  })
}

/**
 * 删除店铺图片
 * @param {string} imageId - 图片ID
 */
export const deleteShopImage = (imageId) => {
  return del(`/shop/images/${imageId}`)
}

// ==================== 营业状态 ====================

/**
 * 获取营业状态
 * 通过 /shop/my 接口获取店铺信息，其中包含 status 字段
 * status: 'pending' | 'open' | 'closed' | 'suspended'
 */
export const getBusinessStatus = async () => {
  try {
    const res = await get('/shop/my', {}, { loading: false })
    // 从店铺信息中提取营业状态
    const shopData = res.data || res
    return {
      code: 0,
      data: {
        isOpen: shopData.status === 'open',
        status: shopData.status || 'closed',
        shopId: shopData.id,
        shopName: shopData.name
      },
      message: 'success'
    }
  } catch (error) {
    // 如果是权限错误，返回默认关闭状态
    if (error.code === 40303 || error.code === 40404) {
      return {
        code: 0,
        data: {
          isOpen: false,
          status: 'closed'
        },
        message: 'success'
      }
    }
    throw error
  }
}

/**
 * 更新营业状态（开店/关店）
 * @param {Object} data - {
 *   isOpen: boolean,
 *   status?: 'open' | 'closed'
 * }
 */
export const updateBusinessStatus = (data) => {
  // 通过更新店铺信息来更新营业状态
  const status = data.isOpen ? 'open' : 'closed'
  return put('/shop/my/status', { status })
}

/**
 * 快速开店
 */
export const openShop = () => {
  return put('/shop/my/status', { status: 'open' })
}

/**
 * 快速关店
 * @param {Object} data - { reason?: string }
 */
export const closeShop = (data = {}) => {
  return put('/shop/my/status', { status: 'closed', ...data })
}

// ==================== 店铺装修 ====================

/**
 * 获取店铺装修配置
 */
export const getShopDecoration = () => {
  return get('/shop/decoration')
}

/**
 * 更新店铺装修配置
 * @param {Object} data - 装修配置
 */
export const updateShopDecoration = (data) => {
  return put('/shop/decoration', data)
}

/**
 * 获取装修模板列表
 */
export const getDecorationTemplates = () => {
  return get('/shop/decoration/templates')
}

/**
 * 应用装修模板
 * @param {string} templateId - 模板ID
 */
export const applyDecorationTemplate = (templateId) => {
  return post('/shop/decoration/apply-template', { templateId })
}

// ==================== 关联门店管理 ====================

/**
 * 获取门店列表
 * @param {Object} params - { type?: 'service' | 'chain' | 'settled' }
 */
export const getStoreList = (params = {}) => {
  return get('/shop/list', params)
}

/**
 * 获取门店详情
 * @param {string} id - 门店ID
 */
export const getStoreDetail = (id) => {
  return get(`/shop/${id}`)
}

/**
 * 添加门店
 * @deprecated 此接口已废弃 - 店铺现在由系统在认证通过后自动创建
 * @param {Object} data - 门店信息
 */
export const addStore = (data) => {
  console.warn('⚠️ addStore 接口已废弃，店铺由系统在认证通过后自动创建')
  return post('/shop', data)
}

/**
 * 更新门店信息
 * @param {string} id - 门店ID
 * @param {Object} data - 门店信息
 */
export const updateStore = (id, data) => {
  return put(`/stores/${id}`, data)
}

/**
 * 删除门店
 * @param {string} id - 门店ID
 */
export const deleteStore = (id) => {
  return del(`/stores/${id}`)
}

// ==================== 入驻门店 ====================

/**
 * 搜索可入驻门店
 * @param {Object} params - { keyword: '搜索关键词' }
 */
export const searchSettleStores = (params) => {
  return get('/stores/settle/search', params)
}

/**
 * 申请入驻门店
 * @param {string} storeId - 门店ID
 * @param {Object} data - { message?: '申请留言' }
 */
export const applySettleStore = (storeId, data = {}) => {
  return post(`/stores/settle/${storeId}/apply`, data)
}

/**
 * 获取入驻申请列表
 * @param {Object} params - { status?: 'pending' | 'approved' | 'rejected' }
 */
export const getSettleApplications = (params = {}) => {
  return get('/stores/settle/applications', params)
}

/**
 * 获取已入驻门店列表
 */
export const getSettledStores = () => {
  return get('/stores/settled')
}

/**
 * 脱离入驻门店
 * @param {string} storeId - 门店ID
 */
export const leaveSettledStore = (storeId) => {
  return post(`/stores/settled/${storeId}/leave`)
}

// ==================== 连锁门店 ====================

/**
 * 获取连锁门店列表
 */
export const getChainStores = () => {
  return get('/stores/chain')
}

/**
 * 添加连锁门店
 * @param {Object} data - 门店信息
 */
export const addChainStore = (data) => {
  return post('/stores/chain', data)
}

/**
 * 邀请门店加入连锁
 * @param {Object} data - { storeId: string } 或 { phone: string }
 */
export const inviteChainStore = (data) => {
  return post('/stores/chain/invite', data)
}

/**
 * 处理连锁邀请
 * @param {string} inviteId - 邀请ID
 * @param {Object} data - { action: 'accept' | 'reject' }
 */
export const handleChainInvite = (inviteId, data) => {
  return post(`/stores/chain/invite/${inviteId}`, data)
}

/**
 * 移除连锁门店
 * @param {string} storeId - 门店ID
 */
export const removeChainStore = (storeId) => {
  return del(`/stores/chain/${storeId}`)
}

// ==================== 店铺二维码与推广 ====================

/**
 * 获取店铺二维码
 * @param {string} id - 门店ID（不传则为当前店铺）
 */
export const getStoreQrcode = (id) => {
  const url = id ? `/stores/${id}/qrcode` : '/shop/qrcode'
  return get(url)
}

/**
 * 生成店铺二维码
 * @param {string} id - 门店ID
 * @param {Object} data - {
 *   type: 'mini' | 'share', // 小程序码或分享二维码
 *   scene?: '场景参数',
 *   width?: 430
 * }
 */
export const generateStoreQrcode = (id, data = {}) => {
  return post(`/stores/${id}/qrcode`, data)
}

/**
 * 获取店铺推广信息
 */
export const getShopPromotionInfo = () => {
  return get('/shop/promotion')
}

/**
 * 生成店铺推广海报
 * @param {Object} data - { templateId?: string, customText?: string }
 */
export const generatePromotionPoster = (data = {}) => {
  return post('/shop/promotion/poster', data)
}

/**
 * 获取推广海报模板
 */
export const getPromotionTemplates = () => {
  return get('/shop/promotion/templates')
}

// ==================== 店铺收藏/关注统计 ====================

/**
 * 获取店铺粉丝列表
 * @param {Object} params - 分页参数
 */
export const getShopFollowers = (params = {}) => {
  return get('/shop/followers', params)
}

/**
 * 获取店铺收藏用户列表
 * @param {Object} params - 分页参数
 */
export const getShopFavorites = (params = {}) => {
  return get('/shop/favorites', params)
}

/**
 * 获取店铺浏览记录
 * @param {Object} params - { startDate, endDate }
 */
export const getShopViews = (params = {}) => {
  return get('/shop/views', params)
}
