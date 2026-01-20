<template>
	<view class="login-page">
		<!-- 背景图片 -->
		<image class="bg-image" src="https://bioflex.cn/static/background-image/register.png" mode="aspectFill"></image>

		<!-- 自定义导航栏 -->
		<view class="custom-navbar" >
			<view class="navbar-content">
				<view class="nav-left" @tap="goBack">
					<image class="nav-icon" src="https://c.animaapp.com/mi5ng54v4eM3X6/img/frame.svg" mode="aspectFit"></image>
				</view>
				<text class="nav-title">账户登录</text>
				<!-- <view class="nav-right">
					<image class="nav-icon" src="https://bioflex.cn/static/icon/more.svg" mode="aspectFit"></image>
					<image class="nav-icon" src="https://bioflex.cn/static/icon/scan.svg" mode="aspectFit"></image>
				</view> -->
			</view>
		</view>

		<!-- Logo 区域 -->
		<view class="logo-section">
			<image
				class="logo-decoration"
				src="/static/icon/logo.png"
				mode="aspectFit"
			></image>
			<text class="brand-name">WAW TrendHub</text>
		</view>

		<!-- 按钮区域 -->
		<view class="button-section">
			<!-- 一键登录获取手机号 -->
			<button class="primary-btn wx-btn" open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber">
				<text class="primary-btn-text">手机号一键登录</text>
			</button>
		</view>

		<!-- 用户信息弹窗（获取头像昵称） -->
		<view class="userinfo-modal" v-if="showUserInfoModal" @tap.stop>
			<view class="userinfo-modal-content" @tap.stop>
				<view class="userinfo-modal-header">
					<text class="userinfo-modal-title">完善个人信息</text>
				</view>
				<view class="userinfo-form">
					<!-- 头像选择 -->
					<view class="avatar-row">
						<text class="form-label">头像</text>
						<button class="avatar-btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							<image class="avatar-img" :src="tempUserInfo.avatar || 'https://bioflex.cn/static/avatar/avatar.png'" mode="aspectFill"></image>
							<text class="avatar-tip">点击选择</text>
						</button>
					</view>
					<!-- 昵称输入 -->
					<view class="nickname-row">
						<text class="form-label">昵称</text>
						<input
							type="nickname"
							class="nickname-input"
							v-model="tempUserInfo.nickname"
							placeholder="请输入昵称"
							@blur="onNicknameBlur"
						/>
					</view>
				</view>
				<view class="userinfo-modal-footer">
					<view class="userinfo-btn userinfo-btn-confirm" @tap="confirmUserInfo">
						<text class="userinfo-btn-text">确定</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部协议 -->
		<view class="footer-agreement">
			<view class="agreement-row">
				<view class="checkbox-wrapper" @tap="toggleAgreement">
					<view class="checkbox-box" :class="{ checked: isAgreed }">
						<text v-if="isAgreed" class="check-icon">✓</text>
					</view>
				</view>
				<text class="agreement-text">我已阅读并同意</text>
				<text class="agreement-link" @tap="openUserAgreement">《用户协议》</text>
				<text class="agreement-link" @tap="openPrivacyPolicy">《隐私协议》</text>
			</view>
		</view>

		<!-- 底部指示条 -->
		<view class="home-indicator">
			<!-- <view class="indicator-bar"></view> -->
		</view>

		<!-- 协议弹窗 -->
		<view class="agreement-modal" v-if="showModal" @tap="closeModal">
			<view class="modal-content" @tap.stop>
				<view class="modal-header">
					<text class="modal-title">{{ currentAgreement.title }}</text>
					<view class="modal-close" @tap="closeModal">
						<text class="close-icon">×</text>
					</view>
				</view>
				<scroll-view class="modal-body" scroll-y @scrolltolower="onScrollToBottom">
					<text class="modal-text">{{ currentAgreement.content }}</text>
				</scroll-view>
				<view class="modal-footer">
					<view class="modal-btn" :class="{ disabled: !canCloseModal }" @tap="handleModalConfirm">
						<text class="modal-btn-text">{{ modalBtnText }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserAgreement, getPrivacyPolicy } from '@/data/agreements.js'
