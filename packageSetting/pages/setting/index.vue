<template>
	<view class="setting-page">
		<!-- 主内容区域 -->
		<view class="main-content">
			<view 
				v-for="(group, groupIndex) in settingsGroups" 
				:key="groupIndex" 
				class="settings-card"
			>
				<view class="card-content">
					<view 
						v-for="(item, itemIndex) in group.items" 
						:key="itemIndex" 
						class="setting-item-wrapper"
					>
						<view v-if="itemIndex > 0" class="separator-line"></view>
						<view class="setting-item" @tap="handleSettingClick(item)">
							<text class="setting-label">{{ item.label }}</text>
							
							<view class="setting-right">
								<text v-if="item.rightText" class="right-text">{{ item.rightText }}</text>
								
								<switch 
									v-if="item.hasToggle" 
									:checked="item.checked !== undefined ? item.checked : true"
									@change="(e) => handleToggleChange(item, e)"
									color="#927eff"
									class="setting-switch"
								></switch>
								
								<view 
									v-if="!item.hasToggle"
									class="action-button"
									@tap="handleActionClick(item, $event)"
								>
									<image 
										class="button-icon" 
										src="https://bioflex.cn/static/icon/gengduo.png" 
										mode="aspectFit"
									></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="logout-card">
				<view class="card-content">
					<view class="logout-btn" @tap="handleLogout">
						<text class="logout-text">退出登录</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部指示器
		<view class="footer-indicator">
			<view class="indicator-bar"></view>
		</view> -->
	</view>
</template>

<script>
import api from '@/api'

export default {
	data() {
		return {
						loading: false,
			settingsGroups: [
				{
					items: [
						{ label: "个人信息" },
					],
				},
				{
					items: [
						{ label: "账号安全" },
						
						
						
					],
				},
				{
					items: [
						{ label: "消息通知", hasToggle: true, checked: true, key: 'notificationEnabled' },
						{ label: "隐私设置" },
						{ label: "清除缓存", rightText: "", key: 'cacheSize' },
					],
				},
				{
					items: [
						{ label: "反馈意见" },
						
						{ label: "协议与条款" },
					],
				},
			],
		}
	},
	onLoad() {
		this.fetchSettings()
	},
	methods: {
				async fetchSettings() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.user.getSettings()
				if (res.code === 200) {
					const settings = res.data || {}
					
					this.updateSettingItem('notificationEnabled', 'checked', settings.notificationEnabled)
					
					this.updateSettingItem('cacheSize', 'rightText', settings.cacheSize || '0M')
				}
			} catch (err) {
				console.error('获取设置失败:', err)
			} finally {
				this.loading = false
			}
		},
		
		updateSettingItem(key, prop, value) {
			for (const group of this.settingsGroups) {
				const item = group.items.find(i => i.key === key)
				if (item) {
					item[prop] = value
					break
				}
			}
		},
		
		getSettingItem(key) {
			for (const group of this.settingsGroups) {
				const item = group.items.find(i => i.key === key)
				if (item) return item
			}
			return null
		},
		handleMore() {
			console.log('More clicked')
		},
		handleScan() {
			console.log('Scan clicked')
		},
		handleSettingClick(item) {
			console.log('Setting clicked:', item.label)
			
			if (item.label === '清除缓存') {
				
				if (!event.target.closest('.action-button')) {
					this.navigateToDetailPage(item.label)
				}
			} else if (item.hasToggle) {
				
				return
			} else {
				this.navigateToDetailPage(item.label)
			}
		},
		handleActionClick(item, event) {
			event.stopPropagation()
			if (item.label === '清除缓存') {
				this.handleClearCache()
			}
			console.log('Action button clicked:', item.label)
		},
		navigateToDetailPage(label) {
			const routeMap = {
				'个人信息': '/packageSetting/pages/setting/personal-info',
				'账号安全': '/packageSetting/pages/setting/account-security',
				'申请认证': '/packageSetting/pages/setting/apply-certification',
				'地址管理': '/packageSetting/pages/setting/address-management',
				'支付设置': '/packageSetting/pages/setting/payment-settings',
				'隐私设置': '/packageSetting/pages/setting/privacy-settings',
				'反馈意见': '/packageSetting/pages/setting/feedback',
				'关于众美': '/packageSetting/pages/setting/about',
				'协议与条款': '/packageSetting/pages/setting/agreement'
			}
			const url = routeMap[label]
			if (url) {
				uni.navigateTo({ url })
			}
		},
		async handleToggleChange(item, event) {
			const checked = event.detail.value || event.target.checked
			const oldValue = item.checked
			item.checked = checked

			
			if (item.key === 'notificationEnabled') {
				try {
					const res = await api.user.updateNotificationSetting({ notificationEnabled: checked })
					if (res.code !== 0) {
						
						item.checked = oldValue
						uni.showToast({ title: '设置失败', icon: 'none' })
					}
				} catch (err) {
					
					item.checked = oldValue
					console.error('更新消息通知设置失败:', err)
					uni.showToast({ title: '设置失败', icon: 'none' })
				}
			}
		},
		handleClearCache() {
			const cacheItem = this.getSettingItem('cacheSize')
			const currentCache = cacheItem ? cacheItem.rightText : '0M'

			uni.showModal({
				title: '清除缓存',
				content: `当前缓存 ${currentCache}，确定要清除吗？`,
				success: async (res) => {
					if (res.confirm) {
						try {
							const result = await api.user.clearCache()
							if (result.code === 0) {
								
								this.updateSettingItem('cacheSize', 'rightText', result.data.cacheSize || '0M')
								uni.showToast({ title: '缓存已清除', icon: 'success' })
							} else {
								uni.showToast({ title: '清除失败', icon: 'none' })
							}
						} catch (err) {
							console.error('清除缓存失败:', err)
							uni.showToast({ title: '清除失败', icon: 'none' })
						}
					}
				}
			})
		},
		handleLogout() {
			uni.showModal({
				title: '退出登录',
				content: '确定要退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						console.log('Logout')
						
						uni.reLaunch({ url: '/pages/index/index' })
					}
				}
			})
		}
	}
}
</script>

