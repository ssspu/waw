<template>
	<view class="login-page">
		<!-- 背景图片 -->
		<image class="bg-image" src="/static/background-image/register.png" mode="aspectFill"></image>
		
		<!-- 自定义导航栏 -->
		<view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="nav-left" @tap="goBack">
					<image class="nav-icon" src="https://c.animaapp.com/mi5ng54v4eM3X6/img/frame.svg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		
		<!-- 标题区域 -->
		<view class="title-section">
			<text class="page-title">帐号密码登录</text>
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
				
				<!-- 密码输入 -->
				<view class="input-group">
					<input 
						class="input-field full-width"
						:type="showPassword ? 'text' : 'password'"
						v-model="password"
						placeholder="请输入密码"
						placeholder-class="placeholder-text"
					/>
				</view>
				
				<!-- 链接区域 -->
				<view class="link-row">
					<text class="link-text primary" @tap="goToRegister">注册帐号</text>
					<text class="link-text" @tap="handleForgetPassword">忘记密码</text>
				</view>
				
				<!-- 登录按钮 -->
				<view class="submit-btn" @tap="handleLogin">
					<text class="submit-btn-text">登录</text>
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
			password: '',
			showPassword: false,
			isAgreed: true,
			statusBarHeight: 0
		}
	},
	onLoad() {
		const systemInfo = uni.getSystemInfoSync()
		this.statusBarHeight = systemInfo.statusBarHeight || 44
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		toggleAgreement() {
			this.isAgreed = !this.isAgreed
		},
		handleLogin() {
			if (!this.phone) {
				uni.showToast({ title: '请输入手机号码', icon: 'none' })
				return
			}
			if (!this.password) {
				uni.showToast({ title: '请输入密码', icon: 'none' })
				return
			}
			if (!this.isAgreed) {
				uni.showToast({ title: '请先同意用户协议', icon: 'none' })
				return
			}
			// 登录成功后跳转首页
			uni.reLaunch({
				url: '/pages/index/index'
			})
		},
		goToRegister() {
			uni.navigateTo({
				url: '/pages/login/register'
			})
		},
		handleForgetPassword() {
			uni.showToast({ title: '忘记密码功能待开发', icon: 'none' })
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
	display: flex;
	align-items: center;
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

.link-row {
	display: flex;
	justify-content: space-between;
	padding: 0 10rpx;
}

.link-text {
	font-family: 'Inter', Helvetica;
	font-size: 28rpx;
	color: #a6a6a6;
	
	&.primary {
		color: #6d58f1;
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
