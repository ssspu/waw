<template>
	<view class="order-detail-page">
		<view class="status-bar-space"></view>
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
				<view class="navbar-right">
					<view class="nav-icon-btn">
						<view class="nav-dots">
							<view class="dot"></view>
							<view class="dot"></view>
							<view class="dot"></view>
						</view>
					</view>
					<view class="nav-icon-btn">
						<view class="nav-circle">
							<view class="circle-dot"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 订单状态提示 -->
		<view class="order-status-section">
			<view class="status-content">
				<text class="status-title">您有待使用订单</text>
				<image 
					class="status-icon" 
					src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-2117.svg" 
					mode="aspectFit"
				></image>
			</view>
			<view class="status-desc">
				<text class="desc-text">2小时内取消订单,会影响你信用</text>
			</view>
		</view>
		
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
						src="/static/icon/rectangle-169.png" 
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
			<view class="action-btn modify-btn" @tap="handleModifyTime">
				<text class="btn-text">修改时间</text>
			</view>
			<view class="action-btn complete-btn" @tap="handleComplete">
				<text class="btn-text">订单完成</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
	},
	methods: {
		handleBack() {
			uni.navigateBack()
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
		handleModifyTime() {
			// 修改时间逻辑
			console.log('修改时间')
		},
		handleComplete() {
			// 订单完成逻辑
			uni.showToast({
				title: '订单已完成',
				icon: 'success'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
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

.order-status-section {
	background-color: #ffffff;
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

.status-icon {
	width: 32rpx;
	height: 32rpx;
}

.status-desc {
	display: flex;
	align-items: center;
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

.modify-btn {
	background-color: #ffffff;
	border: 2rpx solid #e0e0e0;
}

.complete-btn {
	background-color: #333333;
}

.btn-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
}

.modify-btn .btn-text {
	color: #666666;
}

.complete-btn .btn-text {
	color: #ffffff;
}
</style>

