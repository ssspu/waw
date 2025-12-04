<template>
	<view class="info-page">
		<!-- 自定义导航栏 -->
		<view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="nav-left" @tap="goBack">
					<image class="back-icon" src="https://c.animaapp.com/mi5eklbiAEaKLJ/img/frame-1.svg" mode="aspectFit"></image>
				</view>
				<text class="navbar-title">设计师介绍</text>
			</view>
		</view>

		<!-- 主内容 -->
		<view class="main-content" :style="{ paddingTop: navbarHeight + 'px' }">
			<designer-info-services-section></designer-info-services-section>
		</view>

		<!-- 底部指示器 -->
		<view class="footer-indicator">
			<view class="indicator-dot"></view>
		</view>
	</view>
</template>

<script>
import DesignerInfoServicesSection from '../../components/designer/info/DesignerInfoServicesSection.vue'

export default {
	components: {
		DesignerInfoServicesSection
	},
	data() {
		return {
			statusBarHeight: 44,
			navbarHeight: 0
		}
	},
	onLoad() {
		// 从持久化存储获取状态栏高度
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	onReady() {
		// 计算导航栏总高度
		this.$nextTick(() => {
			const query = uni.createSelectorQuery().in(this)
			query.select('.custom-navbar').boundingClientRect((rect) => {
				if (rect) {
					this.navbarHeight = rect.height
				}
			}).exec()
		})
	},
	methods: {
		goBack() {
			uni.navigateBack()
		}
	}
}
</script>

<style scoped lang="scss">
.info-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.custom-navbar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #ffffff;
	z-index: 100;
	flex-shrink: 0;
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.04);
	display: flex;
	flex-direction: column;
}

.navbar-content {
	width: 100%;
	min-height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30rpx;
	box-sizing: border-box;
	position: relative;
}

.logo {
	position: absolute;
	top: 62rpx;
	right: 30rpx;
	width: 256rpx;
	height: 144rpx;
	max-width: calc(100% - 120rpx);
	object-fit: contain;
	flex-shrink: 0;
}

.nav-left {
	display: flex;
	align-items: center;
	gap: 32rpx;
	flex-shrink: 0;
	width: 64rpx;
	height: 64rpx;
	cursor: pointer;
	justify-content: center;
	position: absolute;
	left: 30rpx;
	z-index: 20;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}

.navbar-title {
	margin-left: 94rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
	font-size: 32rpx;
	color: #111111;
}

.main-content {
	position: relative;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	min-width: 0;
	box-sizing: border-box;
	overflow: hidden;
	background-color: #f2f2f2;
}

.footer-indicator {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: flex-end;
	gap: 20rpx;
	padding: 16rpx 0;
	position: relative;
	flex-shrink: 0;
	box-sizing: border-box;
}

.indicator-dot {
	position: relative;
	width: 268rpx;
	max-width: calc(100% - 240rpx);
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
	flex-shrink: 0;
}
</style>

