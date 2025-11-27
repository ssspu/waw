<template>
	<view class="register-page">
		<!-- 背景图片 -->
		<image class="bg-image" src="/static/background-image/register.png" mode="aspectFill"></image>
		
		<!-- 自定义导航栏 -->
		<view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="nav-left" @tap="goBack">
					<image class="nav-icon" src="https://c.animaapp.com/mi5ng54v4eM3X6/img/frame.svg" mode="aspectFit"></image>
				</view>
				<view class="nav-right">
					<image class="nav-icon" src="/static/icon/more.svg" mode="aspectFit"></image>
					<image class="nav-icon" src="/static/icon/scan.svg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		
		<!-- 标题区域 -->
		<view class="title-section">
			<text class="page-title">帐号注册</text>
			<text class="page-subtitle">欢迎来到WAW style</text>
		</view>
		
		<!-- 表单区域 -->
		<view class="form-section">
			<view class="form-card">
				<!-- 手机号输入 -->
				<view class="input-group">
					<text class="country-code">+86</text>
					<input 
						class="input-field"
						type="number"
						v-model="phone"
						placeholder="请输入手机号码"
						placeholder-class="placeholder-text"
						maxlength="11"
					/>
				</view>
				
				<!-- 验证码输入 -->
				<view class="input-group">
					<input 
						class="input-field"
						type="number"
						v-model="verifyCode"
						placeholder="请输入验证码"
						placeholder-class="placeholder-text"
						maxlength="6"
					/>
					<text class="code-btn" :class="{ disabled: countdown > 0 }" @tap="getVerifyCode">
						{{ countdown > 0 ? countdown + 's' : '获取验证码' }}
					</text>
				</view>
				
				<!-- 设置密码 -->
				<view class="input-group">
					<input 
						class="input-field full-width"
						type="password"
						v-model="password"
						placeholder="请设置密码"
						placeholder-class="placeholder-text"
					/>
				</view>
				
				<!-- 确认密码 -->
				<view class="input-group">
					<input 
						class="input-field full-width"
						type="password"
						v-model="confirmPassword"
						placeholder="请再次确认密码"
						placeholder-class="placeholder-text"
					/>
				</view>
				
				<!-- 注册按钮 -->
				<view class="submit-btn" @tap="handleRegister">
					<text class="submit-btn-text">注册</text>
				</view>
				
				<!-- 已有帐号 -->
				<view class="login-link-row">
					<text class="login-hint">已有帐号</text>
					<text class="login-link" @tap="goToLogin">立即登录</text>
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
				<text class="agreement-link">《用户协议》《隐私协议》</text>
			</view>
		</view>
		
		<!-- 底部指示条 -->
		<view class="home-indicator">
			<!-- <view class="indicator-bar"></view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone: '',
			verifyCode: '',
			password: '',
			confirmPassword: '',
			isAgreed: true,
			statusBarHeight: 0,
			countdown: 0,
			timer: null
		}
	},
	onLoad() {
		const systemInfo = uni.getSystemInfoSync()
		this.statusBarHeight = systemInfo.statusBarHeight || 44
	},
	onUnload() {
		if (this.timer) {
			clearInterval(this.timer)
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		toggleAgreement() {
			this.isAgreed = !this.isAgreed
		},
		getVerifyCode() {
			if (this.countdown > 0) return
			if (!this.phone || this.phone.length !== 11) {
				uni.showToast({ title: '请输入正确的手机号码', icon: 'none' })
				return
			}
			// 开始倒计时
			this.countdown = 60
			this.timer = setInterval(() => {
				this.countdown--
				if (this.countdown <= 0) {
					clearInterval(this.timer)
					this.timer = null
				}
			}, 1000)
			uni.showToast({ title: '验证码已发送', icon: 'success' })
		},
		handleRegister() {
			if (!this.phone || this.phone.length !== 11) {
				uni.showToast({ title: '请输入正确的手机号码', icon: 'none' })
				return
			}
			if (!this.verifyCode) {
				uni.showToast({ title: '请输入验证码', icon: 'none' })
				return
			}
			if (!this.password) {
				uni.showToast({ title: '请设置密码', icon: 'none' })
				return
			}
			if (this.password !== this.confirmPassword) {
				uni.showToast({ title: '两次密码输入不一致', icon: 'none' })
				return
			}
			if (!this.isAgreed) {
				uni.showToast({ title: '请先同意用户协议', icon: 'none' })
				return
			}
			// 注册成功后跳转首页
			uni.showToast({ title: '注册成功', icon: 'success' })
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}, 1500)
		},
		goToLogin() {
			uni.navigateBack()
		}
	}
}
</script>

<style scoped lang="scss">
.register-page {
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
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 88rpx;
	padding: 0 30rpx;
}

.nav-left {
	width: 60rpx;
	display: flex;
	align-items: center;
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

.title-section {
	position: relative;
	z-index: 5;
	padding: 20rpx 40rpx;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.page-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 46rpx;
	color: #333333;
}

.page-subtitle {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	color: #acb5bd;
}

.form-section {
	position: relative;
	z-index: 5;
	padding: 30rpx 40rpx;
}

.form-card {
	background-color: rgba(255, 255, 255, 0.6);
	border-radius: 44rpx;
	border: 2rpx solid #ffffff;
	padding: 60rpx 34rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.input-group {
	display: flex;
	align-items: center;
	height: 100rpx;
	background-color: #ffffff;
	border-radius: 68rpx;
	padding: 0 40rpx;
	gap: 40rpx;
}

.country-code {
	font-family: 'Inter', Helvetica;
	font-weight: 600;
	font-size: 32rpx;
	color: #000000;
	flex-shrink: 0;
}

.input-field {
	flex: 1;
	height: 100%;
	font-family: 'Inter', Helvetica;
	font-size: 28rpx;
	color: #333333;
}

.full-width {
	width: 100%;
}

.placeholder-text {
	color: #a6a6a6;
}

.code-btn {
	font-family: 'Inter', Helvetica;
	font-size: 28rpx;
	color: #6d58f1;
	flex-shrink: 0;
	
	&.disabled {
		color: #a6a6a6;
	}
}

.submit-btn {
	height: 100rpx;
	background-color: #6d58f1;
	border-radius: 68rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 10rpx;
	
	&:active {
		background-color: #5d48e1;
	}
}

.submit-btn-text {
	font-family: 'Inter', Helvetica;
	font-weight: 600;
	font-size: 28rpx;
	color: #ffffff;
}

.login-link-row {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
}

.login-hint {
	font-family: 'Inter', Helvetica;
	font-size: 28rpx;
	color: #a6a6a6;
}

.login-link {
	font-family: 'Inter', Helvetica;
	font-size: 28rpx;
	color: #6d58f1;
}

.footer-agreement {
	position: relative;
	z-index: 5;
	margin-top: auto;
	padding: 40rpx 0;
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
	font-size: 24rpx;
	color: #999999;
}

.agreement-link {
	font-family: 'Inter', Helvetica;
	font-size: 24rpx;
	color: #6d58f1;
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
</style>
