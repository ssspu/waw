<template>
	<view class="setting-detail-page">
		<view class="main-content">
			<view class="feedback-section">
				<text class="section-title">体验问题</text>
				<view class="problem-grid">
					<view
						v-for="(type, index) in problemTypes"
						:key="index"
						class="problem-btn"
						:class="{ active: selectedProblem === type }"
						@tap="selectedProblem = type"
					>
						{{ type }}
					</view>
				</view>

				<view class="textarea-wrapper">
					<textarea
						class="feedback-textarea"
						v-model="feedbackContent"
						placeholder="请写下你的反馈和建议，非常感谢"
						maxlength="500"
					></textarea>
				</view>
			</view>

			<view class="submit-btn-group">
				<button class="submit-btn" @tap="handleSubmitFeedback">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			problemTypes: [
				'体验问题',
				'订单问题',
				'交易问题',
				'支付问题',
				'卖家问题',
				'活动问题',
				'功能建议',
				'其他'
			],
			selectedProblem: '体验问题',
			feedbackContent: ''
		}
	},
	methods: {
		handleSubmitFeedback() {
			if (!this.feedbackContent.trim()) {
				uni.showToast({ title: '请输入反馈内容', icon: 'none' })
				return
			}
			uni.showLoading({ title: '提交中...' })
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({ title: '已提交', icon: 'success' })
				this.feedbackContent = ''
				this.selectedProblem = '体验问题'
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

.feedback-section {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.section-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 34rpx;
	color: #1d1d1f;
	font-weight: 600;
}

.problem-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16rpx;
}

.problem-btn {
	padding: 26rpx 0;
	text-align: center;
	border-radius: 8rpx;
	background-color: #f5f5f5;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #666666;
}

.problem-btn.active {
	background-color: #2f2f2f;
	color: #ffffff;
}

.textarea-wrapper {
	border: 2rpx solid #e5e5e5;
	border-radius: 16rpx;
	padding: 12rpx;
	box-sizing: border-box;
}

.feedback-textarea {
	width: 100%;
	height: 240rpx;
	border: none;
	outline: none;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #1d1d1f;
	background-color: transparent;
}

.feedback-textarea::placeholder {
	color: #b9b9b9;
}

.submit-btn-group {
	width: 100%;
	margin-top: auto;
	padding: 0 12rpx;
	box-sizing: border-box;
}

.submit-btn {
	width: 100%;
	padding: 24rpx;
	background-color: #2d2d2d;
	color: #ffffff;
	border: none;
	border-radius: 12rpx;
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 30rpx;
}
</style>

