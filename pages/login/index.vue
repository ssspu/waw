<template>
	<view class="login-page">
		<!-- 背景图片 -->
		<image class="bg-image" src="/static/background-image/register.png" mode="aspectFill"></image>

		<!-- 自定义导航栏 -->
		<view class="custom-navbar" >
			<view class="navbar-content">
				<view class="nav-left" @tap="goBack">
					<image class="nav-icon" src="https://c.animaapp.com/mi5ng54v4eM3X6/img/frame.svg" mode="aspectFit"></image>
				</view>
				<text class="nav-title">账户登录</text>
				<!-- <view class="nav-right">
					<image class="nav-icon" src="/static/icon/more.svg" mode="aspectFit"></image>
					<image class="nav-icon" src="/static/icon/scan.svg" mode="aspectFit"></image>
				</view> -->
			</view>
		</view>

		<!-- Logo 区域 -->
		<view class="logo-section">
			<image
				class="logo-decoration"
				src="https://c.animaapp.com/mifddcuil9hjK2/img/group-19.png"
				mode="aspectFit"
			></image>
			<text class="brand-name">WAW style</text>
		</view>

		<!-- 按钮区域 -->
		<view class="button-section">
			<view class="primary-btn" @tap="handleQuickLogin">
				<text class="primary-btn-text">一键登录</text>
			</view>
			<view class="secondary-btn" @tap="goToPasswordLogin">
				<text class="secondary-btn-text">帐号密码登录</text>
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

export default {
	data() {
		return {
			isAgreed: true,
						showModal: false,
			currentAgreement: {
				title: '',
				content: ''
			},
			hasScrolledToBottom: false,
			modalCountdown: 10,
			modalTimer: null
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
		// 从持久化存储获取状态栏高度
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
		handleQuickLogin() {
			if (!this.isAgreed) {
				uni.showToast({
					title: '请先同意用户协议',
					icon: 'none'
				})
				return
			}
			uni.reLaunch({
				url: '/pages/index/index'
			})
		},
		goToPasswordLogin() {
			uni.navigateTo({
				url: '/pages/login/password'
			})
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

// 导航栏
.custom-navbar {
	position: relative;
	width: 100%;
	z-index: 10;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 32rpx;
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

// Logo 区域
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

// 按钮区域
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

.primary-btn-text {
	font-family: 'Inter', Helvetica;
	font-weight: 600;
	color: #ffffff;
	font-size: 28rpx;
}

.secondary-btn {
	width: 100%;
	height: 108rpx;
	background-color: #efecff;
	border-radius: 54rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s;
	
	&:active {
		background-color: #e5e0ff;
	}
}

.secondary-btn-text {
	font-family: 'Inter', Helvetica;
	font-weight: 600;
	color: #6d58f1;
	font-size: 28rpx;
}

// 底部协议
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

// 底部指示条
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

// 协议弹窗
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
</style>
