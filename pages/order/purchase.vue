<template>
	<view class="service-purchase-page">
		<scroll-view class="page-scroll" scroll-y enable-back-to-top>
			<!-- 头部背景图片 -->
			<view class="header-section">
				<image 
					class="header-bg-image" 
					src="https://c.animaapp.com/mifnbli6udxphC/img/rectangle-186.png" 
					mode="aspectFill"
				></image>
				
				<!-- Logo -->
				<view class="logo-wrapper">
					<image 
						class="logo-image" 
						src="https://c.animaapp.com/mifnbli6udxphC/img/group-7.png" 
						mode="aspectFit"
					></image>
				</view>
				
				<!-- 返回按钮 -->
				<view class="back-btn" @tap="handleBack">
					<image 
						class="back-icon" 
						src="https://c.animaapp.com/mifnbli6udxphC/img/frame-1877.svg" 
						mode="aspectFit"
					></image>
				</view>
				
				<!-- 标题 -->
				<text class="page-title">洗剪吹</text>
				
				<!-- 右上角详情区域 -->
				<ServicePurchaseDetailsSection />
			</view>
			
			<!-- 主内容区域 -->
			<view class="content-wrapper">
				<ServicePurchaseProfileSection />
			</view>
		</scroll-view>
		
		<!-- 底部导航栏 -->
		<ServicePurchaseFooter />
	</view>
</template>

<script>
import ServicePurchaseDetailsSection from '../../components/order/purchase/ServicePurchaseDetailsSection.vue'
import ServicePurchaseProfileSection from '../../components/order/purchase/ServicePurchaseProfileSection.vue'
import ServicePurchaseFooter from '../../components/order/purchase/ServicePurchaseFooter.vue'

export default {
	components: {
		ServicePurchaseDetailsSection,
		ServicePurchaseProfileSection,
		ServicePurchaseFooter
	},
	data() {
		return {
			serviceId: ''
		}
	},
	onLoad(options) {
		if (options.id) {
			this.serviceId = options.id
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		}
	}
}
</script>

<style scoped lang="scss">
.service-purchase-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.page-scroll {
	flex: 1;
	width: 100%;
}

.header-section {
	position: relative;
	width: 100%;
	height: 600rpx;
	flex-shrink: 0;
}

.header-bg-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.logo-wrapper {
	position: absolute;
	top: 62rpx;
	left: 494rpx;
	width: 256rpx;
	height: 144rpx;
	z-index: 10;
}

.logo-image {
	width: 100%;
	height: 100%;
}

.back-btn {
	position: absolute;
	top: 102rpx;
	left: 30rpx;
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	opacity: 0;
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 0ms;
}

.back-icon {
	width: 100%;
	height: 100%;
}

.page-title {
	position: absolute;
	top: 112rpx;
	left: 114rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 30rpx;
	font-weight: 500;
	color: #ffffff;
	z-index: 10;
	opacity: 0;
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 200ms;
}

.content-wrapper {
	position: relative;
	top: -40rpx;
	width: 100%;
	min-height: calc(100vh - 460rpx);
	background-color: #f2f2f2;
	border-radius: 40rpx 40rpx 0 0;
	padding-top: 40rpx;
	opacity: 0;
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 600ms;
}

@keyframes fadeIn {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>






