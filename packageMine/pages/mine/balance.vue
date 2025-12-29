<template>
	<view class="balance-page">
		<!-- 主内容 -->
		<view class="main-content">
			<!-- 总余额卡片 -->
			<view class="total-asset-card">
				<view class="card-header">
					<text class="asset-label">余额(元)</text>
				</view>
				<text class="asset-amount">{{ balance.toFixed(2) }}</text>
			</view>

			<!-- 时间筛选和记录列表 -->
			<view class="records-section">
				<view class="time-filter">
					<text class="time-label">本月</text>
					<image
						class="dropdown-icon"
						src="https://bioflex.cn/static/icon/vector-1.svg"
						mode="aspectFit"
					></image>
				</view>

				<view class="records-list">
					<asset-record-item
						v-for="(record, index) in balanceRecords"
						:key="index"
						:record="record"
						:is-last="index === balanceRecords.length - 1"
					></asset-record-item>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import AssetRecordItem from '../../../components/mine/AssetRecordItem.vue'
import api from '@/api'

export default {
	components: {
		AssetRecordItem
	},
	data() {
		return {
			balance: 0,
			balanceRecords: [],
			loading: false
		}
	},
	onLoad() {
		this.fetchBalanceData()
	},
	methods: {
		
		async fetchBalanceData() {
			if (this.loading) return
			this.loading = true
			try {
				
				const [balanceRes, recordsRes] = await Promise.all([
					api.user.getBalance(),
					api.user.getBalanceRecords({ page: 1, pageSize: 20 })
				])

				if (balanceRes.code === 0) {
					this.balance = balanceRes.data.balance || 0
				}

				if (recordsRes.code === 0 && recordsRes.data) {
					const list = recordsRes.data.list || recordsRes.data.records || []
					this.balanceRecords = list.map(item => ({
						title: item.title || item.storeName || '余额变动',
						desc: item.description || item.type,
						time: item.createTime || item.time,
						amount: item.amount > 0 ? `+${item.amount}` : String(item.amount)
					}))
				}
			} catch (err) {
				console.error('获取余额数据失败:', err)
			} finally {
				this.loading = false
			}
		},
		handleBack() {
			uni.navigateBack()
		}
	}
}
</script>

<style scoped lang="scss">
.balance-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	position: relative;
}

.main-content {
	padding: 24rpx 20rpx;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.total-asset-card {
	background: linear-gradient(309deg, rgba(135, 134, 145, 1) 0%, rgba(59, 54, 83, 1) 100%);
	border-radius: 16rpx;
	padding: 30rpx 32rpx;
	display: flex;
	flex-direction: column;
	gap: 6rpx;
	width: 100%;
	box-sizing: border-box;
}

.card-header {
	display: flex;
	align-items: center;
}

.asset-label {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: normal;
	color: #ffffff;
}

.asset-amount {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 52rpx;
	font-weight: 500;
	color: #ffffff;
}

.records-section {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.time-filter {
	display: inline-flex;
	align-items: center;
	gap: 16rpx;
}

.time-label {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 30rpx;
	font-weight: normal;
	color: #333333;
}

.dropdown-icon {
	width: 20rpx;
	height: 14rpx;
}

.records-list {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 30rpx 20rpx;
	display: flex;
	flex-direction: column;
}
</style>
