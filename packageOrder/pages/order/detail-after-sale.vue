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
import { ref, computed, onMounted } from 'vue'
import api from '@/api'

// 订单ID
const orderId = ref('')

// 退款状态: pending-退款中, success-退款成功, rejected-退款被拒绝, cancelled-已取消
const refundStatus = ref('pending')

const orderData = ref({
	seller: {
		name: '',
		role: '美发师'
	},
	product: {
		name: '',
		image: '',
		specs: [],
		price: 0,
		quantity: 1
	},
	order: {
		productAmount: '',
		discount: 0,
		totalPayment: 0
	}
})

const afterSalesData = ref({
	applicationTime: '',
	refundReason: '',
	refundAmount: 0,
	completionTime: '-',
	refundNumber: ''
})

// 状态配置
const statusConfig = computed(() => {
	const configs = {
		pending: {
			title: '退款中',
			desc: '商家确认中，请耐心等待'
		},
		success: {
			title: '退款成功',
			desc: '商家同意退款，钱款已原路退回'
		},
		rejected: {
			title: '退款被拒绝',
			desc: '商家拒绝了您的退款申请'
		},
		cancelled: {
			title: '订单已取消',
			desc: '订单已取消'
		}
	}
	return configs[refundStatus.value] || configs.pending
})

// 加载订单详情
const fetchOrderDetail = async (id) => {
	try {
		const res = await api.order.getDetail(id)
		if (res.code === 200 && res.data) {
			parseOrderData(res.data)
		}
	} catch (err) {
		console.error('获取订单详情失败:', err)
		uni.showToast({ title: '获取订单信息失败', icon: 'none' })
	}
}

// 解析订单数据
const parseOrderData = (order) => {
	// 根据订单状态设置退款状态
	const status = order.status || order.orderStatus
	if (status === 'REFUNDING') {
		refundStatus.value = 'pending'
	} else if (status === 'REFUNDED') {
		refundStatus.value = 'success'
	} else if (status === 'CANCELLED') {
		refundStatus.value = 'cancelled'
	}

	// 卖家信息
	orderData.value.seller = {
		name: order.designer_name || order.designerName || '服务提供者',
		role: '美发师'
	}

	// 商品信息
	orderData.value.product = {
		name: order.service_name || order.serviceName || '服务项目',
		image: order.service_image || order.serviceImage || '',
		specs: [order.sku_name || order.skuName || '', order.duration || ''].filter(Boolean),
		price: order.final_price || order.finalPrice || order.price || 0,
		quantity: 1
	}

	// 订单金额信息
	orderData.value.order = {
		productAmount: order.original_price || order.originalPrice || '0',
		discount: order.discount_amount || order.discountAmount || 0,
		totalPayment: order.final_price || order.finalPrice || order.pay_amount || 0
	}

	// 售后信息
	afterSalesData.value = {
		applicationTime: formatDateTime(order.refund_apply_time || order.refundApplyTime || order.create_time || order.createTime),
		refundReason: order.refund_reason || order.refundReason || '用户申请退款',
		refundAmount: order.refund_amount || order.refundAmount || order.final_price || order.finalPrice || 0,
		completionTime: order.refund_complete_time || order.refundCompleteTime ? formatDateTime(order.refund_complete_time || order.refundCompleteTime) : '-',
		refundNumber: order.refund_no || order.refundNo || order.order_no || order.orderNo || order.id
	}
}

// 格式化日期时间
const formatDateTime = (dateStr) => {
	if (!dateStr) return ''
	const date = new Date(dateStr)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 页面加载
const onLoad = (options) => {
	if (options && options.orderId) {
		orderId.value = options.orderId
		fetchOrderDetail(options.orderId)
	}
}

// 复制退款编号
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

// 删除订单
const handleDelete = () => {
	// 退款中状态不允许删除
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

// 联系商家
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

// 暴露方法给页面
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
	filter: brightness(0) invert(1);
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
