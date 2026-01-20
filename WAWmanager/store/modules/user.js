import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  wxLogin,
  merchantPhoneLogin,
  merchantPasswordLogin,
  getUserInfo,
  logout,
  getOpenId
} from '@/api'

export const useUserStore = defineStore('user', () => {
  // State
  const userInfo = ref(null)
  const token = ref('')
  const shopId = ref('')
  const role = ref('') // merchant / technician / storeTechnician
  const openId = ref('')
  const loginType = ref('') // wx / phone / password

  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const isMerchant = computed(() => role.value === 'merchant')
  const isTechnician = computed(() => role.value === 'technician')
  const isStoreTechnician = computed(() => role.value === 'storeTechnician')

  // Actions
  /**
   * 微信登录
   */
  const wxLoginAction = async () => {
    try {
      // 获取微信登录code
      const code = await new Promise((resolve, reject) => {
        uni.login({
          provider: 'weixin',
          success: (res) => resolve(res.code),
          fail: reject
        })
      })

      // 调用登录接口
      const res = await wxLogin(code)

      // 保存登录信息
      token.value = res.token
      userInfo.value = res.userInfo
      role.value = res.role
      loginType.value = 'wx'

      // 存储到本地
      uni.setStorageSync('token', res.token)

      return res
    } catch (error) {
      throw error
    }
  }

  /**
   * 手机号验证码登录
   */
  const phoneLoginAction = async (phone, code) => {
    try {
      const res = await merchantPhoneLogin({ phone, code })

      // 解析响应数据
      const data = res.data || res
      token.value = data.token
      userInfo.value = data.userInfo
      shopId.value = data.shopInfo?.id || ''
      role.value = data.userInfo?.role || 'merchant'
      loginType.value = 'phone'

      // 保存到本地存储
      uni.setStorageSync('waw_manager_token', token.value)
      uni.setStorageSync('waw_manager_refresh_token', data.refreshToken || '')
      uni.setStorageSync('shop_id', shopId.value)
      uni.setStorageSync('currentVersion', role.value)

      return res
    } catch (error) {
      throw error
    }
  }

  /**
   * 密码登录
   * @param {string} phone - 手机号
   * @param {string} password - 密码
   * @param {string} userRole - 用户角色 merchant/technician/storeTechnician
   */
  const passwordLoginAction = async (phone, password, userRole = 'merchant') => {
    try {
      const res = await merchantPasswordLogin({ phone, password })

      // 解析响应数据
      const data = res.data || res
      token.value = data.token
      userInfo.value = data.userInfo
      shopId.value = data.shopInfo?.id || ''
      role.value = userRole
      loginType.value = 'password'

      // 保存到本地存储
      uni.setStorageSync('waw_manager_token', token.value)
      uni.setStorageSync('waw_manager_refresh_token', data.refreshToken || '')
      uni.setStorageSync('shop_id', shopId.value)
      uni.setStorageSync('currentVersion', userRole)

      return res
    } catch (error) {
      throw error
    }
  }

  /**
   * 获取用户信息
   */
  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfo()
      userInfo.value = res
      return res
    } catch (error) {
      throw error
    }
  }

  /**
   * 获取 OpenId
   */
  const fetchOpenId = async () => {
    try {
      const res = await getOpenId()
      openId.value = res.openId
      return res
    } catch (error) {
      throw error
    }
  }

  /**
   * 退出登录
   */
  const logoutAction = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      // 清除状态
      userInfo.value = null
      token.value = ''
      shopId.value = ''
      role.value = ''
      openId.value = ''
      loginType.value = ''

      // 清除本地存储
      uni.removeStorageSync('waw_manager_token')
      uni.removeStorageSync('waw_manager_refresh_token')
      uni.removeStorageSync('shop_id')

      // 跳转到登录页
      uni.reLaunch({
        url: '/pages/auth/login'
      })
    }
  }

  /**
   * 更新用户信息
   */
  const updateUserInfoAction = (data) => {
    userInfo.value = { ...userInfo.value, ...data }
  }

  /**
   * 初始化用户状态
   */
  const initUserState = () => {
    const storedToken = uni.getStorageSync('waw_manager_token')
    const storedShopId = uni.getStorageSync('shop_id')
    if (storedToken) {
      token.value = storedToken
      shopId.value = storedShopId || ''
      fetchUserInfo()
    }
  }

  return {
    // State
    userInfo,
    token,
    shopId,
    role,
    openId,
    loginType,

    // Getters
    isLoggedIn,
    isMerchant,
    isTechnician,
    isStoreTechnician,

    // Actions
    wxLoginAction,
    phoneLoginAction,
    passwordLoginAction,
    fetchUserInfo,
    fetchOpenId,
    logoutAction,
    updateUserInfoAction,
    initUserState
  }
}, {
  persist: {
    key: 'user-store',
    storage: {
      getItem: (key) => uni.getStorageSync(key),
      setItem: (key, value) => uni.setStorageSync(key, value)
    }
  }
})
