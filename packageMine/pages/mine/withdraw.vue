<template>
	<view class="withdraw-page">
		<!-- 提现方式 -->
		<view class="withdraw-method-card">
			<view class="method-item active">
				<view class="method-left">
					<image class="method-icon" src="/static/icon/tixian.png" mode="aspectFit"></image>
					<text class="method-name">微信零钱</text>
				</view>
				<view class="method-check">
					<image class="check-icon" src="https://bioflex.cn/static/icon/check-circle.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>

		<!-- 提现金额 -->
		<view class="amount-card">
			<text class="card-label">提现金额</text>
			<view class="amount-input-wrapper">
				<text class="currency-symbol">¥</text>
				<input
					class="amount-input"
					type="digit"
					v-model="withdrawAmount"
					placeholder="请输入提现金额"
					placeholder-class="amount-placeholder"
				/>
			</view>
			<view class="balance-info">
				<text class="balance-label">可提现余额：¥{{ availableBalance.toFixed(2) }}</text>
				<text class="withdraw-all" @tap="handleWithdrawAll">全部提现</text>
			</view>
		</view>

		<!-- 提现说明 -->
		<view class="tips-card">
			<text class="tips-title">提现说明</text>
			<view class="tips-list">
				<text class="tips-item">1. 提现金额将转入您的微信零钱账户</text>
				<text class="tips-item">2. 单笔提现最低1元，最高5000元</text>
				<text class="tips-item">3. 提现申请后，预计1-3个工作日到账</text>
				<text class="tips-item">4. 如有疑问，请联系客服</text>
			</view>
		</view>

		<!-- 提现按钮 -->
		<view class="submit-btn-wrapper">
			<view class="submit-btn" :class="{ disabled: !canSubmit }" @tap="handleSubmit">
				<text class="submit-text">确认提现</text>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'

export default {
	data() {
		return {
			withdrawAmount: '',
			availableBalance: 0,
			loading: false
		}
	},
	computed: {
		canSubmit() {
			const amount = parseFloat(this.withdrawAmount)
			return amount >= 1 && amount <= this.availableBalance && !this.loading
		}
	},
	onLoad() {
		this.fetchBalance()
	},
	methods: {
		async fetchBalance() {
			try {
				const res = await api.user.getBalance()
				if (res.code === 0) {
					this.availableBalance = res.data.balance || 0
				}
			} catch (err) {
				console.error('获取余额失败:', err)
			}
		},
		handleWithdrawAll() {
			this.withdrawAmount = this.availableBalance.toFixed(2)
		},
		async handleSubmit() {
			if (!this.canSubmit) return

			const amount = parseFloat(this.withdrawAmount)
			if (amount < 1) {
				uni.showToast({ title: '最低提现1元', icon: 'none' })
				return
			}
			if (amount > this.availableBalance) {
				uni.showToast({ title: '余额不足', icon: 'none' })
				return
			}
			if (amount > 5000) {
				uni.showToast({ title: '单笔最高5000元', icon: 'none' })
				return
			}

			this.loading = true
			try {
				const res = await api.user.withdrawToWechat({ amount })
				if (res.code === 0) {
					uni.showToast({ title: '提现申请成功', icon: 'success' })
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				} else {
					uni.showToast({ title: res.message || '提现失败', icon: 'none' })
				}
			} catch (err) {
				console.error('提现失败:', err)
				uni.showToast({ title: '提现失败，请稍后重试', icon: 'none' })
			} finally {
				this.loading = false
			}
		}
	}
}
</script>

<style scoped lang="scss">
.withdraw-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	padding: 24rpx;
	box-sizing: border-box;
}

.withdraw-method-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 24rpx;
}

.method-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.method-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.method-icon {
	width: 48rpx;
	height: 48rpx;
}

.method-name {
	font-family: 'PingFang SC';
	font-size: 30rpx;
	color: #333333;
}

.method-check {
	width: 40rpx;
	height: 40rpx;
}

.check-icon {
	width: 40rpx;
	height: 40rpx;
}

.amount-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 24rpx;
}

.card-label {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	color: #999999;
	margin-bottom: 20rpx;
	display: block;
}

.amount-input-wrapper {
	display: flex;
	align-items: center;
	border-bottom: 1rpx solid #eeeeee;
	padding-bottom: 20rpx;
	margin-bottom: 20rpx;
}

.currency-symbol {
	font-family: 'PingFang SC';
	font-size: 48rpx;
	font-weight: 600;
	color: #333333;
	margin-right: 10rpx;
}

.amount-input {
	flex: 1;
	font-family: 'PingFang SC';
	font-size: 48rpx;
	font-weight: 600;
	color: #333333;
}

.amount-placeholder {
	font-size: 32rpx;
	font-weight: normal;
	color: #cccccc;
}

.balance-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.balance-label {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #999999;
}

.withdraw-all {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #07c160;
}

.tips-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 24rpx;
}

.tips-title {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
	margin-bottom: 20rpx;
	display: block;
}

.tips-list {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.tips-item {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #999999;
	line-height: 1.6;
}

.submit-btn-wrapper {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 24rpx;
	padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
	background-color: #f2f2f2;
}

.submit-btn {
	width: 100%;
	height: 88rpx;
	background-color: #07c160;
	border-radius: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;

	&.disabled {
		background-color: #cccccc;
	}
}

.submit-text {
	font-family: 'PingFang SC';
	font-size: 32rpx;
	font-weight: 500;
	color: #ffffff;
}
</style>
