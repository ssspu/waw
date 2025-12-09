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
import api from '@/api'

export default {
	components: {
		SettingDetailHeader
	},
	data() {
		return {
			bankCards: [],
			loading: false
		}
	},
	onLoad() {
		this.loadBankCards()
	},
	onShow() {
		// 每次显示页面时刷新数据（添加新卡后返回）
		this.loadBankCards()
	},
	methods: {
		async loadBankCards() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.user.getBankCards()
				if (res.code === 0) {
					this.bankCards = (res.data || []).map(card => ({
						id: card.id,
						cardholder: card.holderName || '持卡人',
						cardNumber: card.cardNumber,
						maskedNumber: this.maskCardNumber(card.cardNumber),
						bankName: card.bankName || '银行',
						bankAddress: card.branchName || card.bankAddress || '未设置'
					}))
				}
			} catch (err) {
				console.error('获取银行卡列表失败:', err)
				uni.showToast({ title: '获取数据失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		// 遮掩卡号中间部分
		maskCardNumber(cardNumber) {
			if (!cardNumber) return ''
			const cleaned = cardNumber.replace(/\s/g, '')
			if (cleaned.length <= 8) return cleaned
			return cleaned.slice(0, 4) + ' **** **** ' + cleaned.slice(-4)
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

