<template>
	<view class="setting-detail-page">
		<view class="status-bar-space"></view>
		<SettingDetailHeader title="关于众美" />
		
		<view class="main-content">
			<!-- Logo 和版本信息 -->
			<view class="about-card">
				<view class="card-content">
					<view class="logo-section">
						<image 
							class="app-logo" 
							src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/logo.png"
						></image>
						<text class="app-name">众美</text>
						<text class="app-version">v1.0.0</text>
					</view>
				</view>
			</view>

			<!-- 关于应用 -->
			<view class="about-card">
				<view class="card-content">
					<view class="about-intro">
						<text class="intro-title">关于我们</text>
						<text class="intro-text">众美是一个连接设计师和用户的服务平台，致力于为用户提供专业的设计服务和产品推荐。</text>
					</view>
				</view>
			</view>

			<!-- 功能和链接 -->
			<view class="about-card">
				<view class="card-content">
					<view 
						v-for="(item, index) in aboutItems" 
						:key="index"
						class="about-item-wrapper"
					>
						<view v-if="index > 0" class="separator-line"></view>
						<view class="about-item" @tap="handleItemClick(item)">
							<text class="item-label">{{ item.label }}</text>
							<view class="action-button">
								<image 
									class="button-icon" 
									src="/static/icon/gengduo.png" 
									mode="aspectFit"
								></image>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 联系我们 -->
			<view class="about-card">
				<view class="card-content">
					<view class="contact-section">
						<text class="contact-title">联系我们</text>
						<view class="contact-items">
							<view class="contact-item">
								<text class="contact-label">客服电话</text>
								<text class="contact-value">400-1234-5678</text>
							</view>
							<view class="contact-item">
								<text class="contact-label">官方邮箱</text>
								<text class="contact-value">support@zhongmei.com</text>
							</view>
							<view class="contact-item">
								<text class="contact-label">官方网站</text>
								<text class="contact-value">www.zhongmei.com</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 其他信息 -->
			<view class="about-card">
				<view class="card-content">
					<view class="other-info">
						<text class="info-label">当前登录账户</text>
						<text class="info-value">yangqixiaonv</text>
					</view>
				</view>
			</view>

			<!-- 检查更新按钮 -->
			<view class="check-update-btn-group">
				<button class="check-update-btn" @tap="handleCheckUpdate">检查更新</button>
			</view>
		</view>
	</view>
</template>

<script>
import SettingDetailHeader from '@/components/setting/SettingDetailHeader.vue'

export default {
	components: {
		SettingDetailHeader
	},
	data() {
		return {
			aboutItems: [
				{ label: '功能介绍' },
				{ label: '常见问题' },
				{ label: '意见反馈' },
				{ label: '用户协议' },
				{ label: '隐私政策' }
			]
		}
	},
	methods: {
		handleItemClick(item) {
			console.log('Click:', item.label)
			// 可根据不同的项目打开对应的页面或链接
			if (item.label === '用户协议') {
				uni.navigateTo({ url: '/pages/setting/agreement' })
			}
		},
		handleCheckUpdate() {
			uni.showLoading({
				title: '检查中...'
			})

			// 模拟检查更新
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: '已是最新版本',
					icon: 'success'
				})
			}, 1500)
		}
	}
}
</script>

<style scoped lang="scss">
.setting-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
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

.about-card {
	width: 100%;
	max-width: 726rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
	margin: 0 auto;
}

.card-content {
	padding: 30rpx;
	box-sizing: border-box;
}

.logo-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
	padding: 20rpx 0;
}

.app-logo {
	width: 80rpx;
	height: 80rpx;
	border-radius: 16rpx;
}

.app-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 32rpx;
}

.app-version {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #a6a6a6;
	font-size: 24rpx;
}

.about-intro {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.intro-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.intro-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #666666;
	font-size: 26rpx;
	line-height: 1.6;
	word-wrap: break-word;
}

.about-item-wrapper {
	display: flex;
	flex-direction: column;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
	margin: 30rpx 0;
}

.about-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	padding: 0;
}

.item-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #000000;
	font-size: 28rpx;
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

.contact-section {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.contact-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.contact-items {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.contact-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.contact-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #666666;
	font-size: 26rpx;
}

.contact-value {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #000000;
	font-size: 26rpx;
}

.other-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.info-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #666666;
	font-size: 26rpx;
}

.info-value {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #000000;
	font-size: 26rpx;
}

.check-update-btn-group {
	width: 100%;
	max-width: 726rpx;
	margin: 0 auto;
	padding: 0 12rpx;
	box-sizing: border-box;
}

.check-update-btn {
	width: 100%;
	padding: 18rpx;
	background-color: #927eff;
	color: #ffffff;
	border: none;
	border-radius: 8rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	font-size: 28rpx;
	cursor: pointer;
}
</style>

