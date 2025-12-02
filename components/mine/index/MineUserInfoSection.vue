<template>
	<view class="user-info-section">
		<view class="user-card">
			<!-- VIP背景层（在白色卡片后面，测试阶段禁用） -->
			<view class="vip-chip-bg-layer disabled">
				<image class="vip-chip-bg" src="/static/background-image/mine_vip_bg.png" mode="aspectFit"></image>
			</view>
			<!-- VIP可点击文字层（测试阶段禁用） -->
			<view class="vip-chip-clickable disabled">
				<view class="vip-title-row">
					<text class="vip-chip-title">VIP会员专享</text>
					<view class="arrow-bg">
						<image class="arrow-icon" src="/static/icon/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<text class="vip-chip-desc">建设中...</text>
			</view>

			<view class="user-header">
				<view class="avatar-wrapper">
					<image
						class="avatar"
						:src="userInfo.avatar || 'https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-77.svg'"
						mode="aspectFill"
					></image>
				</view>

				<view class="user-details">
					<view class="name-row">
						<text class="user-name">{{ userInfo.nickname || '未登录' }}</text>
						<image
							class="verify-icon"
							src="https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-2110.svg"
							mode="aspectFit"
						></image>
					</view>
					<text class="user-level">{{ vipLevelText }}</text>
					<text class="user-bio">{{ userInfo.signature || '这个人很懒，什么都没留下~' }}</text>
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
import api from '@/api'

export default {
	data() {
		return {
			userInfo: {
				nickname: '',
				avatar: '',
				vipLevel: 0,
				signature: ''
			},
			statsData: [
				{ value: "0", label: "关注", key: "followCount" },
				{ value: "0", label: "浏览", key: "browseCount" },
				{ value: "0", label: "收藏", key: "favoriteCount" },
			],
			territoryAvatars: [],
		}
	},
	computed: {
		vipLevelText() {
			const levels = ['普通会员', '银牌会员', '金牌会员', '钻石会员']
			return levels[this.userInfo.vipLevel] || '普通会员'
		}
	},
	mounted() {
		this.fetchUserInfo()
	},
	methods: {
		// 获取用户信息
		async fetchUserInfo() {
			try {
				const res = await api.user.getInfo()
				if (res.code === 0) {
					this.userInfo = res.data
					// 更新统计数据
					this.statsData[0].value = String(res.data.followCount || 0)
					this.statsData[1].value = String(res.data.browseCount || 0)
					this.statsData[2].value = String(res.data.favoriteCount || 0)
				}
			} catch (err) {
				console.error('获取用户信息失败:', err)
			}
			// 获取私人设计师头像
			this.fetchTerritoryDesigners()
		},
		// 获取私人领地设计师
		async fetchTerritoryDesigners() {
			try {
				const res = await api.territory.getMyDesigners({ page: 1, pageSize: 6 })
				if (res.code === 0 && res.data.list) {
					this.territoryAvatars = res.data.list.map(d => d.avatar || '/static/avatar/avatar.png')
				}
			} catch (err) {
				console.error('获取私人设计师失败:', err)
			}
		},
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
	width: 710rpx;
	padding: 40rpx 20rpx 36rpx;
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

/* VIP背景层 - 在白色卡片后面 */
.vip-chip-bg-layer {
	position: absolute;
	top: 0.1rem;
	right: 0;
	z-index: -2;
	pointer-events: none;

	&.disabled {
		opacity: 0.6;
	}
}

.vip-chip-bg {
	width: 280rpx;
	height: 120rpx;
	position: relative;
	right: -10rpx;
	top: 4rpx;
}

/* VIP可点击文字层 - 在最上层 */
.vip-chip-clickable {
	position: absolute;
	top: 0.1rem;
	right: 0;
	z-index: 100;
	display: flex;
	flex-direction: column;
	line-height: 1.2;
	gap: 6rpx;
	padding: 20rpx 28rpx 24rpx 32rpx;

	&.disabled {
		opacity: 0.6;
		pointer-events: none;
	}
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
	width: 24rpx;
	height: 24rpx;
	background-color: #ffffff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.arrow-icon {
	width: 24rpx;
	height: 24rpx;
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

