<template>
	<view class="service-list-section">
		<view class="order-list">
			<view 
				v-for="(order, index) in filteredOrders" 
				:key="index" 
				class="order-card"
			>
				<view class="card-content">
					<!-- 订单头部 -->
					<view class="order-header">
						<text v-if="order.status === '待付款'" class="remaining-time">剩余时间: {{ order.remainingTime || '00:15:00' }}</text>
						<view v-else class="order-number-row">
							<text class="order-label">订单编号:</text>
							<text class="order-number">{{ order.orderNumber }}</text>
						</view>
						<text class="order-status" :style="{ color: order.statusColor }">{{ order.status }}</text>
					</view>
					
					<!-- 分隔线 -->
					<view class="separator-line"></view>
					
					<!-- 订单详情 -->
					<view class="order-details">
						<view class="service-info">
							<text class="service-name">{{ order.serviceName }}</text>
							<view class="service-meta">
								<text class="meta-label">服务:</text>
								<view class="meta-content">
									<text class="meta-text">{{ order.serviceDetails }}</text>
									<text class="meta-divider">｜</text>
									<text class="meta-text">{{ order.duration }}</text>
								</view>
							</view>
							<view class="time-info">
								<text class="meta-label">时间:</text>
								<text class="meta-text">{{ order.time }}</text>
							</view>
						</view>
						
						<!-- 服务提供者信息 -->
						<view class="provider-info">
							<view class="provider-left">
								<image 
									class="provider-avatar" 
									:src="order.provider.avatar" 
									mode="aspectFill"
								></image>
								<view class="provider-details">
									<view class="provider-name-row">
										<text class="provider-name">{{ order.provider.name }}</text>
										<view v-if="order.provider.badge" class="provider-badge">
											<text class="badge-text">{{ order.provider.badge }}</text>
										</view>
									</view>
									<view class="provider-rating">
										<text class="rating-score">{{ order.provider.rating }}</text>
										<view class="star-wrapper">
											<image 
												class="star-icon" 
												src="https://c.animaapp.com/mi5kx1ohxTkA7e/img/star-1.svg" 
												mode="aspectFit"
											></image>
										</view>
										<text class="rating-count">({{ order.provider.reviews }})</text>
									</view>
								</view>
							</view>
							
							<view class="provider-right">
								<view class="price-row">
									<text class="price-symbol">¥</text>
									<text class="price-value">{{ order.price }}</text>
								</view>
								<text class="quantity">{{ order.quantity }}</text>
							</view>
						</view>
						
						<!-- 订单底部操作 -->
						<view class="order-footer">
							<text class="more-link" @tap="handleMore(order)">更多</text>
							<view class="action-buttons">
								<template v-if="order.status === '待付款'">
									<view class="cancel-btn" @tap="handleCancel(order)">
										<text class="btn-text">取消</text>
									</view>
									<view class="pay-btn" @tap="handlePay(order)">
										<text class="btn-text primary">立即付款</text>
									</view>
								</template>
								<template v-else>
									<image 
										v-if="order.status === '待使用'"
										class="action-icon" 
										src="/static/icon/more.png" 
										mode="aspectFit"
									></image>
									<view class="detail-btn" @tap="handleDetail(order)">
										<text class="btn-text">详情</text>
									</view>
									<view class="primary-btn" @tap="handlePrimaryAction(order)">
										<text class="btn-text primary">{{ order.primaryButton }}</text>
									</view>
								</template>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		activeTab: {
			type: String,
			default: 'all'
		}
	},
	data() {
		return {
			countdownTimer: null,
			serviceOrders: [
				{
					orderNumber: "CDD83290895",
					status: "已确认",
					statusColor: "#ffa77b",
					serviceName: "洗剪吹",
					serviceDetails: "洗护+修剪+造型",
					duration: "预计1小时",
					time: "今天11:00",
					provider: {
						name: "李天天",
						badge: "美发师",
						avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34.svg",
						rating: "4.8",
						reviews: "23",
					},
					price: "799",
					quantity: "x1",
					hasIcon: true,
					primaryButton: "订单完成",
					tab: "all"
				},
				{
					orderNumber: "CDD83290895",
					status: "待付款",
					statusColor: "#ffa77b",
					remainingTime: "00:15:00",
					serviceName: "洗剪吹",
					serviceDetails: "洗护+修剪+造型",
					duration: "预计1小时",
					time: "今天11:00",
					provider: {
						name: "李天天",
						badge: "美发师",
						avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34.svg",
						rating: "4.8",
						reviews: "23",
					},
					price: "799",
					quantity: "x1",
					hasIcon: false,
					primaryButton: "立即付款",
					tab: "pending-payment"
				},
				{
					orderNumber: "CDD83290895",
					status: "已确认",
					statusColor: "#ffa77b",
					serviceName: "洗剪吹",
					serviceDetails: "洗护+修剪+造型",
					duration: "预计1小时",
					time: "今天11:00",
					provider: {
						name: "造型美发沙龙",
						badge: null,
						avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34-1.svg",
						rating: "4.8",
						reviews: "23",
					},
					price: "799",
					quantity: "x1",
					hasIcon: false,
					primaryButton: "正在确认",
					tab: "pending-confirm"
				},
				{
					orderNumber: "CDD83290895",
					status: "已确认",
					statusColor: "#ffa77b",
					serviceName: "洗剪吹",
					serviceDetails: "洗护+修剪+造型",
					duration: "预计1小时",
					time: "今天11:00",
					provider: {
						name: "李天天",
						badge: "美发师",
						avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34.svg",
						rating: "4.8",
						reviews: "23",
					},
					price: "799",
					quantity: "x1",
					hasIcon: false,
					primaryButton: "订单完成",
					tab: "all"
				},
				{
					orderNumber: "CDD83290895",
					status: "已确认",
					statusColor: "#ffa77b",
					serviceName: "洗剪吹",
					serviceDetails: "洗护+修剪+造型",
					duration: "预计1小时",
					time: "今天11:00",
					provider: {
						name: "李天天",
						badge: "美发师",
						avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34.svg",
						rating: "4.8",
						reviews: "23",
					},
					price: "799",
					quantity: "x1",
					hasIcon: false,
					primaryButton: "立即评价",
					tab: "pending-review"
				},
			],
		}
	},
	computed: {
		filteredOrders() {
			if (this.activeTab === 'all') {
				return this.serviceOrders
			}
			return this.serviceOrders.filter(order => order.tab === this.activeTab)
		}
	},
	mounted() {
		// 启动倒计时
		this.startCountdown()
	},
	beforeDestroy() {
		// 清除定时器
		if (this.countdownTimer) {
			clearInterval(this.countdownTimer)
		}
	},
	methods: {
		startCountdown() {
			// 为所有待付款订单启动倒计时
			this.countdownTimer = setInterval(() => {
				this.serviceOrders.forEach(order => {
					if (order.status === '待付款' && order.remainingTime) {
						const timeParts = order.remainingTime.split(':')
						let hours = parseInt(timeParts[0])
						let minutes = parseInt(timeParts[1])
						let seconds = parseInt(timeParts[2])
						
						// 减少一秒
						seconds--
						if (seconds < 0) {
							seconds = 59
							minutes--
							if (minutes < 0) {
								minutes = 59
								hours--
								if (hours < 0) {
									// 时间到，可以更新订单状态
									hours = 0
									minutes = 0
									seconds = 0
								}
							}
						}
						
						// 格式化时间
						order.remainingTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
					}
				})
			}, 1000)
		},
		handleMore(order) {
			console.log('More clicked:', order)
		},
		handleDetail(order) {
			console.log('Detail clicked:', order)
		},
		handlePrimaryAction(order) {
			console.log('Primary action clicked:', order.primaryButton)
		},
		handleCancel(order) {
			console.log('Cancel clicked:', order)
			uni.showModal({
				title: '提示',
				content: '确定要取消该订单吗？',
				success: (res) => {
					if (res.confirm) {
						console.log('Order cancelled')
					}
				}
			})
		},
		handlePay(order) {
			console.log('Pay clicked:', order)
			// 跳转到支付页面
			uni.navigateTo({
				url: `/pages/payment/index?orderId=${order.orderNumber}`
			})
		}
	}
}
</script>

