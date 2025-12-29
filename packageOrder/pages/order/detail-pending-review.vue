<template>
	<view class="order-detail-page">
		<!-- 主内容 -->
		<view class="main-content">
			<!-- 商品卡片 -->
			<view class="product-card">
				<!-- 美发师信息 -->
				<view class="provider-section">
					<view class="provider-info">
						<text class="provider-name">李天天</text>
						<text class="provider-badge">美发师</text>
					</view>
					<image
						class="arrow-icon"
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame-1.svg"
						mode="aspectFit"
					></image>
				</view>


				<!-- 第二个商品信息（产品） -->
				<view class="product-section">
					<image
						class="product-image"
						src="https://bioflex.cn/static/icon/rectangle-169.png"
						mode="aspectFill"
					></image>
					<view class="product-info">
						<view class="product-left">
							<text class="product-name">欧莱雅植物洗护套装一套</text>
							<text class="product-category">洗发水+护发素</text>
							<text class="product-duration">500ml+500ml</text>
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
			</view>

			<!-- 订单汇总 -->
			<view class="price-section">
				<text class="section-title">订单汇总</text>
				<view class="price-list">
					<view class="price-item">
						<text class="price-label">商品金额</text>
						<text class="price-text">¥799</text>
					</view>
					<view class="price-item">
						<text class="price-label">优惠金额</text>
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
					<!-- 测试版先隐藏 -->
					<!-- <view class="info-item">
						<text class="info-label">众美积分</text>
						<text class="info-value">{{ orderInfo.points }}</text>
					</view> -->
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
			<view class="action-btn review-btn" @tap="handleReview">
				<text class="btn-text">立即评价</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
						orderId: '',
			orderInfo: {
				createTime: '2022-04-22 12:04:22',
				paymentMethod: '在线支付',
				points: '获得60积分',
				orderNumber: 'CD902847058048906'
			}
		}
	},
	onLoad(options) {
		
		if (options.orderId) {
			this.orderId = options.orderId
			
		}
	},
	methods: {
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
		handleReview() {
			
			uni.navigateTo({
				url: `/packageOrder/pages/order/service-review?orderId=${this.orderId || this.orderInfo.orderNumber}`
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

.navbar-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
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

.main-content {
	flex: 1;
	padding: 12rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.product-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 24rpx 20rpx;
	display: flex;
	flex-direction: column;
	gap: 0;
}

.product-section {
	padding: 0;
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

.provider-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.product-section:not(:first-child) {
	padding-top: 20rpx;
}

.provider-info {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.provider-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
}

.provider-badge {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #a7a7a7;
}

.arrow-icon {
	width: 24rpx;
	height: 24rpx;
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
	justify-content: center;
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

.review-btn {
	background-color: #333333;
}

.btn-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #ffffff;
}
</style>
