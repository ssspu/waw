<template>
	<view class="setting-detail-page">
		<SettingDetailHeader title="申请认证" />
		
		<view class="main-content">
			<!-- 认证信息卡片 -->
			<view class="settings-card">
				<view class="card-content">
					<view class="certification-status">
						<view class="status-icon">
							<text class="status-text">✓</text>
						</view>
						<view class="status-info">
							<text class="status-label">实名认证</text>
							<text class="status-detail">已认证</text>
						</view>
					</view>
					
					<view class="separator-line"></view>
					
					<view class="certification-item" @tap="handleEditCertification">
						<text class="item-label">个人信息</text>
						<view class="item-right">
							<text class="item-value">姓名/身份证</text>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="/static/icon/gengduo.png" 
										mode="aspectFit"
									></image>
								</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 商户认证 -->
			<view class="settings-card">
				<view class="card-content">
					<view class="merchant-section">
						<text class="section-title">商户认证</text>
						<text class="section-desc">认证后可享受更多功能权限</text>
					</view>
					
					<view class="merchant-items">
						<view 
							v-for="(item, index) in merchantItems" 
							:key="index"
							class="merchant-item"
						>
							<view v-if="index > 0" class="separator-line"></view>
							<view class="item-content" @tap="handleMerchantApply(item)">
								<text class="merchant-label">{{ item.label }}</text>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/chevron-right.svg" 
										mode="aspectFit"
									></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import SettingDetailHeader from '@/components/setting/SettingDetailHeader.vue'

export default {
	components: {
		SettingDetailHeader
	},
	data() {
		return {
			merchantItems: [
				{ label: '设计师认证', status: 'pending' },
				{ label: '品牌认证', status: 'pending' },
				{ label: '服务商认证', status: 'pending' }
			]
		}
	},
	methods: {
		handleEditCertification() {
			console.log('Edit certification')
		},
		handleMerchantApply(item) {
			console.log('Apply for:', item.label)
			uni.showModal({
				title: item.label,
				content: '点击申请，系统将审核您的资料',
				confirmText: '申请',
				success: (res) => {
					if (res.confirm) {
						console.log('Submit merchant application:', item.label)
					}
				}
			})
		}
	}
}
</script>

<style scoped lang="scss">
.setting-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.main-content {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 12rpx;
	gap: 12rpx;
	padding-bottom: 160rpx;
	box-sizing: border-box;
}

.settings-card {
	width: 100%;
	max-width: 726rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
	margin: 0 auto;
}

.card-content {
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.certification-status {
	display: flex;
	align-items: center;
	gap: 16rpx;
	padding: 20rpx;
	background-color: #f5f5f5;
	border-radius: 6rpx;
}

.status-icon {
	width: 44rpx;
	height: 44rpx;
	border-radius: 50%;
	background-color: #927eff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.status-text {
	color: #ffffff;
	font-size: 28rpx;
	font-weight: bold;
}

.status-info {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.status-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 26rpx;
}

.status-detail {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #a6a6a6;
	font-size: 24rpx;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
	margin: 20rpx 0;
}

.certification-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	padding: 0;
}

.item-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #000000;
	font-size: 28rpx;
}

.item-right {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.item-value {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #a6a6a6;
	font-size: 26rpx;
}

.action-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	border-radius: 6rpx;
	background-color: transparent;
	cursor: pointer;
	flex-shrink: 0;
	padding: 4rpx;
}

.button-icon {
	width: 24rpx;
	height: 24rpx;
	flex-shrink: 0;
}

.chevron-text {
	font-size: 32rpx;
	color: #a6a6a6;
	line-height: 1;
	font-weight: normal;
}

.merchant-section {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.section-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.section-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #a6a6a6;
	font-size: 24rpx;
}

.merchant-items {
	display: flex;
	flex-direction: column;
}

.merchant-item {
	display: flex;
	flex-direction: column;
}

.item-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	padding: 20rpx 0;
}

.merchant-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	color: #000000;
	font-size: 28rpx;
}
</style>

