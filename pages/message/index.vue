<template>
	<view class="message-page">
		<!-- 顶部背景图 -->
		<view class="header-section">
			<image 
				class="header-bg" 
				src="/static/background-image/message-center.png" 
				mode="aspectFill"
			></image>
			<!-- <view class="header-content">
				<text class="header-title">消息中心</text>
			</view> -->
		</view>
		
		<!-- 消息列表 -->
		<view class="message-list">
			<!-- 按日期分组 -->
			<view v-for="(group, groupIndex) in messageGroups" :key="groupIndex" class="message-group">
				<view class="group-date">
					<text class="date-text">{{ group.date }}</text>
				</view>
				
				<view 
					v-for="(message, msgIndex) in group.messages" 
					:key="message.id" 
					class="message-swipe-wrapper"
				>
					<view 
						class="message-card"
						:style="{ transform: `translateX(${message.offsetX || 0}rpx)` }"
						@touchstart="onTouchStart($event, message)"
						@touchmove="onTouchMove($event, message)"
						@touchend="onTouchEnd($event, message)"
						@tap="handleMessageClick(message)"
					>
						<view class="message-avatar">
							<image class="avatar-img" src="/static/icon/notification.png" mode="aspectFit"></image>
							<view v-if="message.unread" class="unread-dot"></view>
						</view>
						<view class="message-content">
							<view class="message-header">
								<text class="message-title">{{ message.title }}</text>
								<text class="message-time">{{ message.time }}</text>
							</view>
							<text class="message-desc">{{ message.content }}</text>
						</view>
					</view>
					<view class="delete-btn" @tap.stop="handleDelete(groupIndex, msgIndex, message)">
						<image class="delete-icon" src="/static/icon/delete.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			
			<!-- 没有更多了 -->
			<view class="no-more">
				<text class="no-more-text">没有更多了</text>
			</view>
		</view>
		
		<!-- 底部导航 -->
		<bottom-tab-bar active="message"></bottom-tab-bar>
	</view>
</template>

<script>
import BottomTabBar from '../../components/common/BottomTabBar.vue'

export default {
	components: {
		BottomTabBar
	},
	data() {
		return {
			startX: 0,
			currentMessage: null,
			deleteWidth: -140, // 删除按钮宽度
			messageGroups: [
				{
					date: '今天',
					messages: [
						{
							id: 1,
							title: '系统通知',
							content: '您有一个待确认订单，请及时处理。',
							time: '2025-11-28 16:30',
							unread: true
						},
						{
							id: 2,
							title: '系统通知',
							content: '您有三名顾客发起了预约申请，请及时确认。',
							time: '2025-11-28 10:15',
							unread: true
						}
					]
				},
				{
					date: '昨天',
					messages: [
						{
							id: 3,
							title: '系统通知',
							content: '您的订单已完成，感谢您的使用。',
							time: '2025-11-27 18:20',
							unread: false
						},
						{
							id: 4,
							title: '活动通知',
							content: '双十二活动即将开始，多重优惠等你来！',
							time: '2025-11-27 09:00',
							unread: false
						}
					]
				},
				{
					date: '2025-11-25',
					messages: [
						{
							id: 5,
							title: '系统通知',
							content: '您的账户已成功绑定银行卡。',
							time: '2025-11-25 14:30',
							unread: false
						}
					]
				},
				{
					date: '2025-11-22',
					messages: [
						{
							id: 6,
							title: '预约提醒',
							content: '您预约的服务将于明天下午2点开始，请准时到店。',
							time: '2025-11-22 20:00',
							unread: false
						},
						{
							id: 7,
							title: '系统通知',
							content: '您有一笔退款已到账，请查收。',
							time: '2025-11-22 11:45',
							unread: false
						}
					]
				},
				{
					date: '2025-11-18',
					messages: [
						{
							id: 8,
							title: '优惠通知',
							content: '恭喜您获得50元优惠券，有效期7天。',
							time: '2025-11-18 09:30',
							unread: false
						},
						{
							id: 9,
							title: '系统通知',
							content: '您的会员等级已升级为VIP2。',
							time: '2025-11-18 08:00',
							unread: false
						}
					]
				},
				{
					date: '2025-11-10',
					messages: [
						{
							id: 10,
							title: '系统通知',
							content: '欢迎注册众美平台，开启您的美丽之旅！',
							time: '2025-11-10 15:20',
							unread: false
						}
					]
				}
			]
		}
	},
	methods: {
		// 触摸开始
		onTouchStart(e, message) {
			// 先关闭其他已打开的消息
			this.closeAllMessages()
			this.startX = e.touches[0].clientX
			this.currentMessage = message
		},
		// 触摸移动
		onTouchMove(e, message) {
			if (this.currentMessage !== message) return
			const moveX = e.touches[0].clientX
			const diffX = (moveX - this.startX) * 2 // 转换为 rpx 约等于 *2
			
			if (diffX < 0) {
				// 左滑
				message.offsetX = Math.max(diffX, this.deleteWidth)
			} else if (message.offsetX < 0) {
				// 右滑恢复
				message.offsetX = Math.min(0, message.offsetX + diffX)
			}
		},
		// 触摸结束
		onTouchEnd(e, message) {
			if (this.currentMessage !== message) return
			// 如果滑动超过一半，则完全展开，否则收回
			if (message.offsetX < this.deleteWidth / 2) {
				message.offsetX = this.deleteWidth
			} else {
				message.offsetX = 0
			}
			this.currentMessage = null
		},
		// 关闭所有已打开的消息
		closeAllMessages() {
			this.messageGroups.forEach(group => {
				group.messages.forEach(msg => {
					if (msg.offsetX) {
						msg.offsetX = 0
					}
				})
			})
		},
		// 删除消息
		handleDelete(groupIndex, msgIndex, message) {
			uni.showModal({
				title: '提示',
				content: '确定删除该消息吗？',
				success: (res) => {
					if (res.confirm) {
						this.messageGroups[groupIndex].messages.splice(msgIndex, 1)
						// 如果该分组没有消息了，删除分组
						if (this.messageGroups[groupIndex].messages.length === 0) {
							this.messageGroups.splice(groupIndex, 1)
						}
						uni.showToast({ title: '已删除', icon: 'success' })
					}
				}
			})
		},
		handleMessageClick(message) {
			// 如果正在滑动状态，不触发点击
			if (message.offsetX && message.offsetX < 0) {
				message.offsetX = 0
				return
			}
			// 标记为已读，红点消失
			message.unread = false
			// 跳转到消息详情页
			uni.navigateTo({
				url: `/pages/message/detail?id=${message.id}`
			})
		}
	}
}
</script>