import api from '@/api'
import { setToken, setRefreshToken } from '@/api/request.js'
import { BUSINESS_CODE } from '@/api/config.js'

export default {
	data() {
		return {
			isAgreed: false,
			showModal: false,
			currentAgreement: {
				title: '',
				content: ''
			},
			hasScrolledToBottom: false,
			modalCountdown: 10,
			modalTimer: null,
			// 用户信息弹窗
			showUserInfoModal: false,
			tempUserInfo: {
				avatar: '',
				nickname: ''
			},
			// 登录时缓存的数据
			pendingLoginData: null
		}
	},
	computed: {
		canCloseModal() {
			return this.hasScrolledToBottom && this.modalCountdown <= 0
		},
		modalBtnText() {
			if (this.modalCountdown > 0) {
				return `我知道了 (${this.modalCountdown}s)`
			}
			if (!this.hasScrolledToBottom) {
				return '请阅读完协议内容'
			}
			return '我知道了'
		}
	},
	onLoad() {
		
		},
	onUnload() {
		if (this.modalTimer) {
			clearInterval(this.modalTimer)
		}
	},
	methods: {
		goBack() {
			uni.navigateBack({
				fail: () => {
					uni.reLaunch({ url: '/pages/index/index' })
				}
			})
		},
		toggleAgreement() {
			this.isAgreed = !this.isAgreed
		},
		// 获取手机号授权
		handleGetPhoneNumber(e) {
			if (!this.isAgreed) {
				uni.showToast({
					title: '请先同意用户协议',
					icon: 'none'
				})
				return
			}

			if (e.detail.errMsg !== 'getPhoneNumber:ok') {
				uni.showToast({ title: '需要授权手机号才能登录', icon: 'none' })
				return
			}

			// 获取手机号的加密数据
			const phoneCode = e.detail.code
			const encryptedData = e.detail.encryptedData
			const iv = e.detail.iv

			// 缓存登录数据，显示用户信息弹窗
			this.pendingLoginData = { phoneCode, encryptedData, iv }
			this.tempUserInfo = { avatar: '', nickname: '' }
			this.showUserInfoModal = true
		},
		// 选择头像回调
		onChooseAvatar(e) {
			console.log('选择头像:', e.detail.avatarUrl)
			this.tempUserInfo.avatar = e.detail.avatarUrl
		},
		// 昵称输入完成
		onNicknameBlur(e) {
			console.log('输入昵称:', e.detail.value)
			this.tempUserInfo.nickname = e.detail.value
		},
		// 确认用户信息并登录
		async confirmUserInfo() {
			console.log('确认用户信息:', this.tempUserInfo)
			if (!this.pendingLoginData) {
				uni.showToast({ title: '登录信息已过期', icon: 'none' })
				this.showUserInfoModal = false
				return
			}

			const { phoneCode, encryptedData, iv } = this.pendingLoginData
			this.showUserInfoModal = false

			// 执行登录
			await this.doWechatLogin(phoneCode, encryptedData, iv)
		},
		// 执行微信登录
		async doWechatLogin(phoneCode, encryptedData, iv) {
			uni.showLoading({ title: '登录中...' })

			try {
				// 获取微信登录code
				const loginRes = await new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success: resolve,
						fail: reject
					})
				})

				if (!loginRes.code) {
					uni.hideLoading()
					uni.showToast({ title: '获取微信授权失败', icon: 'none' })
					return
				}

				// 使用用户选择的头像和昵称
				const wxUserInfo = this.tempUserInfo || {}

				// 调用后端登录接口
				const res = await api.auth.loginByWechat({
					code: loginRes.code,
					phoneCode: phoneCode,
					encryptedData: encryptedData,
					iv: iv,
					nickname: wxUserInfo.nickname || '',
					avatar: wxUserInfo.avatar || ''
				})

				uni.hideLoading()

				if (res.code === BUSINESS_CODE.SUCCESS && res.data) {
					if (res.data.token) {
						setToken(res.data.token)
					}
					if (res.data.refreshToken) {
						setRefreshToken(res.data.refreshToken)
					}

					// 保存用户信息到本地存储
					// 优先使用用户选择的微信头像和昵称，其次使用后端返回的数据
					const userInfo = res.data.userInfo || res.data.user || {}
					uni.setStorageSync('userInfo', {
						nickname: wxUserInfo.nickname || userInfo.nickname || userInfo.nickName || '',
						avatar: wxUserInfo.avatar || userInfo.avatar || userInfo.avatarUrl || '',
						phone: userInfo.phone || res.data.phone || ''
					})

					uni.showToast({ title: '登录成功', icon: 'success' })
					setTimeout(() => {
						uni.reLaunch({ url: '/pages/index/index' })
					}, 1500)
				} else {
					uni.showToast({ title: res.message || '登录失败', icon: 'none' })
				}
			} catch (err) {
				uni.hideLoading()
				console.error('微信登录失败:', err)
				uni.showToast({ title: '登录失败', icon: 'none' })
			}
		},
		openUserAgreement() {
			const agreement = getUserAgreement()
			this.currentAgreement = agreement
			this.openModal()
		},
		openPrivacyPolicy() {
			const agreement = getPrivacyPolicy()
			this.currentAgreement = agreement
			this.openModal()
		},
		openModal() {
			this.showModal = true
			this.hasScrolledToBottom = false
			this.modalCountdown = 10
			this.startModalCountdown()
		},
		startModalCountdown() {
			if (this.modalTimer) {
				clearInterval(this.modalTimer)
			}
			this.modalTimer = setInterval(() => {
				this.modalCountdown--
				if (this.modalCountdown <= 0) {
					clearInterval(this.modalTimer)
					this.modalTimer = null
				}
			}, 1000)
		},
		onScrollToBottom() {
			this.hasScrolledToBottom = true
		},
		handleModalConfirm() {
			if (!this.canCloseModal) {
				if (this.modalCountdown > 0) {
					uni.showToast({ title: '请等待倒计时结束', icon: 'none' })
				} else if (!this.hasScrolledToBottom) {
					uni.showToast({ title: '请先阅读完协议内容', icon: 'none' })
				}
				return
			}
			this.closeModal()
		},
		closeModal() {
			this.showModal = false
			if (this.modalTimer) {
				clearInterval(this.modalTimer)
				this.modalTimer = null
			}
		}
	}
}
</script>

