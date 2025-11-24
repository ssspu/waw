<template>
	<view class="setting-detail-page">
		<SettingDetailHeader title="反馈意见" />
		
		<view class="main-content">
			<!-- 反馈表单卡片 -->
			<view class="feedback-card">
				<view class="card-content">
					<!-- 反馈类型 -->
					<view class="form-group">
						<text class="form-label">反馈类型</text>
						<view class="feedback-type-selector">
							<view 
								v-for="(type, index) in feedbackTypes" 
								:key="index"
								class="type-option"
								:class="{ active: selectedType === type }"
								@tap="selectedType = type"
							>
								<text>{{ type }}</text>
							</view>
						</view>
					</view>

					<!-- 反馈内容 -->
					<view class="form-group">
						<text class="form-label">反馈内容<text class="required">*</text></text>
						<textarea 
							v-model="feedbackContent"
							class="feedback-textarea"
							placeholder="请输入您的反馈意见（最多500字）"
							maxlength="500"
						></textarea>
						<view class="char-count">
							{{ feedbackContent.length }}/500
						</view>
					</view>

					<!-- 上传图片 -->
					<view class="form-group">
						<text class="form-label">上传图片（可选）</text>
						<view class="image-uploader">
							<view 
								v-for="(image, index) in uploadedImages" 
								:key="index"
								class="image-item"
							>
								<image :src="image" class="uploaded-image"></image>
								<view 
									class="remove-icon"
									@tap="removeImage(index)"
								>
									×
								</view>
							</view>
							
							<view 
								v-if="uploadedImages.length < 3"
								class="add-image-btn"
								@tap="handleAddImage"
							>
								<text class="add-icon">+</text>
								<text class="add-text">添加图片</text>
							</view>
						</view>
					</view>

					<!-- 联系方式 -->
					<view class="form-group">
						<text class="form-label">联系方式（可选）</text>
						<input 
							v-model="contactInfo"
							class="form-input"
							type="text"
							placeholder="邮箱或手机号"
						>
					</view>
				</view>
			</view>

			<!-- 提交按钮 -->
			<view class="submit-btn-group">
				<button class="submit-btn" @tap="handleSubmitFeedback">提交反馈</button>
			</view>
		</view>
	</view>
</template>

<script>
import SettingDetailHeader from '@/components/setting/SettingDetailHeader.vue'

export default {
	components: {
		SettingDetailHeader
	},
	data() {
		return {
			feedbackTypes: ['功能建议', '问题报告', '体验反馈', '其他'],
			selectedType: '功能建议',
			feedbackContent: '',
			uploadedImages: [],
			contactInfo: ''
		}
	},
	methods: {
		handleAddImage() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					if (this.uploadedImages.length < 3) {
						this.uploadedImages.push(res.tempFilePaths[0])
					}
				}
			})
		},
		removeImage(index) {
			this.uploadedImages.splice(index, 1)
		},
		handleSubmitFeedback() {
			if (!this.feedbackContent.trim()) {
				uni.showToast({
					title: '请输入反馈内容',
					icon: 'none'
				})
				return
			}

			uni.showLoading({
				title: '提交中...'
			})

			// 模拟提交
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: '感谢您的反馈',
					icon: 'success'
				})

				// 重置表单
				this.feedbackContent = ''
				this.uploadedImages = []
				this.contactInfo = ''
				this.selectedType = '功能建议'

				// 返回上一页
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}, 1000)
		}
	}
}
</script>

<style scoped lang="scss">
.setting-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
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
	padding: 12rpx;
	gap: 12rpx;
	padding-bottom: 160rpx;
	box-sizing: border-box;
}

.feedback-card {
	width: 100%;
	max-width: 726rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
	margin: 0 auto;
}

.card-content {
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}

.form-group {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.form-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #000000;
	font-size: 28rpx;
}

.required {
	color: #e74c3c;
	margin-left: 4rpx;
}

.feedback-type-selector {
	display: flex;
	gap: 12rpx;
	flex-wrap: wrap;
}

.type-option {
	padding: 12rpx 20rpx;
	background-color: #f5f5f5;
	border-radius: 6rpx;
	border: 2rpx solid transparent;
	cursor: pointer;
	transition: all 0.3s;
}

.type-option.active {
	background-color: #927eff;
	border-color: #927eff;
}

.type-option text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #666666;
}

.type-option.active text {
	color: #ffffff;
}

.feedback-textarea {
	width: 100%;
	height: 180rpx;
	padding: 16rpx;
	border: 2rpx solid #e5e5e5;
	border-radius: 6rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #000000;
	box-sizing: border-box;
	resize: none;
}

.feedback-textarea::placeholder {
	color: #a6a6a6;
}

.char-count {
	text-align: right;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #a6a6a6;
}

.image-uploader {
	display: flex;
	gap: 12rpx;
	flex-wrap: wrap;
}

.image-item {
	position: relative;
	width: 120rpx;
	height: 120rpx;
}

.uploaded-image {
	width: 100%;
	height: 100%;
	border-radius: 6rpx;
	object-fit: cover;
}

.remove-icon {
	position: absolute;
	top: -8rpx;
	right: -8rpx;
	width: 36rpx;
	height: 36rpx;
	background-color: #000000;
	color: #ffffff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	cursor: pointer;
	line-height: 1;
}

.add-image-btn {
	width: 120rpx;
	height: 120rpx;
	border: 2rpx dashed #e5e5e5;
	border-radius: 6rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	cursor: pointer;
}

.add-icon {
	font-size: 40rpx;
	color: #a6a6a6;
	line-height: 1;
}

.add-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	color: #a6a6a6;
}

.form-input {
	padding: 16rpx;
	border: 2rpx solid #e5e5e5;
	border-radius: 6rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #000000;
	box-sizing: border-box;
	width: 100%;
}

.form-input::placeholder {
	color: #a6a6a6;
}

.submit-btn-group {
	width: 100%;
	max-width: 726rpx;
	margin: 0 auto;
	padding: 0 12rpx;
	box-sizing: border-box;
}

.submit-btn {
	width: 100%;
	padding: 18rpx;
	background-color: #927eff;
	color: #ffffff;
	border: none;
	border-radius: 8rpx;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	font-size: 28rpx;
	cursor: pointer;
}
</style>