<style scoped lang="scss">
.service-list-section {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12rpx;
	padding: 12rpx;
	width: 100%;
	box-sizing: border-box;
	flex: 1;
}

.order-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12rpx;
	width: 100%;
}

.order-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-shadow: none;
	box-sizing: border-box;
}

.card-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	padding: 20rpx;
	box-sizing: border-box;
}

.order-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.remaining-time {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 26rpx;
}

.order-number-row {
	display: inline-flex;
	align-items: center;
	gap: 16rpx;
}

.order-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 26rpx;
}

.order-number {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 26rpx;
}

.order-status {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	font-size: 26rpx;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
}

.order-details {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16rpx;
	width: 100%;
}

.service-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 8rpx;
	width: 100%;
}

.service-name {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 32rpx;
}

.service-meta {
	display: flex;
	align-items: center;
	gap: 12rpx;
	width: 100%;
}

.meta-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.meta-content {
	display: inline-flex;
	align-items: center;
	gap: 8rpx;
}

.meta-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.meta-divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.time-info {
	display: inline-flex;
	align-items: center;
	gap: 12rpx;
}

.provider-info {
	display: flex;
	height: 72rpx;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.provider-left {
	display: inline-flex;
	align-items: center;
	gap: 12rpx;
}

.provider-avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background-color: #a6a6a6;
	flex-shrink: 0;
}

