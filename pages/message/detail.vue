<template>
	<view class="message-detail-page">
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
import api from '@/api'

export default {
	data() {
		return {
						messageDetail: {
				id: '',
				title: '',
				time: '',
				content: '',
				orderNo: '',
				customer: '',
				amount: '',
				points: '',
				remark: ''
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			this.loadMessageDetail(options.id)
		}
	},
	methods: {
				async loadMessageDetail(id) {
			try {
				const res = await api.message.getDetail(id)
				if (res.code === 0 && res.data) {
					this.messageDetail = {
						id: res.data.id,
						title: res.data.title || '系统通知',
						time: res.data.time || res.data.createdAt,
						content: res.data.content,
						orderNo: res.data.orderNo || res.data.extra?.orderNo,
						customer: res.data.customer || res.data.extra?.customer,
						amount: res.data.amount || res.data.extra?.amount,
						points: res.data.points || res.data.extra?.points,
						remark: res.data.remark || res.data.extra?.remark
					}
				}
			} catch (e) {
				console.error('获取消息详情失败', e)
				uni.showToast({ title: '获取消息详情失败', icon: 'none' })
			}
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
