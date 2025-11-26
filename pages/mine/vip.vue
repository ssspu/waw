<template>
	<view class="vip-page">
		<view class="status-bar-space"></view>
		<view class="header">
			<view class="title-row">
				<view class="back-btn" @tap="handleBack">
					<image class="back-arrow-icon" src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" mode="aspectFit" />
				</view>
				<text class="page-title">加入会员</text>
			</view>
		</view>

		<scroll-view scroll-y class="content">
			<view class="vip-card">
				<view class="vip-card-decoration">
				</view>

				<view class="vip-card-header">
					<view class="vip-icon-wrap">
						<image class="vip-icon" src="/static/vip/vector-4.svg" mode="aspectFit" />
					</view>
					<view class="vip-title-block">
						<text class="vip-name">美VIP</text>
						<text class="vip-subtitle">会员福利</text>
					</view>
				</view>

				<view class="vip-card-body">
					<text class="vip-card-title">消费购买指定商品满365元</text>
					<text class="vip-card-desc">即可升级为美VIP会员1年，享受六大会员权益；</text>

					<view class="vip-tags">
						<view v-for="tag in tags" :key="tag" class="vip-tag">
							<view class="tag-icon">
								<image src="/static/vip/vector-3.svg" mode="aspectFit" />
							</view>
							<text>{{ tag }}</text>
						</view>
					</view>

					<text class="vip-card-footnote">本活动最终解释权归本平台所有</text>
					<image class="vip-diamond" src="/static/vip/3d-vip-194815565-1.png" mode="aspectFit" />
				</view>
			</view>

			<view class="benefits-panel">
				<text class="panel-title">会员福利</text>
				<view class="benefit-list">
					<view
						class="benefit-item"
						v-for="(benefit, index) in benefits"
						:key="benefit"
					>
						<text>{{ index + 1 }}.{{ benefit }}</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="footer">
			<view class="pay-btn" @tap="handlePay">立即支付</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tags: ['安心服务', '免费设计', '预约服务'],
			benefits: [
				'赠送一份价值365元的精美产品大礼包',
				'享有平台设计师和品牌馆项目服务的VIP价格',
				'享有平台优先预约和平台售后服务',
				'平台购买美妆商品，还想享受双倍积分奖励',
				'消费返利、积分兑换线下服务项目',
				'自用省钱、分享赚钱，“美丽天使”'
			]
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack({
				fail: () => {
					uni.switchTab({ url: '/pages/mine/index' })
				}
			})
		},
		handlePay() {
			uni.showToast({
				title: '支付功能暂未开放',
				icon: 'none'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.vip-page {
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
}

.header {
	padding: 30rpx 30rpx 0;
	position: relative;
}

.battery {
	position: relative;
	width: 36rpx;
	height: 16rpx;
}

.battery-border,
.battery-cap,
.battery-level {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}

.battery-cap {
	left: auto;
	right: -6rpx;
	width: 6rpx;
}

.battery-level {
	width: 80%;
	left: 8%;
	top: 20%;
}

.title-row {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.back-btn {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-arrow-icon {
	width: 28rpx;
	height: 28rpx;
}

.page-title {
	font-size: 32rpx;
	color: #666;
}

.content {
	flex: 1;
	padding: 0 24rpx 160rpx;
	box-sizing: border-box;
}

.vip-card {
	margin-top: 20rpx;
	background: linear-gradient(180deg, #d0c1a7 0%, #887d6b 100%);
	border-radius: 24rpx;
	padding: 32rpx;
	position: relative;
	overflow: hidden;
	box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.15);
	min-height: 340rpx;
}

.vip-card-decoration {
	position: absolute;
	top: 20rpx;
	right: 40rpx;
}

.pill-dot {
	width: 10rpx;
	height: 30rpx;
}

.pill-circles {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.pill-circles .dot {
	width: 8rpx;
	height: 8rpx;
	background-color: #000;
	border-radius: 50%;
}

.pill-circles .ring {
	width: 24rpx;
	height: 24rpx;
	border-radius: 50%;
	border: 2rpx solid #000;
}

.vip-card-header {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.vip-icon-wrap {
	width: 72rpx;
	height: 72rpx;
	border-radius: 16rpx;
	background-color: rgba(255, 255, 255, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}

.vip-icon {
	width: 48rpx;
	height: 48rpx;
}

.vip-title-block {
	display: flex;
	flex-direction: row;
	align-items: end;
}

.vip-name {
	color: #fff;
	font-size: 48rpx;
	font-weight: 600;
	text-shadow: 0 2rpx 6rpx rgba(36, 0, 205, 0.5);
}

.vip-subtitle {
	color: #fff;
	font-size: 28rpx;
	text-shadow: 0 2rpx 6rpx rgba(36, 0, 205, 0.4);
}

.vip-card-body {
	margin-top: 28rpx;
	display: flex;
	flex-direction: column;
	gap: 14rpx;
}

.vip-card-title {
	font-size: 32rpx;
	color: #fff;
	font-weight: 500;
}

.vip-card-desc {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.85);
	line-height: 1.4;
}

.vip-tags {
	display: flex;
	gap: 12rpx;
	margin-top: 10rpx;
	flex-wrap: wrap;
}

.vip-tag {
	display: flex;
	align-items: center;
	gap: 8rpx;
	background-color: rgba(246, 246, 246, 0.2);
	padding: 6rpx 14rpx;
	border-radius: 24rpx;
	color: #f3ebdd;
	font-size: 22rpx;
}

.tag-icon {
	width: 26rpx;
	height: 26rpx;
	background-color: rgba(255, 255, 255, 0.25);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.vip-card-footnote {
	font-size: 20rpx;
	color: rgba(255, 255, 255, 0.3);
	margin-top: 4rpx;
}

.vip-diamond {
	position: absolute;
	width: 160rpx;
	height: 160rpx;
	right: 40rpx;
	top: 100rpx;
}

.benefits-panel {
	margin-top: 24rpx;
	background-color: #fff;
	border-radius: 24rpx;
	padding: 28rpx 32rpx;
	box-shadow: 0 12rpx 26rpx rgba(0, 0, 0, 0.08);
}

.panel-title {
	font-size: 30rpx;
	color: #000;
	font-weight: 600;
}

.benefit-list {
	margin-top: 20rpx;
	display: flex;
	flex-direction: column;
	gap: 18rpx;
}

.benefit-item {
	font-size: 24rpx;
	color: #666;
	line-height: 1.5;
}

.footer {
	background-color: #fff;
	padding: 12rpx 30rpx 34rpx;
	box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.pay-btn {
	height: 88rpx;
	background-color: #333;
	border-radius: 2rpx;
	color: #ffa77b;
	font-size: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>