<style scoped lang="scss">
.login-page {
	width: 100%;
	min-height: 100vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
}

.bg-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	object-fit: cover;
}


.custom-navbar {
	position: relative;
	width: 100%;
	z-index: 10;
}

.navbar-content {
	width: 63%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 88rpx 32rpx 24rpx;
	box-sizing: border-box;
}

.nav-left {
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
}

.nav-icon {
	width: 32rpx;
	height: 32rpx;
}

.nav-right {
	display: flex;
	align-items: center;
	gap: 24rpx;
}


.logo-section {
	position: relative;
	z-index: 5;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 300rpx;
}

.logo-decoration {
	width: 138rpx;
	height: 138rpx;
}

.brand-name {
	margin-top: 32rpx;
	font-family: 'PingFang_SC-Bold', Helvetica;
	font-weight: bold;
	color: #333333;
	font-size: 32rpx;
	text-align: center;
}


.button-section {
	position: relative;
	z-index: 5;
	margin-top: auto;
	padding: 0 40rpx;
	display: flex;
	flex-direction: column;
	gap: 26rpx;
}

.primary-btn {
	width: 100%;
	height: 108rpx;
	background-color: #6d58f1;
	border-radius: 54rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s;

	&:active {
		background-color: #5d48e1;
	}
}

