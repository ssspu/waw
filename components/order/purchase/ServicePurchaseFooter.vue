<template>
	<view class="footer-section">
		<view class="navigation-bar">
			<!-- 客服按钮 -->
			<view
				class="nav-item"
				@tap="handleCustomerService"
			>
				<image
					class="nav-icon"
					src="https://c.animaapp.com/mifnbli6udxphC/img/frame-2.svg"
					mode="aspectFit"
				></image>
				<text class="nav-label">客服</text>
			</view>

			<!-- 店铺按钮 -->
			<view
				class="nav-item"
				@tap="handleShop"
			>
				<image
					class="nav-icon"
					src="https://c.animaapp.com/mifnbli6udxphC/img/frame-4.svg"
					mode="aspectFit"
				></image>
				<text class="nav-label">店铺</text>
			</view>

			<!-- 收藏按钮 -->
			<view
				class="nav-item"
				@tap="handleFavorite"
			>
				<image
					class="nav-icon"
					:src="localFavorited ? '/static/icon/favorite-active.png' : 'https://c.animaapp.com/mifnbli6udxphC/img/frame-6.svg'"
					mode="aspectFit"
				></image>
				<text class="nav-label">{{ localFavorited ? '已收藏' : '收藏' }}</text>
			</view>

			<!-- 立即预定按钮 -->
			<view
				class="booking-btn"
				@tap="handleBooking"
			>
				<text class="booking-text">立即预定</text>
			</view>
		</view>

		<!-- 底部指示器 -->
		<view class="bottom-indicator">
			<!-- <view class="indicator-bar"></view> -->
		</view>
	</view>
</template>

<script>
import api from '@/api'

export default {
	name: 'ServicePurchaseFooter',
	props: {
		serviceId: {
			type: [String, Number],
			default: ''
		},
		designerId: {
			type: [String, Number],
			default: ''
		},
		isFavorited: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			localFavorited: false
		}
	},
	watch: {
		isFavorited: {
			immediate: true,
			handler(val) {
				this.localFavorited = val
			}
		}
	},
	methods: {
		handleCustomerService() {
			uni.navigateTo({
				url: '/pages/mine/customer-service'
			})
		},
		handleShop() {
			if (this.designerId) {
				uni.navigateTo({
					url: `/pages/designer/detail?id=${this.designerId}`
				})
			}
		},
		async handleFavorite() {
			if (!this.serviceId) return
			try {
				if (this.localFavorited) {
					await api.service.unfavorite(this.serviceId)
					this.localFavorited = false
					uni.showToast({
						title: '已取消收藏',
						icon: 'success'
					})
				} else {
					await api.service.favorite(this.serviceId)
					this.localFavorited = true
					uni.showToast({
						title: '已收藏',
						icon: 'success'
					})
				}
				this.$emit('favorite-change', this.localFavorited)
			} catch (err) {
				console.error('收藏操作失败:', err)
			}
		},
		handleBooking() {
			if (this.designerId) {
				uni.navigateTo({
					url: `/pages/designer/booking?id=${this.designerId}`
				})
			} else {
				uni.navigateTo({
					url: '/pages/designer/booking'
				})
			}
		}
	}
}
</script>

<style scoped lang="scss">
.footer-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	background-color: #ffffff;
	box-shadow: 0px -2rpx 0px rgba(0, 0, 0, 0.04);
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	opacity: 0;
	transform: translateY(-32rpx);
	animation: fadeIn 0.5s ease-out forwards;
	animation-delay: 800ms;
}

.navigation-bar {
	display: flex;
	width: 100%;
	height: 98rpx;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	padding: 0 20rpx;
}

.nav-item {
	display: flex;
	flex-direction: column;
	width: 61rpx;
	align-items: center;
	justify-content: center;
	gap: 4rpx;
	transition: opacity 0.3s;
}

.nav-item:active {
	opacity: 0.7;
}

.nav-icon {
	width: 40rpx;
	height: 40rpx;
}

.nav-icon.is-favorited {
	filter: invert(79%) sepia(65%) saturate(1000%) hue-rotate(359deg) brightness(103%) contrast(106%);
}

.nav-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #a6a6a6;
	line-height: normal;
}

.booking-btn {
	height: 84rpx;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 16rpx 30rpx;
	background-color: #333333;
	border-radius: 4rpx;
	transition: opacity 0.3s;
}

.booking-btn:active {
	opacity: 0.8;
}

.booking-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #ffffff;
	line-height: normal;
}

.bottom-indicator {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 68rpx;
	align-items: center;
	justify-content: flex-end;
	gap: 20rpx;
	padding: 0 240rpx 16rpx;
	background-color: #ffffff;
}

.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}

@keyframes fadeIn {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>































