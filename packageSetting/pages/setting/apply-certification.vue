<template>
	<view class="setting-detail-page">
		<view class="main-content">
			<view class="settings-card">
				<view class="card-content">
					<view class="form-row">
						<text class="row-label">真实姓名</text>
						<input
							class="row-input"
							v-model="realName"
							type="text"
							placeholder="请输入真实姓名"
							maxlength="20"
						/>
					</view>
					<view class="separator-line"></view>
					<view class="form-row">
						<text class="row-label">身份证号</text>
						<input
							class="row-input"
							v-model="idNumber"
							type="idcard"
							placeholder="请输入身份证号"
							maxlength="18"
						/>
					</view>
				</view>
			</view>

			<view class="submit-btn-group">
				<button class="confirm-btn" @tap="handleSubmit">认证信息</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			realName: '',
			idNumber: ''
		}
	},
	methods: {
		handleSubmit() {
			if (!this.realName.trim()) {
				uni.showToast({ title: '请输入真实姓名', icon: 'none' })
				return
			}
			if (!/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idNumber)) {
				uni.showToast({ title: '请输入正确身份证号', icon: 'none' })
				return
			}
			uni.showLoading({ title: '提交中...' })
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({ title: '认证成功', icon: 'success' })
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
	line-height: 48rpx;
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
	line-height: 48rpx;
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

