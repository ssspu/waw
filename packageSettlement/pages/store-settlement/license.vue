<template>
	<view class="screen">
		<!-- 头部导航 -->
		<view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="nav-bar">
				<view class="nav-left">
					<view class="back-btn" @tap="handleBack">
						<image class="back-icon" src="/static/icon/arrow-left.png" mode="aspectFit"></image>
					</view>
					<text class="nav-title">实体门店入驻</text>
				</view>
				<view class="nav-right"></view>
			</view>
			
			<!-- 步骤导航 -->
			<view class="steps-container">
				<view class="step-item">
					<view class="progress-dot completed"></view>
					<text class="step-label">门店认证</text>
				</view>
				<view class="progress-line"></view>
				<view class="step-item">
					<view class="progress-dot active">
						<view class="dot-pulse"></view>
						<view class="dot-core"></view>
					</view>
					<text class="step-label active">执照认证</text>
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
			<!-- 营业执照类型卡片 -->
			<view class="card">
				<view class="form-item clickable" @tap="selectLicenseType">
					<text class="form-label">营业执照类型</text>
					<view class="form-right">
						<text class="form-value">{{ formData.licenseType }}</text>
						<image class="arrow-icon" src="/static/icon/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			
			<!-- 营业执照卡片 -->
			<view class="card">
				<view class="card-title-row">
					<text class="card-title">营业执照</text>
				</view>
				
				<view class="upload-row">
					<view class="upload-box" @tap="uploadLicense">
						<view class="upload-content">
							<image v-if="formData.licenseUrl" class="uploaded-img" :src="formData.licenseUrl" mode="aspectFill"></image>
							<view v-else class="upload-placeholder">
								<view class="upload-circle">
									<text class="plus-icon">+</text>
								</view>
								<text class="upload-text">营业执照</text>
							</view>
						</view>
					</view>
					
					<view class="upload-box" @tap="uploadOther">
						<view class="upload-content">
							<image v-if="formData.otherUrl" class="uploaded-img" :src="formData.otherUrl" mode="aspectFill"></image>
							<view v-else class="upload-placeholder">
								<view class="upload-circle">
									<text class="plus-icon">+</text>
								</view>
								<text class="upload-text">其他证件</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 执照信息卡片 -->
			<view class="card">
				<view class="form-item">
					<text class="form-label">营业执照名称</text>
					<input class="form-input" v-model="formData.licenseName" placeholder="输入营业执照上的名称" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">营业执照编号</text>
					<input class="form-input" v-model="formData.licenseNumber" placeholder="输入组织机构代码" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">证件有效期</text>
					<view class="checkbox-group" @tap="togglePermanent">
						<text class="checkbox-text">是否永久有效</text>
						<view class="checkbox" :class="{ checked: formData.isPermanent }">
							<text v-if="formData.isPermanent" class="check-icon">✓</text>
						</view>
					</view>
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item" v-if="!formData.isPermanent">
					<text class="form-label">失效期</text>
					<input class="form-input" v-model="formData.expireDate" placeholder="填写证件失效期" @tap="selectDate" />
				</view>
				<view class="form-divider" v-if="!formData.isPermanent"></view>
			</view>
			
			<!-- 经营基础信息卡片 -->
			<view class="card">
				<view class="card-title-row">
					<text class="card-title">经营基础信息</text>
				</view>
				
				<view class="form-item">
					<text class="form-label">经营姓名</text>
					<input class="form-input" v-model="formData.ownerName" placeholder="法人代表/经营者姓名" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">身份证号</text>
					<input class="form-input" v-model="formData.idNumber" placeholder="输入有效身份证号码" />
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
						<text class="get-code-btn" @tap="getVerifyCode">获取验证码</text>
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
						<image class="arrow-icon" src="/static/icon/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			
			<view class="bottom-spacer"></view>
		</scroll-view>
		
		<!-- 底部按钮 -->
		<view class="footer">
			<view class="footer-btns">
				<view class="btn-prev" @tap="handlePrev">
					<text class="btn-prev-text">上一步</text>
				</view>
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
			statusBarHeight: 44,
			formData: {
				licenseType: '个体',
				licenseUrl: '',
				otherUrl: '',
				licenseName: '',
				licenseNumber: '',
				isPermanent: false,
				expireDate: '',
				ownerName: '',
				idNumber: '',
				email: '',
				phone: '',
				verifyCode: ''
			}
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		selectLicenseType() {
			uni.showActionSheet({
				itemList: ['个体', '企业'],
				success: (res) => {
					const types = ['个体', '企业']
					this.formData.licenseType = types[res.tapIndex]
				}
			})
		},
		uploadLicense() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.formData.licenseUrl = res.tempFilePaths[0]
				}
			})
		},
		uploadOther() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.formData.otherUrl = res.tempFilePaths[0]
				}
			})
		},
		togglePermanent() {
			this.formData.isPermanent = !this.formData.isPermanent
		},
		selectDate() {
			// 选择日期
		},
		// 验证身份证号格式
		validateIdNumber(idNumber) {
			const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
			return reg.test(idNumber)
		},
		// 验证手机号格式
		validatePhone(phone) {
			const reg = /^1[3-9]\d{9}$/
			return reg.test(phone)
		},
		// 验证邮箱格式
		validateEmail(email) {
			const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
			return reg.test(email)
		},
		getVerifyCode() {
			if (!this.formData.phone) {
				uni.showToast({ title: '请输入手机号', icon: 'none' })
				return
			}
			if (!this.validatePhone(this.formData.phone)) {
				uni.showToast({ title: '手机号格式不正确', icon: 'none' })
				return
			}
			uni.showToast({ title: '验证码已发送', icon: 'success' })
		},
		goFaceVerify() {
			uni.showToast({ title: '人脸验证功能开发中', icon: 'none' })
		},
		handlePrev() {
			uni.navigateBack()
		},
		handleNext() {
			// 营业执照验证
			if (!this.formData.licenseUrl) {
				uni.showToast({ title: '请上传营业执照', icon: 'none' })
				return
			}
			if (!this.formData.licenseName) {
				uni.showToast({ title: '请输入营业执照名称', icon: 'none' })
				return
			}
			if (!this.formData.licenseNumber) {
				uni.showToast({ title: '请输入营业执照号', icon: 'none' })
				return
			}
			// 法人信息验证
			if (!this.formData.ownerName) {
				uni.showToast({ title: '请输入法人姓名', icon: 'none' })
				return
			}
			if (this.formData.ownerName.length < 2) {
				uni.showToast({ title: '法人姓名至少2个字符', icon: 'none' })
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
			// 联系方式验证
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
			// 跳转到合作协议页
			uni.navigateTo({
				url: '/packageSettlement/pages/store-settlement/agreement'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.screen {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-color: #f2f2f2;
}

.header {
	background-color: #ffffff;
	padding-top: 88rpx;
}

.nav-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 32rpx;
	height: 88rpx;
}

.nav-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.back-btn {
	width: 32rpx;
	height: 32rpx;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
}

.nav-title {
	font-family: 'PingFang SC';
	font-weight: 500;
	font-size: 30rpx;
	color: #666666;
}

.nav-right {
	width: 44rpx;
	height: 44rpx;
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

.progress-dot {
	width: 20rpx;
	height: 20rpx;
	border-radius: 50%;
	background-color: #e7e7e7;
	position: relative;
	flex-shrink: 0;
	overflow: visible;
}

.progress-dot.active {
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
	background-color: #ffa07a;
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

.progress-dot.completed {
	background-color: #ffa07a;
}

.progress-line {
	flex: 1;
	height: 2rpx;
	background-color: #e7e7e7;
	align-self: flex-start;
	margin-top: 9rpx;
	min-width: 30rpx;
}

.step-label {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	color: #a6a6a6;
	white-space: nowrap;
}

.step-label.active {
	color: #000000;
	font-weight: 600;
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
	padding: 24rpx;
	margin-bottom: 16rpx;
	box-sizing: border-box;
	width: 100%;
	overflow: hidden;
}

.card-title-row {
	margin-bottom: 32rpx;
}

.card-title {
	font-family: 'PingFang SC';
	font-weight: 600;
	font-size: 28rpx;
	color: #000000;
}

.form-item {
	display: flex;
	align-items: center;
	padding: 20rpx 0;
}

.form-item.clickable {
	justify-content: space-between;
}

.form-label {
	width: 180rpx;
	min-width: 180rpx;
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

.form-right {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.form-value {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #666666;
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

.upload-row {
	display: flex;
	gap: 20rpx;
	flex-wrap: wrap;
}

.upload-box {
	width: 176rpx;
	height: 176rpx;
	background-color: #f5f7fa;
	border-radius: 16rpx;
	border: 2rpx dashed #d9d9d9;
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
	border-radius: 16rpx;
}

.upload-placeholder {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
}

.upload-circle {
	width: 56rpx;
	height: 56rpx;
	border-radius: 50%;
	background-color: #1890ff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.plus-icon {
	font-size: 32rpx;
	color: #ffffff;
	font-weight: 300;
}

.upload-text {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #999999;
}

.checkbox-group {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.checkbox-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #333333;
}

.checkbox {
	width: 32rpx;
	height: 32rpx;
	border-radius: 4rpx;
	border: 2rpx solid #d9d9d9;
	display: flex;
	align-items: center;
	justify-content: center;
}

.checkbox.checked {
	background-color: #333333;
	border-color: #333333;
}

.check-icon {
	font-size: 20rpx;
	color: #ffffff;
}

.input-with-btn {
	flex: 1;
	display: flex;
	align-items: center;
}

.flex-1 {
	flex: 1;
}

.get-code-btn {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #0088ff;
	white-space: nowrap;
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
	padding: 16rpx 20rpx;
	padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.footer-btns {
	display: flex;
	gap: 20rpx;
}

.btn-prev {
	flex: 1;
	height: 84rpx;
	background-color: #ffffff;
	border: 2rpx solid #e7e7e7;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn-prev-text {
	font-family: 'PingFang SC';
	font-weight: 600;
	font-size: 28rpx;
	color: #666666;
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
	font-size: 28rpx;
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
