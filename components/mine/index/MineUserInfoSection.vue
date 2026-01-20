<template>
	<view class="user-info-section">
		<view class="user-card">
			<!-- VIP背景层（在白色卡片后面，测试阶段禁用） -->
			<view class="vip-chip-bg-layer disabled">
				<image class="vip-chip-bg" src="https://bioflex.cn/static/background-image/mine_vip_bg.png" mode="aspectFit"></image>
			</view>
			<!-- VIP可点击文字层（测试阶段禁用） -->
			<view class="vip-chip-clickable disabled">
				<view class="vip-title-row">
					<text class="vip-chip-title">VIP会员专享</text>
					<view class="arrow-bg">
						<image class="arrow-icon" src="https://bioflex.cn/static/icon/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<text class="vip-chip-desc">建设中...</text>
			</view>

			<view class="user-header" @tap="handleUserClick">
				<view class="avatar-wrapper">
					<image
						class="avatar"
						:src="isLogin && userInfo.avatar ? userInfo.avatar : 'https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-77.svg'"
						mode="aspectFill"
					></image>
				</view>

				<view class="user-details">
					<view class="name-row" v-if="isLogin">
						<text class="user-name">{{ userInfo.nickname || '未设置昵称' }}</text>
						<view v-if="userInfo.gender === '男'" class="gender-badge gender-male">
							<image class="verify-icon" src="/static/icon/nanxing.png" mode="aspectFit"></image>
						</view>
						<view v-else-if="userInfo.gender === '女'" class="gender-badge gender-female">
							<image class="verify-icon" src="/static/icon/nvxing.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="login-row" v-else>
						<text class="login-text">点击登录</text>
						<image class="login-arrow" src="https://bioflex.cn/static/icon/right.png" mode="aspectFit"></image>
					</view>
					<text class="user-level" v-if="isLogin">{{ vipLevelText }}</text>
					<text class="user-bio" v-if="isLogin">{{ userInfo.signature || '这个人很懒，什么都没留下~' }}</text>
					<text class="login-tip" v-else>登录后享受更多服务</text>
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
import { isLoggedIn } from '@/api/request.js'

