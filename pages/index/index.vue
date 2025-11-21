<template>
	<view class="screen">
		<!-- 状态栏占位 -->
		<view class="status-bar" style="height: 44rpx;"></view>
		
		<!-- 状态栏内容 -->
	<!-- 	<view class="header">
			<text class="time">9:41</text>
			<view class="status-icons">
				<image class="status-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/cellular-connection.svg" mode="aspectFit"></image>
				<image class="status-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/wifi.svg" mode="aspectFit"></image>
				<image class="status-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/battery.png" mode="aspectFit"></image>
			</view>
		</view> -->
		
		<!-- Logo 组 -->
	<!-- 	<image 
			class="logo-group animate-fade-in" 
			style="animation-delay: 400ms;"
			src="https://c.animaapp.com/mi4v97d2OSuz2g/img/group-7.png" 
			mode="aspectFit"
		></image> -->
		
		<!-- 位置和角色 Badge -->
		<view class="location-badge animate-fade-in" style="animation-delay: 400ms;">
			<view class="badge-content">
				<view class="location-info">
					<text class="location-text">成都市</text>
					<text class="chevron-down">▼</text>
				</view>
				<view class="divider"></view>
				<view class="role-info">
					<image class="role-icon" src="https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-3.svg" mode="aspectFit"></image>
					<text class="role-text">设计师</text>
				</view>
			</view>
		</view>
		
		<!-- Logo -->
		<image 
			class="logo animate-fade-in" 
			style="animation-delay: 600ms;"
			src="https://c.animaapp.com/mi4v97d2OSuz2g/img/image-23.png" 
			mode="aspectFit"
		></image>
		
		<!-- 主内容区域 -->
		<view class="content-wrapper">
			<!-- Profile Header Section -->
			<view class="profile-header-section animate-fade-in" style="animation-delay: 800ms;">
				<view class="profile-header-card">
					<image 
						class="profile-bg" 
						src="https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-177.png" 
						mode="aspectFill"
					></image>
					<text class="profile-title">WAW style</text>
					<view class="profile-overlay"></view>
				</view>
			</view>
			
			<!-- Profile Section -->
			<profile-section></profile-section>
		</view>
		
		<!-- Gallery Section (Bottom Navigation) -->
		<gallery-section></gallery-section>
	</view>
</template>

<script>
import ProfileSection from '../../components/index/index/ProfileSection.vue'
import GallerySection from '../../components/index/index/GallerySection.vue'

export default {
	components: {
		ProfileSection,
		GallerySection
	},
	data() {
		return {
			
		}
	},
	onLoad() {
		
	}
}
</script>

<style scoped lang="scss">
.screen {
	width: 100%;
	// min-height: 100vh;
	background-color: #f2f2f2;
	// position: relative;
	padding-bottom: 192rpx; //底部tab空出
}

.status-bar {
	height: 44rpx;
}

.header {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 36rpx;
	box-sizing: border-box;
}

.time {
	font-family: 'Inter', Helvetica;
	font-size: 28rpx;
	color: #333333;
	font-weight: normal;
}

.status-icons {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.status-icon {
	width: 18rpx;
	height: 18rpx;
}

.logo-group {
	position: absolute;
	top: 62rpx;
	left: 494rpx;
	width: 256rpx;
	height: 144rpx;
}

.location-badge {
	position: absolute;
	top: 104rpx;
	left: 154rpx;
	width: 362rpx;
	height: 60rpx;
	background-color: #ffffff;
	border-radius: 52rpx;
	padding: 0 24rpx;
	display: flex;
	align-items: center;
	box-sizing: border-box;
}

.badge-content {
	display: flex;
	align-items: center;
	width: 100%;
	gap: 16rpx;
}

.location-info {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.location-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #333333;
}

.chevron-down {
	font-size: 14rpx;
	color: #333333;
}

.divider {
	width: 2rpx;
	height: 30rpx;
	background-color: #e5e5e5;
}

.role-info {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.role-icon {
	width: 36rpx;
	height: 36rpx;
}

.role-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #a6a6a6;
}

.logo {
	position: absolute;
	top: 118rpx;
	left: 30rpx;
	width: 104rpx;
	height: 30rpx;
}

.content-wrapper {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 180rpx;
}

.profile-header-section {
	width: 100%;
	max-width: 750rpx;
	margin: 0 auto;
}

.profile-header-card {
	width: 100%;
	height: 374rpx;
	background-color: #ffffff;
	border-radius: 12rpx;
	position: relative;
	overflow: hidden;
}

.profile-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 376rpx;
	z-index: 2;
}

.profile-title {
	position: absolute;
	top: 60rpx;
	left: 0;
	width: 100%;
	font-family: 'DIN_BlackAlternate-Regular', Helvetica;
	font-size: 145rpx;
	font-weight: 700;
	color: #333333;
	text-align: center;
	white-space: nowrap;
	z-index: 1;
}

.profile-overlay {
	position: absolute;
	top: 312rpx;
	left: 0;
	width: 100%;
	height: 64rpx;
	background: rgba(255, 255, 255, 0.23);
	backdrop-filter: blur(21.1rpx);
	-webkit-backdrop-filter: blur(21.1rpx);
	z-index: 2;
}

/* 动画 */
@keyframes fade-in {
	0% {
		opacity: 0;
		transform: translateY(-20rpx);
	}
	to {
		opacity: 1;
		transform: none;
	}
}

.animate-fade-in {
	animation: fade-in 1s ease forwards;
	opacity: 0;
}
</style>
