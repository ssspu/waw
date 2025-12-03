<template>
	<view class="order-detail-page">
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
				<text class="navbar-title">订单详情</text>
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
					@tap="handleShowQrcode"
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
				<!-- 操作按钮 -->
				<view class="info-actions">
					<view class="info-action-btn" @tap="handleModifyTime">
						<image class="info-action-icon" src="/static/icon/clock.png" mode="aspectFit"></image>
						<text class="info-action-text">修改时间</text>
					</view>
					<view class="info-action-btn refund" @tap="handleRefund">
						<image class="info-action-icon" src="/static/icon/refund.png" mode="aspectFit"></image>
						<text class="info-action-text refund">申请退款</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="footer-actions">
			<view class="action-btn complete-btn" @tap="handleComplete">
				<text class="btn-text">订单完成</text>
			</view>
		</view>

		<!-- 二维码弹窗 -->
		<view class="qrcode-modal" v-if="showQrcodeModal" @tap="handleCloseQrcodeModal">
			<view class="qrcode-modal-content" @tap.stop>
				<view class="qrcode-modal-header">
					<text class="qrcode-modal-title">核销二维码</text>
					<view class="qrcode-close-btn" @tap="handleCloseQrcodeModal">
						<text class="qrcode-close-icon">×</text>
					</view>
				</view>
				<view class="qrcode-modal-body">
					<view class="qrcode-container">
						<image
							class="qrcode-image"
							src="/static/icon/qrcode-demo.png"
							mode="aspectFit"
						></image>
					</view>
					<text class="qrcode-tip">请向服务人员出示此二维码完成核销</text>
					<view class="qrcode-info-list">
						<view class="qrcode-info-row">
							<text class="qrcode-info-label">订单编号：</text>
							<text class="qrcode-info-value">{{ orderInfo.orderNumber }}</text>
						</view>
						<view class="qrcode-info-row">
							<text class="qrcode-info-label">服务项目：</text>
							<text class="qrcode-info-value">欧莱雅植物洗护套装</text>
						</view>
						<view class="qrcode-info-row">
							<text class="qrcode-info-label">服务时间：</text>
							<text class="qrcode-info-value">{{ orderInfo.createTime }}</text>
						</view>
						<view class="qrcode-info-row">
							<text class="qrcode-info-label">服务金额：</text>
							<text class="qrcode-info-value price">¥799</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 修改时间弹窗 -->
		<view class="modify-time-modal" v-if="showModifyTimeModal" @tap="handleCloseModifyTimeModal">
			<view class="modify-time-modal-content" @tap.stop>
				<view class="modify-time-modal-header">
					<text class="modify-time-modal-title">修改预约时间</text>
					<view class="modify-time-close-btn" @tap="handleCloseModifyTimeModal">
						<text class="modify-time-close-icon">×</text>
					</view>
				</view>
				<view class="modify-time-modal-body">
					<!-- 上午时间段 -->
					<view class="time-section">
						<text class="section-title">上午</text>

						<view class="time-slots-grid">
							<view
								v-for="(slot, index) in morningSlots"
								:key="index"
								class="time-slot"
								:class="{
									selected: slot.status === 'selected',
									booked: slot.status === 'booked'
								}"
								@tap="handleSlotClick('morning', index)"
							>
								<text
									class="time-text"
									:class="{
										selected: slot.status === 'selected',
										booked: slot.status === 'booked'
									}"
								>{{ slot.time }}</text>
								<text
									v-if="slot.label"
									class="slot-label"
								>{{ slot.label }}</text>
							</view>
						</view>
					</view>

					<!-- 下午时间段 -->
					<view class="time-section">
						<text class="section-title">下午</text>

						<view class="time-slots-grid">
							<view
								v-for="(slot, index) in afternoonSlots"
								:key="index"
								class="time-slot"
								:class="{
									selected: slot.status === 'selected',
									booked: slot.status === 'booked',
									available: slot.status === 'available'
								}"
								@tap="handleSlotClick('afternoon', index)"
							>
								<text
									class="time-text"
									:class="{
										selected: slot.status === 'selected',
										booked: slot.status === 'booked'
									}"
								>{{ slot.time }}</text>
							</view>
						</view>
					</view>

					<!-- 提示信息 -->
					<text class="notice-text">预约当天服务需要提前60分钟</text>

					<!-- 确认按钮 -->
					<view class="confirm-btn-container">
						<view class="confirm-btn" @tap="handleConfirmModifyTime">
							<text class="confirm-btn-text">确认修改</text>
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
			statusBarHeight: 44,
			showQrcodeModal: false,
			showModifyTimeModal: false,
			selectedTimeSlot: null,
			orderInfo: {
				createTime: '2022-04-22 12:04:22',
				paymentMethod: '在线支付',
				points: '获得60积分',
				orderNumber: 'CD902847058048906'
			},
			morningSlots: [
				{ time: "10:00", status: "available" },
				{ time: "11:00", status: "available" },
				{ time: "12:00", status: "available" },
			],
			afternoonSlots: [
				{ time: "13:00", status: "available" },
				{ time: "14:00", status: "selected" },
				{ time: "15:00", status: "available" },
				{ time: "16:00", status: "available" },
				{ time: "17:00", status: "available" },
				{ time: "18:00", status: "available" },
			]
		}
	},
	onLoad(options) {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
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
		handleShowQrcode() {
			this.showQrcodeModal = true
		},
		handleCloseQrcodeModal() {
			this.showQrcodeModal = false
		},
		handleModifyTime() {
			// 打开修改时间弹窗
			this.showModifyTimeModal = true
		},
		handleCloseModifyTimeModal() {
			this.showModifyTimeModal = false
		},
		handleSlotClick(period, index) {
			let selectedSlot = null
			if (period === 'morning') {
				const slot = this.morningSlots[index]
				if (slot.status === 'booked') {
					return // 已预约的不能选择
				}
				// 重置所有上午时间段的选择状态
				this.morningSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
					}
				})
				// 重置所有下午时间段的选择状态
				this.afternoonSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
					}
				})
				// 设置当前选择
				slot.status = 'selected'
				selectedSlot = { period: 'morning', time: slot.time }
			} else if (period === 'afternoon') {
				const slot = this.afternoonSlots[index]
				if (slot.status === 'booked') {
					return // 已预约的不能选择
				}
				// 重置所有上午时间段的选择状态
				this.morningSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
					}
				})
				// 重置所有下午时间段的选择状态
				this.afternoonSlots.forEach((s) => {
					if (s.status === 'selected') {
						s.status = 'available'
					}
				})
				// 设置当前选择
				slot.status = 'selected'
				selectedSlot = { period: 'afternoon', time: slot.time }
			}
			// 保存选择的时间
			if (selectedSlot) {
				this.selectedTimeSlot = selectedSlot
			}
		},
		handleConfirmModifyTime() {
			if (!this.selectedTimeSlot) {
				uni.showToast({
					title: '请选择时间',
					icon: 'none'
				})
				return
			}
			// 确认修改时间
			uni.showToast({
				title: '修改成功，等待商家确认',
				icon: 'success',
				duration: 2000
			})
			this.showModifyTimeModal = false

			// 这里可以调用API更新订单时间，订单状态变为待确认
			// 例如：
			// uni.request({
			//   url: '/api/order/modifyTime',
			//   data: {
			//     orderId: this.orderInfo.orderNumber,
			//     time: this.selectedTimeSlot.time,
			//     period: this.selectedTimeSlot.period
			//   },
			//   success: (res) => {
			//     // API调用成功后返回订单列表
			//   }
			// })

			// 延迟跳转到订单列表，让用户看到成功提示
			setTimeout(() => {
				uni.navigateBack({
					delta: 1
				})
			}, 2000)
		},
		handleRefund() {
			// 申请退款 - 跳转到退款页面
			uni.navigateTo({
				url: '/packageOrder/order/refund?orderId=' + this.orderInfo.orderNumber
			})
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

.info-actions {
	display: flex;
	align-items: center;
	margin-top: 24rpx;
	padding-top: 24rpx;
	border-top: 1rpx solid #f0f0f0;
}

.info-action-btn {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 16rpx 0;
	background-color: #ffffff;
}

.info-action-btn:first-child {
	border-right: 1rpx solid #e0e0e0;
}

.info-action-icon {
	width: 32rpx;
	height: 32rpx;
}

.info-action-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	font-weight: 400;
	color: #666666;
}