export default {
	data() {
		return {
			isLogin: false,
			userInfo: {
				nickname: '',
				avatar: '',
				vipLevel: 0,
				signature: '',
				gender: ''
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
		this.refreshData()
		// 监听页面显示事件，刷新数据
		uni.$on('refreshMineUserInfo', this.refreshData)
	},
	beforeDestroy() {
		uni.$off('refreshMineUserInfo', this.refreshData)
	},
	methods: {
		// 刷新数据
		refreshData() {
			this.isLogin = isLoggedIn()
			this.loadLocalUserInfo()
			if (this.isLogin) {
				this.fetchUserInfo()
			}
		},
		// 从本地存储加载用户信息
		loadLocalUserInfo() {
			try {
				const localUserInfo = uni.getStorageSync('userInfo')
				if (localUserInfo) {
					this.userInfo = {
						nickname: localUserInfo.nickname || localUserInfo.nickName || '',
						avatar: localUserInfo.avatar || localUserInfo.avatarUrl || '',
						vipLevel: localUserInfo.vipLevel || 0,
						signature: localUserInfo.signature || '',
						gender: localUserInfo.gender || ''
					}
				}
			} catch (err) {
				console.error('读取本地用户信息失败:', err)
			}
		},

		async fetchUserInfo() {
			try {
				const res = await api.user.getInfo()
				// 检查是否需要登录（token过期）
				if (res.needLogin || res.code === 401) {
					this.handleTokenExpired()
					return
				}
				if (res.code === 200 && res.data) {
					// 更新用户信息
					this.userInfo = {
						nickname: res.data.nickname || res.data.nickName || this.userInfo.nickname || '',
						avatar: res.data.avatar || res.data.avatarUrl || this.userInfo.avatar || '',
						vipLevel: res.data.vipLevel || 0,
						signature: res.data.signature || '',
						gender: res.data.gender || this.userInfo.gender || ''
					}

					// 同步更新本地存储
					uni.setStorageSync('userInfo', this.userInfo)

					// 更新统计数据
					this.statsData[0].value = String(res.data.followCount || 0)
					this.statsData[1].value = String(res.data.browseCount || 0)
					this.statsData[2].value = String(res.data.favoriteCount || 0)
				}
			} catch (err) {
				console.error('获取用户信息失败:', err)
				// 检查错误是否为token过期
				if (err.code === 401 || err.needLogin) {
					this.handleTokenExpired()
				}
			}

			if (this.isLogin) {
				this.fetchTerritoryDesigners()
			}
		},

		// 处理token过期
		handleTokenExpired() {
			// 清除token
			uni.removeStorageSync('waw_token')
			uni.removeStorageSync('waw_refresh_token')
			// 清除用户信息
			uni.removeStorageSync('userInfo')
			// 重置登录状态
			this.isLogin = false
			// 重置用户信息
			this.userInfo = {
				nickname: '',
				avatar: '',
				vipLevel: 0,
				signature: '',
				gender: ''
			}
			// 重置统计数据
			this.statsData[0].value = '0'
			this.statsData[1].value = '0'
			this.statsData[2].value = '0'
			// 重置领地头像
			this.territoryAvatars = []
		},
		
		async fetchTerritoryDesigners() {
			try {
				const res = await api.territory.getMyDesigners({ page: 1, pageSize: 6 })
				if (res.code === 200 && res.data.list) {
					this.territoryAvatars = res.data.list.map(d => d.avatar || 'https://bioflex.cn/static/avatar/avatar.png')
				}
			} catch (err) {
				console.error('获取私人设计师失败:', err)
			}
		},
		handleStatClick(stat) {
			// 未登录时跳转登录页
			if (!this.isLogin) {
				uni.navigateTo({ url: '/pages/login/index' })
				return
			}
			if (stat.label === '关注') {
				uni.navigateTo({ url: '/packageMine/pages/mine/follow-list' })
			} else if (stat.label === '浏览') {
				uni.navigateTo({ url: '/packageMine/pages/mine/browse-records' })
			} else if (stat.label === '收藏') {
				uni.navigateTo({ url: '/packageMine/pages/mine/favorites' })
			}
		},
		handleTerritoryClick() {
			// 未登录时跳转登录页
			if (!this.isLogin) {
				uni.navigateTo({ url: '/pages/login/index' })
				return
			}
			uni.navigateTo({ url: '/packageOthers/pages/territory/index' })
		},
		handleUserClick() {
			// 未登录时跳转登录页
			if (!this.isLogin) {
				uni.navigateTo({ url: '/pages/login/index' })
				return
			}
			// 已登录可跳转个人信息页
			uni.navigateTo({ url: '/packageSetting/pages/setting/personal-info' })
		},
		handleQrClick() {
			console.log('QR code clicked')
			uni.navigateTo({
				url: '/packageMine/pages/mine/qr-code-card'
			})
		},
		handleVipClick() {
			uni.navigateTo({
				url: '/packageMine/pages/mine/vip'
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
	align-items: center;
}

.user-card {
	width: 710rpx;
	border-radius: 12rpx;
	padding: 40rpx 30rpx 36rpx;
	position: relative;
	box-sizing: border-box;
	margin: -80rpx 0 0rpx;
}

.user-card::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url('https://bioflex.cn/static/background-image/mine_info_bg.png');
	background-size: 100% auto;
	background-repeat: no-repeat;
	z-index: -1;
	pointer-events: none;
}


.vip-chip-bg-layer {
	position: absolute;
	top: 0.1rem;
	right: 0;
	z-index: -2;
	pointer-events: none;

	&.disabled {
		filter: grayscale(100%);
		opacity: 0.7;
	}
}

.vip-chip-bg {
	width: 280rpx;
	height: 120rpx;
	position: relative;
	right: -10rpx;
	top: 4rpx;
}


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
		filter: grayscale(100%);
		opacity: 0.7;
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

.login-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.login-text {
	font-size: 40rpx;
	color: #000;
	font-family: 'PingFang_SC-Semibold', Helvetica;
}

.login-arrow {
	width: 32rpx;
	height: 32rpx;
}

.login-tip {
	font-size: 24rpx;
	color: #a6a6a6;
	margin-top: 8rpx;
}

.user-name {
	font-size: 40rpx;
	color: #000;
	font-family: 'PingFang_SC-Semibold', Helvetica;
}

.verify-icon {
	width: 24rpx;
	height: 24rpx;
}

.gender-badge {
	width: 36rpx;
	height: 36rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.gender-male {
	background-color: #DBE8FF;
}

.gender-male .verify-icon {
	filter: invert(45%) sepia(70%) saturate(600%) hue-rotate(190deg) brightness(95%);
}

.gender-female {
	background-color: #FFE4EC;
}

.gender-female .verify-icon {
	filter: invert(55%) sepia(80%) saturate(500%) hue-rotate(310deg) brightness(95%);
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
	margin: 10rpx auto 0;
	background: #f7f7f7;
	border-radius: 24rpx;
	padding: 28rpx 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 610rpx;
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

