<template>
	<view class="message-detail-page">
		<!-- 导航栏 -->
		<view class="navbar">
			<view class="navbar-content">
				<view class="nav-left">
					<view class="back-btn" @tap="handleBack">
						<image class="back-icon" src="/static/icon/arrow-left.png" mode="aspectFit"></image>
					</view>
					<text class="nav-title">消息详情</text>
				</view>
				<view class="nav-right"></view>
			</view>
		</view>
		
		<!-- 消息详情卡片 -->
		<view class="detail-card">
			<!-- 消息头部 -->
			<view class="message-header">
				<view class="avatar-wrapper">
					<image class="avatar-img" src="/static/icon/notification.png" mode="aspectFit"></image>
				</view>
				<view class="header-info">
					<text class="message-title">{{ messageDetail.title }}</text>
					<text class="message-time">{{ messageDetail.time }}</text>
				</view>
			</view>
			
			<!-- 消息内容 -->
			<view class="message-body">
				<text class="body-text">{{ messageDetail.content }}</text>
				
				<view v-if="messageDetail.orderNo" class="info-row">
					<text class="info-label">订单号：</text>
					<text class="info-value">{{ messageDetail.orderNo }}</text>
				</view>
				
				<view v-if="messageDetail.customer" class="info-row">
					<text class="info-label">顾客：</text>
					<text class="info-value">{{ messageDetail.customer }}</text>
				</view>
				
				<view v-if="messageDetail.amount" class="info-row">
					<text class="info-label">金额：</text>
					<text class="info-value">{{ messageDetail.amount }}元</text>
				</view>
				
				<view v-if="messageDetail.points" class="info-row">
					<text class="info-label">积分：</text>
					<text class="info-value">{{ messageDetail.points }}</text>
				</view>
				
				<text v-if="messageDetail.remark" class="remark-text">{{ messageDetail.remark }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			messageDetail: {
				id: 1,
				title: '系统通知',
				time: '2025-11-27 20:00',
				content: '您有一个待确认订单，请及时处理。',
				orderNo: '2837283723',
				customer: '马菲菲',
				amount: '288',
				points: '288',
				remark: '这里是通知消息文案，内容区域。'
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			// 根据 id 获取消息详情
			this.loadMessageDetail(options.id)
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		loadMessageDetail(id) {
			// 模拟获取消息详情数据
			// 实际项目中应该从接口获取
			console.log('加载消息详情, id:', id)
		}
	}
}
</script>

<style scoped lang="scss">
.message-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
}

.navbar {
	background-color: #ffffff;
	padding-top: 88rpx;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 88rpx;
	padding: 0 30rpx;
}

.nav-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.back-btn {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	width: 40rpx;
	height: 40rpx;
}

.nav-title {
	font-family: 'PingFang SC';
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
}

.nav-right {
	width: 60rpx;
}

.detail-card {
	margin: 24rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 30rpx;
}

.message-header {
	display: flex;
	align-items: flex-start;
	gap: 20rpx;
	margin-bottom: 30rpx;
}

.avatar-wrapper {
	width: 80rpx;
	height: 80rpx;
	flex-shrink: 0;
}

.avatar-img {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	background-color: #e8e8e8;
}

.header-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.message-title {
	font-family: 'PingFang SC';
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
}

.message-time {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #999999;
}

.message-body {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.body-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #333333;
	line-height: 1.6;
}

.info-row {
	display: flex;
	align-items: center;
}

.info-label {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #333333;
}

.info-value {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #333333;
}

.remark-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #333333;
	line-height: 1.6;
	margin-top: 10rpx;
}
</style>