.provider-details {
	display: inline-flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 2rpx;
}

.provider-name-row {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
}

.provider-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.provider-badge {
	display: inline-flex;
	align-items: center;
	padding: 4rpx 8rpx;
	background-color: #f6f6f6;
	border-radius: 4rpx;
	height: auto;
	box-sizing: border-box;
}

.badge-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 20rpx;
}

.provider-rating {
	display: inline-flex;
	align-items: center;
	gap: 4rpx;
	flex-wrap: nowrap;
}

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 26rpx;
	line-height: 1;
}

.star-wrapper {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 20rpx;
	height: 20rpx;
	flex-shrink: 0;
}

.star-icon {
	width: 100%;
	height: 100%;
	flex-shrink: 0;
}

.rating-count {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
	line-height: 1;
}

.provider-right {
	display: inline-flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
	gap: 6rpx;
}

.price-row {
	display: inline-flex;
	align-items: flex-end;
}

.price-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 28rpx;
	text-align: right;
}

.price-value {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 36rpx;
	text-align: right;
	white-space: nowrap;
}

.quantity {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 30rpx;
}

.order-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.more-link {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
	cursor: pointer;
}

.action-buttons {
	display: inline-flex;
	align-items: center;
	gap: 12rpx;
	flex: 1;
	justify-content: flex-end;
}

.action-icon {
	width: 60rpx;
	height: 60rpx;
	flex-shrink: 0;
}

.detail-btn, .primary-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 148rpx;
	height: 60rpx;
	padding: 0 30rpx;
	border-radius: 4rpx;
	cursor: pointer;
	box-sizing: border-box;
	flex-shrink: 0;
}

.detail-btn {
	background-color: #f6f6f6;
}

.primary-btn {
	background-color: #333333;
	min-width: 200rpx;
}

.cancel-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 148rpx;
	height: 60rpx;
	padding: 0 30rpx;
	border-radius: 4rpx;
	background-color: #f6f6f6;
	cursor: pointer;
	box-sizing: border-box;
	flex-shrink: 0;
}

.pay-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 200rpx;
	height: 60rpx;
	padding: 0 30rpx;
	border-radius: 4rpx;
	background-color: #333333;
	cursor: pointer;
	box-sizing: border-box;
	flex-shrink: 0;
}

.btn-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	font-size: 22rpx;
	white-space: nowrap;
	
	&.primary {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #ffffff;
		white-space: nowrap;
	}
}
</style>

