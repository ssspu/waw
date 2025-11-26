<template>
	<view class="user-info-section">
		<view class="user-card">
			<view class="vip-chip" @tap="handleVipClick">
				<view class="vip-chip-text">
					<text class="vip-chip-title">VIP会员专享</text>
					<text class="vip-chip-desc">超值补贴优惠专享</text>
				</view>
				<view class="vip-chip-arrow">
					<text>➔</text>
				</view>
			</view>

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
					<text class="user-bio">来自星星的盗梦者，一切都要回答火星</text>
				</view>
			</view>
			
			<view class="stats-row">
				<view 
					v-for="(stat, index) in statsData" 
					:key="index" 
					class="stat-item"
					@tap="handleStatClick(stat)"
				>
					<text class="stat-value">{{ stat.value }}</text>
					<text class="stat-label">{{ stat.label }}</text>
				</view>
			</view>
			
			<view class="territory-card" @tap="handleTerritoryClick">
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
				{ value: "234", label: "浏览" },
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
		handleStatClick(stat) {
			if (stat.label === '关注') {
				uni.navigateTo({ url: '/pages/mine/follow-list' })
			} else if (stat.label === '浏览') {
				uni.navigateTo({ url: '/pages/mine/browse-records' })
			} else if (stat.label === '收藏') {
				uni.navigateTo({ url: '/pages/mine/favorites' })
			}
		},
		handleTerritoryClick() {
			uni.navigateTo({ url: '/pages/territory/index' })
		},
		handleQrClick() {
			console.log('QR code clicked')
			uni.navigateTo({
				url: '/pages/mine/qr-code-card'
			})
		},
		handleVipClick() {
			uni.navigateTo({
				url: '/pages/mine/vip'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.user-info-section {
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
}

.user-card {
	width: 100%;
	max-width: 780rpx;
	background: #ffffff;
	border-radius: 36rpx;
	box-shadow: 0 16rpx 50rpx rgba(0, 0, 0, 0.12);
	padding: 40rpx 34rpx 36rpx;
	position: relative;
	box-sizing: border-box;
	margin-top: -60rpx;
}

.vip-chip {
	position: absolute;
	top: 0.1rem;
	right: -0.25rem;
	background: linear-gradient(134deg, #E9D9C1 0%, #B19F84 100%);
	border-top-right-radius: 40rpx;
	border-bottom-left-radius: 40rpx;
	border-bottom-right-radius: 40rpx;
	padding: 20rpx 28rpx 24rpx 32rpx;
	display: flex;
	align-items: center;
	min-width: 100rpx;
	box-shadow: 0 12rpx 20rpx rgba(177, 159, 132, 0.4);
}

.vip-chip-text {
	display: flex;
	flex-direction: column;
	line-height: 1.2;
}

.vip-chip-title {
	font-size: 22rpx;
	color: #fff;
	font-family: 'PingFang_SC-Semibold', Helvetica;
}

.vip-chip-desc {
	font-size: 18rpx;
	color: rgba(255, 255, 255, 0.85);
}

.vip-chip-arrow {
	width: 36rpx;
	height: 36rpx;
	background-color: rgba(255, 255, 255, 0.25);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 22rpx;
}

.user-header {
	margin-top: -30rpx;
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.avatar-wrapper {
	width: 156rpx;
	height: 156rpx;
	border-radius: 50%;
	padding: 6rpx;
	margin-top: -110rpx;
}

.avatar {
	margin-top: 0rpx;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
}

.user-details {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.name-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.user-name {
	font-size: 40rpx;
	color: #000;
	font-family: 'PingFang_SC-Semibold', Helvetica;
}

.verify-icon {
	width: 36rpx;
	height: 36rpx;
}

.user-level {
	font-size: 26rpx;
	color: #a6a6a6;
}

.user-bio {
	font-size: 24rpx;
	color: #a6a6a6;
	max-width: 420rpx;
	line-height: 1.4;
}

.stats-row {
	margin-top: 32rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10rpx;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6rpx;
	min-width: 140rpx;
}

.stat-value {
	font-size: 34rpx;
	color: #333;
	font-family: 'PingFang_SC-Semibold', Helvetica;
}

.stat-label {
	font-size: 22rpx;
	color: #a6a6a6;
}

.territory-card {
	margin-top: 36rpx;
	background: #f7f7f7;
	border-radius: 24rpx;
	padding: 28rpx 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.territory-text {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.territory-title {
	font-size: 28rpx;
	color: #333;
	font-family: 'PingFang_SC-Semibold', Helvetica;
}

.territory-subtitle {
	font-size: 22rpx;
	color: #a6a6a6;
}

.territory-avatars {
	display: flex;
	align-items: center;
}

.territory-avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	border: 2rpx solid #fff;
	background-size: cover;
	background-position: center;
}
</style>

