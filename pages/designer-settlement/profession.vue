<template>
	<view class="screen">
		<!-- 头部导航 -->
		<view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="nav-bar">
				<view class="nav-left">
					<view class="back-btn" @tap="handleBack">
						<image class="back-icon" src="/static/icon/arrow-left.png" mode="aspectFit"></image>
					</view>
					<text class="nav-title">设计师入驻</text>
				</view>
				<view class="nav-right"></view>
			</view>
			
			<!-- 步骤导航 -->
			<view class="steps-container">
				<view class="step-item">
					<view class="progress-dot completed"></view>
					<text class="step-label">身份认证</text>
				</view>
				<view class="progress-line"></view>
				<view class="step-item">
					<view class="progress-dot active">
						<view class="dot-pulse"></view>
						<view class="dot-core"></view>
					</view>
					<text class="step-label active">职业认证</text>
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
			<!-- 所属行业卡片 -->
			<view class="card">
				<view class="card-title-row">
					<text class="card-title">所属行业</text>
				</view>
				
				<view class="form-item clickable" @tap="selectIndustry">
					<text class="form-label">所属行业</text>
					<view class="form-right">
						<text class="form-value" :class="{ placeholder: !formData.industry }">
							{{ formData.industry || '去选择' }}
						</text>
						<image class="arrow-icon" src="/static/icon/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item clickable" @tap="selectLevel">
					<text class="form-label">专业登记</text>
					<view class="form-right">
						<text class="form-value" :class="{ placeholder: !formData.level }">
							{{ formData.level || '去选择' }}
						</text>
						<image class="arrow-icon" src="/static/icon/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="form-divider"></view>
			</view>
			
			<!-- 职业资格证卡片 -->
			<view class="card">
				<view class="card-header">
					<text class="card-title">职业资格证</text>
				</view>
				<text class="card-desc">信息仅用于职业和等级验证，提供你最高级别的职业等级证书</text>
				
				<view class="upload-row">
					<view class="upload-box" @tap="uploadCert1">
						<view class="upload-content">
							<image v-if="formData.cert1Url" class="uploaded-img" :src="formData.cert1Url" mode="aspectFill"></image>
							<view v-else class="upload-placeholder">
								<view class="upload-circle">
									<text class="plus-icon">+</text>
								</view>
								<text class="upload-text">上传国家劳动技能证</text>
							</view>
						</view>
					</view>
					
					<view class="upload-box" @tap="uploadCert2">
						<view class="upload-content">
							<image v-if="formData.cert2Url" class="uploaded-img" :src="formData.cert2Url" mode="aspectFill"></image>
							<view v-else class="upload-placeholder">
								<view class="upload-circle">
									<text class="plus-icon">+</text>
								</view>
								<text class="upload-text">上传专业毕业证书</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 证书信息卡片 -->
			<view class="card">
				<view class="card-title-row">
					<text class="card-title">证书信息</text>
				</view>
				
				<view class="form-item">
					<text class="form-label">证件姓名</text>
					<input class="form-input" v-model="formData.certName" placeholder="请输入证件人姓名" />
				</view>
				<view class="form-divider"></view>
				
				<picker mode="date" :value="formData.certDate" :end="currentDate" @change="onCertDateChange">
					<view class="form-item clickable">
						<text class="form-label">取证时间</text>
						<text class="form-value" :class="{ placeholder: !formData.certDate }">
							{{ formData.certDate || '请选择取证时间' }}
						</text>
						<image class="arrow-icon" src="/static/icon/right.png" mode="aspectFit"></image>
					</view>
				</picker>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">证书编号</text>
					<input class="form-input" v-model="formData.certNumber" placeholder="请输入证书编号" />
				</view>
				<view class="form-divider"></view>
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
			steps: [
				{ label: '身份认证', active: false },
				{ label: '职业认证', active: true },
				{ label: '合作协议', active: false },
				{ label: '结算信息', active: false }
			],
			formData: {
				industry: '美发',
				level: '',
				cert1Url: '',
				cert2Url: '',
				certName: '',
				certDate: '',
				certNumber: ''
			}
		}
	},
	computed: {
		currentDate() {
			const date = new Date()
			const year = date.getFullYear()
			const month = String(date.getMonth() + 1).padStart(2, '0')
			const day = String(date.getDate()).padStart(2, '0')
			return `${year}-${month}-${day}`
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	methods: {
		onCertDateChange(e) {
			this.formData.certDate = e.detail.value
		},
		handleBack() {
			uni.navigateBack()
		},
		selectIndustry() {
			uni.showActionSheet({
				itemList: ['美发', '美容', '美甲', '纹绣'],
				success: (res) => {
					const industries = ['美发', '美容', '美甲', '纹绣']
					this.formData.industry = industries[res.tapIndex]
				}
			})
		},
		selectLevel() {
			uni.showActionSheet({
				itemList: ['初级', '中级', '高级', '技师', '高级技师'],
				success: (res) => {
					const levels = ['初级', '中级', '高级', '技师', '高级技师']
					this.formData.level = levels[res.tapIndex]
				}
			})
		},
		uploadCert1() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					this.formData.cert1Url = res.tempFilePaths[0]
				}
			})
		},
		uploadCert2() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					this.formData.cert2Url = res.tempFilePaths[0]
				}
			})
		},
		handlePrev() {
			uni.navigateBack()
		},
		handleNext() {
			// 表单验证
			if (!this.formData.level) {
				uni.showToast({ title: '请选择职业等级', icon: 'none' })
				return
			}
			if (!this.formData.cert1Url) {
				uni.showToast({ title: '请上传职业资格证书', icon: 'none' })
				return
			}
			if (!this.formData.certName) {
				uni.showToast({ title: '请输入证书名称', icon: 'none' })
				return
			}
			if (!this.formData.certNumber) {
				uni.showToast({ title: '请输入证书编号', icon: 'none' })
				return
			}
			uni.navigateTo({
				url: '/packageSettlement/designer-settlement/agreement'
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
	margin-bottom: 8rpx;
}

.card-title {
	font-family: 'PingFang SC';
	font-weight: 600;
	font-size: 28rpx;
	color: #000000;
}

.card-title-row {
	margin-bottom: 32rpx;
}

.card-desc {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #999999;
	margin-bottom: 16rpx;
}

.upload-row {
	display: flex;
	justify-content: space-between;
	gap: 20rpx;
	margin-top: 16rpx;
}

.upload-box {
	flex: 1;
	height: 180rpx;
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
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background-color: #1890ff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.plus-icon {
	font-size: 36rpx;
	color: #ffffff;
	font-weight: 300;
}

.upload-text {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #999999;
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

.form-right {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.form-value {
	flex: 1;
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #666666;
}

.form-value.placeholder {
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
	font-size: 24rpx;
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
