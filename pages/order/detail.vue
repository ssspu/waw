<template>
	<view class="order-detail-page">

		
		<!-- 导航栏 -->
		<view class="navbar">
			<view class="navbar-content">
				<view class="back-btn" @tap="handleBack">
					<image 
						class="back-icon" 
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" 
						mode="aspectFit"
					></image>
				</view>
				<text class="navbar-title">订单详情</text>
			</view>
		</view>
		
		<!-- 订单状态提示 -->
		<view class="order-status-section">
			<view class="status-content">
				<text class="status-title">您有待付款订单</text>
				<text class="countdown-time">{{ countdown }}</text>
			</view>
			<view class="status-desc">
				<text class="desc-text">请在30分钟内付款,超时订单将自动关闭</text>
				<text class="desc-text">付款倒计时</text>
			</view>
		</view>
		
		<!-- 主内容 -->
		<view class="main-content">
			<!-- 商品详情 -->
			<view class="product-section">
				<image 
					class="product-image" 
					src="/static/icon/rectangle-169.png" 
					mode="aspectFill"
				></image>
				<view class="product-info">
					<view class="product-left">
						<text class="product-name">欧莱雅植物洗护套装一套</text>
						<text class="product-category">洗护</text>
						<text class="product-duration">1小时</text>
					</view>
					<view class="product-right">
						<view class="price-row">
							<text class="price-symbol">¥</text>
							<text class="price-value">799</text>
						</view>
						<text class="quantity">*1</text>
					</view>
				</view>
			</view>
			
			<!-- 价格明细 -->
			<view class="price-section">
				<text class="section-title">价格明细</text>
				<view class="price-list">
					<view class="price-item">
						<text class="price-label">商品金额</text>
						<text class="price-text">¥799</text>
					</view>
					<view class="price-item">
						<text class="price-label">运费</text>
						<text class="price-text">¥0</text>
					</view>
					<view class="price-item total">
						<text class="price-label">合计支付</text>
						<view class="total-price">
							<text class="total-price-value">¥799</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 订单信息 -->
			<view class="order-info-section">
				<text class="section-title">订单信息</text>
				<view class="info-list">
					<view class="info-item">
						<text class="info-label">创建时间</text>
						<text class="info-value">{{ orderInfo.createTime }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">支付方式</text>
						<text class="info-value">{{ orderInfo.paymentMethod }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">众美积分</text>
						<text class="info-value">{{ orderInfo.points }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">订单编号</text>
						<view class="order-number-row">
							<text class="info-value">{{ orderInfo.orderNumber }}</text>
							<text class="divider">｜</text>
							<text class="copy-btn" @tap="handleCopy">复制</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="footer-actions">
			<view class="action-btn cancel-btn" @tap="handleCancel">
				<text class="btn-text">取消订单</text>
			</view>
			<view class="action-btn pay-btn" @tap="handlePay">
				<text class="btn-text">立即付款</text>
			</view>
		</view>
		
		<!-- 取消订单弹窗 -->
		<view class="cancel-modal" v-if="showCancelModal" @tap="handleCloseModal">
			<view class="modal-content" @tap.stop>
				<view class="modal-header">
					<text class="modal-title">取消订单</text>
					<view class="close-btn" @tap="handleCloseModal">
						<text class="close-icon">×</text>
					</view>
				</view>
				<view class="modal-body">
					<text class="modal-desc">取消后无法回复,优惠券,M币可退回,有效期内使用;两小以上或未确认订单可以免责取消,确认订单并在两小时内取消,将影响你在平台的信用。</text>
					<text class="reason-prompt">请选择取消订单原因(必选)</text>
					<view class="reason-list">
						<view 
							v-for="(reason, index) in cancelReasons" 
							:key="index"
							class="reason-item"
							@tap="handleSelectReason(index)"
						>
							<text class="reason-text">{{ reason }}</text>
							<view class="radio-btn" :class="{ 'selected': selectedReasonIndex === index }">
								<text v-if="selectedReasonIndex === index" class="radio-check">✓</text>
							</view>
						</view>
					</view>
					<view class="modal-footer">
						<view class="modal-btn cancel-modal-btn" @tap="handleCloseModal">
							<text class="modal-btn-text">暂不取消</text>
						</view>
						<view 
							class="modal-btn confirm-btn" 
							:class="{ 'disabled': selectedReasonIndex === null }"
							@tap="handleConfirmCancel"
						>
							<text class="modal-btn-text">确定取消</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			countdown: '00:30:00',
			countdownTimer: null,
			showCancelModal: false,
			selectedReasonIndex: null,
			cancelReasons: [
				'价格有点贵',
				'时间选择有问题',
				'我想换一个设计师',
				'暂时不需要了',
				'其他'
			],
			orderInfo: {
				createTime: '2022-04-22 12:04:22',
				paymentMethod: '在线支付',
				points: '获得60积分',
				orderNumber: 'CD902847058048906'
			}
		}
	},
	onLoad(options) {
		// 可以从 options 中获取订单ID等信息
		if (options.orderId) {
			// 根据订单ID加载订单详情
		}
		this.startCountdown()
	},
	onUnload() {
		if (this.countdownTimer) {
			clearInterval(this.countdownTimer)
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		startCountdown() {
			// 解析倒计时时间
			const timeParts = this.countdown.split(':')
			let hours = parseInt(timeParts[0])
			let minutes = parseInt(timeParts[1])
			let seconds = parseInt(timeParts[2])
			
			this.countdownTimer = setInterval(() => {
				seconds--
				if (seconds < 0) {
					seconds = 59
					minutes--
					if (minutes < 0) {
						minutes = 59
						hours--
						if (hours < 0) {
							hours = 0
							minutes = 0
							seconds = 0
							clearInterval(this.countdownTimer)
							uni.showToast({
								title: '订单已超时',
								icon: 'none'
							})
						}
					}
				}
				
				this.countdown = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
			}, 1000)
		},
		handleCopy() {
			uni.setClipboardData({
				data: this.orderInfo.orderNumber,
				success: () => {
					uni.showToast({
						title: '已复制',
						icon: 'success'
					})
				}
			})
		},
		handleCancel() {
			this.showCancelModal = true
			this.selectedReasonIndex = null
		},
		handleCloseModal() {
			this.showCancelModal = false
			this.selectedReasonIndex = null
		},
		handleSelectReason(index) {
			this.selectedReasonIndex = index
		},
		handleConfirmCancel() {
			if (this.selectedReasonIndex === null) {
				uni.showToast({
					title: '请选择取消原因',
					icon: 'none'
				})
				return
			}
			
			// 这里可以调用取消订单的API
			const reason = this.cancelReasons[this.selectedReasonIndex]
			console.log('取消订单原因:', reason)
			
			uni.showToast({
				title: '订单已取消',
				icon: 'success'
			})
			
			this.showCancelModal = false
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
		},
		handlePay() {
			uni.navigateTo({
				url: `/pages/payment/index?orderId=${this.orderInfo.orderNumber}`
			})
		}
	}
}
</script>

<style scoped lang="scss">
.order-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	position: relative;
	padding-bottom: 120rpx;
}

