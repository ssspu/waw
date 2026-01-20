<template>
	<view class="asset-page">
		<!-- 主内容 -->
		<view class="main-content">
			<!-- 总资产卡片 -->
			<view class="total-asset-card">
				<view class="card-header" @tap="handleAssetDetail">
					<view class="header-left">
						<text class="asset-label">总资产(元)</text>
						<text class="asset-desc">资金帐户可用总额</text>
					</view>
					<view class="header-right">
						<image
							class="arrow-right-icon-white"
							src="https://bioflex.cn/static/icon/vector-4.svg"
							mode="aspectFit"
						></image>
					</view>
				</view>
				<text class="asset-amount">{{ assetInfo.totalAsset.toFixed(2) }}</text>
			</view>

			<!-- 资产详情卡片 -->
			<view class="asset-detail-card">
				<view class="balance-section" @tap="handleBalanceClick">
					<text class="section-label">余额(元)</text>
					<text class="section-value">{{ assetInfo.balance.toFixed(2) }}</text>
				</view>

				<view class="asset-list">
					<view class="asset-item" @tap="handlePlatformRewardClick">
						<text class="item-label">平台奖励</text>
						<text class="item-value">{{ assetInfo.platformReward.toFixed(2) }}</text>
					</view>
					<view class="asset-item" @tap="handlePromotionClick">
						<text class="item-label">推广佣金</text>
						<text class="item-value">{{ assetInfo.promotion.toFixed(2) }}</text>
					</view>
					<view class="asset-item" @tap="handleBeansClick">
						<text class="item-label">美豆</text>
						<text class="item-value">{{ assetInfo.beans.toFixed(2) }}</text>
					</view>
				</view>
			</view>

			<!-- 提现信息卡片 -->
			<view class="settlement-card">
				<text class="card-title">提现</text>
				<view class="settlement-content">
					<view class="bank-card-item" @tap="handleWithdraw">
						<view class="bank-card-left">
							<view class="bank-icon-wrapper">
								<image
									class="bank-icon"
									src="/static/icon/tixian.png"
									mode="aspectFit"
								></image>
							</view>
							<text class="bank-label">提现到微信</text>
						</view>
						<view class="bank-card-right">
							<text class="bank-status">微信零钱</text>
							<image
								class="arrow-right-icon"
								src="https://bioflex.cn/static/icon/vector-4.svg"
								mode="aspectFit"
							></image>
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
	data() {
		return {
						loading: false,
			assetInfo: {
				totalAsset: 0,
				balance: 0,
				platformReward: 0,
				promotion: 0,
				beans: 0
			}
		}
	},
	onLoad() {
		this.fetchAssetData()
	},
	onShow() {
		
		this.fetchAssetData()
	},
	methods: {
		async fetchAssetData() {
			if (this.loading) return
			this.loading = true
			try {
				const [balanceRes, beansRes, promotionRes, rewardRes] = await Promise.all([
					api.user.getBalance(),
					api.user.getBeans(),
					api.user.getPromotion(),
					api.user.getPlatformReward()
				])

				if (balanceRes.code === 0) {
					this.assetInfo.balance = balanceRes.data.balance || 0
				}
				if (beansRes.code === 0) {
					this.assetInfo.beans = beansRes.data.beans || 0
				}
				if (promotionRes.code === 0) {
					this.assetInfo.promotion = promotionRes.data.availableCommission || 0
				}
				if (rewardRes.code === 0) {
					this.assetInfo.platformReward = rewardRes.data.availableReward || 0
				}

				this.assetInfo.totalAsset = this.assetInfo.balance + this.assetInfo.platformReward + this.assetInfo.promotion + this.assetInfo.beans
			} catch (err) {
				console.error('获取资产数据失败:', err)
				uni.showToast({ title: '获取数据失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
				handleWithdraw() {
			uni.navigateTo({
				url: '/packageMine/pages/mine/withdraw'
			})
		},
		handleAssetDetail() {
			uni.navigateTo({
				url: '/packageMine/pages/mine/asset-detail'
			})
		},
		handleBalanceClick() {
			uni.navigateTo({
				url: '/packageMine/pages/mine/balance'
			})
		},
		handlePlatformRewardClick() {
			uni.navigateTo({
				url: '/packageMine/pages/mine/platform-reward'
			})
		},
		handlePromotionClick() {
			uni.navigateTo({
				url: '/packageMine/pages/mine/promotion'
			})
		},
		handleBeansClick() {
			uni.navigateTo({
				url: '/packageMine/pages/mine/beans'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.asset-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	position: relative;
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
}

.main-content {
	padding: 24rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.total-asset-card {
	background: linear-gradient(309deg, rgba(135, 134, 145, 1) 0%, rgba(59, 54, 83, 1) 100%);
	border-radius: 16rpx;
	padding: 30rpx 32rpx;
	display: flex;
	flex-direction: column;
	gap: 42rpx;
}

.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.header-left {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.asset-label {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: normal;
	color: #ffffff;
}

.asset-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: normal;
	color: rgba(255, 255, 255, 0.47);
}

.header-right {
	width: 28rpx;
	height: 28rpx;
}

.arrow-icon {
	width: 28rpx;
	height: 28rpx;
}

.arrow-right-icon {
	width: 16rpx;
	height: 24rpx;
}

.arrow-right-icon-white {
	width: 28rpx;
	height: 28rpx;
	
}

.asset-amount {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 52rpx;
	font-weight: 500;
	color: #ffffff;
}

.asset-detail-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 30rpx 40rpx;
	display: flex;
	flex-direction: column;
	gap: 40rpx;
}

.balance-section {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
	align-items: flex-start;
}

.section-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: normal;
	color: #a7a7a7;
	text-align: left;
}

.section-value {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 34rpx;
	font-weight: normal;
	color: #333333;
	text-align: left;
}

.asset-list {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.asset-item {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
	flex: 1;
	align-items: center;

	&:first-child {
		align-items: flex-start;
	}

	&:last-child {
		align-items: flex-end;
	}
}

.item-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: normal;
	color: #a7a7a7;
	text-align: center;
}

.item-value {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 34rpx;
	font-weight: normal;
	color: #333333;
	text-align: center;
}

.settlement-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 30rpx 20rpx;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.card-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: normal;
	color: #000000;
	text-align: left;
}

.settlement-content {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}

.bank-card-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.bank-card-left {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.bank-icon-wrapper {
	width: 40rpx;
	height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.bank-icon {
	width: 40rpx;
	height: 40rpx;
}

.bank-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: normal;
	color: #333333;
	text-align: left;
}

.bank-card-right {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.bank-status {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	font-weight: normal;
	color: #a7a7a7;
	text-align: right;
}
</style>

