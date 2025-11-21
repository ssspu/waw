<template>
	<view class="user-info-section">
		<view class="user-header">
			<view class="avatar-wrapper">
				<image 
					class="avatar" 
					src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-77.svg" 
					mode="aspectFill"
				></image>
			</view>
			
			<view class="user-details">
				<view class="name-row">
					<text class="user-name">Javen</text>
					<image 
						class="verify-icon" 
						src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-2110.svg" 
						mode="aspectFit"
					></image>
				</view>
				<text class="user-level">金牌会员</text>
			</view>
		</view>
		
		<text class="user-bio">来自星星的盗梦者，一切都要回答火星</text>
		
		<view class="stats-row">
			<view class="stats-list">
				<view 
					v-for="(stat, index) in statsData" 
					:key="index" 
					class="stat-item"
				>
					<text class="stat-value">{{ stat.value }}</text>
					<text class="stat-label">{{ stat.label }}</text>
				</view>
			</view>
			
			<view class="edit-btn" @tap="handleEdit">
				<text class="edit-text">编辑</text>
			</view>
		</view>
		
		<view class="territory-card" @tap="handleTerritoryClick">
			<view class="territory-content">
				<view class="territory-info">
					<view class="territory-text">
						<text class="territory-title">领地</text>
						<text class="territory-subtitle">私人设计师</text>
					</view>
					<view class="territory-avatars">
						<view 
							v-for="(avatar, index) in territoryAvatars" 
							:key="index" 
							class="territory-avatar"
							:style="{ backgroundImage: `url(${avatar})`, marginLeft: index > 0 ? '-20rpx' : '0' }"
						></view>
					</view>
				</view>
				<image 
					class="qr-code" 
					src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-2117.svg" 
					mode="aspectFit"
					@tap.stop="handleQrClick"
				></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statsData: [
				{ value: "1244", label: "关注" },
				{ value: "123", label: "粉丝" },
				{ value: "234", label: "问答" },
				{ value: "1245", label: "收藏" },
			],
			territoryAvatars: [
				"https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
				"https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
				"https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
				"https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
				"https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
				"https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
			],
		}
	},
	methods: {
		handleEdit() {
			console.log('Edit clicked')
		},
		handleTerritoryClick() {
			uni.navigateTo({ url: '/pages/territory/index' })
		},
		handleQrClick() {
			console.log('QR code clicked')
			// 可以弹出二维码大图或分享等功能
		}
	}
}
</script>

<style scoped lang="scss">
.user-info-section {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 36rpx;
	padding: 0 40rpx;
	width: 100%;
	max-width: 710rpx;
	box-sizing: border-box;
}

.user-header {
	display: flex;
	align-items: flex-end;
	gap: 16rpx;
}

.avatar-wrapper {
	flex-shrink: 0;
}

.avatar {
	width: 168rpx;
	height: 168rpx;
	border-radius: 50%;
	background-color: #a6a6a6;
}

.user-details {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 4rpx;
}

.name-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.user-name {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 38rpx;
}

.verify-icon {
	width: 40rpx;
	height: 40rpx;
	flex-shrink: 0;
}

.user-level {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.user-bio {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
	width: 100%;
	max-width: 408rpx;
}

.stats-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.stats-list {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 54rpx;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rpx;
	min-width: 52rpx;
}

.stat-value {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 30rpx;
}

.stat-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.edit-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 14rpx 40rpx;
	background-color: #ffffff;
	border-radius: 50rpx;
	border: 2rpx solid #666666;
	cursor: pointer;
}

.edit-text {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
}

.territory-card {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 18rpx 20rpx;
	background-color: #f6f6f6;
	border-radius: 10rpx;
	box-sizing: border-box;
	cursor: pointer;
}

.territory-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.territory-info {
	display: inline-flex;
	align-items: center;
	gap: 22rpx;
}

.territory-text {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 4rpx;
}

.territory-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 26rpx;
}

.territory-subtitle {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.territory-avatars {
	display: inline-flex;
	align-items: center;
}

.territory-avatar {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	border: 2rpx solid #ffffff;
	background-size: cover;
	background-position: center;
	flex-shrink: 0;
}

.qr-code {
	width: 72rpx;
	height: 72rpx;
	flex-shrink: 0;
}
</style>

