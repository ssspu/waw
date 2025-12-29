<template>
	<view class="screen">
		<!-- 头部导航 -->
		<view class="header" >
			<view class="nav-bar">
				<view class="nav-left">
					<view class="back-btn" @tap="handleBack">
						<image class="back-icon" src="https://bioflex.cn/static/back.png" mode="aspectFit"></image>
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
					<view class="progress-dot completed"></view>
					<text class="step-label">执照认证</text>
				</view>
				<view class="progress-line"></view>
				<view class="step-item">
					<view class="progress-dot completed"></view>
					<text class="step-label">合作协议</text>
				</view>
				<view class="progress-line"></view>
				<view class="step-item">
					<view class="progress-dot active">
						<view class="dot-pulse"></view>
						<view class="dot-core"></view>
					</view>
					<text class="step-label active">结算信息</text>
				</view>
			</view>
		</view>
		
		<!-- 主内容区域 -->
		<scroll-view class="main-content" scroll-y>
			<!-- 结算方式卡片 -->
			<view class="card">
				<view class="card-title-row">
					<text class="card-title">结算方式</text>
				</view>
				
				<view class="form-item clickable" @tap="selectSettlementType">
					<text class="form-label">结算方式</text>
					<view class="form-right">
						<text class="form-value">{{ formData.settlementType }}</text>
						<image class="arrow-icon" src="https://bioflex.cn/static/icon/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="form-divider"></view>
			</view>
			
			<!-- 结算信息卡片 -->
			<view class="card">
				<view class="card-title-row">
					<text class="card-title">结算信息</text>
				</view>
				
				<view class="form-item clickable" @tap="selectAccountType">
					<text class="form-label">用户类型</text>
					<text class="form-value">{{ formData.accountType }}</text>
					<image class="arrow-icon" src="https://bioflex.cn/static/icon/right.png" mode="aspectFit"></image>
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">用户名称</text>
					<input class="form-input" v-model="formData.accountName" placeholder="请输入对公银行名称" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item clickable" @tap="selectBank">
					<text class="form-label">用户银行</text>
					<text class="form-value" :class="{ placeholder: !formData.bankName }">
						{{ formData.bankName || '选择用户银行' }}
					</text>
					<image class="arrow-icon" src="https://bioflex.cn/static/icon/right.png" mode="aspectFit"></image>
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">用户银行全称</text>
					<input class="form-input" v-model="formData.branchName" placeholder="请输入用户支行" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">用户银行省市</text>
					<input class="form-input" v-model="formData.bankCity" placeholder="请输入用户城市编码" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">用户银行帐号</text>
					<input class="form-input" v-model="formData.accountNumber" placeholder="请输入你的银行卡号" />
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
				<view class="btn-next" @tap="handleSubmit">
					<text class="btn-text">提交审核资料</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
						formData: {
				settlementType: '银行卡',
				accountType: '对公帐户',
				accountName: '',
				bankName: '',
				branchName: '',
				bankCity: '',
				accountNumber: ''
			}
		}
	},
	onLoad() {
		},
	methods: {
				selectSettlementType() {
			uni.showActionSheet({
				itemList: ['银行卡', '支付宝', '微信'],
				success: (res) => {
					const types = ['银行卡', '支付宝', '微信']
					this.formData.settlementType = types[res.tapIndex]
				}
			})
		},
		selectAccountType() {
			uni.showActionSheet({
				itemList: ['对公帐户', '个人帐户'],
				success: (res) => {
					const types = ['对公帐户', '个人帐户']
					this.formData.accountType = types[res.tapIndex]
				}
			})
		},
		selectBank() {
			uni.showActionSheet({
				itemList: ['中国银行', '工商银行', '建设银行', '农业银行', '招商银行'],
				success: (res) => {
					const banks = ['中国银行', '工商银行', '建设银行', '农业银行', '招商银行']
					this.formData.bankName = banks[res.tapIndex]
				}
			})
		},
		selectBranch() {
			if (!this.formData.bankName) {
				uni.showToast({ title: '请先选择用户银行', icon: 'none' })
				return
			}
			uni.showToast({ title: '选择支行功能开发中', icon: 'none' })
		},
		handlePrev() {
			uni.navigateBack()
		},
		
		validateBankCard(cardNumber) {
			const reg = /^\d{16,19}$/
			return reg.test(cardNumber)
		},
		handleSubmit() {
			
			if (!this.formData.accountName) {
				uni.showToast({ title: '请输入用户名称', icon: 'none' })
				return
			}
			if (this.formData.accountName.length < 2) {
				uni.showToast({ title: '用户名称至少2个字符', icon: 'none' })
				return
			}
			if (!this.formData.bankName) {
				uni.showToast({ title: '请选择用户银行', icon: 'none' })
				return
			}
			if (!this.formData.branchName) {
				uni.showToast({ title: '请输入用户支行', icon: 'none' })
				return
			}
			if (!this.formData.accountNumber) {
				uni.showToast({ title: '请输入银行卡号', icon: 'none' })
				return
			}
			if (!this.validateBankCard(this.formData.accountNumber)) {
				uni.showToast({ title: '银行卡号格式不正确', icon: 'none' })
				return
			}
			
			
			uni.showLoading({ title: '提交中...' })
			setTimeout(() => {
				uni.hideLoading()
				uni.redirectTo({
					url: '/packageSettlement/pages/settlement-success/index?type=store'
				})
			}, 1500)
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
