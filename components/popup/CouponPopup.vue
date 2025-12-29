<template>
	<view class="popup-overlay" v-if="visible" @tap="handleClose">
		<view class="popup-container" @tap.stop>
			<!-- 弹窗头部 -->
			<view class="popup-header">
				<text class="popup-title">优惠券</text>
				<text v-if="mode === 'select'" class="popup-subtitle">已选择推荐券，{{ selectedCount }}张共优惠 ¥ {{ totalDiscount }}</text>
				<view class="close-btn" @tap="handleClose">
					<text class="close-icon">×</text>
				</view>
			</view>

			<!-- 择模式下的统计信息 -->
			<view v-if="mode === 'select'" class="select-summary">
				<view class="summary-left">
					<text class="summary-text">已选择{{ selectedCount }}张券，共优惠 </text>
					<text class="summary-price">¥ {{ totalDiscount }}</text>
				</view>
				<view class="summary-right" @tap="handleAutoSelect">
					<text class="auto-select-text">已选择推荐券</text>
				</view>
			</view>

			<!-- 优惠券列表 -->
			<scroll-view class="coupon-list" scroll-y>
				<view
					v-for="coupon in displayCoupons"
					:key="coupon.id"
					class="coupon-card"
				>
					<view
						class="coupon-card-inner"
						:class="{ 'selected': mode === 'select' && selectedCouponId === coupon.id }"
						@tap="mode === 'select' ? handleSelect(coupon) : null"
					>
						<!-- 左侧金额区域 -->
						<view class="coupon-left">
							<view class="amount-row">
								<text class="amount-symbol">¥</text>
								<text class="amount-value">{{ coupon.amount || coupon.discount }}</text>
							</view>
							<text class="amount-condition">{{ coupon.condition || `满${coupon.minAmount}元使用` }}</text>
						</view>

						<!-- 右侧信息区域 -->
						<view class="coupon-right">
							<view class="coupon-main">
								<text class="coupon-title">{{ coupon.title }}</text>
								<text class="coupon-desc">{{ coupon.description || '服务类产品均可使用' }}</text>
								<text class="coupon-date">有效期至：{{ coupon.startDate ? coupon.endDate : coupon.validUntil }}</text>
							</view>

							<view v-if="mode === 'select'" class="select-radio" :class="{ 'checked': selectedCouponId === coupon.id }">
								<text v-if="selectedCouponId === coupon.id" class="radio-check">✓</text>
							</view>

							<!-- 领取按钮（领取模式） -->
							<view v-if="mode === 'claim'" class="claim-btn" :class="{ 'claimed': coupon.isClaimed }" @tap.stop="handleClaim(coupon)">
								<text class="claim-text">{{ coupon.isClaimed ? '已领取' : '领取' }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 底部提示 -->
				<view class="list-footer">
					<text class="footer-text">没有更多了...</text>
				</view>
			</scroll-view>

			<!-- 确认按钮 -->
			<view class="confirm-section">
				<view class="confirm-btn" @tap="handleConfirmSelect">
					<text class="confirm-text">确认</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CouponPopup',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		
		mode: {
			type: String,
			default: 'claim'
		},
		
		selectedId: {
			type: [Number, String, null],
			default: null
		},
		coupons: {
			type: Array,
			default: () => [
				{
					id: 1,
					amount: '21',
					condition: '满30可用',
					minAmount: 30,
					tag: '商家券',
					title: '吃不胖饰品的店',
					description: '服务类产品均可使用',
					validUntil: '2026.02.13 17:57',
					isClaimed: false
				},
				{
					id: 2,
					amount: '21',
					condition: '满30可用',
					minAmount: 30,
					tag: '商家券',
					title: '吃不胖饰品的店',
					description: '服务类产品均可使用',
					validUntil: '2026.02.13 17:57',
					isClaimed: false
				}
			]
		}
	},
	data() {
		return {
			internalCoupons: [],
			selectedCouponId: null,
			tempSelectedCoupon: null,
			expandedCouponId: null
		}
	},
	computed: {
		displayCoupons() {
			return this.internalCoupons.length > 0 ? this.internalCoupons : this.coupons
		},
		selectedCount() {
			return this.selectedCouponId !== null ? 1 : 0
		},
		totalDiscount() {
			if (this.tempSelectedCoupon) {
				return parseFloat(this.tempSelectedCoupon.amount || this.tempSelectedCoupon.discount) || 0
			}
			return 0
		}
	},
	watch: {
		coupons: {
			immediate: true,
			deep: true,
			handler(newCoupons) {
				this.internalCoupons = JSON.parse(JSON.stringify(newCoupons))
			}
		},
		visible: {
			handler(newVal) {
				if (newVal && this.mode === 'select') {
					this.selectedCouponId = this.selectedId
					this.tempSelectedCoupon = this.selectedId ? this.coupons.find(c => c.id === this.selectedId) : null
					this.expandedCouponId = null
				}
			}
		},
		selectedId: {
			immediate: true,
			handler(newVal) {
				this.selectedCouponId = newVal
			}
		}
	},
	methods: {
		handleClose() {
			this.$emit('close')
		},
		handleClaim(coupon) {
			if (coupon.isClaimed) {
				return
			}
			const index = this.internalCoupons.findIndex(c => c.id === coupon.id)
			if (index !== -1) {
				this.$set(this.internalCoupons[index], 'isClaimed', true)
				if (this.internalCoupons[index].claimed !== undefined) {
					this.$set(this.internalCoupons[index], 'claimed', this.internalCoupons[index].claimed + 1)
				}
				if (this.internalCoupons[index].remaining !== undefined) {
					this.$set(this.internalCoupons[index], 'remaining', this.internalCoupons[index].remaining - 1)
				}
			}
			this.$emit('claim', coupon)
		},
		handleSelect(coupon) {
			if (coupon === null) {
				this.selectedCouponId = null
				this.tempSelectedCoupon = null
			} else {
				this.selectedCouponId = coupon.id
				this.tempSelectedCoupon = coupon
			}
		},
		handleAutoSelect() {
			
			if (this.displayCoupons.length > 0) {
				const bestCoupon = this.displayCoupons.reduce((prev, current) => {
					const prevAmount = parseFloat(prev.amount || prev.discount) || 0
					const currentAmount = parseFloat(current.amount || current.discount) || 0
					return currentAmount > prevAmount ? current : prev
				})
				this.handleSelect(bestCoupon)
			}
		},
		toggleDetail(couponId) {
			if (this.expandedCouponId === couponId) {
				this.expandedCouponId = null
			} else {
				this.expandedCouponId = couponId
			}
		},
		handleConfirmSelect() {
			this.$emit('select', this.tempSelectedCoupon)
			this.$emit('close')
		}
	}
}
</script>