.status-bar {
	height: 44rpx;
	width: 100%;
	background-color: #ffffff;
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

.nav-icon-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-dots {
	display: flex;
	align-items: center;
	gap: 3rpx;
}

.dot {
	width: 3rpx;
	height: 3rpx;
	border-radius: 50%;
	background-color: #000000;
}

.nav-circle {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	border: 1.5rpx solid #000000;
	background-color: transparent;
	display: flex;
	align-items: center;
	justify-content: center;
}

.circle-dot {
	width: 6rpx;
	height: 6rpx;
	border-radius: 50%;
	background-color: #000000;
}

.order-status-section {
	background-color: #ffffff   ;
	padding: 24rpx 30rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.status-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.status-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: 400;
	color: #000000;
}

.countdown-time {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
}

.status-desc {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.desc-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #a6a6a6;
}

.main-content {
	flex: 1;
	padding: 12rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.product-section {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 24rpx 20rpx;
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.product-image {
	width: 132rpx;
	height: 132rpx;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.product-info {
	flex: 1;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

.product-left {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
	flex: 1;
}

.product-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #666666;
}

.product-category,
.product-duration {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a7a7a7;
}

.product-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 6rpx;
}

.price-row {
	display: flex;
	align-items: flex-end;
}

.price-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #333333;
}

.price-value {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-size: 36rpx;
	font-weight: 400;
	color: #333333;
}

.quantity {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a7a7a7;
}

.price-section,
.order-info-section {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 24rpx 20rpx;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.section-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #000000;
}

.price-list,
.info-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.price-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: nowrap;
}

.price-item.total {
	align-items: flex-end;
}

.price-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
	flex-shrink: 0;
	white-space: nowrap;
}

