<template>
	<view class="setting-detail-page">
		<view class="status-bar-space"></view>
		<SettingDetailHeader title="添加手机号" />

		<view class="main-content">
			<view class="settings-card">
				<view class="card-content">
					<view class="form-row">
						<text class="row-label">手机号</text>
						<input 
							class="row-input" 
							v-model="phone" 
							type="number" 
							placeholder="请输入新手机号" 
							maxlength="11"
						/>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">验证码</text>
						<input 
							class="row-input" 
							v-model="code" 
							type="number" 
							placeholder="请输入验证码" 
							maxlength="6"
						/>
						<text 
							class="get-code" 
							:class="{ disabled: codeCountdown>0 }" 
							@tap="handleGetCode"
						>
							{{ codeCountdown>0 ? `重新获取(${codeCountdown}s)` : '获取验证码' }}
						</text>
					</view>
				</view>
			</view>

			<view class="submit-btn-group">
				<button class="confirm-btn" @tap="handleConfirm">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
import SettingDetailHeader from '@/components/setting/SettingDetailHeader.vue'

export default {
	components: { SettingDetailHeader },
	data() {
		return {
			phone: '',
			code: '',
			codeCountdown: 0,
			countdownTimer: null
		}
	},
	methods: {
		handleGetCode() {
			if (this.codeCountdown > 0) return
			if (!/^1\d{10}$/.test(this.phone)) {
				uni.showToast({ title: '请输入有效手机号', icon: 'none' })
				return
			}
			uni.showToast({ title: '验证码已发送', icon: 'success' })
			this.codeCountdown = 60
			this.countdownTimer = setInterval(() => {
				if (this.codeCountdown <= 1) {
					clearInterval(this.countdownTimer)
					this.countdownTimer = null
					this.codeCountdown = 0
				} else {
					this.codeCountdown -= 1
				}
			}, 1000)
		},
		handleConfirm() {
			if (!/^1\d{10}$/.test(this.phone)) {
				uni.showToast({ title: '请输入有效手机号', icon: 'none' })
				return
			}
			if (!/^\d{4,6}$/.test(this.code)) {
				uni.showToast({ title: '请输入正确验证码', icon: 'none' })
				return
			}
			uni.showLoading({ title: '提交中...' })
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({ title: '修改成功', icon: 'success' })
				setTimeout(() => { uni.navigateBack() }, 800)
			}, 800)
		}
	},
	beforeUnmount() {
		if (this.countdownTimer) clearInterval(this.countdownTimer)
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
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: 400;
	color: #1d1d1f;
	font-size: 30rpx;
}

.row-input {
	flex: 1;
	padding: 10rpx 0;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 30rpx;
	color: #1d1d1f;
	border: none;
	background: transparent;
	text-align: left;
}

.row-input::placeholder {
	color: #b9b9b9;
}

.get-code {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #7c5bff;
	font-size: 28rpx;
	flex-shrink: 0;
}

.get-code.disabled {
	color: #c3c3c3;
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