// 微信按钮重置样式
.wx-btn {
	margin: 0;
	padding: 0;
	border: none;
	line-height: normal;
	background-color: #6d58f1;

	&::after {
		border: none;
	}
}

.primary-btn-text {
	font-family: 'Inter', Helvetica;
	font-weight: 600;
	color: #ffffff;
	font-size: 28rpx;
}


.footer-agreement {
	position: relative;
	z-index: 5;
	padding: 60rpx 0 30rpx;
}

.agreement-row {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10rpx;
}

.checkbox-wrapper {
	padding: 8rpx;
}

.checkbox-box {
	width: 32rpx;
	height: 32rpx;
	border: 2rpx solid #999999;
	border-radius: 6rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	
	&.checked {
		background-color: #6d58f1;
		border-color: #6d58f1;
	}
}

.check-icon {
	color: #ffffff;
	font-size: 20rpx;
	font-weight: bold;
}

.agreement-text {
	font-family: 'Inter', Helvetica;
	font-weight: 500;
	color: #999999;
	font-size: 24rpx;
}

.agreement-link {
	font-family: 'Inter', Helvetica;
	font-weight: 500;
	color: #6d58f1;
	font-size: 24rpx;
}


.home-indicator {
	width: 100%;
	height: 68rpx;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding-bottom: 16rpx;
}

.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 100rpx;
}


.agreement-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60rpx 24rpx;
	box-sizing: border-box;
}

.modal-content {
	width: 100%;
	min-height: 70vh;
	max-height: 85vh;
	background-color: #ffffff;
	border-radius: 12rpx;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.modal-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 30rpx;
	border-bottom: 1rpx solid #eeeeee;
	flex-shrink: 0;
}

.modal-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 30rpx;
	flex: 1;
	padding-right: 20rpx;
}

.modal-close {
	width: 44rpx;
	height: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.close-icon {
	font-size: 44rpx;
	color: #999999;
	line-height: 1;
}

.modal-body {
	flex: 1;
	padding: 24rpx 30rpx;
	max-height: 70vh;
	box-sizing: border-box;
}

.modal-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #333333;
	line-height: 1.8;
	white-space: pre-wrap;
	word-wrap: break-word;
	word-break: break-all;
}

.modal-footer {
	padding: 24rpx 30rpx 40rpx;
	flex-shrink: 0;
}

.modal-btn {
	width: 100%;
	height: 72rpx;
	background-color: #6d58f1;
	border-radius: 36rpx;
	display: flex;
	align-items: center;
	justify-content: center;

	&.disabled {
		background-color: #cccccc;
	}
}

.modal-btn-text {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #ffffff;
	font-size: 26rpx;
}

// 用户信息弹窗样式
.userinfo-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
}

.userinfo-modal-content {
	width: 600rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 40rpx;
	box-sizing: border-box;
}

.userinfo-modal-header {
	text-align: center;
	margin-bottom: 40rpx;
}

.userinfo-modal-title {
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
}

.userinfo-form {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}

.avatar-row, .nickname-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.form-label {
	font-size: 28rpx;
	color: #333333;
}

.avatar-btn {
	display: flex;
	align-items: center;
	gap: 16rpx;
	background: transparent;
	padding: 0;
	margin: 0;
	border: none;

	&::after {
		border: none;
	}
}

.avatar-img {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	background-color: #f0f0f0;
}

.avatar-tip {
	font-size: 24rpx;
	color: #999999;
}

.nickname-input {
	flex: 1;
	text-align: right;
	font-size: 28rpx;
	color: #333333;
	padding: 16rpx;
	background-color: #f5f5f5;
	border-radius: 8rpx;
	margin-left: 20rpx;
}

.userinfo-modal-footer {
	margin-top: 40rpx;
}

.userinfo-btn {
	width: 100%;
	height: 80rpx;
	border-radius: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.userinfo-btn-confirm {
	background-color: #6d58f1;
}

.userinfo-btn-text {
	font-size: 28rpx;
	font-weight: 500;
	color: #ffffff;
}
</style>
