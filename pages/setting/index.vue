<template>
	<view class="setting-page">
		<!-- 自定义导航栏 -->
		<view class="custom-header">
			<!-- 状态栏 -->
			<!-- <view class="status-bar">
				<text class="time">9:41</text>
				<view class="status-icons">
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/cellular-connection.svg" 
						mode="aspectFit"
					></image>
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/wifi.svg" 
						mode="aspectFit"
					></image>
					<image 
						class="status-icon" 
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/battery.png" 
						mode="aspectFit"
					></image>
				</view>
			</view> -->
			
			<!-- 导航栏内容 -->
			<view class="navbar-content">
				<view class="nav-left">
					<view class="back-btn" @tap="goBack">
						<image 
							class="back-icon" 
							src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" 
							mode="aspectFit"
						></image>
					</view>
				</view>
				<text class="nav-title">设置</text>
				<!-- <view class="nav-right">
					<view class="action-btn" @tap="handleMore">
						<text class="action-text">⋮</text>
					</view>
					<view class="action-btn" @tap="handleScan">
						<text class="action-text">▦</text>
					</view>
				</view> -->
			</view>
		</view>
		
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
								
								<image 
									v-if="item.hasChevron" 
									class="chevron-icon" 
									src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/chevron-right.svg" 
									mode="aspectFit"
								></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 退出登录卡片 -->
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
export default {
	data() {
		return {
			settingsGroups: [
				{
					items: [
						{ label: "个人信息", hasChevron: true },
					],
				},
				{
					items: [
						{ label: "账号安全", hasChevron: true },
						{ label: "申请认证", hasChevron: true },
						{ label: "地址管理", hasChevron: true },
						{ label: "支付设置", hasChevron: true },
					],
				},
				{
					items: [
						{ label: "消息通知", hasToggle: true, checked: true },
						{ label: "隐私设置", hasChevron: true },
						{ label: "清除缓存", rightText: "365M" },
					],
				},
				{
					items: [
						{ label: "反馈意见", hasChevron: true },
						{ label: "关于众美", hasChevron: true },
						{ label: "协议与条款", hasChevron: true },
					],
				},
			],
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		handleMore() {
			console.log('More clicked')
		},
		handleScan() {
			console.log('Scan clicked')
		},
		handleSettingClick(item) {
			console.log('Setting clicked:', item.label)
			// 根据不同的设置项进行不同的处理
			if (item.label === '清除缓存') {
				this.handleClearCache()
			}
		},
		handleToggleChange(item, event) {
			const checked = event.detail.value || event.target.checked
			item.checked = checked
			console.log('Toggle changed:', item.label, checked)
		},
		handleClearCache() {
			uni.showModal({
				title: '清除缓存',
				content: '确定要清除缓存吗？',
				success: (res) => {
					if (res.confirm) {
						console.log('Clear cache')
						// 这里可以添加清除缓存的逻辑
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
						// 这里可以添加退出登录的逻辑
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

.custom-header {
	position: relative;
	width: 100%;
	background-color: #ffffff;
	flex-shrink: 0;
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

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 88rpx 32rpx 24rpx;
	box-sizing: border-box;
}

.nav-left {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	z-index: 2;
}

.back-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}

.nav-title {
    margin-top: 30rpx;
    margin-left: -240rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 30rpx;
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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

.chevron-icon {
	width: 28rpx;
	height: 28rpx;
	flex-shrink: 0;
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

