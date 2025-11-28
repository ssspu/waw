<template>
	<view class="screen">
		<!-- 头部导航 -->
		<view class="header">
			<view class="nav-bar">
				<view class="nav-left">
					<view class="back-btn" @tap="handleBack">
						<image class="back-icon" src="/static/icon/arrow-left.png" mode="aspectFit"></image>
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
					<view class="progress-dot active">
						<view class="dot-pulse"></view>
						<view class="dot-core"></view>
					</view>
					<text class="step-label active">合作协议</text>
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
			<!-- 协议卡片 -->
			<view class="card">
				<view class="card-header">
					<text class="card-title">入驻平台协议</text>
				</view>
				<text class="card-desc">请认真阅读本平台入驻协议</text>
				
				<!-- 协议内容区域 -->
				<view class="agreement-content">
					<scroll-view class="agreement-scroll" scroll-y>
						<text class="agreement-text">
							{{ agreementText }}
						</text>
					</scroll-view>
				</view>
				
				<!-- 同意协议 -->
				<view class="agreement-check" @tap="toggleAgree">
					<view class="checkbox" :class="{ checked: isAgreed }">
						<text v-if="isAgreed" class="check-icon">✓</text>
					</view>
					<view class="agreement-label">
						<text class="label-text">我已阅读并同意</text>
						<text class="label-link" @tap.stop="viewAgreement">《**入驻申请说明》</text>
					</view>
				</view>
			</view>
			
			<view class="bottom-spacer"></view>
		</scroll-view>
		
		<!-- 底部按钮 -->
		<view class="footer">
			<view class="footer-btns">
				<view class="btn-prev" @tap="handlePrev">
					<text class="btn-prev-text">上一步</text>
				</view>
				<view class="btn-next" :class="{ disabled: !isAgreed }" @tap="handleNext">
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
			isAgreed: false,
			agreementText: `一、总则

1.1 本协议是用户（以下简称"您"）与本平台之间关于入驻本平台成为商家所订立的协议。

1.2 您在申请入驻流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。

1.3 当您按照入驻流程提示填写信息、阅读并同意本协议且完成全部入驻流程后，即表示您已充分阅读、理解并接受本协议的全部内容。

二、入驻条件

2.1 您应当是具有完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。

2.2 您应当具备经营相关商品或服务的资质和能力。

2.3 您提交的入驻资料应当真实、准确、完整，如有变更应及时更新。

三、商家权利与义务

3.1 商家有权在平台上发布商品或服务信息，开展经营活动。

3.2 商家应当遵守国家法律法规，不得从事违法违规经营活动。

3.3 商家应当保证所售商品或提供的服务质量，对消费者负责。

3.4 商家应当按照平台规则参与平台活动，维护平台秩序。

四、平台权利与义务

4.1 平台有权对商家入驻申请进行审核，有权拒绝不符合条件的申请。

4.2 平台有权对商家经营行为进行监督管理，对违规行为进行处理。

4.3 平台应当为商家提供必要的技术支持和服务。

五、费用与结算

5.1 商家应当按照平台规定缴纳相关费用。

5.2 平台将按照约定的结算周期和方式与商家进行结算。

六、协议终止

6.1 商家可以申请退出平台，但应当完成未完成的订单和售后服务。

6.2 平台有权在商家严重违规时终止本协议。

七、其他

7.1 本协议的解释、效力及纠纷解决，适用中华人民共和国法律。

7.2 本协议未尽事宜，按照平台规则执行。`
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		toggleAgree() {
			this.isAgreed = !this.isAgreed
		},
		viewAgreement() {
			uni.showToast({ title: '查看协议详情', icon: 'none' })
		},
		handlePrev() {
			uni.navigateBack()
		},
		handleNext() {
			if (!this.isAgreed) {
				uni.showToast({ title: '请先同意入驻协议', icon: 'none' })
				return
			}
			// 跳转到结算信息页
			uni.navigateTo({
				url: '/pages/store-settlement/settlement'
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

.card-header {
	margin-bottom: 8rpx;
}

.card-title {
	font-family: 'PingFang SC';
	font-weight: 600;
	font-size: 28rpx;
	color: #000000;
}

.card-desc {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #999999;
	margin-bottom: 24rpx;
}

.agreement-content {
	background-color: #f8f8f8;
	border-radius: 8rpx;
	height: 700rpx;
	margin-bottom: 24rpx;
	overflow: hidden;
}

.agreement-scroll {
	height: 100%;
	padding: 24rpx;
	box-sizing: border-box;
}

.agreement-text {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	color: #666666;
	line-height: 1.8;
	white-space: pre-wrap;
}

.agreement-check {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.checkbox {
	width: 32rpx;
	height: 32rpx;
	border-radius: 4rpx;
	border: 2rpx solid #d9d9d9;
	display: flex;
	align-items: center;
	justify-content: center;
}

.checkbox.checked {
	background-color: #333333;
	border-color: #333333;
}

.check-icon {
	font-size: 20rpx;
	color: #ffffff;
}

.agreement-label {
	display: flex;
	align-items: center;
}

.label-text {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #999999;
}

.label-link {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #6d58f1;
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

.btn-next.disabled {
	background-color: #cccccc;
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