<style scoped lang="scss">
.setting-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.status-bar {
	width: 100%;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 32rpx;
	box-sizing: border-box;
}

.time {
	font-family: 'Inter', Helvetica;
	font-size: 28rpx;
	color: #000000;
	font-weight: normal;
}

.status-icons {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.status-icon {
	width: 35rpx;
	height: 23rpx;
	flex-shrink: 0;
}

.nav-right {
	display: flex;
	align-items: center;
	gap: 24rpx;
	z-index: 2;
}

.action-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40rpx;
	height: 40rpx;
	cursor: pointer;
}

.action-text {
	font-size: 40rpx;
	color: #000000;
	line-height: 1;
}

.main-content {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 12rpx;
	gap: 12rpx;
	padding-bottom: 160rpx;
	box-sizing: border-box;
}

.settings-card, .logout-card {
	width: 100%;
	max-width: 726rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-shadow: none;
	box-sizing: border-box;
	margin: 0 auto;
}

.card-content {
	padding: 30rpx;
	box-sizing: border-box;
}

.setting-item-wrapper {
	display: flex;
	flex-direction: column;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
	margin: 30rpx 0;
}

.setting-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	cursor: pointer;
	padding: 0;
	background-color: transparent;
	border: none;
	box-sizing: border-box;
}

.setting-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.setting-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.right-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 28rpx;
}

.setting-switch {
	transform: scale(0.8);
}

.action-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	border-radius: 6rpx;
	background-color: transparent;
	cursor: pointer;
	flex-shrink: 0;
	padding: 4rpx;
	transition: background-color 0.3s;
}

.action-button:active {
	background-color: #f0f0f0;
}

.button-icon {
	width: 24rpx;
	height: 24rpx;
	flex-shrink: 0;
}

.button-icon {
	width: 24rpx;
	height: 24rpx;
	flex-shrink: 0;
}

.chevron-text {
	font-size: 32rpx;
	color: #a6a6a6;
	line-height: 1;
	font-weight: normal;
}

.logout-card {
	width: 100%;
	max-width: 726rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-shadow: none;
	box-sizing: border-box;
	margin: 0 auto;
}

.logout-btn {
	width: 100%;
	text-align: center;
	cursor: pointer;
	padding: 0;
	background-color: transparent;
	border: none;
	box-sizing: border-box;
}

.logout-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.footer-indicator {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: flex-end;
	gap: 20rpx;
	padding: 16rpx 240rpx;
	flex-shrink: 0;
	box-sizing: border-box;
}

.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}
</style>

