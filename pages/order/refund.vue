<template>
	<view class="refund-page">
		<!-- 导航栏 -->
		<view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="back-btn" @tap="handleBack">
					<image
						class="back-icon"
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg"
						mode="aspectFit"
					></image>
				</view>
				<text class="navbar-title">申请退款</text>
				<view class="navbar-right"></view>
			</view>
		</view>

		<!-- 主内容 -->
		<view class="main-content">
			<!-- 商品信息卡片 -->
			<view class="card product-card">
				<view class="provider-info">
					<text class="provider-name">{{ orderInfo.providerName }}</text>
					<view class="provider-tag">
						<text class="tag-text">{{ orderInfo.providerRole }}</text>
					</view>
					<image
						class="verified-icon"
						src="https://c.animaapp.com/mipb5np2fFXqAX/img/frame.svg"
						mode="aspectFit"
					></image>
				</view>
				<view class="product-info">
					<view class="product-image-wrapper">
						<image
							class="product-image"
							:src="orderInfo.productImage"
							mode="aspectFill"
						></image>
					</view>
					<view class="product-detail">
						<text class="product-name">{{ orderInfo.productName }}</text>
						<text class="product-spec">{{ orderInfo.productSpec }}</text>
						<text class="product-size">{{ orderInfo.productSize }}</text>
					</view>
				</view>
			</view>

			<!-- 退款金额卡片 -->
			<view class="card refund-amount-card">
				<view class="amount-header">
					<view class="amount-title-row">
						<text class="amount-title">退款金额</text>
						<text class="amount-subtitle">（实付金额）</text>
					</view>
					<view class="amount-value">
						<text class="amount-symbol">¥</text>
						<text class="amount-number">{{ orderInfo.refundAmount }}</text>
					</view>
				</view>

				<!-- 退款明细 -->
				<view class="refund-detail-box">
					<view class="detail-section">
						<view class="detail-title-row">
							<view class="dot"></view>
							<text class="detail-title">可退项目</text>
						</view>
						<view class="detail-item">
							<text class="detail-label">在线支付</text>
							<text class="detail-value">￥{{ orderInfo.onlinePayment }}</text>
						</view>
					</view>
					<view class="detail-section">
						<view class="detail-title-row">
							<view class="dot"></view>
							<text class="detail-title">不可退项目</text>
						</view>
						<view class="detail-item">
							<text class="detail-label">优惠金额</text>
							<text class="detail-value">￥{{ orderInfo.discountAmount }}</text>
						</view>
					</view>
				</view>

				<!-- 退回账户 -->
				<view class="refund-account-row">
					<text class="account-label">退回账户</text>
					<view class="account-info">
						<text class="account-value">原支付账户</text>
						<view class="account-time">
							<text class="time-highlight">1-3个工作日 </text>
							<text class="time-text">内到账</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 退款原因卡片 -->
			<view class="card reason-card">
				<view class="reason-header">
					<text class="reason-title">退款原因</text>
					<text class="reason-required">（必选）</text>
				</view>
				<view class="reason-list">
					<view
						v-for="(reason, index) in refundReasons"
						:key="index"
						class="reason-item"
						@tap="selectReason(index)"
					>
						<text class="reason-text">{{ reason }}</text>
						<view class="radio-btn" :class="{ selected: selectedReasonIndex === index }">
							<view v-if="selectedReasonIndex === index" class="radio-inner"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部按钮 -->
		<view class="footer">
			<view class="submit-btn" :class="{ disabled: selectedReasonIndex === null }" @tap="handleSubmit">
				<text class="submit-btn-text">申请退款</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 44,
			selectedReasonIndex: null,
			refundReasons: [
				'店铺/商品信息问题',
				'价格不划算',
				'不需要了',
				'重新购买',
				'消费结果不满意',
				'预约问题',
				'商家要求改用其他方式/平台付款',
				'商家无法提供服务'
			],
			orderInfo: {
				providerName: '李天天',
				providerRole: '美发师',
				productImage: '/static/icon/rectangle-169.png',
				productName: '欧莱雅植物洗护套装一套',
				productSpec: '洗发水+护发素',
				productSize: '500ml+500ml',
				refundAmount: '799',
				onlinePayment: '699',
				discountAmount: '100'
			}
		}
	},
	onLoad(options) {
		// 获取系统状态栏高度
		const systemInfo = uni.getSystemInfoSync()
		this.statusBarHeight = systemInfo.statusBarHeight || 44
		// 可从 options 获取订单信息
		if (options.orderId) {
			// 根据订单ID加载订单详情
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		selectReason(index) {
			this.selectedReasonIndex = index
		},
		handleSubmit() {
			if (this.selectedReasonIndex === null) {
				uni.showToast({
					title: '请选择退款原因',
					icon: 'none'
				})
				return
			}

			const reason = this.refundReasons[this.selectedReasonIndex]
			console.log('退款原因:', reason)

			// 提交退款申请
			uni.showLoading({
				title: '提交中...'
			})

			// 模拟API请求
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: '退款申请已提交',
					icon: 'success'
				})
				setTimeout(() => {
					// 跳转到订单详情-售后页
					uni.redirectTo({
						url: '/packageOrder/order/detail-after-sale'
					})
				}, 1500)
			}, 1000)
		}
	}
}
</script>