.info-action-text.refund {
	color: #ff6b35;
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

/* 二维码弹窗 */
.qrcode-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.qrcode-modal-content {
	width: 600rpx;
	background-color: #ffffff;
	border-radius: 24rpx;
	overflow: hidden;
}

.qrcode-modal-header {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 32rpx 32rpx 24rpx;
	border-bottom: 2rpx solid #f0f0f0;
	position: relative;
}

.qrcode-modal-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	text-align: center;
}

.qrcode-close-btn {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 24rpx;
	top: 50%;
	transform: translateY(-50%);
}

.qrcode-close-icon {
	font-size: 48rpx;
	color: #999999;
	line-height: 1;
}

.qrcode-modal-body {
	padding: 40rpx 32rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24rpx;
}

.qrcode-container {
	width: 400rpx;
	height: 400rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ffffff;
	border: 2rpx solid #f0f0f0;
	border-radius: 16rpx;
}

.qrcode-image {
	width: 360rpx;
	height: 360rpx;
}

.qrcode-tip {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #999999;
	text-align: center;
}

.qrcode-info-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	padding: 24rpx;
	background-color: #f8f8f8;
	border-radius: 12rpx;
	box-sizing: border-box;
}

.qrcode-info-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.qrcode-info-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #999999;
}

.qrcode-info-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 26rpx;
	color: #333333;
}

