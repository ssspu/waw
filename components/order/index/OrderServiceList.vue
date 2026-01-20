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
							<text class="service-name" @tap="handleDetail(order)">{{ order.serviceName }}</text>
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
						
						<!-- 服务提供信息 -->
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
												src="/static/icon/star.png" 
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
								<!-- 退款中状态 -->
								<template v-else-if="order.tab === 'refunding'">
									<view class="detail-btn" @tap.stop="handleContactMerchant(order)">
										<text class="btn-text">联系商家</text>
									</view>
									<view class="primary-btn" @tap.stop="handleDetail(order)">
										<text class="btn-text primary">查看进度</text>
									</view>
								</template>
								<!-- 已退款状态 -->
								<template v-else-if="order.tab === 'refunded'">
									<view class="detail-btn" @tap.stop="handleDetail(order)">
										<text class="btn-text">查看详情</text>
									</view>
									<view class="primary-btn" @tap.stop="handleReorder(order)">
										<text class="btn-text primary">再次预约</text>
									</view>
								</template>
								<!-- 已取消状态 -->
								<template v-else-if="order.tab === 'cancelled'">
									<view class="detail-btn" @tap.stop="handleDetail(order)">
										<text class="btn-text">查看详情</text>
									</view>
									<view class="primary-btn" @tap.stop="handleReorder(order)">
										<text class="btn-text primary">再次预约</text>
									</view>
								</template>
								<!-- 售后状态 -->
								<template v-else-if="order.tab === 'after-sale'">
									<view class="detail-btn" @tap.stop="handleContactMerchant(order)">
										<text class="btn-text">联系商家</text>
									</view>
									<view class="primary-btn" @tap.stop="handleDetail(order)">
										<text class="btn-text primary">查看详情</text>
									</view>
								</template>
								<template v-else>
									<image
										v-if="order.hasIcon && order.tab === 'pending-use'"
										class="action-icon"
										src="https://bioflex.cn/static/icon/more.png"
										mode="aspectFit"
										@tap.stop="handleShowQrcode(order)"
									></image>
									<image
										v-else-if="order.hasIcon"
										class="action-icon"
										src="https://bioflex.cn/static/icon/more.png"
										mode="aspectFit"
									></image>
									<view class="detail-btn" @tap.stop="handleDetail(order)">
										<text class="btn-text">详情</text>
									</view>
									<view class="primary-btn" @tap.stop="handlePrimaryAction(order)">
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
								src="https://bioflex.cn/static/icon/wodekefu.png"
								mode="aspectFit"
							></image>
						</view>
						<text class="contact-text">在线联系</text>
					</view>
					<view class="contact-option" @tap="handleContactPhone">
						<view class="contact-icon phone-icon">
							<image
								class="icon-image"
								src="https://bioflex.cn/static/icon/dianhua.png"
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
		
		<!-- 二维码弹窗 -->
		<view class="qrcode-modal" v-if="showQrcodeModal" @tap="handleCloseQrcodeModal">
			<view class="qrcode-modal-content" @tap.stop>
				<view class="qrcode-modal-header">
					<text class="qrcode-modal-title">核二维码</text>
					<view class="qrcode-close-btn" @tap="handleCloseQrcodeModal">
						<text class="qrcode-close-icon">×</text>
					</view>
				</view>
				<view class="qrcode-modal-body">
					<view class="qrcode-container">
						<image
							class="qrcode-image"
							src="https://bioflex.cn/static/icon/qrcode-demo.png"
							mode="aspectFit"
						></image>
					</view>
					<text class="qrcode-tip">请向服务人员出示此二维码完成核</text>
					<view class="order-info-list">
						<view class="order-info-row">
							<text class="order-info-label">订单编号：</text>
							<text class="order-info-value">{{ currentQrcodeOrder?.orderNumber }}</text>
						</view>
						<view class="order-info-row">
							<text class="order-info-label">服务项目：</text>
							<text class="order-info-value">{{ currentQrcodeOrder?.serviceName }}</text>
						</view>
						<view class="order-info-row">
							<text class="order-info-label">服务时间：</text>
							<text class="order-info-value">{{ currentQrcodeOrder?.time }}</text>
						</view>
						<view class="order-info-row">
							<text class="order-info-label">服务金额：</text>
							<text class="order-info-value price">¥{{ currentQrcodeOrder?.price }}</text>
						</view>
					</view>
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
					<text class="modal-desc">取消后无法回复,优惠券,M币可回,有效期内使用;两小以上或未确认订单可以免责取消,确认订单并在两小时内取消,将影响你在平台的信用</text>
					<text class="reason-prompt">请择取消订单原因(必)</text>
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
			showQrcodeModal: false,
			selectedReasonIndex: null,
			currentCancelOrder: null,
			currentMoreOrder: null,
			currentQrcodeOrder: null,
			cancelReasons: [
				'价格有点贵',
				'时间择有问题',
				'我想换个设计师',
				'暂时不要了',
				'其他'
			],
			serviceOrders: [],
			loading: false,
			page: 1,
			pageSize: 20,
			timeoutOrderIds: new Set(), // 记录已超时的订单ID，防止重复刷新
			hasFetched: false // 标记是否已经获取过数据
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
	watch: {
		activeTab: {
			handler() {
				this.page = 1
				this.timeoutOrderIds.clear() // 切换 tab 时重置超时订单记录
				this.fetchOrders()
			},
			immediate: false
		}
	},
	mounted() {
		this.checkLoginAndFetch()
	},
	beforeDestroy() {
		if (this.countdownTimer) {
			clearInterval(this.countdownTimer)
		}
	},
	methods: {
		// 检查登录状态后再获取订单
		checkLoginAndFetch() {
			const token = uni.getStorageSync('waw_token')
			if (!token) {
				uni.showModal({
					title: '提示',
					content: '请先登录后查看订单',
					showCancel: false,
					success: () => {
						uni.navigateTo({
							url: '/pages/login/index'
						})
					}
				})
				return
			}
			this.fetchOrders()
		},
		async fetchOrders() {
			if (this.loading) return
			this.loading = true
			try {
				// 状态映射：前端tab -> 后端API状态值（大写格式）
				const statusMap = {
					'all': '',  // 空字符串表示查询全部
					'pending-payment': 'PENDING_PAYMENT',
					'pending-confirm': 'CONFIRMED',
					'pending-use': 'PENDING_USE',
					'pending-review': 'COMPLETED'
				}
				const res = await api.order.getList({
					status: statusMap[this.activeTab] || '',
					page: this.page,
					pageSize: this.pageSize
				})
				console.log('📦 订单列表响应:', res)
				if (res.code === 200) {
					const list = res.data.list || res.data.records || res.data.items || []
					console.log('📋 订单原始数据:', list)
					if (list.length > 0) {
						console.log('📄 第一条订单字段:', Object.keys(list[0]))
						console.log('📄 第一条订单数据:', list[0])
					}
					this.serviceOrders = list.map(order => this.transformOrder(order))
					console.log('🔄 转换后的订单:', this.serviceOrders)
					this.startCountdown()
				}
			} catch (err) {
				console.error('获取订单列表失败:', err)
				// 如果是401未授权，跳转登录
				if (err.code === 401 || err.code === 10001 || err.code === 10002) {
					uni.showToast({ title: '请重新登录', icon: 'none' })
					setTimeout(() => {
						uni.navigateTo({ url: '/pages/login/index' })
					}, 1500)
					return
				}
				uni.showToast({ title: '获取订单列表失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		transformOrder(order) {
			// 状态配置：后端状态值（大写） -> 前端显示配置
			const statusConfig = {
				'PENDING_PAYMENT': { text: '待付款', color: '#ffa77b', tab: 'pending-payment', primaryButton: '立即付款' },
				'CONFIRMED': { text: '已付款', color: '#ffa77b', tab: 'pending-confirm', primaryButton: '等待服务' },
				'PENDING_USE': { text: '待使用', color: '#ffa77b', tab: 'pending-use', primaryButton: '订单完成' },
				'IN_SERVICE': { text: '服务中', color: '#ffa77b', tab: 'in-service', primaryButton: '查看进度' },
				'COMPLETED': { text: '已完成', color: '#999999', tab: 'pending-review', primaryButton: order.has_reviewed || order.hasReviewed ? '查看评价' : '立即评价' },
				'CANCELLED': { text: '已取消', color: '#999999', tab: 'cancelled', primaryButton: '再次预约' },
				'REFUNDING': { text: '退款中', color: '#ffa77b', tab: 'refunding', primaryButton: '查看进度' },
				'REFUNDED': { text: '已退款', color: '#999999', tab: 'refunded', primaryButton: '查看详情' }
			}
			const config = statusConfig[order.status] || statusConfig['PENDING_PAYMENT']

			// 使用后端返回的 payment_expire_time 计算剩余支付时间，如果没有则用 create_time + 15分钟
			let remainingTime = null
			let expireTime = order.payment_expire_time || order.paymentExpireTime
			let isExpired = false
			if (order.status === 'PENDING_PAYMENT') {
				if (!expireTime) {
					const createTime = order.create_time || order.createTime
					if (createTime) {
						expireTime = new Date(new Date(createTime).getTime() + 15 * 60 * 1000).toISOString()
					}
				}
				if (expireTime) {
					const expireTimestamp = new Date(expireTime).getTime()
					const remaining = Math.max(0, expireTimestamp - Date.now())

					if (remaining <= 0) {
						remainingTime = '00:00'
						isExpired = true
					} else {
						const minutes = Math.floor(remaining / 60000)
						const seconds = Math.floor((remaining % 60000) / 1000)
						remainingTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
					}
				}
			}

			// 如果待付款订单已过期，直接显示为已取消
			const finalConfig = isExpired ? statusConfig['CANCELLED'] : config

			// 兼容 snake_case 和 camelCase 字段名
			const serviceName = order.service_name || order.serviceName || '待加载...'
			const orderNo = order.order_no || order.orderNo || order.id
			const appointmentTime = order.appointment_time || order.appointmentTime || ''
			const designerName = order.designer_name || order.designerName || ''
			const shopName = order.shop_name || order.shopName || ''
			const brandName = order.brand_name || order.brandName || ''
			const designerAvatar = order.designer_avatar || order.designerAvatar || 'https://bioflex.cn/static/avatar/avatar.png'
			// 价格字段：优先使用 final_price（实付金额）
			const payAmount = order.final_price || order.pay_amount || order.payAmount || order.total_price || order.totalPrice || order.price || order.amount || 0

			return {
				id: order.id,
				orderNumber: orderNo,
				status: finalConfig.text,
				statusColor: finalConfig.color,
				remainingTime,
				serviceName: serviceName,
				serviceDetails: order.service_details || order.serviceDetails || '服务详情',
				duration: order.duration || order.estimated_time || '预计1小时',
				time: appointmentTime,
				provider: {
					name: designerName || brandName || '服务提供者',
					badge: designerName ? '美发师' : null,
					avatar: designerAvatar,
					rating: order.rating || '4.8',
					reviews: order.review_count || order.reviewCount || '0'
				},
				price: String(payAmount),
				quantity: 'x1',
				hasIcon: order.status === 'PENDING_USE',
				primaryButton: finalConfig.primaryButton,
				tab: finalConfig.tab,
				rawData: order
			}
		},
		/**
		 * 启动倒计时 - 使用后端返回的 payment_expire_time
		 * 仅本地更新UI，不会每秒请求后端
		 */
		startCountdown() {
			if (this.countdownTimer) {
				clearInterval(this.countdownTimer)
			}

			this.countdownTimer = setInterval(() => {
				let hasNewTimeout = false

				this.serviceOrders.forEach(order => {
					if (order.status === '待付款' && order.rawData) {
						let expireTime = order.rawData.payment_expire_time || order.rawData.paymentExpireTime
						// 如果没有过期时间，使用创建时间 + 15分钟
						if (!expireTime) {
							const createTime = order.rawData.create_time || order.rawData.createTime
							if (createTime) {
								expireTime = new Date(new Date(createTime).getTime() + 15 * 60 * 1000).toISOString()
							}
						}
						if (!expireTime) return

						const expireTimestamp = new Date(expireTime).getTime()
						const remaining = Math.max(0, expireTimestamp - Date.now())

						if (remaining <= 0) {
							// 倒计时结束，立即更新为已取消状态
							order.remainingTime = '00:00'
							order.status = '已取消'
							order.statusColor = '#999999'
							order.tab = 'cancelled'
							order.primaryButton = '再次预约'

							// 使用组件级的 Set，只有首次超时才标记需要刷新
							if (!this.timeoutOrderIds.has(order.id)) {
								this.timeoutOrderIds.add(order.id)
								hasNewTimeout = true
							}
						} else {
							const minutes = Math.floor(remaining / 60000)
							const seconds = Math.floor((remaining % 60000) / 1000)
							order.remainingTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
						}
					}
				})

				// 只有新超时的订单才刷新列表（只刷新一次，不重启倒计时）
				if (hasNewTimeout) {
					setTimeout(() => {
						this.refreshOrdersOnce()
					}, 2000) // 延迟2秒刷新，等待后端状态更新
				}
			}, 1000)
		},
		/**
		 * 静默刷新订单列表（不重启倒计时，避免循环调用）
		 */
		async refreshOrdersOnce() {
			if (this.loading) return
			this.loading = true
			try {
				const statusMap = {
					'all': '',
					'pending-payment': 'PENDING_PAYMENT',
					'pending-confirm': 'CONFIRMED',
					'pending-use': 'PENDING_USE',
					'pending-review': 'COMPLETED'
				}
				const res = await api.order.getList({
					status: statusMap[this.activeTab] || '',
					page: this.page,
					pageSize: this.pageSize
				})
				if (res.code === 200) {
					const list = res.data.list || res.data.records || res.data.items || []
					this.serviceOrders = list.map(order => this.transformOrder(order))
					// 注意：不调用 startCountdown()，避免循环
				}
			} catch (err) {
				console.error('刷新订单列表失败:', err)
			} finally {
				this.loading = false
			}
		},
		handleShowQrcode(order) {
			this.currentQrcodeOrder = order
			this.showQrcodeModal = true
		},
		handleCloseQrcodeModal() {
			this.showQrcodeModal = false
			this.currentQrcodeOrder = null
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
			if (order.status === '待付款' || order.tab === 'pending-payment') {
				uni.navigateTo({
					url: `/packageOrder/pages/order/detail?orderId=${order.id}`
				})
			} else if (order.tab === 'pending-confirm') {
				uni.navigateTo({
					url: `/packageOrder/pages/order/detail-pending-confirm?orderId=${order.id}`
				})
			} else if (order.tab === 'pending-review') {
				uni.navigateTo({
					url: `/packageOrder/pages/order/detail-pending-review?orderId=${order.id}`
				})
			} else if (order.tab === 'after-sale' || order.tab === 'refunding' || order.tab === 'refunded' || order.tab === 'cancelled') {
				// 退款中、已退款、已取消都跳转到售后详情页
				uni.navigateTo({
					url: `/packageOrder/pages/order/detail-after-sale?orderId=${order.id}`
				})
			} else {
				uni.navigateTo({
					url: `/packageOrder/pages/order/detail-pending-use?orderId=${order.id}`
				})
			}
		},
		handlePrimaryAction(order) {
			if (order.primaryButton === '立即评价') {
				uni.navigateTo({
					url: `/packageOrder/pages/order/service-review?orderId=${order.id}`
				})
			} else {
				console.log('Primary action clicked:', order.primaryButton)
			}
		},
		// 再次预约
		handleReorder(order) {
			// 跳转到设计师详情页进行预约
			if (order.rawData && (order.rawData.designer_id || order.rawData.designerId)) {
				const designerId = order.rawData.designer_id || order.rawData.designerId
				uni.navigateTo({
					url: `/pages/designer/detail?id=${designerId}&tab=appointment`
				})
			} else {
				uni.showToast({
					title: '无法获取设计师信息',
					icon: 'none'
				})
			}
		},
		handleContactMerchant(order) {
			
			this.currentMoreOrder = order
			this.showMoreModal = true
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
					title: '请择取消原因',
					icon: 'none'
				})
				return
			}

			const reason = this.cancelReasons[this.selectedReasonIndex]
			try {
				const res = await api.order.cancel(this.currentCancelOrder.id, { reason })
				if (res.code === 200) {
					const orderIndex = this.serviceOrders.findIndex(o => o.id === this.currentCancelOrder.id)
					if (orderIndex !== -1) {
						this.serviceOrders.splice(orderIndex, 1)
					}
					uni.showToast({
						title: '订单已取消',
						icon: 'success'
					})
				}
			} catch (err) {
				uni.showToast({ title: '取消失败', icon: 'none' })
			}

			this.showCancelModal = false
			this.selectedReasonIndex = null
			this.currentCancelOrder = null
		},
		handlePay(order) {
			uni.navigateTo({
				url: `/packageOrder/pages/order/detail?orderId=${order.id}`
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
	width: 24rpx;
	height: 24rpx;
	flex-shrink: 0;
	padding: 2rpx;
	background-color: #333333;
	border-radius: 4rpx;
	box-sizing: border-box;
}

.star-icon {
	width: 20rpx;
	height: 20rpx;
	filter: brightness(0) invert(1);
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


.qrcode-icon {
	cursor: pointer;
}


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

.order-info-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	padding: 24rpx;
	background-color: #f8f8f8;
	border-radius: 12rpx;
}

.order-info-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.order-info-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #999999;
}

.order-info-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 26rpx;
	color: #333333;
}

.order-info-value.price {
	color: #ff6b35;
	font-weight: 500;
}
</style>

