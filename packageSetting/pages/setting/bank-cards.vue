<template>
	<view class="setting-detail-page">
		<SettingDetailHeader title="银行卡" />
		
		<view class="main-content">
			<!-- 银行卡列表 -->
			<view 
				v-if="bankCards.length > 0"
				v-for="(card, index) in bankCards" 
				:key="index"
				class="bank-card-item"
			>
				<view class="card-content">
					<view class="form-row">
						<text class="row-label">持卡人</text>
						<text class="row-value">{{ card.cardholder }}</text>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">银行卡卡号</text>
						<text class="row-value-masked">{{ card.maskedNumber }}</text>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">银行机构</text>
						<text class="row-value-placeholder">{{ card.bankName }}</text>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">开户行地址</text>
						<text class="row-value-placeholder">{{ card.bankAddress }}</text>
					</view>
				</view>
			</view>

			<!-- 空状态 -->
			<view v-else class="empty-state">
				<view class="empty-card">
					<text class="empty-text">暂无银行卡</text>
				</view>
			</view>

			<!-- 添加银行卡按钮 -->
			<view class="add-btn-group">
				<button class="add-btn" @tap="handleAddBankCard">添加银行卡</button>
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
			bankCards: [
				// 示例数据，实际应该从接口获取
				// {
				// 	id: 1,
				// 	cardholder: '周杰伦',
				// 	cardNumber: '90290439859049099',
				// 	maskedNumber: '9029043985904*9099',
				// 	bankName: '工商银行',
				// 	bankAddress: '成都市高新区中和'
				// }
			]
		}
	},
	onLoad() {
		// 加载银行卡列表
		this.loadBankCards()
	},
	methods: {
		loadBankCards() {
			// 从接口获取银行卡列表
			// 这里暂时使用空数组
		},
		handleAddBankCard() {
			uni.navigateTo({ url: '/packageSetting/pages/setting/add-bank-card' })
		}
	}
}
</script>

<style scoped lang="scss">
.setting-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f6f6f6;
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
	padding: 24rpx;
	gap: 24rpx;
	padding-bottom: 220rpx;
	box-sizing: border-box;
}

.bank-card-item {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	box-sizing: border-box;
	margin-top: 12rpx;
}

.card-content {
	padding: 30rpx;
	box-sizing: border-box;
}

.form-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
}

.row-label {
	width: 140rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: 400;
	color: #1d1d1f;
	font-size: 30rpx;
	white-space: nowrap;
}

.row-value {
	flex: 1;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 30rpx;
	color: #1d1d1f;
	text-align: right;
}

.row-value-masked,
.row-value-placeholder {
	flex: 1;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 30rpx;
	color: #b9b9b9;
	text-align: right;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #ebebeb;
	margin: 20rpx 0;
}

.empty-state {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 24rpx 0;
}

.empty-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 100rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.empty-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #a6a6a6;
}

.add-btn-group {
	position: fixed;
	left: 24rpx;
	right: 24rpx;
	bottom: 48rpx;
	box-sizing: border-box;
}

.add-btn {
	width: 100%;
	padding: 24rpx;
	background-color: #333333;
	color: #ffffff;
	border: none;
	border-radius: 12rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 30rpx;
}
</style>

