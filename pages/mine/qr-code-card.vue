<template>
	<view class="qr-code-page">
		<view class="status-bar-space"></view>
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		
		<!-- 导航栏 -->
		<view class="navbar">
			<view class="navbar-content">
				<view class="back-btn" @tap="handleBack">
					<image 
						class="back-icon" 
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" 
						mode="aspectFit"
					></image>
				</view>
				<text class="navbar-title">二维码名片</text>
			</view>
		</view>
		
		<!-- 主内容 -->
		<view class="main-content">
			<!-- 白色卡片 -->
			<view class="card-container">
				<!-- 用户资料部分 -->
				<view class="user-profile">
					<image 
						class="avatar" 
						src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-77.svg" 
						mode="aspectFill"
					></image>
					<view class="user-info">
						<view class="name-row">
							<text class="user-name">李天天</text>
							<text class="user-title">美发师</text>
							<view class="badge">
								<text class="badge-text">高级</text>
							</view>
						</view>
						<text class="user-location">四川 | 成都</text>
					</view>
				</view>
				
				<!-- 二维码 -->
				<view class="qr-code-section">
					<view class="qr-code-wrapper">
						<image 
							class="qr-code-image" 
							src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-2117.svg" 
							mode="aspectFit"
						></image>
					</view>
				</view>
				
				<!-- 提示文字 -->
				<text class="instruction-text">使用众美扫码,关注TA</text>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="action-bar">
			<view class="action-btn" @tap="handleScan">
				<view class="action-icon-wrapper">
					<image 
						class="action-icon" 
						src="/static/icon/saoyisao.png" 
						mode="aspectFit"
					></image>
				</view>
				<text class="action-text">扫一扫</text>
			</view>
			<view class="action-btn" @tap="handleSave">
				<view class="action-icon-wrapper">
					<image 
						class="action-icon" 
						src="/static/icon/xiazai.png" 
						mode="aspectFit"
					></image>
				</view>
				<text class="action-text">保存到相册</text>
			</view>
			<view class="action-btn" @tap="handleShare">
				<view class="action-icon-wrapper">
					<image 
						class="action-icon" 
						src="/static/icon/zhuanfa.png" 
						mode="aspectFit"
					></image>
				</view>
				<text class="action-text">转发</text>
			</view>
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
		handleScan() {
			uni.showToast({ title: '扫一扫', icon: 'none' })
		},
		handleSave() {
			uni.showToast({ title: '保存到相册', icon: 'none' })
		},
		handleShare() {
			uni.showToast({ title: '转发', icon: 'none' })
		}
	}
}
</script>

<style scoped lang="scss">
.qr-code-page {
	width: 100%;
	min-height: 100vh;
	background-color: #ffffff;
	position: relative;
	display: flex;
	flex-direction: column;
}

.status-bar {
	height: 44rpx;
	width: 100%;
}

.navbar {
	position: relative;
	width: 100%;
	background-color: #ffffff;
	z-index: 10;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
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
	position: absolute;
	left: 50%;
	transform: translateX(-50%);	
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
	align-items: flex-start;
	justify-content: center;
	padding-top: 40rpx;
}

.card-container {
	width: 100%;
	background-color: #f2f2f2;
	border-radius: 16rpx;
	padding: 40rpx 32rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 48rpx;
	box-sizing: border-box;
}

.user-profile {
	display: flex;
	align-items: flex-start;
	gap: 24rpx;
	width: 100%;
}

.avatar {
	width: 132rpx;
	height: 132rpx;
	border-radius: 50%;
	flex-shrink: 0;
}

.user-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	padding-top: 8rpx;
}

.name-row {
	display: flex;
	align-items: center;
	gap: 12rpx;
	flex-wrap: wrap;
}

.user-name {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: normal;
	color: #000000;
}

.user-title {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: normal;
	color: #666666;
}

.badge {
	background-color: #d4a574;
	border-radius: 6rpx;
	padding: 2rpx 10rpx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 32rpx;
}

.badge-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	font-weight: normal;
	color: #ffffff;
}

.user-location {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: normal;
	color: #a6a6a6;
}

.qr-code-section {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
}

.qr-code-wrapper {
	width: 400rpx;
	height: 400rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ffffff;
}

.qr-code-image {
	width: 100%;
	height: 100%;
}

.instruction-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: normal;
	color: #a6a6a6;
	text-align: center;
	margin-top: -20rpx;
}

.action-bar {
	width: 100%;
	background-color: #ffffff;
	padding: 20rpx 0 60rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	box-sizing: border-box;
}

.action-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
	cursor: pointer;
}

.action-icon-wrapper {
	width: 120rpx;
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ffffff;
	border-radius: 50%;
	border: 2rpx solid #f0f0f0;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.action-icon {
	width: 64rpx;
	height: 64rpx;
}

.action-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: normal;
	color: #333333;
}
</style>

