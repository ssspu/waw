<template>
	<view class="service-list-section">
		<view class="order-list">
			<view 
				v-for="(order, index) in filteredOrders" 
				:key="index" 
				class="order-card"
				@tap="handleOrderCardClick(order)"
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
							<text class="more-link" @tap.stop="handleMore(order)">更多</text>
							<view class="action-buttons">
								<template v-if="order.status === '待付款'">
									<view class="cancel-btn" @tap.stop="handleCancel(order)">
										<text class="btn-text">取消</text>
									</view>
									<view class="pay-btn" @tap.stop="handlePay(order)">
										<text class="btn-text primary">立即付款</text>
									</view>
								</template>
								<template v-else>
									<image 
										v-if="order.hasIcon"
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
		
		<!-- 更多操作弹窗 -->
		<view class="more-modal" v-if="showMoreModal" @tap="handleCloseMoreModal">
			<view class="more-modal-content" @tap.stop>
				<view class="more-modal-header">
					<text class="more-modal-title">更多</text>
					<view class="more-close-btn" @tap="handleCloseMoreModal">
						<text class="more-close-icon">×</text>
					</view>
				</view>
				<view class="more-modal-body">
					<view class="contact-option" @tap="handleContactOnline">
						<view class="contact-icon online-icon">
							<image 
								class="icon-image" 
								src="/static/icon/wodekefu.png" 
								mode="aspectFit"
							></image>
						</view>
						<text class="contact-text">在线联系</text>
					</view>
					<view class="contact-option" @tap="handleContactPhone">
						<view class="contact-icon phone-icon">
							<image 
								class="icon-image" 
								src="/static/icon/dianhua.png" 
								mode="aspectFit"
							></image>
						</view>
						<text class="contact-text">电话联系</text>
					</view>
				</view>
				<view class="more-modal-footer">
					<text class="more-cancel-btn" @tap="handleCloseMoreModal">取消</text>
				</view>
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
import api from '@/api'

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
			showCancelModal: false,
			showMoreModal: false,
			selectedReasonIndex: null,
			currentCancelOrder: null,
			currentMoreOrder: null,
			loading: false,
			page: 1,
			pageSize: 10,
			hasMore: true,
			cancelReasons: [
				'价格有点贵',
				'时间选择有问题',
				'我想换一个设计师',
				'暂时不需要了',
				'其他'
			],
			serviceOrders: [],
		}
	},
	computed: {
		filteredOrders() {
			return this.serviceOrders
		}
	},
	watch: {
		activeTab: {
			handler() {
				this.page = 1
				this.serviceOrders = []
				this.fetchOrders()
			},
			immediate: true
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
		// 获取订单列表
		async fetchOrders() {
			if (this.loading) return
			this.loading = true
			try {
				// 将tab映射为API状态参数
				const statusMap = {
					'all': 'all',
					'pending-payment': 'pending_payment',
					'pending-confirm': 'confirmed',
					'pending-use': 'pending_use',
					'pending-review': 'completed'
				}
				const status = statusMap[this.activeTab] || 'all'

				const res = await api.order.getList({
					status: status === 'all' ? undefined : status,
					page: this.page,
					pageSize: this.pageSize
				})

				if (res.code === 0) {
					const list = (res.data.list || []).map(order => this.transformOrder(order))
					if (this.page === 1) {
						this.serviceOrders = list
					} else {
						this.serviceOrders = [...this.serviceOrders, ...list]
					}
					this.hasMore = res.data.hasMore
				}
			} catch (err) {
				console.error('获取订单列表失败:', err)
				uni.showToast({ title: '获取订单失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		// 转换订单数据格式
		transformOrder(order) {
			const statusMap = {
				'pending_payment': { text: '待付款', color: '#ffa77b', tab: 'pending-payment', primaryButton: '立即付款' },
				'confirmed': { text: '已确认', color: '#ffa77b', tab: 'pending-use', primaryButton: '订单完成' },
				'pending_use': { text: '待使用', color: '#52c41a', tab: 'pending-use', primaryButton: '订单完成' },
				'completed': { text: '已完成', color: '#999999', tab: 'pending-review', primaryButton: order.hasReviewed ? '查看评价' : '立即评价' },
				'cancelled': { text: '已取消', color: '#999999', tab: 'all', primaryButton: '再次预约' }
			}
			const statusInfo = statusMap[order.status] || { text: order.statusText, color: '#999', tab: 'all', primaryButton: '详情' }

			// 计算剩余支付时间
			let remainingTime = null
			if (order.status === 'pending_payment' && order.payDeadline) {
				const deadline = new Date(order.payDeadline).getTime()
				const now = Date.now()
				const diff = Math.max(0, deadline - now)
				const hours = Math.floor(diff / 3600000)
				const minutes = Math.floor((diff % 3600000) / 60000)
				const seconds = Math.floor((diff % 60000) / 1000)
				remainingTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
			}

			return {
				orderNumber: order.id,
				status: statusInfo.text,
				statusColor: statusInfo.color,
				remainingTime,
				serviceName: order.serviceName,
				serviceDetails: '洗护+修剪+造型',
				duration: '预计1小时',
				time: this.formatAppointmentTime(order.appointmentTime),
				provider: {
					name: order.designerName || order.brandName,
					badge: order.designerId ? '美发师' : null,
					avatar: order.designerAvatar || '/static/avatar/avatar.png',
					rating: '4.8',
					reviews: '23',
				},
				price: String(order.payAmount),
				quantity: 'x1',
				hasIcon: order.status !== 'pending_payment',
				primaryButton: statusInfo.primaryButton,
				tab: statusInfo.tab,
				rawOrder: order
			}
		},
		// 格式化预约时间
		formatAppointmentTime(time) {
			if (!time) return ''
			const date = new Date(time)
			const today = new Date()
			const tomorrow = new Date(today)
			tomorrow.setDate(tomorrow.getDate() + 1)

			const hours = String(date.getHours()).padStart(2, '0')
			const minutes = String(date.getMinutes()).padStart(2, '0')

			if (date.toDateString() === today.toDateString()) {
				return `今天${hours}:${minutes}`
			} else if (date.toDateString() === tomorrow.toDateString()) {
				return `明天${hours}:${minutes}`
			} else {
				return `${date.getMonth() + 1}月${date.getDate()}日 ${hours}:${minutes}`
			}
		},
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
			this.currentMoreOrder = order
			this.showMoreModal = true
		},
		handleCloseMoreModal() {
			this.showMoreModal = false
			this.currentMoreOrder = null
		},
		handleContactOnline() {
			console.log('在线联系:', this.currentMoreOrder)
			uni.showToast({
				title: '在线联系',
				icon: 'none'
			})
			this.handleCloseMoreModal()
		},
		handleContactPhone() {
			console.log('电话联系:', this.currentMoreOrder)
			uni.showToast({
				title: '电话联系',
				icon: 'none'
			})
			this.handleCloseMoreModal()
		},
		handleDetail(order) {
			// 根据订单状态或tab跳转到对应详情页
			if (order.status === '待付款') {
				uni.navigateTo({
					url: `/pages/order/detail?orderId=${order.orderNumber}`
				})
			} else if (order.tab === 'pending-use') {
				uni.navigateTo({
					url: `/pages/order/detail-pending-use?orderId=${order.orderNumber}`
				})
			}
		},
		handlePrimaryAction(order) {
			if (order.primaryButton === '立即评价') {
				uni.navigateTo({
					url: `/pages/order/service-review?orderId=${order.orderNumber}`
				})
			} else {
				console.log('Primary action clicked:', order.primaryButton)
			}
		},
		handleCancel(order) {
			this.currentCancelOrder = order
			this.showCancelModal = true
			this.selectedReasonIndex = null
		},
		handleCloseModal() {
			this.showCancelModal = false
			this.selectedReasonIndex = null
			this.currentCancelOrder = null
		},
		handleSelectReason(index) {
			this.selectedReasonIndex = index
		},
		async handleConfirmCancel() {
			if (this.selectedReasonIndex === null) {
				uni.showToast({
					title: '请选择取消原因',
					icon: 'none'
				})
				return
			}

			const reason = this.cancelReasons[this.selectedReasonIndex]

			// 调用取消订单API
			if (this.currentCancelOrder) {
				try {
					const res = await api.order.cancel(this.currentCancelOrder.orderNumber, { reason })
					if (res.code === 0) {
						// 从列表中移除已取消的订单
						const orderIndex = this.serviceOrders.findIndex(o => o.orderNumber === this.currentCancelOrder.orderNumber)
						if (orderIndex !== -1) {
							this.serviceOrders.splice(orderIndex, 1)
						}
						uni.showToast({
							title: '订单已取消',
							icon: 'success'
						})
					}
				} catch (err) {
					console.error('取消订单失败:', err)
					uni.showToast({ title: '取消失败', icon: 'none' })
				}
			}

			this.showCancelModal = false
			this.selectedReasonIndex = null
			this.currentCancelOrder = null
		},
		handlePay(order) {
			console.log('Pay clicked:', order)
			// 跳转到支付页面
			uni.navigateTo({
				url: `/pages/payment/index?orderId=${order.orderNumber}`
			})
		},
		handleOrderCardClick(order) {
			// 待付款订单点击卡片跳转到订单详情
			if (order.status === '待付款') {
				uni.navigateTo({
					url: `/pages/order/detail?orderId=${order.orderNumber}`
				})
			} else if (order.tab === 'pending-use') {
				// 待使用订单点击卡片跳转到待使用详情页
				uni.navigateTo({
					url: `/pages/order/detail-pending-use?orderId=${order.orderNumber}`
				})
			}
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

/* 更多操作弹窗 */
.more-modal {
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

.more-modal-content {
	width: 100%;
	background-color: #ffffff;
	border-radius: 24rpx 24rpx 0 0;
	overflow: hidden;
}

.more-modal-header {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 32rpx 32rpx 24rpx;
	border-bottom: 2rpx solid #f0f0f0;
	position: relative;
}

.more-modal-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	text-align: center;
}

.more-close-btn {
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

.more-close-icon {
	font-size: 48rpx;
	color: #999999;
	line-height: 1;
}

.more-modal-body {
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.contact-option {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16rpx;
	padding: 32rpx;
	border-radius: 12rpx;
}

.contact-option:first-child {
	background-color: #ffffff;
	border: 2rpx solid #e0e0e0;
}

.contact-option:last-child {
	background-color: #333333;
}

.contact-icon {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.icon-image {
	width: 32rpx;
	height: 32rpx;
}

.phone-icon .icon-image {
	filter: brightness(0) invert(1);
}

.contact-option:last-child .contact-text {
	color: #ffffff;
}

.contact-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
}

.more-modal-footer {
	padding: 24rpx 32rpx 32rpx;
	border-top: 2rpx solid #f0f0f0;
}

.more-cancel-btn {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24rpx 0;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: 400;
	color: #666666;
	text-align: center;
}
</style>

