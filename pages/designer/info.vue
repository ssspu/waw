<template>
	<view class="info-page">
		<!-- 自定义导航栏 -->
		<view class="custom-navbar">
			<view class="navbar-content">
				<view class="nav-left" @tap="goBack">
					<image class="back-icon" src="https://c.animaapp.com/mi5eklbiAEaKLJ/img/chevron-left.svg" mode="aspectFit"></image>
				</view>
		
				<view class="nav-right" @tap="goBack">
					<image class="share-icon" src="https://c.animaapp.com/mi5eklbiAEaKLJ/img/frame-1.svg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		
		<!-- 主内容 -->
		<view class="main-content">
			<designer-info-profile-section @tab-change="handleTabChange"></designer-info-profile-section>
			<designer-info-services-section :active-tab="activeTab"></designer-info-services-section>
		</view>
		
		<!-- 底部指示器 -->
		<view class="footer-indicator">
			<view class="indicator-dot"></view>
		</view>
	</view>
</template>

<script>
import DesignerInfoProfileSection from '../../components/designer/info/DesignerInfoProfileSection.vue'
import DesignerInfoServicesSection from '../../components/designer/info/DesignerInfoServicesSection.vue'

export default {
	components: {
		DesignerInfoProfileSection,
		DesignerInfoServicesSection
	},
	data() {
		return {
			activeTab: 'designer'
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		handleTabChange(tab) {
			this.activeTab = tab
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
	position: relative;
	width: 100%;
	background-color: #ffffff;
	z-index: 10;
	flex-shrink: 0;
	box-sizing: border-box;
}

.navbar-content {
	width: 100%;
	min-height: 252rpx;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 116rpx 30rpx 0;
	box-sizing: border-box;
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
	cursor: pointer;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}

.nav-right {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 12rpx;
	flex-shrink: 0;
	cursor: pointer;
	z-index: 2;
	background-color: #ffffff;
	padding: 12rpx 20rpx;
	border-radius: 8rpx;
	box-sizing: border-box;
}

.share-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}

.main-content {
	position: relative;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	min-width: 0;
	box-sizing: border-box;
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

