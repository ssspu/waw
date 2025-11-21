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
export default {
	props: {
		activeTab: {
			type: String,
			default: 'service'
		}
	},
	data() {
		return {
			couponsData: [
				{
					id: 1,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					type: "service"
				},
				{
					id: 2,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					type: "service"
				},
				{
					id: 3,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					type: "product"
				},
				{
					id: 4,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					type: "service"
				},
				{
					id: 5,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					type: "product"
				},
				{
					id: 6,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					status: "已过期",
					type: "ended"
				},
				{
					id: 7,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					status: "已使用",
					type: "ended"
				},
				{
					id: 8,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					status: "已使用",
					type: "ended"
				},
				{
					id: 9,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					status: "已使用",
					type: "ended"
				},
				{
					id: 10,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					status: "已使用",
					type: "ended"
				},
				{
					id: 11,
					amount: "30",
					requirement: "满300元使用",
					title: "护理优惠券",
					description: "服务类产品均可使用",
					startDate: "2020.05.05",
					endDate: "2020.11.05",
					location: "限成都武侯沙龙美容美发店",
					status: "已使用",
					type: "ended"
				},
			],
		}
	},
	computed: {
		filteredCoupons() {
			if (this.activeTab === 'service') {
				return this.couponsData.filter(coupon => coupon.type === 'service')
			} else if (this.activeTab === 'product') {
				return this.couponsData.filter(coupon => coupon.type === 'product')
			} else if (this.activeTab === 'ended') {
				return this.couponsData.filter(coupon => coupon.type === 'ended')
			}
			return this.couponsData
		}
	},
	methods: {
		handleUse(coupon) {
			console.log('Use coupon:', coupon)
			// 可以跳转到使用优惠券的页面
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

// 已结束状态的优惠券高度稍高
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
	box-sizing: border-box;
}

.status-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #ffffff;
	font-size: 22rpx;
}
</style>

