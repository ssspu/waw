<template>
	<view class="vip-page">
		<view class="header" >
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
	onLoad() {
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
	background-color: #ffffff;
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
	padding: 20rpx 20rpx 16rpx 32rpx;
	position: relative;
	overflow: hidden;
	box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.15);
	width: 690rpx;
	box-sizing: border-box;
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
}

.vip-icon-wrap {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 12rpx;
}

.vip-icon {
	width: 48rpx;
	height: 48rpx;
}

.vip-name {
	font-family: 'FZCuHei-B03T', sans-serif;
	font-size: 54rpx;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	color: #ffffff;
}

.vip-title-block {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 12rpx;
}

.vip-text {
	color: #ffffff;
	font-size: 44rpx;
	font-weight: 600;
	line-height: 1;
}

.vip-subtitle {
	font-family: 'PingFang SC', sans-serif;
	font-size: 32rpx;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	color: #ffffff;
}

.vip-card-body {
	margin-top: 16rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.vip-card-title {
	font-family: 'PingFang SC', sans-serif;
	font-size: 30rpx;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	color: #ffffff;
}

.vip-card-desc {
	font-family: 'PingFang SC', sans-serif;
	font-size: 22rpx;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	color: rgba(255, 255, 255, 0.8);
}

.vip-tags {
	display: flex;
	gap: 12rpx;
	margin-top: 14rpx;
	flex-wrap: wrap;
}

.vip-tag {
	display: flex;
	align-items: center;
	gap: 8rpx;
	background-color: rgba(246, 246, 246, 0.2);
	padding: 4rpx 8rpx;
	border-radius: 4rpx;
	color: #F4ECDD;
	font-family: 'PingFang SC', sans-serif;
	font-size: 20rpx;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
}

.tag-icon {
	width: 22rpx;
	height: 22rpx;
	background-color: rgba(255, 255, 255, 0.25);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.vip-card-footnote {
	font-family: 'PingFang SC', sans-serif;
	font-size: 20rpx;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	color: rgba(255, 255, 255, 0.3);
	margin-top: 14rpx;
}

.vip-diamond {
	position: absolute;
	width: 164rpx;
	height: 164rpx;
	right: 26rpx;
	top: 10rpx;
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

