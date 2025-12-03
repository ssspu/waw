<template>
	<view class="message-detail-page">
		<!-- 导航栏 -->
		<view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="nav-left">
					<view class="back-btn" @tap="handleBack">
						<image class="back-icon" src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" mode="aspectFit"></image>
					</view>
				</view>
				<text class="nav-title">消息详情</text>
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
			statusBarHeight: 44,
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
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
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
}

.navbar-content {
	display: flex;
	align-items: center;
	padding: 24rpx 32rpx;
	box-sizing: border-box;
	gap: 24rpx;
}

.nav-left {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
}

.back-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}

.nav-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
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
