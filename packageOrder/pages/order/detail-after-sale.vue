<template>
	<view class="order-detail-page">
		<!-- 退款状态提示 -->
		<view class="refund-status-section">
			<text
				class="status-title"
				:class="{ refunding: refundStatus === 'pending' }"
			>{{ statusConfig.title }}</text>
			<text class="status-desc">{{ statusConfig.desc }}</text>
		</view>

		<!-- 主内容 -->
		<view class="main-content">
			<!-- 商品卡片 -->
			<view class="product-card">
				<!-- 美发师信息 -->
				<view class="provider-section">
					<view class="provider-info">
						<text class="provider-name">{{ orderData.seller.name }}</text>
						<text class="provider-badge">{{ orderData.seller.role }}</text>
					</view>
					<image
						class="arrow-icon"
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame-1.svg"
						mode="aspectFit"
					></image>
				</view>

				<!-- 商品信息 -->
				<view class="product-section">
					<view class="product-image-placeholder"></view>
					<view class="product-info">
						<view class="product-left">
							<text class="product-name">{{ orderData.product.name }}</text>
							<text
								v-for="(spec, index) in orderData.product.specs"
								:key="index"
								class="product-spec"
							>{{ spec }}</text>
						</view>
						<view class="product-right">
							<view class="price-row">
								<text class="price-symbol">¥</text>
								<text class="price-value">{{ orderData.product.price }}</text>
							</view>
							<text class="quantity">*{{ orderData.product.quantity }}</text>
						</view>
					</view>
				</view>

				<!-- 分隔线 -->
				<view class="divider"></view>

				<!-- 订单金额信息 -->
				<view class="price-list">
					<view class="price-item">
						<text class="price-label">商品金额</text>
						<text class="price-text">{{ orderData.order.productAmount }}</text>
					</view>
					<view class="price-item">
						<text class="price-label">优惠金额</text>
						<text class="price-text">-¥{{ orderData.order.discount }}</text>
					</view>
					<view class="price-item total">
						<text class="price-label">合计支付</text>
						<view class="total-price">
							<text class="total-symbol">¥</text>
							<text class="total-value">{{ orderData.order.totalPayment }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 售后信息卡片 -->
			<view class="after-sale-card">
				<text class="section-title">售后信息</text>
				<view class="info-list">
					<view class="info-item">
						<text class="info-label">申请时间</text>
						<text class="info-value">{{ afterSalesData.applicationTime }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">退款原因</text>
						<text class="info-value">{{ afterSalesData.refundReason }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">申请金额</text>
						<text class="info-value">¥{{ afterSalesData.refundAmount }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">退款完成</text>
						<text class="info-value">{{ afterSalesData.completionTime }}</text>
					</view>
					<view class="info-item">
						<text class="info-label bold">退款编号</text>
						<view class="refund-number-row">
							<text class="info-value">{{ afterSalesData.refundNumber }}</text>
							<text class="divider-text">｜</text>
							<text class="copy-btn" @tap="handleCopy">复制</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="footer-actions">
			<view
				class="action-btn delete-btn"
				:class="{ disabled: refundStatus === 'pending' }"
				@tap="handleDelete"
			>
				<text class="btn-text">{{ refundStatus === 'pending' ? '退款中' : '删除订单' }}</text>
			</view>
			<view class="action-btn contact-btn" @tap="handleContact">
				<text class="btn-text">联系商家</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 退款状态: pending-退款中, success-退款成功
const refundStatus = ref('pending')

const orderData = ref({
	seller: {
		name: '李天天',
		role: '美发师'
	},
	product: {
		name: '欧莱雅植物洗护套装一套',
		specs: ['洗发水+护发素', '500ml+500ml'],
		price: 799,
		quantity: 1
	},
	order: {
		productAmount: 'CD902847058048906',
		discount: 6,
		totalPayment: 799
	}
})

const afterSalesData = ref({
	applicationTime: '2022-04-22 12:04:22',
	refundReason: '不想要了',
	refundAmount: 799,
	completionTime: '2022-04-22 12:04:22',
	refundNumber: 'CD902847058048906'
})

// 根据退款状态显示不同的文案
const statusConfig = computed(() => {
	const configs = {
		pending: {
			title: '退款中',
			desc: '商家确认中，请耐心等待'
		},
		success: {
			title: '退款成功',
			desc: '商家同意退款，钱款原路退回'
		}
	}
	return configs[refundStatus.value] || configs.pending
})

// 生命周期
const onLoad = (options) => {
	if (options && options.orderId) {
		// 根据订单ID加载订单详情
		// 示例：调用接口获取退款状态
		// uni.request({
		//   url: '/api/order/refundDetail',
		//   data: { orderId: options.orderId },
		//   success: (res) => {
		//     refundStatus.value = res.data.refundStatus // 'pending' 或 'success'
		//     // 更新其他订单数据...
		//   }
		// })
	}
}

// 方法
const handleBack = () => {
	uni.navigateBack()
}

const handleCopy = () => {
	uni.setClipboardData({
		data: afterSalesData.value.refundNumber,
		success: () => {
			uni.showToast({
				title: '已复制',
				icon: 'success'
			})
		}
	})
}

const handleDelete = () => {
	// 如果是退款中状态，不可点击
	if (refundStatus.value === 'pending') {
		return
	}

	uni.showModal({
		title: '提示',
		content: '确定要删除此订单吗？',
		success: (res) => {
			if (res.confirm) {
				uni.showToast({
					title: '订单已删除',
					icon: 'success'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}
		}
	})
}

const handleContact = () => {
	uni.makePhoneCall({
		phoneNumber: '400-123-4567',
		fail: () => {
			uni.showToast({
				title: '拨打电话失败',
				icon: 'none'
			})
		}
	})
}

// 暴露给页面生命周期
defineExpose({
	onLoad
})
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

.refund-status-section {
	background-color: #ffffff;
	padding: 24rpx 30rpx;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 8rpx;
}

.status-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: 400;
	color: #000000;
	text-align: center;

	&.refunding {
		color: #ff6b35;
	}
}

.status-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #a6a6a6;
	text-align: center;
}

.main-content {
	flex: 1;
	padding: 12rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.product-card,
.after-sale-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 24rpx 20rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.provider-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.provider-info {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.provider-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #000000;
}

.provider-badge {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 20rpx;
	font-weight: 500;
	color: #666666;
	background-color: #f6f6f6;
	padding: 4rpx 8rpx;
	border-radius: 4rpx;
}

.arrow-icon {
	width: 24rpx;
	height: 24rpx;
}

.product-section {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
}

.product-image-placeholder {
	width: 132rpx;
	height: 132rpx;
	background-color: #d9d9d9;
	border-radius: 8rpx;
	flex-shrink: 0;
}

.product-info {
	flex: 1;
	display: flex;
	justify-content: space-between;
}

.product-left {
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

.product-spec {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.product-right {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;
}

.price-row {
	display: flex;
	align-items: flex-end;
}

.price-symbol {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
}

.price-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 36rpx;
	font-weight: 500;
	color: #333333;
}

.quantity {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.divider {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
}

.price-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.price-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.price-item.total {
	align-items: flex-end;
}

.price-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
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
	color: #a6a6a6;
}

.total-price {
	display: flex;
	align-items: flex-end;
}

.total-symbol {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
}

.total-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 36rpx;
	font-weight: 500;
	color: #333333;
}

.section-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #000000;
}

.info-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.info-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.info-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
}

.info-label.bold {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
}

.info-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.refund-number-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.divider-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	color: #a6a6a6;
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
	gap: 20rpx;
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

.delete-btn {
	background-color: #ffffff;
	border: 2rpx solid #e7e7e7;

	&.disabled {
		background-color: #f6f6f6;
		border: 2rpx solid #f0f0f0;
		opacity: 0.6;

		.btn-text {
			color: #cccccc;
		}
	}
}

.contact-btn {
	background-color: #333333;
}

.delete-btn .btn-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
}

.contact-btn .btn-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 24rpx;
	font-weight: 400;
	color: #ffffff;
}
</style>