.price-item.total .price-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
}

.price-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a7a7a7;
	flex-shrink: 0;
	white-space: nowrap;
}

.total-price {
	display: flex;
	align-items: center;
}

.total-price-value {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-size: 32rpx;
	font-weight: 400;
	color: #333333;
	white-space: nowrap;
}

.info-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: nowrap;
}

.info-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
	flex-shrink: 0;
	white-space: nowrap;
}

.info-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a7a7a7;
	flex-shrink: 0;
	white-space: nowrap;
}

.order-number-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
	flex-shrink: 0;
	white-space: nowrap;
}

.divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a7a7a7;
}

.copy-btn {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #333333;
}

.footer-actions {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
	padding: 24rpx 20rpx;
	display: flex;
	align-items: center;
	gap: 12rpx;
	box-shadow: 0px -2rpx 0px rgba(0, 0, 0, 0.04);
	z-index: 100;
}

.action-btn {
	flex: 1;
	height: 84rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8rpx;
}

.cancel-btn {
	background-color: #ffffff;
	border: 2rpx solid #e0e0e0;
}

.pay-btn {
	background-color: #333333;
}

.btn-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
}

.cancel-btn .btn-text {
	color: #666666;
}

.pay-btn .btn-text {
	color: #FFA87C;
}

/* 取消订单弹窗 */
.cancel-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: flex-end;
	justify-content: center;
	z-index: 1000;
}

.modal-content {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx 16rpx 0 0;
	overflow: hidden;
	max-height: 80vh;
}

.modal-header {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 32rpx 32rpx 24rpx;
	border-bottom: 2rpx solid #f0f0f0;
	position: relative;
}

.modal-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	text-align: center;
}

.close-btn {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 32rpx;
	top: 50%;
	transform: translateY(-50%);
}

.close-icon {
	font-size: 48rpx;
	color: #999999;
	line-height: 1;
}

.modal-body {
	padding: 32rpx;
}

.modal-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
	line-height: 1.6;
	margin-bottom: 32rpx;
	display: block;
}

.reason-prompt {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
	margin-bottom: 24rpx;
	display: block;
}

.reason-list {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	margin-bottom: 32rpx;
}

.reason-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 0;
}

.reason-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #333333;
	flex: 1;
}

.radio-btn {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	border: 2rpx solid #e0e0e0;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.radio-btn.selected {
	background-color: #333333;
	border-color: #333333;
}

.radio-check {
	color: #ffffff;
	font-size: 28rpx;
	font-weight: bold;
	line-height: 1;
}

.modal-footer {
	display: flex;
	align-items: center;
	gap: 24rpx;
	padding-top: 24rpx;
	border-top: 2rpx solid #f0f0f0;
}

.modal-btn {
	flex: 1;
	height: 84rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8rpx;
}

.cancel-modal-btn {
	background-color: #ffffff;
	border: 2rpx solid #e0e0e0;
}

.confirm-btn {
	background-color: #333333;
}

.confirm-btn.disabled {
	background-color: #cccccc;
}

.modal-btn-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
}

.cancel-modal-btn .modal-btn-text {
	color: #666666;
}

.confirm-btn .modal-btn-text {
	color: #ffffff;
}

.confirm-btn.disabled .modal-btn-text {
	color: #999999;
}
</style>

