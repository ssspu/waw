<template>
	<view class="setting-detail-page">
		<view class="main-content">
			<view class="settings-card">
				<view class="card-content">
					<view class="form-row">
						<text class="row-label">持卡人</text>
						<input 
							class="row-input" 
							v-model="formData.cardholder" 
							type="text" 
							placeholder="请输入持卡人姓名" 
							maxlength="20"
						/>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">银行卡卡号</text>
						<input 
							class="row-input" 
							v-model="formData.cardNumber" 
							type="number" 
							placeholder="请输入银行卡卡号" 
							maxlength="19"
						/>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">银行机构</text>
						<input 
							class="row-input" 
							v-model="formData.bankName" 
							type="text" 
							placeholder="请输入银行机构" 
							maxlength="50"
						/>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">值户行地址</text>
						<input 
							class="row-input" 
							v-model="formData.bankAddress" 
							type="text" 
							placeholder="请输入值户行地址" 
							maxlength="100"
						/>
					</view>
				</view>
			</view>

			<view class="submit-btn-group">
				<button class="confirm-btn" @tap="handleConfirm">认证信息</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				cardholder: '',
				cardNumber: '',
				bankName: '',
				bankAddress: ''
			}
		}
	},
	methods: {
		handleConfirm() {
			
			if (!this.formData.cardholder || !this.formData.cardholder.trim()) {
				uni.showToast({ title: '请输入持卡人姓名', icon: 'none' })
				return
			}
			if (!this.formData.cardNumber || !/^\d{16,19}$/.test(this.formData.cardNumber)) {
				uni.showToast({ title: '请输入正确的银行卡号', icon: 'none' })
				return
			}
			if (!this.formData.bankName || !this.formData.bankName.trim()) {
				uni.showToast({ title: '请输入银行机构', icon: 'none' })
				return
			}
			if (!this.formData.bankAddress || !this.formData.bankAddress.trim()) {
				uni.showToast({ title: '请输入值户行地址', icon: 'none' })
				return
			}

			uni.showLoading({ title: '提交中...' })
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({ title: '添加成功', icon: 'success' })
				setTimeout(() => { 
					uni.navigateBack() 
				}, 800)
			}, 800)
		}
	}
}
</script>

<style scoped lang="scss">
.setting-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f6f6f6;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.main-content {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 24rpx;
	gap: 24rpx;
	padding-bottom: 220rpx;
	box-sizing: border-box;
}

.settings-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	box-sizing: border-box;
	margin-top: 12rpx;
}

.card-content {
	padding: 30rpx;
	box-sizing: border-box;
}

.form-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
}

.row-label {
	width: 140rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: 400;
	color: #1d1d1f;
	font-size: 30rpx;
	line-height: 48rpx;
	white-space: nowrap;
}

.row-input {
	flex: 1;
	padding: 0;
	padding-left: 20rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 30rpx;
	line-height: 48rpx;
	color: #1d1d1f;
	border: none;
	background: transparent;
	text-align: left;
	height: 48rpx;
}

.row-input::placeholder {
	color: #b9b9b9;
	font-size: 26rpx;
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #ebebeb;
	margin: 20rpx 0;
}

.submit-btn-group {
	position: fixed;
	left: 24rpx;
	right: 24rpx;
	bottom: 48rpx;
	box-sizing: border-box;
}

.confirm-btn {
	width: 100%;
	padding: 24rpx;
	background-color: #333333;
	color: #ffffff;
	border: none;
	border-radius: 12rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 30rpx;
}
</style>