.qrcode-info-value.price {
	color: #ff6b35;
	font-weight: 500;
}

.status-icon {
	width: 48rpx;
	height: 48rpx;
	cursor: pointer;
}

/* 修改时间弹窗 */
.modify-time-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.modify-time-modal-content {
	width: 650rpx;
	max-height: 80vh;
	background-color: #ffffff;
	border-radius: 24rpx;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.modify-time-modal-header {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 32rpx 32rpx 24rpx;
	border-bottom: 2rpx solid #f0f0f0;
	position: relative;
	flex-shrink: 0;
}

.modify-time-modal-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	text-align: center;
}

.modify-time-close-btn {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 24rpx;
	top: 50%;
	transform: translateY(-50%);
}

.modify-time-close-icon {
	font-size: 48rpx;
	color: #999999;
	line-height: 1;
}

.modify-time-modal-body {
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	overflow-y: auto;
	flex: 1;
}

.time-section {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.section-title {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 24rpx;
	line-height: normal;
	letter-spacing: 0;
}

.time-slots-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 14rpx;
	width: 100%;
}

.time-slot {
	display: flex;
	flex-direction: column;
	height: 80rpx;
	align-items: center;
	justify-content: center;
	padding: 10rpx 0;
	background-color: #f6f6f6;
	border-radius: 8rpx;
	border: 2rpx solid #f6f6f6;

	&.available {
		background-color: #f6f6f6;
		border: 2rpx solid #f6f6f6;
	}

	&.selected {
		background-color: #ffffff;
		border: 3rpx solid #333333;
	}

	&.booked {
		background-color: #ffffff;
		border: 2rpx solid #f6f6f6;
	}
}

.time-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 28rpx;
	line-height: normal;
	letter-spacing: 0;

	&.selected {
		font-family: 'PingFang_SC-Medium', Helvetica;
		font-weight: 500;
		color: #333333;
	}

	&.booked {
		font-family: 'PingFang_SC-Regular', Helvetica;
		font-weight: normal;
		color: #a6a6a6;
	}
}

.slot-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 18rpx;
	line-height: normal;
	letter-spacing: 0;
	margin-top: 4rpx;
}

.notice-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
	line-height: normal;
	letter-spacing: 0;
	text-align: center;
}

.confirm-btn-container {
	padding-top: 8rpx;
}

.confirm-btn {
	width: 100%;
	height: 84rpx;
	background-color: #333333;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.confirm-btn-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #ffffff;
}
</style>

