<template>
	<view class="info-page">
		<!-- 主内容 -->
		<view class="main-content">
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
		return {}
	},
	methods: {}
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

