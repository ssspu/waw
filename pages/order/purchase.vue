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

				<!-- 自定义导航栏 -->
				<view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
					<view class="navbar-content">
						<view class="back-btn" @click="handleBack">
							<image
								class="back-icon"
								src="https://c.animaapp.com/mifnbli6udxphC/img/frame-1877.svg"
								mode="aspectFit"
							></image>
						</view>
						<text class="nav-title">洗剪吹</text>
					</view>
				</view>

				<!-- 右上角详情区域 -->
				<ServicePurchaseDetailsSection />
			</view>

			<!-- 主内容区域 -->
			<view class="content-wrapper">
				<ServicePurchaseProfileSection ref="profileSection" @favorite-change="handleFavoriteChange" />
			</view>
		</scroll-view>

		<!-- 底部导航栏 -->
		<ServicePurchaseFooter :is-favorited="isFavorited" @favorite-change="handleFooterFavoriteChange" />
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
			statusBarHeight: 44,
			serviceId: '',
			isFavorited: false
		}
	},
	onLoad(options) {
		// 从持久化存储获取状态栏高度
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44

		if (options.id) {
			this.serviceId = options.id
		}
	},
	methods: {
		handleBack() {
			const pages = getCurrentPages && getCurrentPages()
			if (pages && pages.length > 1) {
				uni.navigateBack()
			} else {
				uni.switchTab({
					url: '/pages/main/index'
				})
			}
		},
		handleFavoriteChange(isFavorited) {
			this.isFavorited = isFavorited
		},
		handleFooterFavoriteChange(isFavorited) {
			this.isFavorited = isFavorited
			if (this.$refs.profileSection) {
				this.$refs.profileSection.isFavorited = isFavorited
			}
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

// 自定义导航栏
.custom-navbar {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 30;
}

.navbar-content {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx;
	gap: 16rpx;
}

.back-btn {
	width: 64rpx;
	height: 64rpx;
	border-radius: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	flex-shrink: 0;
}

.back-icon {
	width: 60rpx;
	height: 60rpx;
	flex-shrink: 0;
	filter: brightness(0) invert(1);
}

.nav-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #ffffff;
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