<style scoped lang="scss">
.message-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	padding-bottom: 180rpx;
}

.header-section {
	position: relative;
	width: 100%;
	height: 240rpx;
}

.header-bg {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.header-content {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: flex-end;
	padding: 0 30rpx 30rpx;
}

.header-title {
	font-family: 'PingFang SC';
	font-size: 36rpx;
	font-weight: 600;
	color: #d4c4a0;
}

.message-list {
	flex: 1;
	padding: 0 24rpx;
	margin-top: -68rpx;
	background-color: #f2f2f2;
	border-radius: 30rpx 30rpx 0 0;
	position: relative;
	z-index: 1;
}

.message-group {
	margin-bottom: 20rpx;
}

.group-date {
	display: flex;
	justify-content: center;
	padding: 30rpx 0 20rpx;
}

.date-text {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #999999;
}

.message-swipe-wrapper {
	position: relative;
	margin-bottom: 16rpx;
	overflow: hidden;
	border-radius: 16rpx;
}

.message-card {
	position: relative;
	display: flex;
	align-items: flex-start;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 28rpx 24rpx;
	gap: 20rpx;
	transition: transform 0.1s ease-out;
	z-index: 2;
}

.delete-btn {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 140rpx;
	background-color: #F04438;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0 16rpx 16rpx 0;
	z-index: 1;
}

.delete-icon {
	width: 48rpx;
	height: 48rpx;
	filter: brightness(0) invert(1);
}

.message-avatar {
	position: relative;
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

.unread-dot {
	position: absolute;
	top: 0;
	right: 0;
	width: 16rpx;
	height: 16rpx;
	background-color: #ff4d4f;
	border-radius: 50%;
}

.message-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.message-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.message-title {
	font-family: 'PingFang SC';
	font-size: 30rpx;
	font-weight: 500;
	color: #333333;
}

.message-time {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #999999;
}

.message-desc {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	color: #666666;
	line-height: 1.5;
}

.no-more {
	display: flex;
	justify-content: center;
	padding: 40rpx 0;
}

.no-more-text {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #cccccc;
}
</style>
