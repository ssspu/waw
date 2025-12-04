<template>
	<view class="balance-page">
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
				<text class="navbar-title">余额</text>
			</view>
		</view>

		<!-- 主内容 -->
		<view class="main-content">
			<!-- 总余额卡片 -->
			<view class="total-asset-card">
				<view class="card-header">
					<text class="asset-label">余额(元)</text>
				</view>
				<text class="asset-amount">{{ balanceInfo.balance.toFixed(2) }}</text>
			</view>

			<!-- 时间筛选和记录列表 -->
			<view class="records-section">
				<view class="time-filter">
					<text class="time-label">本月</text>
					<image
						class="dropdown-icon"
						src="/static/icon/vector-1.svg"
						mode="aspectFit"
					></image>
				</view>

				<view class="records-list" v-if="balanceRecords.length > 0">
					<asset-record-item
						v-for="(record, index) in balanceRecords"
						:key="index"
						:record="record"
						:is-last="index === balanceRecords.length - 1"
					></asset-record-item>
				</view>
				<view class="empty-list" v-else>
					<text class="empty-text">暂无记录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import AssetRecordItem from '../../components/mine/AssetRecordItem.vue'
import { userApi } from '@/api'

export default {
	components: {
		AssetRecordItem
	},
	data() {
		return {
			statusBarHeight: 44,
			balanceInfo: {
				balance: 0,
				frozenBalance: 0,
				totalRecharge: 0,
				totalConsume: 0
			},
			balanceRecords: [],
			page: 1,
			pageSize: 10,
			loading: false
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
		this.fetchBalanceInfo()
		this.fetchBalanceRecords()
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		async fetchBalanceInfo() {
			try {
				const res = await userApi.getBalance()
				if (res.code === 0) {
					this.balanceInfo = res.data
				}
			} catch (e) {
				console.error('获取余额信息失败', e)
			}
		},
		async fetchBalanceRecords() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await userApi.getBalanceRecords({
					page: this.page,
					pageSize: this.pageSize
				})
				if (res.code === 0) {
					const records = res.data.list || res.data.records || []
					this.balanceRecords = records.map(item => ({
						title: item.title,
						desc: item.remark,
						time: item.time,
						amount: item.amount > 0 ? `+${item.amount}` : `${item.amount}`
					}))
				}
			} catch (e) {
				console.error('获取余额记录失败', e)
			} finally {
				this.loading = false
			}
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

.empty-list {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 60rpx 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.empty-text {
	font-size: 28rpx;
	color: #999999;
}
</style>
