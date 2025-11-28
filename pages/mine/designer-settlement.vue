<template>
	<view class="designer-settlement-page">
		<view class="status-bar-space"></view>
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		
		<!-- 导航栏和标题部分 -->
		<view class="navbar-wrapper">
			<view class="navbar">
				<view class="navbar-content">
					<view class="back-btn" @tap="handleBack">
						<image 
							class="back-icon" 
							src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" 
							mode="aspectFit"
						></image>
					</view>
					<text class="navbar-title">入驻申请</text>
				</view>
			</view>
			
			<!-- 标题部分 -->
			<view class="header-section">
				<text class="main-title">设计师,免费入驻</text>
				<text class="subtitle">让每一个设计师都能成为一个品牌,我们期待您的加入</text>
			</view>
		</view>
		
		<!-- 主内容 -->
		<view class="main-content">
			
			<!-- 优势部分 -->
			<view class="advantages-section">
				<text class="advantages-title">设计师入驻优势</text>
				<view class="advantages-list">
					<view class="advantage-item-wrapper">
						<view class="advantage-item">
							<text class="advantage-title">零佣金模式</text>
							<text class="advantage-desc">平台不抽设计师佣金,免佣金入驻模式</text>
						</view>
						<view class="advantage-divider"></view>
					</view>
					<view class="advantage-item-wrapper">
						<view class="advantage-item">
							<text class="advantage-title">回款快速</text>
							<text class="advantage-desc">服务完成立即结算,当天回款无账期</text>
						</view>
						<view class="advantage-divider"></view>
					</view>
					<view class="advantage-item-wrapper">
						<view class="advantage-item">
							<text class="advantage-title">营销工具</text>
							<text class="advantage-desc">快速获取精准顾客流量,顾客预约、项目管理</text>
						</view>
						<view class="advantage-divider"></view>
					</view>
					<view class="advantage-item-wrapper">
						<view class="advantage-item">
							<text class="advantage-title">顾客管理</text>
							<text class="advantage-desc">一键分析顾客消费行为,让你轻松管理</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 企业商户链接 -->
			<view class="enterprise-link" @tap="handleEnterpriseLink">
				<text class="link-text">我是企业商户,如何入驻</text>
				<image 
					class="link-arrow" 
					src="/static/icon/vector-4.svg" 
					mode="aspectFit"
				></image>
			</view>
		</view>
		
		<!-- 底部按钮 -->
		<view class="footer-button" @tap="handleApplyNow">
			<text class="button-text">立即入驻</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		handleEnterpriseLink() {
			uni.navigateTo({
				url: '/pages/mine/store-settlement'
			})
		},
		handleApplyNow() {
			uni.navigateTo({
				url: '/pages/designer-settlement/identity'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.designer-settlement-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	position: relative;
	display: flex;
	flex-direction: column;
}

.status-bar {
	height: 44rpx;
	width: 100%;
	background-color: #ffffff;
}

.navbar-wrapper {
	width: 100%;
	background-color: #ffffff;
	z-index: 10;
}

.navbar {
	position: relative;
	width: 100%;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 88rpx;
	padding: 0 30rpx;
	position: relative;
}

.back-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
}

.navbar-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	margin-left: 20rpx;
}
.nav-icon-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-dots {
	display: flex;
	align-items: center;
	gap: 3rpx;
}

.dot {
	width: 3rpx;
	height: 3rpx;
	border-radius: 50%;
	background-color: #000000;
}

.nav-circle {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	border: 1.5rpx solid #000000;
	background-color: transparent;
	display: flex;
	align-items: center;
	justify-content: center;
}

.circle-dot {
	width: 6rpx;
	height: 6rpx;
	border-radius: 50%;
	background-color: #000000;
}

.main-content {
	flex: 1;
	padding: 24rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	background-color: #f2f2f2;
	padding-bottom: 120rpx;
}

.header-section {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	padding: 30rpx 24rpx;
}

.main-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 40rpx;
	font-weight: normal;
	color: #000000;
}

.subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: normal;
	color: #666666;
	line-height: 1.5;
}

.advantages-section {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 30rpx;
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}

.advantages-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: normal;
	color: #000000;
}

.advantages-list {
	display: flex;
	flex-direction: column;
	gap: 0;
}

.advantage-item-wrapper {
	display: flex;
	flex-direction: column;
	gap: 0;
}

.advantage-item-wrapper:not(:last-child) {
	padding-bottom: 24rpx;
}

.advantage-item {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.advantage-divider {
	width: 100%;
	height: 2rpx;
	background-color: #f0f0f0;
	margin-top: 24rpx;
}

.advantage-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: normal;
	color: #000000;
}

.advantage-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: normal;
	color: #666666;
	line-height: 1.5;
}

.enterprise-link {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 20rpx 0;
}

.link-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: normal;
	color: #4A90E2;
}

.link-arrow {
	width: 16rpx;
	height: 24rpx;
}

.footer-button {
	width: calc(100% - 48rpx);
	background-color: #333333;
	padding: 30rpx 0;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 20rpx;
	left: 24rpx;
	right: 24rpx;
	border-radius: 8rpx;
	z-index: 100;
}

.button-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: normal;
	color: #ffffff;
}
</style>

