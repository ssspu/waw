import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

// 导出所有模块
export * from './modules/user'
export * from './modules/app'
export * from './modules/customer'
export * from './modules/service'
