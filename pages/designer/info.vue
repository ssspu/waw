<template>
	<view class="info-page">
		<!-- 自定义导航栏 -->
		<view class="custom-navbar">
			<view class="status-bar-spacer"></view>
			<view class="navbar-content">
				<view class="nav-left" @tap="goBack">
					<image class="back-icon" src="https://c.animaapp.com/mi5eklbiAEaKLJ/img/frame-1.svg" mode="aspectFit"></image>
				</view>

			</view>

			<designer-info-profile-section
				class="navbar-tabs"
				:active-tab="activeTab"
				@tab-change="handleTabChange"
			></designer-info-profile-section>
		</view>
		
		<!-- 主内容 -->
		<view class="main-content">
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
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.04);
	display: flex;
	flex-direction: column;
	border-bottom: 2rpx solid #f1f1f1;
}

.status-bar-spacer {
	height: 80rpx;
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
	width: 64rpx;
	height: 64rpx;
	justify-content: center;
	position: absolute;
	right: 30rpx;
}

.navbar-tabs {
	width: 100%;
	margin-top: -40rpx;
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
	padding-top: 12rpx;
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

