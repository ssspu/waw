<template>
	<view class="asset-page">
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
				<text class="navbar-title">资产收入</text>
			</view>
		</view>
		
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
							src="/static/icon/vector-4.svg" 
							mode="aspectFit"
						></image>
					</view>
				</view>
				<text class="asset-amount">6666.66</text>
			</view>
			
			<!-- 资产详情卡片 -->
			<view class="asset-detail-card">
				<view class="balance-section" @tap="handleBalanceClick">
					<text class="section-label">余额(元)</text>
					<text class="section-value">1200.00</text>
				</view>

				<view class="asset-list">
					<view class="asset-item" @tap="handlePlatformRewardClick">
						<text class="item-label">平台奖励</text>
						<text class="item-value">2806.00</text>
					</view>
					<view class="asset-item" @tap="handlePromotionClick">
						<text class="item-label">推广佣金</text>
						<text class="item-value">1200.00</text>
					</view>
					<view class="asset-item" @tap="handleBeansClick">
						<text class="item-label">美豆</text>
						<text class="item-value">1000.00</text>
					</view>
				</view>
			</view>
			
			<!-- 结算信息卡片 -->
			<view class="settlement-card">
				<text class="card-title">结算信息</text>
				<view class="settlement-content">
					<view class="bank-card-item" @tap="handleBankCard">
						<view class="bank-card-left">
							<view class="bank-icon-wrapper">
								<image 
									class="bank-icon" 
									src="/static/icon/vector-2.svg" 
									mode="aspectFit"
								></image>
							</view>
							<text class="bank-label">银行卡</text>
						</view>
						<view class="bank-card-right">
							<text class="bank-status">已绑定</text>
							<image 
								class="arrow-right-icon" 
								src="/static/icon/vector-4.svg" 
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
export default {
	data() {
		return {
			statusBarHeight: 44
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		handleBankCard() {
			uni.navigateTo({
				url: '/packageSetting/pages/setting/bank-cards'
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

.navbar {
	position: relative;
	width: 100%;
	background-color: #ffffff;
	z-index: 10;
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
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
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
	filter: brightness(0) invert(1);
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
	width: 146rpx;
	align-items: center;
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

