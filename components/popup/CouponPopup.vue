<template>
	<view class="popup-overlay" v-if="visible" @tap="handleClose">
		<view class="popup-container" @tap.stop>
			<view class="sheet-handle"></view>
			<!-- 弹窗头部 -->
			<view class="popup-header">
				<text class="popup-title">优惠券</text>
				<view class="close-btn" @tap="handleClose">
					<text class="close-icon">×</text>
				</view>
			</view>
			
			<!-- 优惠券列表 -->
			<scroll-view class="coupon-list" scroll-y>
				<view 
					v-for="coupon in displayCoupons" 
					:key="coupon.id" 
					class="coupon-card"
				>
					<view class="coupon-card-inner">
						<!-- 金额区域 -->
						<view class="coupon-amount">
							<view class="amount-row">
								<text class="amount-symbol">¥</text>
								<text class="amount-value">{{ coupon.amount }}</text>
							</view>
							<text class="amount-condition">{{ coupon.condition }}</text>
						</view>
						
						<!-- 优惠券信息 -->
						<view class="coupon-info">
							<text class="coupon-title">{{ coupon.title }}</text>
							<text class="coupon-desc">{{ coupon.description }}</text>
							<text class="coupon-date">{{ coupon.startDate }} - {{ coupon.endDate }}</text>
							<view class="coupon-progress">
								<text class="progress-text">已领取: {{ coupon.claimed }}张</text>
								<!-- <view class="dot"></view> -->
								<text class="progress-text">剩余: {{ coupon.remaining }}张</text>
							</view>
						</view>
						
						<!-- 领取按钮 -->
						<view class="claim-btn" :class="{ 'claimed': coupon.isClaimed }" @tap="handleClaim(coupon)">
							<text class="claim-text">{{ coupon.isClaimed ? '已领取' : '领取' }}</text>
						</view>
					</view>
				</view>
				
				<!-- 底部提示 -->
				<view class="list-footer">
					<text class="footer-text">没有更多了...</text>
				</view>
			</scroll-view>
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
		coupons: {
			type: Array,
			default: () => [
				{
					id: 1,
					amount: '10',
					condition: '满300元使用',
					title: '洗剪吹优惠券',
					description: '服务类产品均可使用',
					startDate: '2020.05.05',
					endDate: '2020.11.05',
					claimed: 0,
					remaining: 1000,
					isClaimed: false
				},
				{
					id: 2,
					amount: '50',
					condition: '满300元使用',
					title: '洗剪吹优惠券',
					description: '服务类产品均可使用',
					startDate: '2020.05.05',
					endDate: '2020.11.05',
					claimed: 0,
					remaining: 1000,
					isClaimed: false
				},
				{
					id: 3,
					amount: '120',
					condition: '满1000元使用',
					title: '洗剪吹优惠券',
					description: '服务类产品均可使用',
					startDate: '2020.05.05',
					endDate: '2020.11.05',
					claimed: 0,
					remaining: 1000,
					isClaimed: true
				}
			]
		}
	},
	data() {
		return {
			internalCoupons: []
		}
	},
	computed: {
		displayCoupons() {
			return this.internalCoupons.length > 0 ? this.internalCoupons : this.coupons
		}
	},
	watch: {
		coupons: {
			immediate: true,
			deep: true,
			handler(newCoupons) {
				// 深拷贝优惠券数据到内部状态
				this.internalCoupons = JSON.parse(JSON.stringify(newCoupons))
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
			
			// 找到对应的优惠券并更新状态
			const index = this.internalCoupons.findIndex(c => c.id === coupon.id)
			if (index !== -1) {
				// 更新为已领取状态
				this.$set(this.internalCoupons[index], 'isClaimed', true)
				// 更新领取数量
				this.$set(this.internalCoupons[index], 'claimed', this.internalCoupons[index].claimed + 1)
				// 更新剩余数量
				this.$set(this.internalCoupons[index], 'remaining', this.internalCoupons[index].remaining - 1)
			}
			
			// 触发父组件的领取事件
			this.$emit('claim', coupon)
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
	padding: 0;
	box-sizing: border-box;
}

.popup-container {
	width: 100vw;
	max-height: 85vh;
	background-color: #ffffff;
	border-radius: 32rpx 32rpx 0 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	padding-bottom: constant(safe-area-inset-bottom, 0);
	padding-bottom: env(safe-area-inset-bottom, 0);
	box-shadow: 0 -20rpx 40rpx rgba(0, 0, 0, 0.08);
}

.sheet-handle {
	width: 80rpx;
	height: 8rpx;
	border-radius: 100rpx;
	background-color: rgba(0, 0, 0, 0.08);
	align-self: center;
	margin-top: 16rpx;
}

.popup-header {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24rpx 60rpx 32rpx;
	position: relative;
	border-bottom: 1rpx solid #f5f5f5;
}

.popup-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	color: #333333;
}

.close-btn {
	position: absolute;
	right: 30rpx;
	top: 50%;
	transform: translateY(-50%);
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

.coupon-list {
	flex: 1;
	padding: 0 32rpx 40rpx;
	max-height: inherit;
	box-sizing: border-box;
	background-color: #f7f7f7;
}

.coupon-card {
	padding-top: 24rpx;
	&:first-child {
		padding-top: 32rpx;
	}
}

.coupon-card-inner {
	display: flex;
	align-items: stretch;
	background: #ffffff;
	border-radius: 16rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	padding: 28rpx 24rpx;
}

.coupon-amount {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-width: 140rpx;
	margin-right: 28rpx;
	border-right: 1rpx dashed #f0f0f0;
	padding-right: 24rpx;
}

.amount-row {
	display: flex;
	align-items: flex-end;
}

.amount-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	color: #333333;
}

.amount-value {
	font-family: 'DIN-Bold', Helvetica;
	font-size: 48rpx;
	font-weight: bold;
	color: #333333;
	line-height: 1;
}

.amount-condition {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #999999;
	margin-top: 4rpx;
}

.coupon-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	min-width: 0;
	justify-content: center;
}

.coupon-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 30rpx;
	color: #333333;
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

.coupon-progress {
	display: flex;
	gap: 10rpx;
	align-items: center;
}

.progress-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #cccccc;
}

.dot {
	width: 6rpx;
	height: 6rpx;
	border-radius: 50%;
	background-color: #e0e0e0;
}

.claim-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 120rpx;
	height: 64rpx;
	padding: 0 26rpx;
	background-color: #333333;
	border-radius: 12rpx;
	margin-left: 20rpx;
	align-self: center;
	transition: all 0.3s ease;
	
	&.claimed {
		background-color: #e5e5e5;
		pointer-events: none;
	}
}

.claim-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	color: #ffffff;
	
	.claimed & {
		color: #999999;
	}
}

.list-footer {
	display: flex;
	justify-content: center;
	padding: 40rpx 0 20rpx;
}

.footer-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #cccccc;
}
</style>
