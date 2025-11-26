<template>
	<view class="popup-overlay" v-if="visible" @tap="handleClose">
		<view class="popup-container" @tap.stop>
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
					v-for="coupon in coupons" 
					:key="coupon.id" 
					class="coupon-card"
				>
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
							<text class="progress-text">已领取:{{ coupon.claimed }}张</text>
							<text class="progress-text">剩余:{{ coupon.remaining }}张</text>
						</view>
					</view>
					
					<!-- 领取按钮 -->
					<view class="claim-btn" :class="{ 'claimed': coupon.isClaimed }" @tap="handleClaim(coupon)">
						<text class="claim-text">{{ coupon.isClaimed ? '已领取' : '领取' }}</text>
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
	methods: {
		handleClose() {
			this.$emit('close')
		},
		handleClaim(coupon) {
			if (!coupon.isClaimed) {
				this.$emit('claim', coupon)
			}
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
	align-items: center;
	justify-content: center;
}

.popup-container {
	width: 600rpx;
	max-height: 80vh;
	background-color: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.popup-header {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 30rpx;
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
	padding: 20rpx 30rpx;
	max-height: 60vh;
}

.coupon-card {
	display: flex;
	align-items: center;
	padding: 24rpx 0;
	border-bottom: 1rpx solid #f5f5f5;
	
	&:last-child {
		border-bottom: none;
	}
}

.coupon-amount {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-width: 100rpx;
	margin-right: 24rpx;
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
	gap: 6rpx;
	min-width: 0;
}

.coupon-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
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
	gap: 16rpx;
}

.progress-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 20rpx;
	color: #cccccc;
}

.claim-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 100rpx;
	height: 56rpx;
	padding: 0 24rpx;
	background-color: #333333;
	border-radius: 8rpx;
	margin-left: 16rpx;
	
	&.claimed {
		background-color: #e5e5e5;
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
	padding: 30rpx 0;
}

.footer-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #cccccc;
}
</style>