<style scoped lang="scss">
.popup-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
	display: flex;
	align-items: flex-end;
	justify-content: center;
}

.popup-container {
	width: 100vw;
	max-height: 80vh;
	background-color: #ffffff;
	border-radius: 24rpx 24rpx 0 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.popup-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 32rpx 60rpx 20rpx;
	position: relative;
	border-bottom: 1rpx solid #f5f5f5;
}

.popup-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	color: #333333;
	font-weight: 600;
}

.popup-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #999999;
	margin-top: 8rpx;
}

.close-btn {
	position: absolute;
	right: 30rpx;
	top: 32rpx;
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.close-icon {
	font-size: 40rpx;
	color: #999999;
	line-height: 1;
}


.select-summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 32rpx;
	background-color: #f8f8f8;
	border-radius: 12rpx;
	margin: 16rpx 24rpx;
}

.summary-left {
	display: flex;
	align-items: center;
}

.summary-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #333333;
}

.summary-price {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	color: #333333;
	font-weight: 600;
}

.summary-right {
	display: flex;
	align-items: center;
}

.auto-select-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #666666;
}


.coupon-list {
	flex: 1;
	padding: 0 24rpx;
	max-height: inherit;
	box-sizing: border-box;
	background-color: #f7f7f7;
}

.coupon-card {
	margin-bottom: 20rpx;

	&:first-child {
		margin-top: 24rpx;
	}
}

.coupon-card-inner {
	display: flex;
	align-items: stretch;
	background: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
}

.coupon-card-inner.selected {
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}


.coupon-left {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-width: 160rpx;
	padding: 28rpx 20rpx;
	background-color: #ffffff;
	border-right: 1rpx dashed #e8e8e8;
}

.amount-row {
	display: flex;
	align-items: baseline;
}

.amount-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	color: #333333;
	font-weight: 600;
}

.amount-value {
	font-family: 'DIN-Bold', Helvetica;
	font-size: 56rpx;
	font-weight: bold;
	color: #333333;
	line-height: 1;
}

.amount-condition {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #999999;
	margin-top: 8rpx;
}


.coupon-right {
	flex: 1;
	display: flex;
	align-items: center;
	padding: 20rpx 24rpx;
	background-color: #ffffff;
}

.coupon-main {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.coupon-title-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.coupon-tag {
	display: none;
}

.coupon-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
}

.coupon-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #999999;
}

.coupon-date {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #999999;
}

.coupon-detail-row {
	display: flex;
	align-items: center;
	gap: 4rpx;
	margin-top: 4rpx;
}

.detail-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #cccccc;
}

.detail-arrow {
	font-size: 18rpx;
	color: #cccccc;
}

.coupon-detail-content {
	padding-top: 12rpx;
	border-top: 1rpx solid #f5f5f5;
	margin-top: 8rpx;
}

.detail-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #999999;
	line-height: 1.5;
}

.coupon-progress {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-top: 4rpx;
}

.progress-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #cccccc;
}


.select-radio {
	width: 44rpx;
	height: 44rpx;
	border-radius: 50%;
	border: 2rpx solid #e0e0e0;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	margin-left: 16rpx;

	&.checked {
		background-color: #333333;
		border-color: #333333;
	}
}

.radio-check {
	color: #ffffff;
	font-size: 24rpx;
	font-weight: bold;
	line-height: 1;
}


.claim-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 120rpx;
	height: 64rpx;
	padding: 0 24rpx;
	background-color: #333333;
	border-radius: 32rpx;
	margin-left: 16rpx;

	&.claimed {
		background-color: #f5f5f5;
		border: 1rpx solid #e0e0e0;
		pointer-events: none;
	}
}

.claim-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	color: #ffffff;
}

.claim-btn.claimed .claim-text {
	color: #999999;
}


.no-coupon-card {
	padding: 32rpx 24rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

	&.selected {
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
	}
}

.no-coupon-content {
	flex: 1;
}

.no-coupon-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	color: #333333;
}


.list-footer {
	display: flex;
	justify-content: center;
	padding: 32rpx 0 20rpx;
}

.footer-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #cccccc;
}


.confirm-section {
	padding: 24rpx 32rpx;
	padding-bottom: calc(24rpx + constant(safe-area-inset-bottom, 0));
	padding-bottom: calc(24rpx + env(safe-area-inset-bottom, 0));
	background-color: #ffffff;
	border-top: 1rpx solid #f5f5f5;
}

.confirm-btn {
	width: 100%;
	height: 88rpx;
	background-color: #333333;
	border-radius: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.confirm-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	color: #ffffff;
	font-weight: 600;
}
</style>
