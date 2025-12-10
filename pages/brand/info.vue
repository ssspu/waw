<template>
	<view class="info-page">
		<!-- Tab切换 -->
		<brand-info-profile-section
			:active-tab="activeTab"
			@tab-change="handleTabChange"
		></brand-info-profile-section>

		<!-- 主内容 -->
		<view class="main-content">
			<brand-info-services-section :active-tab="activeTab" :brand-id="brandId"></brand-info-services-section>
		</view>
		
		<!-- 底部指示器 -->
		<view class="footer-indicator">
			<view class="indicator-dot"></view>
		</view>
	</view>
</template>

<script>
import BrandInfoProfileSection from '../../components/brand/info/BrandInfoProfileSection.vue'
import BrandInfoServicesSection from '../../components/brand/info/BrandInfoServicesSection.vue'

export default {
	components: {
		BrandInfoProfileSection,
		BrandInfoServicesSection
	},
	data() {
		return {
			activeTab: 'designer',
			brandId: ''
		}
	},
	onLoad(options) {
		if (options.id) {
			this.brandId = options.id
		}
	},
	methods: {
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

.navbar-tabs {
	width: 100%;
	margin-top: -40rpx;
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

