<style scoped lang="scss">
.refund-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	position: relative;
	padding-bottom: 166rpx;
}

.navbar {
	width: 100%;
	background-color: #ffffff;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 88rpx;
	padding: 0 30rpx;
	position: relative;
}

.back-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
}

.navbar-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 30rpx;
	font-weight: 500;
	color: #666666;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

.navbar-right {
	width: 32rpx;
}

.main-content {
	flex: 1;
	padding: 12rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.card {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 24rpx;
}

/* 商品信息卡片 */
.product-card {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.provider-info {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.provider-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #000000;
}

.provider-tag {
	height: 32rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	padding: 0 12rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tag-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 20rpx;
	font-weight: 500;
	color: #666666;
}

.verified-icon {
	width: 28rpx;
	height: 28rpx;
}

.product-info {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.product-image-wrapper {
	width: 132rpx;
	height: 132rpx;
	background-color: #d9d9d9;
	border-radius: 8rpx;
	overflow: hidden;
	flex-shrink: 0;
}

.product-image {
	width: 100%;
	height: 100%;
}

.product-detail {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.product-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #666666;
}

.product-spec,
.product-size {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a6a6a6;
}

/* 退款金额卡片 */
.refund-amount-card {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.amount-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.amount-title-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.amount-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #000000;
}

.amount-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #a6a6a6;
}

.amount-value {
	display: flex;
	align-items: flex-end;
}

.amount-symbol {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
}

.amount-number {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 36rpx;
	font-weight: 500;
	color: #333333;
}

/* 退款明细 */
.refund-detail-box {
	background-color: #f7f7f7;
	border-radius: 8rpx;
	padding: 24rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.detail-section {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.detail-title-row {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.dot {
	width: 12rpx;
	height: 12rpx;
	background-color: #333333;
	border-radius: 50%;
}

.detail-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #333333;
}

.detail-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 24rpx;
}

.detail-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
}

.detail-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a6a6a6;
}

/* 退回账户 */
.refund-account-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.account-label {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #000000;
}

.account-info {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 8rpx;
}

.account-value {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #000000;
}

.account-time {
	display: flex;
	align-items: center;
}

.time-highlight {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #ffa77c;
}

.time-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #a6a6a6;
}

/* 退款原因卡片 */
.reason-card {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.reason-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.reason-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #000000;
}

.reason-required {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #a6a6a6;
}

.reason-list {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.reason-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.reason-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #000000;
}

.radio-btn {
	width: 28rpx;
	height: 28rpx;
	border-radius: 50%;
	border: 2rpx solid #d8d8d8;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.radio-btn.selected {
	border-color: #333333;
}

.radio-inner {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background-color: #333333;
}

/* 底部按钮 */
.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
	padding: 20rpx;
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	box-shadow: 0px -2rpx 0px rgba(0, 0, 0, 0.04);
	z-index: 100;
}

.submit-btn {
	width: 100%;
	height: 84rpx;
	background-color: #333333;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;

	&:active {
		opacity: 0.9;
	}

	&.disabled {
		background-color: #cccccc;
	}
}

.submit-btn-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #ffffff;
}
</style>
