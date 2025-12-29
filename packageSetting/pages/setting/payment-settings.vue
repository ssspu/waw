<template>
	<view class="setting-detail-page">
		<view class="main-content">
			<!-- 支付相关设置 -->
			<view class="settings-card">
				<view class="card-content">
					<view 
						v-for="(item, index) in paymentItems" 
						:key="index"
						class="setting-item-wrapper"
					>
						<view v-if="index > 0" class="separator-line"></view>
						<view class="setting-item" @tap="handleItemClick(item)">
							<text class="setting-label">{{ item.label }}</text>
							<view class="setting-right">
								<text v-if="item.value" class="right-text">{{ item.value }}</text>
								<view class="action-button">
									<image 
										class="button-icon" 
										src="https://bioflex.cn/static/icon/gengduo.png" 
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
export default {
	data() {
		return {
			paymentItems: [
				{ label: '设置交易密码', value: '' },
				{ label: '设置收款账户', value: '' },
				{ label: '银行卡', value: '' }
			],
			bindingCards: [
				{
					id: 1,
					type: '支付宝',
					number: '账户名称 ***8888'
				},
				{
					id: 2,
					type: '微信支付',
					number: '账户名称 ***6666'
				}
			]
		}
	},
	methods: {
		handleItemClick(item) {
			console.log('Edit:', item.label)
			
			if (item.label === '银行卡') {
				uni.navigateTo({ url: '/packageSetting/pages/setting/bank-cards' })
			}
		},
		handleUnbindCard(card) {
			uni.showModal({
				title: '解绑支付方式',
				content: `确定要解绑${card.type}吗？`,
				success: (res) => {
					if (res.confirm) {
						console.log('Unbind card:', card.id)
						
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

.card-header {
	padding: 20rpx 30rpx;
	border-bottom: 2rpx solid #f0f0f0;
}

.card-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.card-content {
	padding: 30rpx;
	box-sizing: border-box;
}

.setting-item-wrapper {
	display: flex;
	flex-direction: column;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
	margin: 30rpx 0;
}

.setting-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	cursor: pointer;
	padding: 0;
	background-color: transparent;
	border: none;
	box-sizing: border-box;
}

.setting-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.setting-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.right-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: right;
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

.card-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 0;
	border-bottom: 2rpx solid #f0f0f0;
}

.card-item:last-child {
	border-bottom: none;
}

.card-info {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.card-type {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.card-number {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 24rpx;
}

.remove-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
	cursor: pointer;
}
</style>

