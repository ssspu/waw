<template>
	<view class="beans-page">
		<!-- 主内容 -->
		<view class="main-content">
			<!-- 总美豆卡片 -->
			<view class="total-asset-card">
				<view class="card-header">
					<text class="asset-label">美豆余额</text>
				</view>
				<text class="asset-amount">1000</text>
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
						v-for="(record, index) in beansRecords"
						:key="index"
						:record="record"
						:is-last="index === beansRecords.length - 1"
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
						beansRecords: [
				{
					title: '成都美发沙龙',
					desc: '消费返豆',
					time: '今天 10:50',
					amount: '+100'
				},
				{
					title: '成都美发沙龙',
					desc: '签到奖励',
					time: '今天 08:00',
					amount: '+10'
				},
				{
					title: '成都美发沙龙',
					desc: '消费抵扣',
					time: '昨天 14:30',
					amount: '-50'
				},
				{
					title: '成都美发沙龙',
					desc: '消费返豆',
					time: '昨天 14:30',
					amount: '+80'
				}
			]
		}
	},
	onLoad() {
		},
	methods: {
			}
}
</script>

<style scoped lang="scss">
.beans-page {
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
