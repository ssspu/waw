<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useAppStore, useUserStore } from '@/store'

onLaunch(() => {
  console.log('App Launch')

  // 初始化应用状态
  const appStore = useAppStore()
  appStore.initApp()

  // 初始化用户状态
  const userStore = useUserStore()
  userStore.initUserState()

  // #ifdef MP-WEIXIN
  // 微信小程序云开发初始化
  if (wx.cloud) {
    wx.cloud.init({
      env: '', // 需要配置云环境ID
      traceUser: true
    })
  }
  // #endif
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
