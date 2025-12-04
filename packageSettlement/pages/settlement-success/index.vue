<template>
	<view class="screen">
		<!-- 头部导航 -->
		<view class="header">
			<view class="nav-bar">
				<view class="back-btn" @tap="handleBack">
					<image class="back-icon" src="/static/icon/arrow-left.png" mode="aspectFit"></image>
				</view>
				<text class="nav-title">{{ title }}</text>
				<view class="nav-right"></view>
			</view>
		</view>
		
		<!-- 主内容区域 -->
		<view class="main-content">
			<!-- 成功图标 -->
			<view class="success-icon-wrapper">
				<image class="success-icon" src="/static/image/submit-successful.png" mode="aspectFit"></image>
			</view>
			
			<!-- 提示文字 -->
			<view class="message-wrapper">
				<text class="title">资料提交成功</text>
				<text class="desc">我们正在努力审核您的入驻申请，1-3工作日即可完成审核，审核结果会通过平台发送通知，请注意接收!</text>
				<text class="desc">若审核不通过，请重新上传资料审核。审核通过后，即可免费试用;</text>
			</view>
			
			<!-- 倒计时 -->
			<view class="countdown-wrapper">
				<text class="countdown-text">{{ countdown }}s后即将返回</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '入驻申请',
			type: 'designer', // designer 或 store
			countdown: 10,
			timer: null
		}
	},
	onLoad(options) {
		// 根据参数设置标题
		if (options.type === 'store') {
			this.title = '实体门店入驻'
			this.type = 'store'
		} else {
			this.title = '设计师入驻'
			this.type = 'designer'
		}
		
		// 开始倒计时
		this.startCountdown()
	},
	onUnload() {
		// 清除定时器
		if (this.timer) {
			clearInterval(this.timer)
		}
	},
	methods: {
		handleBack() {
			this.goBack()
		},
		startCountdown() {
			this.timer = setInterval(() => {
				this.countdown--
				if (this.countdown <= 0) {
					clearInterval(this.timer)
					this.goBack()
				}
			}, 1000)
		},
		goBack() {
			// 返回到我的页面
			uni.reLaunch({
				url: '/pages/mine/index'
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
	background-color: #ffffff;
}

.header {
	background-color: #ffffff;
}

.nav-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 30rpx;
	padding-top: calc(var(--status-bar-height, 44px) + 20rpx);
}

.back-btn {
	width: 44rpx;
	height: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
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

.main-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 60rpx;
	padding-top: 120rpx;
}

.success-icon-wrapper {
	margin-bottom: 60rpx;
	animation: fadeInUp 0.6s ease-out;
}

.success-icon {
	width: 240rpx;
	height: 200rpx;
}

.message-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
	animation: fadeInUp 0.6s ease-out 0.2s both;
}

.title {
	font-family: 'PingFang SC';
	font-weight: 600;
	font-size: 40rpx;
	color: #000000;
	text-align: center;
}

.desc {
	font-family: 'PingFang SC';
	font-size: 30rpx;
	color: #666666;
	text-align: center;
	line-height: 1.6;
}

.countdown-wrapper {
	margin-top: 200rpx;
	animation: fadeInUp 0.6s ease-out 0.4s both;
}

.countdown-text {
	font-family: 'PingFang SC';
	font-size: 30rpx;
	color: #999999;
	text-align: center;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(-30rpx);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
