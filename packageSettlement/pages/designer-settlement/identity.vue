<template>
	<view class="screen">
		<!-- 头部导航 -->
		<view class="header" >
			<view class="nav-bar">
				<view class="nav-left">
					<view class="back-btn" @tap="handleBack">
					</view>
					<text class="nav-title">设计师入驻</text>
				</view>
				<view class="nav-right"></view>
			</view>
			
			<!-- 步骤导航 -->
			<view class="steps-container">
				<view class="step-item">
					<view class="progress-dot active">
						<view class="dot-pulse"></view>
						<view class="dot-core"></view>
					</view>
					<text class="step-label active">身份认证</text>
				</view>
				<view class="progress-line"></view>
				<view class="step-item">
					<view class="progress-dot"></view>
					<text class="step-label">职业认证</text>
				</view>
				<view class="progress-line"></view>
				<view class="step-item">
					<view class="progress-dot"></view>
					<text class="step-label">合作协议</text>
				</view>
				<view class="progress-line"></view>
				<view class="step-item">
					<view class="progress-dot"></view>
					<text class="step-label">结算信息</text>
				</view>
			</view>
		</view>
		
		<!-- 主内容区域 -->
		<scroll-view class="main-content" scroll-y>
			<!-- 身份证上传卡片 -->
			<view class="card">
				<view class="card-header">
					<text class="card-title">个人身份证</text>
					<text class="card-subtitle">(或其他有效身份证件)</text>
				</view>
				
				<view class="upload-row">
					<view class="upload-box" @tap="uploadIdFront">
						<view class="upload-content">
							<image v-if="formData.idFrontUrl" class="uploaded-img" :src="formData.idFrontUrl" mode="aspectFill"></image>
							<view v-else class="upload-placeholder">
								<image class="upload-icon" src="https://c.animaapp.com/miiepnx8EBw0nf/img/frame-2396.svg" mode="aspectFit"></image>
								<text class="upload-text">上传人像页</text>
							</view>
						</view>
					</view>
					
					<view class="upload-box" @tap="uploadIdBack">
						<view class="upload-content">
							<image v-if="formData.idBackUrl" class="uploaded-img" :src="formData.idBackUrl" mode="aspectFill"></image>
							<view v-else class="upload-placeholder">
								<image class="upload-icon" src="https://c.animaapp.com/miiepnx8EBw0nf/img/frame-2397.svg" mode="aspectFit"></image>
								<text class="upload-text">上传国徽页</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 实名信息卡片 -->
			<view class="card">
				<view class="card-title-row">
					<text class="card-title">实名信息</text>
				</view>
				
				<view class="form-item">
					<text class="form-label">姓名</text>
					<input class="form-input" v-model="formData.name" placeholder="请输入本人姓名" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">性别</text>
					<view class="gender-group">
						<view class="gender-item" :class="{ active: formData.gender === 'male' }" @tap="formData.gender = 'male'">
							<text class="gender-text">男</text>
							<image v-if="formData.gender === 'male'" class="check-icon" src="https://bioflex.cn/static/icon/right-icon.png" mode="aspectFit"></image>
							<view v-else class="radio-circle"></view>
						</view>
						<view class="gender-item" :class="{ active: formData.gender === 'female' }" @tap="formData.gender = 'female'">
							<text class="gender-text">女</text>
							<image v-if="formData.gender === 'female'" class="check-icon" src="https://bioflex.cn/static/icon/right-icon.png" mode="aspectFit"></image>
							<view v-else class="radio-circle"></view>
						</view>
					</view>
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">身份证号</text>
					<input class="form-input" v-model="formData.idNumber" placeholder="请输入身份证号码" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">邮箱</text>
					<input class="form-input" v-model="formData.email" placeholder="请输入邮箱" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">手机号</text>
					<view class="input-with-btn">
						<input class="form-input flex-1" v-model="formData.phone" placeholder="请输入手机号码" />
						<text class="get-code-btn" :class="{ disabled: countdown > 0 }" @tap="getVerifyCode">{{ countdown > 0 ? countdown + 's后重新获取' : '获取验证码' }}</text>
					</view>
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">验证码</text>
					<input class="form-input" v-model="formData.verifyCode" placeholder="请输入验证码" />
				</view>
				<view class="form-divider"></view>
			</view>
			
			<!-- 人脸验证卡片 -->
			<view class="card">
				<view class="form-item clickable" @tap="goFaceVerify">
					<text class="form-label">人脸验证</text>
					<view class="form-right">
						<text class="form-hint">去验证</text>
						<image class="arrow-icon" src="https://bioflex.cn/static/icon/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			
			<view class="bottom-spacer"></view>
		</scroll-view>
		
		<!-- 底部按钮 -->
		<view class="footer">
			<view class="footer-btns">
				<view class="btn-next" @tap="handleNext">
					<text class="btn-text">下一步</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
						steps: [
				{ label: '身份认证', active: true },
				{ label: '职业认证', active: false },
				{ label: '合作协议', active: false },
				{ label: '结算信息', active: false }
			],
			formData: {
				idFrontUrl: '',
				idBackUrl: '',
				name: '',
				gender: 'male',
				idNumber: '',
				email: '',
				phone: '',
				verifyCode: ''
			},
			countdown: 0,
			timer: null
		}
	},
	onUnload() {
		if (this.timer) {
			clearInterval(this.timer)
		}
	},
	onLoad() {
		},
	methods: {
				uploadIdFront() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					this.formData.idFrontUrl = res.tempFilePaths[0]
				}
			})
		},
		uploadIdBack() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					this.formData.idBackUrl = res.tempFilePaths[0]
				}
			})
		},
		getVerifyCode() {
			if (this.countdown > 0) return
			if (!this.formData.phone) {
				uni.showToast({ title: '请输入手机号', icon: 'none' })
				return
			}
			if (!this.validatePhone(this.formData.phone)) {
				uni.showToast({ title: '手机号格式不正确', icon: 'none' })
				return
			}
			uni.showToast({ title: '验证码已发送', icon: 'success' })
			this.countdown = 60
			this.timer = setInterval(() => {
				this.countdown--
				if (this.countdown <= 0) {
					clearInterval(this.timer)
					this.timer = null
				}
			}, 1000)
		},
		goFaceVerify() {
			uni.showToast({ title: '人脸验证功能值发中', icon: 'none' })
		},
		
		validateIdNumber(idNumber) {
			const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
			return reg.test(idNumber)
		},
		
		validatePhone(phone) {
			const reg = /^1[3-9]\d{9}$/
			return reg.test(phone)
		},
		
		validateEmail(email) {
			const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
			return reg.test(email)
		},
		handleNext() {
			
			if (!this.formData.idFrontUrl) {
				uni.showToast({ title: '请上传身份证人像页', icon: 'none' })
				return
			}
			if (!this.formData.idBackUrl) {
				uni.showToast({ title: '请上传身份证国徽页', icon: 'none' })
				return
			}
			
			if (!this.formData.name) {
				uni.showToast({ title: '请输入姓名', icon: 'none' })
				return
			}
			if (this.formData.name.length < 2) {
				uni.showToast({ title: '姓名至少2个字符', icon: 'none' })
				return
			}
			
			if (!this.formData.idNumber) {
				uni.showToast({ title: '请输入身份证号', icon: 'none' })
				return
			}
			if (!this.validateIdNumber(this.formData.idNumber)) {
				uni.showToast({ title: '身份证号格式不正确', icon: 'none' })
				return
			}
			
			if (!this.formData.email) {
				uni.showToast({ title: '请输入邮箱', icon: 'none' })
				return
			}
			if (!this.validateEmail(this.formData.email)) {
				uni.showToast({ title: '邮箱格式不正确', icon: 'none' })
				return
			}
			
			if (!this.formData.phone) {
				uni.showToast({ title: '请输入手机号', icon: 'none' })
				return
			}
			if (!this.validatePhone(this.formData.phone)) {
				uni.showToast({ title: '手机号格式不正确', icon: 'none' })
				return
			}
			
			if (!this.formData.verifyCode) {
				uni.showToast({ title: '请输入验证码', icon: 'none' })
				return
			}
			if (this.formData.verifyCode.length < 4) {
				uni.showToast({ title: '验证码格式不正确', icon: 'none' })
				return
			}
			uni.navigateTo({
				url: '/packageSettlement/pages/designer-settlement/profession'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.screen {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
}

.header {
	background-color: #ffffff;
}

.nav-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 32rpx;
	height: 88rpx;
}

.nav-right {
	display: flex;
	align-items: center;
}

.logo-img {
	width: 128rpx;
	height: 72rpx;
}

.steps-container {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding: 24rpx 30rpx;
	gap: 0;
}

.step-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
}

.step-label {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	color: #a6a6a6;
	white-space: nowrap;
}

.step-label.active {
	font-weight: 600;
	color: #000000;
}

.progress-dot {
	width: 20rpx;
	height: 20rpx;
	border-radius: 50%;
	background-color: #e7e7e7;
	position: relative;
	flex-shrink: 0;
	overflow: visible;
}

.progress-dot.completed {
	background-color: #FFA07A;
}

.progress-dot.active {
	width: 20rpx;
	height: 20rpx;
	background-color: transparent;
}

.progress-dot.active .dot-core {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 20rpx;
	height: 20rpx;
	border-radius: 50%;
	background-color: #FFA07A;
	z-index: 2;
}

.progress-dot.active .dot-pulse {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	background-color: rgba(255, 160, 122, 0.3);
	animation: pulse 1.5s ease-in-out infinite;
	z-index: 1;
}

.progress-line {
	flex: 1;
	height: 2rpx;
	background-color: #e7e7e7;
	align-self: flex-start;
	margin-top: 9rpx;
}

.main-content {
	flex: 1;
	padding: 16rpx 20rpx;
	box-sizing: border-box;
	width: 100%;
}

.card {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 24rpx 24rpx;
	margin-bottom: 16rpx;
	box-sizing: border-box;
	width: 100%;
	overflow: hidden;
}

.card-header {
	display: flex;
	align-items: center;
	gap: 8rpx;
	margin-bottom: 16rpx;
}

.card-title {
	font-family: 'PingFang SC';
	font-weight: 600;
	font-size: 28rpx;
	color: #000000;
}

.card-subtitle {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #999999;
}

.card-title-row {
	margin-bottom: 32rpx;
}

.upload-row {
	display: flex;
	justify-content: space-between;
	gap: 16rpx;
}

.upload-box {
	flex: 1;
	height: 196rpx;
	background-color: #f8f8f8;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.upload-content {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.uploaded-img {
	width: 100%;
	height: 100%;
	border-radius: 8rpx;
}

.upload-placeholder {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 14rpx;
}

.upload-icon {
	width: 104rpx;
	height: 104rpx;
}

.upload-text {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #d9d9d9;
}

.form-item {
	display: flex;
	align-items: center;
	padding: 28rpx 0;
}

.form-item.clickable {
	justify-content: space-between;
}

.form-label {
	width: 160rpx;
	min-width: 160rpx;
	white-space: nowrap;
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #000000;
	flex-shrink: 0;
}

.form-input {
	flex: 1;
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #333333;
}

.form-input::placeholder {
	color: #a6a6a6;
}

.form-divider {
	height: 1rpx;
	background-color: #e7e7e7;
}

.gender-group {
	display: flex;
	align-items: center;
	gap: 30rpx;
}

.gender-item {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.gender-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #a6a6a6;
}

.gender-item.active .gender-text {
	color: #333333;
}

.radio-circle {
	width: 32rpx;
	height: 32rpx;
	border-radius: 50%;
	border: 2rpx solid #d9d9d9;
}

.check-icon {
	width: 36rpx;
	height: 36rpx;
}

.input-with-btn {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.get-code-btn {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #0088ff;
	flex-shrink: 0;
}

.get-code-btn.disabled {
	color: #999999;
}

.form-right {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.form-hint {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #a6a6a6;
}

.arrow-icon {
	width: 28rpx;
	height: 28rpx;
}

.bottom-spacer {
	height: 180rpx;
}

.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
	box-shadow: 0 -2rpx 0 rgba(0, 0, 0, 0.04);
	padding: 14rpx 20rpx;
	padding-bottom: calc(14rpx + env(safe-area-inset-bottom));
}

.footer-btns {
	display: flex;
	gap: 12rpx;
}

.btn-next {
	flex: 1;
	height: 84rpx;
	background-color: #333333;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn-text {
	font-family: 'PingFang SC';
	font-weight: 600;
	font-size: 24rpx;
	color: #ffffff;
}
</style>

<style>
@keyframes pulse {
	0% {
		transform: translate(-50%, -50%) scale(0.8);
		opacity: 0.8;
	}
	50% {
		transform: translate(-50%, -50%) scale(1.2);
		opacity: 0.4;
	}
	100% {
		transform: translate(-50%, -50%) scale(0.8);
		opacity: 0.8;
	}
}
</style>
