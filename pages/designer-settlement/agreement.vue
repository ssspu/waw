<template>
	<view class="screen">
		<!-- 头部导航 -->
		<view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="nav-bar">
				<view class="nav-left">
					<view class="back-btn" @tap="handleBack">
						<image class="back-icon" src="/static/icon/arrow-left.png" mode="aspectFit"></image>
					</view>
					<text class="nav-title">设计师入驻</text>
				</view>
				<view class="nav-right"></view>
			</view>
			
			<!-- 步骤导航 -->
			<view class="steps-container">
				<view class="step-item">
					<view class="progress-dot completed"></view>
					<text class="step-label">身份认证</text>
				</view>
				<view class="progress-line"></view>
				<view class="step-item">
					<view class="progress-dot completed"></view>
					<text class="step-label">职业认证</text>
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
		<view class="main-content">
			<!-- 协议卡片 -->
			<view class="card">
				<view class="card-header">
					<text class="card-title">入驻平台协议</text>
				</view>
				<view class="card-desc">请认真阅读本平台入驻协议</view>

				<!-- 协议内容区域 -->
				<view class="agreement-content">
					<scroll-view class="agreement-scroll" scroll-y @scrolltolower="onScrollToBottom">
						<view class="agreements-list">
							<view
								v-for="(agreement, index) in agreements"
								:key="index"
								class="agreement-item"
							>
								<view class="agreement-title-row">
									<text class="agreement-title">{{ agreement.title }}</text>
								</view>
								<view class="agreement-content-box">
									<text class="agreement-text">{{ agreement.content }}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<!-- 同意协议 -->
				<view class="agreement-check" @tap="toggleAgree">
					<view class="checkbox" :class="{ checked: isAgreed, disabled: !hasScrolledToBottom }">
						<text v-if="isAgreed" class="check-icon">✓</text>
					</view>
					<view class="agreement-label">
						<text class="label-text">我已阅读并同意</text>
						<text class="label-link">《入驻平台协议》</text>
					</view>
				</view>
			</view>
		</view>
		
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
import { agreementsData } from '@/data/agreements.js'

export default {
	data() {
		return {
			statusBarHeight: 44,
			steps: [
				{ label: '身份认证', active: false },
				{ label: '职业认证', active: false },
				{ label: '合作协议', active: true },
				{ label: '结算信息', active: false }
			],
			isAgreed: false,
			hasScrolledToBottom: false,
			agreements: agreementsData
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		onScrollToBottom() {
			this.hasScrolledToBottom = true
		},
		toggleAgree() {
			if (!this.hasScrolledToBottom) {
				uni.showToast({ title: '请先阅读完协议内容', icon: 'none' })
				return
			}
			this.isAgreed = !this.isAgreed
		},
		handlePrev() {
			uni.navigateBack()
		},
		handleNext() {
			if (!this.isAgreed) {
				uni.showToast({ title: '请先同意协议', icon: 'none' })
				return
			}
			uni.navigateTo({
				url: '/packageSettlement/designer-settlement/settlement'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.screen {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
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
	display: flex;
	align-items: center;
}

.logo-img {
	width: 128rpx;
	height: 72rpx;
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

.step-label {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	color: #a6a6a6;
	white-space: nowrap;
}

.step-label.active {
	font-weight: 600;
	color: #000000;
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

.progress-dot.completed {
	background-color: #FFA07A;
}

.progress-dot.active {
	width: 20rpx;
	height: 20rpx;
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
	background-color: #FFA07A;
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

.progress-line {
	flex: 1;
	height: 2rpx;
	background-color: #e7e7e7;
	align-self: flex-start;
	margin-top: 9rpx;
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
	padding: 24rpx 24rpx;
	margin-bottom: 16rpx;
	box-sizing: border-box;
	width: 100%;
	overflow: hidden;
}

.card-header {
	margin-bottom: 12rpx;
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
	margin-bottom: 12rpx;
}

.agreement-content {
	background-color: #f8f8f8;
	border-radius: 8rpx;
	height: 880rpx;
	margin-bottom: 24rpx;
	overflow: hidden;
}

.agreement-scroll {
	height: 100%;
	padding: 16rpx 12rpx;
	box-sizing: border-box;
}

.agreements-list {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	margin-bottom: 24rpx;
}

.agreement-item {
	background-color: #f8f8f8;
	border-radius: 8rpx;
	overflow: hidden;
}

.agreement-title-row {
	padding: 16rpx;
	border-bottom: 1rpx solid #e7e7e7;
}

.agreement-title {
	font-family: 'PingFang SC';
	font-weight: 600;
	font-size: 28rpx;
	color: #333333;
}

.agreement-content-box {
	padding: 16rpx;
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

.checkbox.disabled {
	background-color: #f5f5f5;
	border-color: #e0e0e0;
}

.check-icon {
	font-size: 20rpx;
	color: #ffffff;
}

.agreement-label {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
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
	box-shadow: 0 -2rpx 0 rgba(0, 0, 0, 0.04);
	padding: 14rpx 20rpx;
	padding-bottom: calc(14rpx + env(safe-area-inset-bottom));
}

.footer-btns {
	display: flex;
	gap: 12rpx;
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
	font-size: 24rpx;
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
	font-size: 24rpx;
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
