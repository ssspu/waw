<template>
	<view class="share-promotion-page">
		<!-- 整体背景图片 -->
		<image
			class="page-bg"
			src="https://bioflex.cn/static/background-image/share-bg.png"
			mode="aspectFill"
		></image>

		<!-- 主内容区 -->
		<view class="main-content">
			<!-- 品牌标识 -->
			<image
				class="brand-logo"
				src="https://c.animaapp.com/mipl5b3gx2BfHj/img/--1.png"
				mode="aspectFit"
			></image>

			<!-- 二维码卡片 -->
			<view class="qrcode-card">
				<!-- 卡片顶部装饰 -->
				<!-- <image
					class="card-decoration"
					src="https://c.animaapp.com/mipl5b3gx2BfHj/img/---3.svg"
					mode="aspectFit"
				></image> -->

				<!-- 欢迎文字 -->
				<image
					class="welcome-text"
					src="https://c.animaapp.com/mipl5b3gx2BfHj/img/----.svg"
					mode="aspectFit"
				></image>

				<!-- IP说明 -->
				<image
					class="ip-desc"
					src="https://c.animaapp.com/mipl5b3gx2BfHj/img/--------ip.png"
					mode="aspectFit"
				></image>

				<!-- 二维码 -->
				<image
					class="qrcode-image"
					src="https://c.animaapp.com/mipl5b3gx2BfHj/img/frame-4.svg"
					mode="aspectFit"
				></image>

				<!-- 扫码提示 -->
				<text class="scan-tip">扫描二维码,立即入驻</text>
			</view>

			<!-- 分享按钮 -->
			<view class="share-btn" @tap="handleShare">
				<view class="share-icon-wrapper">
					<view class="share-icon-bg">
						<image
							class="share-icon"
							src="https://c.animaapp.com/mipl5b3gx2BfHj/img/---1.svg"
							mode="aspectFit"
						></image>
					</view>
				</view>
				<text class="share-text">分享链接</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	onLoad() {},
	methods: {
		handleShare() {
			
			uni.showActionSheet({
				itemList: ['复制链接', '保存图片'],
				success: (res) => {
					if (res.tapIndex === 0) {
						uni.setClipboardData({
							data: 'https://waw.com/promotion',
							success: () => {
								uni.showToast({
									title: '链接已复制',
									icon: 'success'
								})
							}
						})
					} else if (res.tapIndex === 1) {
						this.saveQRCode()
					}
				}
			})
		},
		saveQRCode() {
			
			uni.showToast({
				title: '保存成功',
				icon: 'success'
			})
		}
	}
}
</script>

<style scoped lang="scss">
.share-promotion-page {
	width: 100%;
	min-height: 100vh;
	position: relative;
	overflow: hidden;
	background-color: #333333;
}

.page-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
}

.navbar-right {
	width: 174rpx;
	height: 64rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.nav-icon {
	width: 174rpx;
	height: 64rpx;
}

.main-content {
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 110rpx 30rpx;
	padding-bottom: 160rpx;
}

.brand-logo {
	width: 570rpx;
	height: 198rpx;
	margin-top: 30rpx;
	margin-bottom: 40rpx;
}

.qrcode-card {
	width: 610rpx;
	height: 776rpx;
	border-radius: 32rpx;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 8rpx 48rpx rgba(34, 31, 25, 0.8);
	overflow: visible;
	background: transparent;
}

.card-decoration {
	width: 610rpx;
	height: 104rpx;
	position: relative;
	z-index: 2;
	margin-top: 0;
}

.welcome-text {
	width: 124rpx;
	height: 30rpx;
	margin-top: 66rpx;
	position: relative;
	z-index: 2;
}

.ip-desc {
	width: 348rpx;
	height: 38rpx;
	margin-top: 80rpx;
	position: relative;
	z-index: 2;
}

.qrcode-image {
	width: 416rpx;
	height: 416rpx;
	margin-top: 44rpx;
	position: relative;
	z-index: 2;
}

.scan-tip {
	font-family: 'PingFang SC', Helvetica, sans-serif;
	font-size: 24rpx;
	font-weight: 400;
	color: #968982;
	margin-top: 76rpx;
	position: relative;
	z-index: 2;
}

.share-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
	margin-top: 62rpx;
}

.share-icon-wrapper {
	width: 120rpx;
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.share-icon-bg {
	width: 120rpx;
	height: 120rpx;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 98rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s;

	&:active {
		background-color: rgba(255, 255, 255, 0.3);
	}
}

.share-icon {
	width: 44rpx;
	height: 44rpx;
}

.share-text {
	font-family: 'PingFang SC', Helvetica, sans-serif;
	font-size: 24rpx;
	font-weight: 600;
	color: #ffffff;
}



.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
	margin-bottom: 16rpx;
}
</style>
