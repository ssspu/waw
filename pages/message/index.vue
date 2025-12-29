<template>
	<view class="message-page">
		<!-- 顶部背景图 -->
		<view class="header-section">
			<image
				class="header-bg"
				src="https://bioflex.cn/static/background-image/message-center.png"
				mode="aspectFill"
			></image>
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
							<image class="avatar-img" src="https://bioflex.cn/static/icon/notification.png" mode="aspectFit"></image>
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
						<image class="delete-icon" src="https://bioflex.cn/static/icon/delete.png" mode="aspectFit"></image>
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
import api from '@/api'

export default {
	components: {
		BottomTabBar
	},
	data() {
		return {
			startX: 0,
			currentMessage: null,
			deleteWidth: -140, 
			messageGroups: [],
			loading: false,
			page: 1,
			pageSize: 20,
			hasMore: true
		}
	},
	onLoad() {
		this.fetchMessages()
	},
	methods: {
		
		async fetchMessages() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.message.getGroupedList({
					page: this.page,
					pageSize: this.pageSize
				})
				if (res.code === 200) {
					const groups = res.data.groups || []
					
					groups.forEach(group => {
						group.messages.forEach(msg => {
							msg.offsetX = 0
						})
					})
					if (this.page === 1) {
						this.messageGroups = groups
					} else {
						this.messageGroups = [...this.messageGroups, ...groups]
					}
					this.hasMore = res.data.hasMore
				}
			} catch (err) {
				console.error('获取消息列表失败:', err)
				uni.showToast({ title: '获取消息失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		
		onTouchStart(e, message) {
			
			this.closeAllMessages()
			this.startX = e.touches[0].clientX
			this.currentMessage = message
		},
		
		onTouchMove(e, message) {
			if (this.currentMessage !== message) return
			const moveX = e.touches[0].clientX
			const diffX = (moveX - this.startX) * 2 
			
			if (diffX < 0) {
				
				message.offsetX = Math.max(diffX, this.deleteWidth)
			} else if (message.offsetX < 0) {
				
				message.offsetX = Math.min(0, message.offsetX + diffX)
			}
		},
		
		onTouchEnd(e, message) {
			if (this.currentMessage !== message) return
			
			if (message.offsetX < this.deleteWidth / 2) {
				message.offsetX = this.deleteWidth
			} else {
				message.offsetX = 0
			}
			this.currentMessage = null
		},
		
		closeAllMessages() {
			this.messageGroups.forEach(group => {
				group.messages.forEach(msg => {
					if (msg.offsetX) {
						msg.offsetX = 0
					}
				})
			})
		},
		
		handleDelete(groupIndex, msgIndex, message) {
			uni.showModal({
				title: '提示',
				content: '确定删除该消息吗？',
				success: async (res) => {
					if (res.confirm) {
						try {
							const result = await api.message.delete(message.id)
							if (result.code === 0) {
								this.messageGroups[groupIndex].messages.splice(msgIndex, 1)
								
								if (this.messageGroups[groupIndex].messages.length === 0) {
									this.messageGroups.splice(groupIndex, 1)
								}
								uni.showToast({ title: '已删除', icon: 'success' })
							}
						} catch (err) {
							console.error('删除消息失败:', err)
							uni.showToast({ title: '删除失败', icon: 'none' })
						}
					}
				}
			})
		},
		
		async handleMessageClick(message) {
			
			if (message.offsetX && message.offsetX < 0) {
				message.offsetX = 0
				return
			}
			
			if (message.unread) {
				try {
					await api.message.markAsRead(message.id)
					message.unread = false
				} catch (err) {
					console.error('标记已读失败:', err)
				}
			}
			
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
