<template>
	<view class="user-info-section">
		<view class="user-card">
			<view class="vip-chip" @tap="handleVipClick">
				<view class="vip-chip-text">
					<view class="vip-title-row">
						<text class="vip-chip-title">VIP会员专享</text>
						<view class="arrow-bg">
							<image class="arrow-icon" src="/static/icon/right.png" mode="aspectFit"></image>
						</view>
					</view>
					<text class="vip-chip-desc">超值补贴优惠专享</text>
				</view>
				<!-- <view class="vip-chip-arrow">
					<image class="arrow-icon" src="/static/icon/right.png" mode="aspectFit"></image>
				</view> -->
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
	// background: #fcc;
	// border-radius: 36rpx;
	// box-shadow: 0 16rpx 50rpx rgba(0, 0, 0, 0.12);
	padding: 40rpx 34rpx 36rpx;
	position: relative;
	box-sizing: border-box;
	margin-top: -60rpx;
}

.user-card::before {
	content: '';
	position: absolute;
	top:0rpx;
	left: 0;
	width:100%;
	height: 100%;
	background-image: url('/static/background-image/mine_info_bg.png');
	background-size: contain;
	// background-position: center 58rpx;
	background-repeat: no-repeat;
	z-index: -1;
	pointer-events: none;
}

.vip-chip {
	position: absolute;
	top: 0.1rem;
	right: -0.25rem;
	// background: linear-gradient(134deg, #E9D9C1 0%, #B19F84 100%);
	// border-top-right-radius: 40rpx;
	// border-bottom-left-radius: 40rpx;
	// border-bottom-right-radius: 40rpx;
	padding: 20rpx 28rpx 24rpx 32rpx;
	display: flex;
	align-items: center;
	min-width: 100rpx;
	// box-shadow: 0 12rpx 20rpx rgba(177, 159, 132, 0.4);
}
.vip-chip::before {
	content: '';
	position: absolute;
	top:4rpx;
	left: -170rpx;
	width: 200%;
	height: 200%;
	background-image: url('/static/background-image/mine_vip_bg.png');
	background-size: contain;
	// background-position: center;
	background-repeat: no-repeat;
	z-index: -10;
	pointer-events: none;
}

.vip-chip-text {
	display: flex;
	flex-direction: column;
	line-height: 1.2;
	gap: 6rpx;
	margin-left: 20rpx;
}

.vip-title-row {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.vip-chip-title {
	// padding-left: 20rpx;
	font-size: 24rpx;
	color: #fff;
	font-family: 'PingFang_SC-Semibold', Helvetica;
}

.vip-chip-desc {
	font-size: 18rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;

	color: rgba(255, 255, 255, 0.85);
}

.vip-chip-arrow {
	width: 36rpx;
	height: 36rpx;
	background-color: #ffffff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 10rpx;
}

.arrow-bg {
	width: 28rpx;
	height: 28rpx;
	background-color: #ffffff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.arrow-icon {
	width: 26rpx;
	height: 26rpx;
	filter: brightness(0) saturate(100%) invert(79%) sepia(12%) saturate(497%) hue-rotate(8deg) brightness(93%) contrast(87%) drop-shadow(0 0 1rpx #D0C1A7) ;
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
	position: relative;
	left: -180rpx;
	top: 14rpx;
}

.stats-row {
	margin-top: 38rpx;
	display: flex;
	// justify-content: space-around;
	// align-items: center;
	// padding: 0 10rpx;
	// gap: 80rpx;
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
	padding: 28rpx 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	overflow: hidden;
}

.territory-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
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

