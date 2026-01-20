<template>
	<view class="screen">
		<!-- 头部导航 -->
		<view class="header" >	
			
			<!-- 步骤导航 -->
			<view class="steps-container">
				<view class="step-item">
					<view class="progress-dot active">
						<view class="dot-pulse"></view>
						<view class="dot-core"></view>
					</view>
					<text class="step-label active">门店认证</text>
				</view>
				<view class="progress-line"></view>
				<view class="step-item">
					<view class="progress-dot"></view>
					<text class="step-label">执照认证</text>
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
			<!-- 经营品类卡片 -->
			<view class="card">
				<view class="form-item clickable" @tap="selectCategory">
					<text class="form-label">经营品类</text>
					<view class="form-right">
						<text class="form-value" :class="{ placeholder: !formData.category }">
							{{ formData.category || '选择提供的服务项目' }}
						</text>
						<image class="arrow-icon" src="https://bioflex.cn/static/icon/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			
			<!-- 经营信息卡片 -->
			<view class="card">
				<view class="card-title-row">
					<text class="card-title">经营信息</text>
				</view>
				
				<view class="form-item">
					<text class="form-label">店铺名称</text>
					<input class="form-input" v-model="formData.storeName" placeholder="与门脸牌匾一致" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">经营地址</text>
					<input class="form-input" v-model="formData.address" placeholder="请输入经营地址" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">门牌号码</text>
					<input class="form-input" v-model="formData.doorNumber" placeholder="详细地址" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">省市编号</text>
					<input class="form-input" v-model="formData.cityCode" placeholder="请输入所在城市编号" />
				</view>
				<view class="form-divider"></view>
				
				<view class="form-item">
					<text class="form-label">门店电话</text>
					<input class="form-input" v-model="formData.phone" placeholder="门店的固话或移动电话" />
				</view>
				<view class="form-divider"></view>
			</view>
			
			<!-- 门店图片卡片 -->
			<view class="card">
				<view class="card-header">
					<text class="card-title">门店图片</text>
					<text class="card-desc">需拍出完整门匾、内部环境、前台</text>
				</view>
				
				<view class="upload-row">
					<view class="upload-box" @tap="uploadImage('facade')">
						<view class="upload-content">
							<image v-if="formData.facadeUrl" class="uploaded-img" :src="formData.facadeUrl" mode="aspectFill"></image>
							<view v-else class="upload-placeholder">
								<view class="upload-circle">
									<text class="plus-icon">+</text>
								</view>
								<text class="upload-text">门面照</text>
							</view>
						</view>
					</view>
					
					<view class="upload-box" @tap="uploadImage('interior')">
						<view class="upload-content">
							<image v-if="formData.interiorUrl" class="uploaded-img" :src="formData.interiorUrl" mode="aspectFill"></image>
							<view v-else class="upload-placeholder">
								<view class="upload-circle">
									<text class="plus-icon">+</text>
								</view>
								<text class="upload-text">内景照</text>
							</view>
						</view>
					</view>
					
					<view class="upload-box" @tap="uploadImage('counter')">
						<view class="upload-content">
							<image v-if="formData.counterUrl" class="uploaded-img" :src="formData.counterUrl" mode="aspectFill"></image>
							<view v-else class="upload-placeholder">
								<view class="upload-circle">
									<text class="plus-icon">+</text>
								</view>
								<text class="upload-text">收银台</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 补充信息卡片 -->
			<view class="card">
				<view class="card-title-row">
					<text class="card-title">补充信息</text>
				</view>
				
				<view class="upload-row">
					<view class="upload-box" @tap="uploadImage('extra')">
						<view class="upload-content">
							<image v-if="formData.extraUrl" class="uploaded-img" :src="formData.extraUrl" mode="aspectFill"></image>
							<view v-else class="upload-placeholder">
								<view class="upload-circle">
									<text class="plus-icon">+</text>
								</view>
								<text class="upload-text">更多</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="bottom-spacer"></view>
		</scroll-view>
		
		<!-- 底部按钮 -->
		<view class="footer">
			<view class="footer-btns">
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
						formData: {
				category: '',
				storeName: '',
				address: '',
				doorNumber: '',
				cityCode: '',
				phone: '',
				facadeUrl: '',
				interiorUrl: '',
				counterUrl: '',
				extraUrl: ''
			}
		}
	},
	onLoad() {
		},
	methods: {
				selectCategory() {
			
			uni.showActionSheet({
				itemList: ['美发', '美甲', '美容', '养生'],
				success: (res) => {
					const categories = ['美发', '美甲', '美容', '养生']
					this.formData.category = categories[res.tapIndex]
				}
			})
		},
		uploadImage(type) {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					const tempFilePath = res.tempFilePaths[0]
					switch(type) {
						case 'facade':
							this.formData.facadeUrl = tempFilePath
							break
						case 'interior':
							this.formData.interiorUrl = tempFilePath
							break
						case 'counter':
							this.formData.counterUrl = tempFilePath
							break
						case 'extra':
							this.formData.extraUrl = tempFilePath
							break
					}
				}
			})
		},
		
		validatePhone(phone) {
			const reg = /^1[3-9]\d{9}$/
			return reg.test(phone)
		},
		handleNext() {
			
			if (!this.formData.category) {
				uni.showToast({ title: '请选择经营品类', icon: 'none' })
				return
			}
			if (!this.formData.storeName) {
				uni.showToast({ title: '请输入店铺名称', icon: 'none' })
				return
			}
			if (this.formData.storeName.length < 2) {
				uni.showToast({ title: '店铺名称至少2个字符', icon: 'none' })
				return
			}
			if (!this.formData.address) {
				uni.showToast({ title: '请输入经营地址', icon: 'none' })
				return
			}
			if (!this.formData.doorNumber) {
				uni.showToast({ title: '请输入门牌号码', icon: 'none' })
				return
			}
			if (!this.formData.phone) {
				uni.showToast({ title: '请输入联系电话', icon: 'none' })
				return
			}
			if (!this.validatePhone(this.formData.phone)) {
				uni.showToast({ title: '手机号格式不正确', icon: 'none' })
				return
			}
			if (!this.formData.facadeUrl) {
				uni.showToast({ title: '请上传门头照片', icon: 'none' })
				return
			}
			
			uni.navigateTo({
				url: '/packageSettlement/pages/store-settlement/license'
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

.card-header {
	display: flex;
	align-items: center;
	gap: 10rpx;
	margin-bottom: 16rpx;
}

.card-desc {
	font-family: 'PingFang SC';
	font-size: 24rpx;
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
	width: 140rpx;
	min-width: 140rpx;
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

.form-value.placeholder {
	color: #999999;
}

.arrow-icon {
	width: 28rpx;
	height: 28rpx;
}

.upload-row {
	display: flex;
	gap: 16rpx;
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
