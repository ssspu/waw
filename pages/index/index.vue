<template>
	<view class="screen">
		<!-- 顶部白色背景 -->
		<view class="top-white-bg" :style="{ height: (statusBarHeight + 88 + 374) + 'px' }"></view>

		<!-- 自定义导航栏 -->
		<view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<!-- Logo -->
				<image
					class="logo animate-fade-in"
					style="animation-delay: 400ms;"
					src="https://c.animaapp.com/mi4v97d2OSuz2g/img/image-23.png"
					mode="aspectFit"
				></image>

				<!-- 位置和角色 Badge -->
				<view class="location-badge animate-fade-in" style="animation-delay: 600ms;" @tap="handleSearchClick">
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
			</view>
		</view>

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

		<!-- 底部导航 -->
		<bottom-tab-bar active="service"></bottom-tab-bar>
	</view>
</template>

<script>
import ProfileSection from '../../components/index/index/ProfileSection.vue'
import BottomTabBar from '../../components/common/BottomTabBar.vue'

export default {
	components: {
		ProfileSection,
		BottomTabBar
	},
	data() {
		return {
			statusBarHeight: 44
		}
	},
	onLoad() {
		// 从持久化存储获取状态栏高度
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	methods: {
		handleSearchClick() {
			uni.navigateTo({
				url: '/pages/main/search'
			})
		}
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
	position: relative;
}

.top-white-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 0;
}

// 自定义导航栏
.custom-navbar {
	background-color: #ffffff;
	position: relative;
	width: 100%;
	z-index: 10;
}

.navbar-content {
	display: flex;
	align-items: center;
	height: 88rpx;
	padding: 0 30rpx;
	gap: 20rpx;
}

.logo {
	width: 104rpx;
	height: 30rpx;
}

.location-badge {
	height: 60rpx;
	width: 380rpx;
	background-color: #ffffff;
	border-radius: 52rpx;
	padding: 0 32rpx;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	border: 1rpx solid #e5e5e5;
}

.badge-content {
	display: flex;
	align-items: center;
	width: 100%;
	gap: 18rpx;
}

.location-info {
	display: flex;
	align-items: center;
	gap: 6rpx;
	flex-shrink: 0;
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
	flex: 1;
	justify-content: center;
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

.content-wrapper {
	width: 100%;
	display: flex;
	flex-direction: column;
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
