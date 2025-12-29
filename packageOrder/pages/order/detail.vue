<template>
	<view class="order-detail-page">
		<view class="order-status-section">
			<view class="status-content">
				<text class="status-title">您有待付款订单</text>
				<text class="countdown-time">{{ countdown }}</text>
			</view>
			<view class="status-desc">
				<text class="desc-text">请在15分钟内付款,超时订单将自动关闭</text>
				<text class="desc-text">付款倒计时</text>
			</view>
		</view>
		
		<!-- 主内容 -->
		<view class="main-content">
			<!-- 商品详情 -->
			<view class="product-section">
				<image
					class="product-image"
					:src="productInfo.image"
					mode="aspectFill"
				></image>
				<view class="product-info">
					<view class="product-left">
						<text class="product-name">{{ productInfo.name }}</text>
						<text class="product-category">{{ productInfo.category }}</text>
						<text class="product-duration">{{ productInfo.duration }}</text>
					</view>
					<view class="product-right">
						<view class="price-row">
							<text class="price-symbol">¥</text>
							<text class="price-value">{{ productInfo.price }}</text>
						</view>
						<text class="quantity">*1</text>
					</view>
				</view>
			</view>

			<!-- 预约信息（如果有） -->
			<view v-if="bookingInfo.designer" class="booking-info-section">
				<text class="section-title">预约信息</text>
				<view class="info-list">
					<view class="info-item">
						<text class="info-label">设计师</text>
						<text class="info-value">{{ bookingInfo.designer }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">预约日期</text>
						<text class="info-value">{{ bookingInfo.date }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">预约时间</text>
						<text class="info-value">{{ bookingInfo.time }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">门店地址</text>
						<text class="info-value">{{ bookingInfo.address }}</text>
					</view>
				</view>
			</view>
			
			<!-- 价格明细 -->
			<view class="price-section">
				<text class="section-title">价格明细</text>
				<view class="price-list">
					<view class="price-item">
						<text class="price-label">商品金额</text>
						<text class="price-text">¥{{ productInfo.price }}</text>
					</view>
					<view class="price-item coupon-row" @tap="handleOpenCoupon">
						<text class="price-label">优惠金额</text>
						<view class="coupon-value-row">
							<view v-if="!selectedCoupon" class="coupon-available-tag">
								<text class="coupon-available-text">{{ availableCouponsCount }}张优惠券可用</text>
							</view>
							<text v-else class="price-text discount-price">-¥{{ discountAmount }}</text>
							<image
								v-if="selectedCoupon"
								class="arrow-right-icon"
								src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame-1.svg"
								mode="aspectFit"
							></image>
						</view>
					</view>
					<view class="price-item total">
						<text class="price-label">合计支付</text>
						<view class="total-price">
							<text class="total-price-value">¥{{ finalPrice }}</text>
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
					<!-- 众美积分 - 测试阶段隐藏
					<view class="info-item">
						<text class="info-label">众美积分</text>
						<text class="info-value">{{ orderInfo.points }}</text>
					</view>
					-->
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
					<text class="modal-desc">取消后无法回复,优惠券,M币可收回,有效期内使用;两小以上或未确认订单可以免责取消,确认订单并在两小时内取消,将影响你在平台的信用</text>
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

		<!-- 优惠券弹窗 -->
		<coupon-popup
			:visible="showCouponPopup"
			:coupons="coupons"
			mode="select"
			:selected-id="selectedCoupon ? selectedCoupon.id : null"
			@close="showCouponPopup = false"
			@select="handleSelectCoupon"
		></coupon-popup>
	</view>
</template>

<script>
import CouponPopup from '@/components/popup/CouponPopup.vue'
import api from '@/api'

export default {
	components: {
		CouponPopup
	},
	data() {
		return {
			countdown: '15:00',
			countdownTimer: null,
			isTimeout: false,
			paymentExpireTime: null,  // 后端返回的支付过期时间
			showCancelModal: false,
			showCouponPopup: false,
			selectedCoupon: null,
			discountAmount: 0,
			coupons: [],
			selectedReasonIndex: null,
			cancelReasons: [
				'价格有点贵',
				'时间选择有问题',
				'我想换一个设计师',
				'暂时不要了',
				'其他'
			],
			productInfo: {
				image: 'https://bioflex.cn/static/icon/rectangle-169.png',
				name: '欧莱雅植物洗护套装一套',
				category: '洗护',
				duration: '1小时',
				price: '799'
			},
			bookingInfo: {
				designer: '',
				date: '',
				time: '',
				address: ''
			},
			orderInfo: {
				id: '',
				createTime: '2022-04-22 12:04:22',
				paymentMethod: '在线支付',
				points: '获得60积分',
				orderNumber: 'CD902847058048906'
			},
			rawOrderData: null
		}
	},
	computed: {
		finalPrice() {
			const price = parseFloat(this.productInfo.price) || 0
			return Math.max(0, price - this.discountAmount)
		},
		availableCouponsCount() {
			const price = parseFloat(this.productInfo.price) || 0
			return this.coupons.filter(coupon => price >= coupon.minAmount).length
		}
	},
	onLoad(options) {
		
		
		if (options.data) {
			try {
				const orderData = JSON.parse(decodeURIComponent(options.data))
				this.parseOrderData(orderData)
			} catch (e) {
				console.error('解析订单数据失败:', e)
			}
		}
		
		if (options.orderId) {
			this.fetchOrderDetail(options.orderId)
		}
		this.startCountdown()
		
		this.orderInfo.orderNumber = this.generateOrderNumber()
		
		this.orderInfo.createTime = this.formatDateTime(new Date())
		
		this.fetchAvailableCoupons()
	},
	onShow() {
		// 页面显示时重新计算倒计时（处理用户切换页面后返回的情况）
		if (this.orderInfo.createTime && !this.isTimeout) {
			this.startCountdown()
		}
	},
	onUnload() {
		if (this.countdownTimer) {
			clearInterval(this.countdownTimer)
		}
	},
	methods: {
		/**
		 * 启动倒计时 - 使用后端返回的 payment_expire_time
		 */
		startCountdown() {
			if (this.countdownTimer) {
				clearInterval(this.countdownTimer)
			}

			const updateCountdown = () => {
				if (!this.paymentExpireTime) {
					this.countdown = '15:00'
					return
				}

				const expireTimestamp = new Date(this.paymentExpireTime).getTime()
				const remaining = Math.max(0, expireTimestamp - Date.now())

				if (remaining <= 0) {
					this.countdown = '00:00'
					this.isTimeout = true
					clearInterval(this.countdownTimer)
					this.handleOrderTimeout()
					return
				}

				const minutes = Math.floor(remaining / 60000)
				const seconds = Math.floor((remaining % 60000) / 1000)
				this.countdown = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
			}

			updateCountdown()
			this.countdownTimer = setInterval(updateCountdown, 1000)
		},

		/**
		 * 处理订单超时
		 */
		async handleOrderTimeout() {
			uni.showToast({
				title: '订单已超时，正在刷新状态...',
				icon: 'none'
			})

			// 如果有订单ID，刷新订单状态
			if (this.orderInfo.id) {
				try {
					const res = await api.order.getDetail(this.orderInfo.id)
					if (res.code === 200 && res.data) {
						const order = res.data
						if (order.status === 'CANCELLED') {
							uni.showModal({
								title: '订单已取消',
								content: order.cancel_reason || '订单超时未支付，系统自动取消',
								showCancel: false,
								confirmText: '我知道了',
								success: () => {
									uni.navigateBack()
								}
							})
						}
					}
				} catch (err) {
					console.error('刷新订单状态失败:', err)
				}
			} else {
				uni.showModal({
					title: '订单已超时',
					content: '订单超时未支付，已自动取消',
					showCancel: false,
					confirmText: '我知道了',
					success: () => {
						uni.navigateBack()
					}
				})
			}
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
			this.doWechatPay()
		},

		async doWechatPay() {
			uni.showLoading({ title: '正在发起支付...' })
			try {
				// 如果没有订单ID，先创建订单
				if (!this.orderInfo.id) {
					const createRes = await this.createOrder()
					if (!createRes) {
						return
					}
				}

				const res = await api.payment.prepay(this.orderInfo.id)
				uni.hideLoading()

				if (res.code !== 200) {
					// 根据API文档定义的错误码
					const errorMessages = {
						400001: '订单不存在',
						400002: '无权操作此订单',
						400003: '订单状态不允许此操作',
						400004: '订单已支付',
						400101: '微信支付配置错误',
						400102: '微信支付下单失败',
						400103: '微信支付签名验证失败',
						400104: '微信退款失败',
						400105: '用户OpenID未找到，请先绑定微信账号'
					}

					// 如果是OpenID未找到，弹出绑定微信确认框
					if (res.code === 400105) {
						uni.showModal({
							title: '提示',
							content: '您还未绑定微信账号，是否立即绑定？',
							confirmText: '立即绑定',
							success: (modalRes) => {
								if (modalRes.confirm) {
									this.bindWechat()
								}
							}
						})
						return
					}

					uni.showToast({
						title: errorMessages[res.code] || res.message || '支付失败',
						icon: 'none'
					})
					return
				}

				
				const { pay_params } = res.data

				
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: pay_params.timeStamp,
					nonceStr: pay_params.nonceStr,
					package: pay_params.package,
					signType: pay_params.signType,
					paySign: pay_params.paySign,
					success: () => {
						
						this.pollPaymentStatus()
					},
					fail: (err) => {
						if (err.errMsg && err.errMsg.includes('cancel')) {
							uni.showToast({ title: '已取消支付', icon: 'none' })
						} else {
							uni.showToast({ title: '支付失败', icon: 'error' })
						}
					}
				})
			} catch (err) {
				uni.hideLoading()
				console.error('支付失败:', err)
				uni.showToast({ title: '支付失败，请重试', icon: 'none' })
			}
		},
		
		/**
		 * 轮询查询支付状态
		 * 根据API文档，trade_state状态值：
		 * - SUCCESS: 支付成功
		 * - NOTPAY: 未支付
		 * - CLOSED: 已关闭
		 * - USERPAYING: 支付中
		 * - PAYERROR: 支付失败
		 */
		async pollPaymentStatus(maxRetries = 10) {
			uni.showLoading({ title: '确认支付结果...' })
			for (let i = 0; i < maxRetries; i++) {
				try {
					const res = await api.payment.queryStatus(this.orderInfo.id)
					if (res.code === 200 && res.data) {
						const { trade_state, trade_state_desc } = res.data

						// 支付成功
						if (trade_state === 'SUCCESS') {
							uni.hideLoading()
							uni.showToast({ title: '支付成功', icon: 'success' })

							setTimeout(() => {
								uni.redirectTo({
									url: `/packageOrder/pages/order/detail-pending-use?orderId=${this.orderInfo.id}`
								})
							}, 1500)
							return { success: true }
						}

						// 支付失败或已关闭
						if (['CLOSED', 'PAYERROR'].includes(trade_state)) {
							uni.hideLoading()
							uni.showToast({
								title: trade_state_desc || '支付失败',
								icon: 'none'
							})
							return { success: false, message: trade_state_desc }
						}

						// 未支付状态 - 继续轮询
						if (trade_state === 'NOTPAY') {
							// 继续轮询，用户可能还在支付中
						}

						// 支付中状态 - 继续轮询
						if (trade_state === 'USERPAYING') {
							// 用户正在支付，继续等待
						}
					}
				} catch (err) {
					console.error('查询支付状态失败:', err)
				}

				// 等待2秒后重试
				await new Promise(resolve => setTimeout(resolve, 2000))
			}
			uni.hideLoading()
			uni.showToast({ title: '查询超时，请稍后查看订单状态', icon: 'none' })
			return { success: false, message: '查询超时，请稍后查看订单状态' }
		},
		handleOpenCoupon() {
			this.showCouponPopup = true
		},
		handleSelectCoupon(coupon) {
			if (coupon) {
				
				const price = parseFloat(this.productInfo.price) || 0
				if (price >= coupon.minAmount) {
					this.selectedCoupon = coupon
					this.discountAmount = coupon.discount
					uni.showToast({
						title: `已使用${coupon.title}`,
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: `满${coupon.minAmount}元才能使用`,
						icon: 'none'
					})
					return
				}
			} else {
				
				this.selectedCoupon = null
				this.discountAmount = 0
			}
			this.showCouponPopup = false
		},
		parseOrderData(orderData) {
			// 保存原始订单数据用于创建订单
			this.rawOrderData = orderData

			if (orderData.service) {
				this.productInfo = {
					image: orderData.service.image || 'https://bioflex.cn/static/icon/rectangle-169.png',
					name: `${orderData.service.title}${orderData.brand ? ' - ' + orderData.brand.name : ''}`,
					category: orderData.hairLength ? orderData.hairLength.label : '',
					duration: orderData.service.estimatedTime || '1小时',
					price: orderData.price || '799'
				}
			}

			if (orderData.designer) {
				this.bookingInfo = {
					designer: orderData.designer.name || '',
					date: this.formatDate(orderData.date),
					time: orderData.timeSlot ? orderData.timeSlot.time : '',
					address: orderData.shop ? `${orderData.shop.name} ${orderData.shop.address}` : ''
				}
			}
		},
		async createOrder() {
			if (!this.rawOrderData) {
				uni.showToast({ title: '订单数据不完整', icon: 'none' })
				return false
			}

			try {
				const data = this.rawOrderData
				console.log('创建订单原始数据:', JSON.stringify(data))

				// 构建预约时间
				let appointmentTime = ''
				if (data.date && data.timeSlot) {
					let targetDate = new Date()

					if (data.date === 'today') {
						// 今天，不需要修改日期
					} else if (data.date === 'tomorrow') {
						targetDate.setDate(targetDate.getDate() + 1)
					} else if (data.date) {
						// 尝试解析日期字符串
						targetDate = new Date(data.date)
					}

					// 设置时间
					const timeParts = data.timeSlot.time.split(':')
					targetDate.setHours(parseInt(timeParts[0]) || 0)
					targetDate.setMinutes(parseInt(timeParts[1]) || 0)
					targetDate.setSeconds(0)
					targetDate.setMilliseconds(0)

					// 使用带时区的ISO格式 (toISOString 自动带Z表示UTC时区)
					appointmentTime = targetDate.toISOString()
				}

				const serviceId = data.service?.id
				const designerId = data.designer?.id

				console.log('serviceId:', serviceId)
				console.log('designerId:', designerId)

				if (!serviceId) {
					uni.showToast({ title: '服务ID不能为空', icon: 'none' })
					return false
				}
				if (!designerId) {
					uni.showToast({ title: '设计师ID不能为空', icon: 'none' })
					return false
				}

				const orderData = {
					serviceId: serviceId,
					designerId: designerId,
					appointmentTime: appointmentTime,
					couponId: this.selectedCoupon?.id,
					remark: ''
				}

				console.log('创建订单请求数据:', JSON.stringify(orderData))

				const res = await api.order.create(orderData)
				if (res.code === 200 && res.data) {
					this.orderInfo.id = res.data.id || res.data.orderId
					this.orderInfo.orderNumber = res.data.order_no || res.data.orderNo || res.data.id
					// 保存支付过期时间并启动倒计时
					this.paymentExpireTime = res.data.payment_expire_time || res.data.paymentExpireTime
					if (this.paymentExpireTime) {
						this.startCountdown()
					}
					return true
				} else {
					uni.hideLoading()
					uni.showToast({ title: res.message || '创建订单失败', icon: 'none' })
					return false
				}
			} catch (err) {
				console.error('创建订单失败:', err)
				uni.hideLoading()
				uni.showToast({ title: '创建订单失败', icon: 'none' })
				return false
			}
		},
		// 绑定微信
		bindWechat() {
			uni.login({
				provider: 'weixin',
				success: async (loginRes) => {
					if (loginRes.code) {
						uni.showLoading({ title: '绑定中...' })
						try {
							const res = await api.auth.bindWechat({
								code: loginRes.code
							})
							uni.hideLoading()
							if (res.code === 200) {
								uni.showToast({ title: '绑定成功', icon: 'success' })
								// 绑定成功后重新发起支付
								setTimeout(() => {
									this.doWechatPay()
								}, 1500)
							} else {
								uni.showToast({ title: res.message || '绑定失败', icon: 'none' })
							}
						} catch (err) {
							uni.hideLoading()
							console.error('绑定微信失败:', err)
							uni.showToast({ title: '绑定失败', icon: 'none' })
						}
					} else {
						uni.showToast({ title: '获取微信授权失败', icon: 'none' })
					}
				},
				fail: () => {
					uni.showToast({ title: '微信授权失败', icon: 'none' })
				}
			})
		},
		formatDate(dateId) {
			
			const dateMap = {
				'today': '今天',
				'tomorrow': '明天'
			}
			if (dateMap[dateId]) {
				return dateMap[dateId]
			}
			
			if (dateId && dateId.length === 4) {
				return `${dateId.slice(0, 2)}月${dateId.slice(2)}日`
			}
			return dateId || ''
		},
		formatDateTime(date) {
			const year = date.getFullYear()
			const month = String(date.getMonth() + 1).padStart(2, '0')
			const day = String(date.getDate()).padStart(2, '0')
			const hours = String(date.getHours()).padStart(2, '0')
			const minutes = String(date.getMinutes()).padStart(2, '0')
			const seconds = String(date.getSeconds()).padStart(2, '0')
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
		},
		generateOrderNumber() {
			
			const timestamp = Date.now().toString().slice(-10)
			const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
			return `CD${timestamp}${random}`
		},
		
		async fetchAvailableCoupons() {
			try {
				const price = parseFloat(this.productInfo.price) || 0
				const res = await api.coupon.getAvailable({ amount: price })
				if (res.code === 200 && res.data) {
					const list = Array.isArray(res.data) ? res.data : (res.data.list || [])
					this.coupons = list.map(coupon => {
						
						let discountValue = coupon.value || 0
						let amountText = String(coupon.value || 0)
						let conditionText = coupon.minAmount > 0 ? `满${coupon.minAmount}可用` : '无门槛'

						if (coupon.type === 'discount') {
							
							amountText = `${10 - coupon.value / 10}折`
							discountValue = coupon.maxDiscount || 50
						}

						return {
							id: coupon.id,
							amount: amountText,
							discount: discountValue,
							condition: conditionText,
							minAmount: coupon.minAmount || 0,
							tag: coupon.useScope === 'brand' ? '商家券' : '平台券',
							title: coupon.name || '',
							description: coupon.description || '服务类产品均可使用',
							validUntil: coupon.endTime ? coupon.endTime.replace(/-/g, '.') + ' 23:59' : ''
						}
					})
				}
			} catch (err) {
				console.error('获取可用优惠券失败:', err)
			}
		},
		
		async fetchOrderDetail(orderId) {
			try {
				const res = await api.order.getDetail(orderId)
				if (res.code === 200 && res.data) {
					const order = res.data

					this.productInfo = {
						image: order.service_image || order.serviceImage || 'https://bioflex.cn/static/icon/rectangle-169.png',
						name: order.service_name || order.serviceName || '',
						category: order.category || '',
						duration: order.duration || '1小时',
						price: String(order.final_price || order.price || 0)
					}

					if (order.designer_name || order.designerName) {
						this.bookingInfo = {
							designer: order.designer_name || order.designerName || '',
							date: order.booking_date || order.bookingDate || '',
							time: order.booking_time || order.bookingTime || '',
							address: order.shop_name || order.address || ''
						}
					}

					this.orderInfo = {
						id: order.id || '',
						createTime: order.create_time || order.createTime || this.formatDateTime(new Date()),
						paymentMethod: order.payment_method || order.paymentMethod || '在线支付',
						points: order.points || '',
						orderNumber: order.order_no || order.orderNo || order.id || this.generateOrderNumber()
					}

					// 设置支付过期时间并启动倒计时
					if (order.status === 'PENDING_PAYMENT') {
						this.paymentExpireTime = order.payment_expire_time || order.paymentExpireTime
						if (this.paymentExpireTime) {
							this.startCountdown()
						}
					}
				}
			} catch (err) {
				console.error('获取订单详情失败:', err)
			}
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
.order-info-section,
.booking-info-section {
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

.price-item.coupon-row {
	cursor: pointer;
}

.coupon-value-row {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.coupon-available-tag {
	background-color: #fff1f0;
	border-radius: 4rpx;
	filter: brightness(0) invert(1);
	padding: 3rpx 10rpx;
	display: inline-flex;
	align-items: center;
}

.coupon-available-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 23rpx;
	font-weight: 400;
	color: #FF8A4D;
}

.discount-price {
	color: #FF8A4D !important;
}

.arrow-right-icon {
	width: 24rpx;
	height: 24rpx;
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

