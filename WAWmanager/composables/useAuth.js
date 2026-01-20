/**
 * 认证相关组合式函数
 */
import { computed } from 'vue'
import { useUserStore } from '@/store'

export const useAuth = () => {
  const userStore = useUserStore()

  const isLoggedIn = computed(() => userStore.isLoggedIn)
  const userInfo = computed(() => userStore.userInfo)
  const role = computed(() => userStore.role)

  /**
   * 检查登录状态
   */
  const checkLogin = () => {
    if (!isLoggedIn.value) {
      uni.navigateTo({
        url: '/pages/auth/login'
      })
      return false
    }
    return true
  }

  /**
   * 检查角色权限
   */
  const checkRole = (allowedRoles) => {
    if (!checkLogin()) return false

    if (Array.isArray(allowedRoles)) {
      return allowedRoles.includes(role.value)
    }

    return role.value === allowedRoles
  }

  /**
   * 登录
   */
  const login = async (type = 'wx', params = {}) => {
    if (type === 'wx') {
      return await userStore.wxLoginAction()
    } else if (type === 'phone') {
      return await userStore.phoneLoginAction(params.phone, params.code)
    }
  }

  /**
   * 登出
   */
  const logout = async () => {
    await userStore.logoutAction()
  }

  return {
    isLoggedIn,
    userInfo,
    role,
    checkLogin,
    checkRole,
    login,
    logout
  }
}
