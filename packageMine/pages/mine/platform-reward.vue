<template>
	<view class="platform-reward-page">
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
				<text class="navbar-title">平台奖励</text>
			</view>
		</view>

		<!-- 主内容 -->
		<view class="main-content">
			<!-- 总奖励卡片 -->
			<view class="total-asset-card">
				<view class="card-header">
					<text class="asset-label">平台奖励(元)</text>
				</view>
				<text class="asset-amount">2806.00</text>
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

				<view class="records-list">
					<asset-record-item
						v-for="(record, index) in rewardRecords"
						:key="index"
						:record="record"
						:is-last="index === rewardRecords.length - 1"
					></asset-record-item>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import AssetRecordItem from '../../../components/mine/AssetRecordItem.vue'

export default {
	components: {
		AssetRecordItem
	},
	data() {
		return {
			statusBarHeight: 44,
			rewardRecords: [
				{
					title: '成都美发沙龙',
					desc: '新用户注册奖励',
					time: '今天 10:50',
					amount: '+100'
				},
				{
					title: '成都美发沙龙',
					desc: '活动奖励',
					time: '今天 09:30',
					amount: '+200'
				},
				{
					title: '成都美发沙龙',
					desc: '消费返现',
					time: '昨天 15:20',
					amount: '+50'
				},
				{
					title: '成都美发沙龙',
					desc: '邀请好友奖励',
					time: '昨天 11:00',
					amount: '+80'
				}
			]
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		}
	}
}
</script>

<style scoped lang="scss">
.platform-reward-page {
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
</style>
