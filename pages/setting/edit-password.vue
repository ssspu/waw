<template>
	<view class="setting-detail-page">
		<view class="status-bar-space"></view>
		<SettingDetailHeader title="修改登录密码" />

		<view class="main-content">
			<view class="settings-card">
				<view class="card-content">
					<view class="form-row">
						<text class="row-label">旧密码</text>
						<input
							class="row-input"
							v-model="oldPassword"
							type="password"
							placeholder="请输入旧密码"
							maxlength="20"
						/>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">新密码</text>
						<input
							class="row-input"
							v-model="newPassword"
							type="password"
							placeholder="请输入新密码"
							maxlength="20"
						/>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">再次确认</text>
						<input
							class="row-input"
							v-model="confirmPassword"
							type="password"
							placeholder="请再次输入密码"
							maxlength="20"
						/>
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
			oldPassword: '',
			newPassword: '',
			confirmPassword: ''
		}
	},
	methods: {
		handleConfirm() {
			if (!this.oldPassword || this.oldPassword.length < 6) {
				uni.showToast({ title: '请输入正确旧密码', icon: 'none' })
				return
			}
			if (!this.newPassword || this.newPassword.length < 6) {
				uni.showToast({ title: '请输入至少6位新密码', icon: 'none' })
				return
			}
			if (this.newPassword !== this.confirmPassword) {
				uni.showToast({ title: '两次密码输入不一致', icon: 'none' })
				return
			}

			uni.showLoading({ title: '提交中...' })
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({ title: '修改成功', icon: 'success' })
				setTimeout(() => { uni.navigateBack() }, 800)
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

