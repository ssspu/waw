<template>
	<view class="coupon-details-section">
		<view 
			v-for="(coupon, index) in filteredCoupons" 
			:key="coupon.id" 
			class="coupon-card"
			:class="{ 'ended-coupon': activeTab === 'ended' || coupon.status }"
		>
			<view class="card-content">
				<!-- 优惠券背景 -->
				<image 
					class="coupon-bg" 
					:src="activeTab === 'ended' || coupon.status ? 'https://c.animaapp.com/mi5mjnswM14oP7/img/subtract.svg' : 'https://c.animaapp.com/mi5m9weyYgJtGL/img/subtract.svg'" 
					mode="aspectFill"
				></image>
				
				<!-- 优惠券内容 -->
				<view class="coupon-info">
					<view class="coupon-left">
						<!-- 金额区域 -->
						<view class="amount-section">
							<view class="amount-wrapper">
								<view class="amount-row">
									<text class="amount-symbol" :class="{ 'ended-style': activeTab === 'ended' || coupon.status }">¥</text>
									<text class="amount-value" :class="{ 'ended-style': activeTab === 'ended' || coupon.status }">{{ coupon.amount }}</text>
								</view>
								<text class="amount-requirement" :class="{ 'ended-style': activeTab === 'ended' || coupon.status }">{{ coupon.requirement }}</text>
							</view>
							<image 
								class="divider-line" 
								:src="activeTab === 'ended' || coupon.status ? 'https://c.animaapp.com/mi5mjnswM14oP7/img/vector-25.svg' : 'https://c.animaapp.com/mi5m9weyYgJtGL/img/vector-25.svg'" 
								mode="aspectFit"
							></image>
						</view>
						
						<!-- 优惠券详情 -->
						<view class="coupon-details">
							<text class="coupon-title" :class="{ 'ended-style': activeTab === 'ended' || coupon.status }">{{ coupon.title }}</text>
							<text class="coupon-description" :class="{ 'ended-style': activeTab === 'ended' || coupon.status }">{{ coupon.description }}</text>
							<view class="date-info">
								<text class="date-text" :class="{ 'ended-style': activeTab === 'ended' || coupon.status }">{{ coupon.startDate }}</text>
								<text class="date-divider" :class="{ 'ended-style': activeTab === 'ended' || coupon.status }">-</text>
								<text class="date-text" :class="{ 'ended-style': activeTab === 'ended' || coupon.status }">{{ coupon.endDate }}</text>
							</view>
							<text class="coupon-location">{{ coupon.location }}</text>
						</view>
					</view>
					
					<!-- 使用按钮或状态标签 -->
					<view class="coupon-right">
						<!-- 已结束状态显示状态标签 -->
						<view v-if="activeTab === 'ended' || coupon.status" class="status-badge">
							<text class="status-text">{{ coupon.status || '已过期' }}</text>
						</view>
						<!-- 正常状态显示使用按钮 -->
						<view v-else class="use-btn" @tap="handleUse(coupon)">
							<text class="use-text">去使用</text>
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
			default: 'service'
		}
	},
	data() {
		return {
			couponsData: [],
			loading: false,
			page: 1,
			pageSize: 20
		}
	},
	computed: {
		filteredCoupons() {
			return this.couponsData
		}
	},
	watch: {
		activeTab: {
			handler() {
				this.page = 1
				this.couponsData = []
				this.fetchCoupons()
			},
			immediate: true
		}
	},
	methods: {
		
		async fetchCoupons() {
			if (this.loading) return
			this.loading = true
			try {
				
				const statusMap = {
					'service': 'available',
					'product': 'available',
					'ended': 'used' 
				}
				const status = statusMap[this.activeTab] || 'available'

				const res = await api.coupon.getList({
					status,
					page: this.page,
					pageSize: this.pageSize
				})

				if (res.code === 200) {
					const list = (res.data.list || []).map(coupon => this.transformCoupon(coupon))
					
					let filtered = list
					if (this.activeTab === 'service') {
						filtered = list.filter(c => c.useScope === 'all' || c.useScope === 'service')
					} else if (this.activeTab === 'product') {
						filtered = list.filter(c => c.useScope === 'brand' || c.useScope === 'designer')
					}
					this.couponsData = filtered
				}
			} catch (err) {
				console.error('获取优惠券列表失败:', err)
				uni.showToast({ title: '获取优惠券失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		
		transformCoupon(coupon) {
			
			let amount = ''
			let requirement = ''
			if (coupon.type === 'cash' || coupon.type === 'full_reduction') {
				amount = String(coupon.value)
				requirement = coupon.minAmount > 0 ? `满${coupon.minAmount}元使用` : '无门槛'
			} else if (coupon.type === 'discount') {
				amount = String(Math.round((100 - coupon.value) / 10))
				requirement = coupon.maxDiscount ? `怜高减${coupon.maxDiscount}元` : '无上限'
			}

			
			let status = null
			let type = 'service'
			if (coupon.status === 'used') {
				status = '已使用'
				type = 'ended'
			} else if (coupon.status === 'expired') {
				status = '已过期'
				type = 'ended'
			}

			return {
				id: coupon.id,
				amount,
				requirement,
				title: coupon.name,
				description: coupon.description,
				startDate: coupon.startTime ? coupon.startTime.replace(/-/g, '.') : '',
				endDate: coupon.endTime ? coupon.endTime.replace(/-/g, '.') : '',
				location: this.getScopeText(coupon),
				status,
				type,
				useScope: coupon.useScope,
				rawCoupon: coupon
			}
		},
		
		getScopeText(coupon) {
			if (coupon.useScope === 'all') {
				return '全场通用'
			} else if (coupon.useScope === 'brand') {
				return '指定品牌馆可用'
			} else if (coupon.useScope === 'designer') {
				return '指定设计师可用'
			} else if (coupon.useScope === 'service') {
				return '指定服务可用'
			}
			return ''
		},
		handleUse(coupon) {
			
			uni.switchTab({
				url: '/pages/index/index'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.coupon-details-section {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	padding: 16rpx 32rpx;
	width: 100%;
	box-sizing: border-box;
	flex: 1;
}

.coupon-card {
	position: relative;
	width: 100%;
	border: 0;
	box-shadow: none;
	background-color: transparent;
	box-sizing: border-box;
}

.card-content {
	position: relative;
	padding: 0;
	overflow: hidden;
	border-radius: 8rpx;
	box-sizing: border-box;
}

.coupon-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 182rpx;
	object-fit: cover;
	pointer-events: none;
	z-index: 0;
}

.coupon-info {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 18rpx;
	box-sizing: border-box;
	min-height: 160rpx;
}


.ended-coupon .coupon-info {
	min-height: 182rpx;
}

.coupon-left {
	display: inline-flex;
	align-items: center;
	gap: 30rpx;
	flex: 1;
	min-width: 0;
}

.amount-section {
	display: flex;
	width: 138rpx;
	align-items: center;
	justify-content: space-between;
	padding: 0 8rpx 0 8rpx;
	align-self: stretch;
	box-sizing: border-box;
	flex-shrink: 0;
}

.amount-wrapper {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	gap: 4rpx;
}

.amount-row {
	display: inline-flex;
	align-items: flex-end;
}

.amount-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 32rpx;
	text-align: right;
	
	&.ended-style {
		color: #a6a6a6;
	}
}

.amount-value {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 42rpx;
	text-align: right;
	white-space: nowrap;
	
	&.ended-style {
		color: #a6a6a6;
	}
}

.amount-requirement {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 20rpx;
	
	&.ended-style {
		color: #a6a6a6;
	}
}

.divider-line {
	width: 2rpx;
	height: 100%;
	flex-shrink: 0;
	margin-right: -1rpx;
}

.coupon-details {
	display: inline-flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 4rpx;
	flex: 1;
	min-width: 0;
}

.coupon-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 30rpx;
	
	&.ended-style {
		color: #a6a6a6;
	}
}

.coupon-description {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
	
	&.ended-style {
		color: #a6a6a6;
	}
}

.date-info {
	display: inline-flex;
	align-items: center;
	gap: 12rpx;
}

.date-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
	
	&.ended-style {
		color: #a6a6a6;
	}
}

.date-divider {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 22rpx;
	
	&.ended-style {
		color: #a6a6a6;
	}
}

.coupon-location {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #d9d9d9;
	font-size: 20rpx;
}

.coupon-right {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 6rpx;
	flex-shrink: 0;
}

.use-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 148rpx;
	height: 60rpx;
	padding: 16rpx 30rpx;
	background-color: #333333;
	border-radius: 4rpx;
	filter: brightness(0) invert(1);
	cursor: pointer;
	box-sizing: border-box;
}

.use-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffffff;
	font-size: 22rpx;
}

.status-badge {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 148rpx;
	height: 60rpx;
	padding: 16rpx 30rpx;
	background-color: #a6a6a6;
	border-radius: 4rpx;
	filter: brightness(0) invert(1);
	box-sizing: border-box;
}

.status-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffffff;
	font-size: 22rpx;
}
</style>

