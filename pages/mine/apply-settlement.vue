<template>
	<view class="apply-settlement-page">
		<view class="status-bar-space"></view>
		<!-- 状态栏 -->
		<view class="status-bar"></view>
		
		<!-- 导航栏和申请入驻部分 -->
		<view class="navbar-wrapper">
			<view class="navbar">
				<view class="navbar-content">
					<view class="back-btn" @tap="handleBack">
						<image 
							class="back-icon" 
							src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg" 
							mode="aspectFit"
						></image>
					</view>
					<text class="navbar-title">我要合作</text>
				</view>
			</view>
			
			<!-- 申请入驻部分 -->
			<view class="apply-section">
				<text class="apply-title">申请入驻</text>
				<text class="apply-desc">更多优惠政策，我们期待您的加入</text>
			</view>
		</view>
		
		<!-- 主内容 -->
		<view class="main-content">
			<!-- 商户入驻部分 -->
			<view class="merchant-section">
				<text class="section-title">商户入驻</text>
				<view class="section-content">
					<view class="settlement-item-wrapper">
						<view class="settlement-item" @tap="handleDesignerSettlement">
							<view class="item-content">
								<view class="item-info">
									<text class="item-title">设计师入驻</text>
									<text class="item-desc">自由美业设计师，打造个人IP品牌</text>
								</view>
								<image 
									class="arrow-icon" 
									src="/static/icon/vector-4.svg" 
									mode="aspectFit"
								></image>
							</view>
						</view>
						<image 
							class="divider" 
							src="/static/icon/vector-20-1.svg" 
							mode="aspectFit"
						></image>
					</view>
					
					<view class="settlement-item-wrapper">
						<view class="settlement-item" @tap="handleStoreSettlement">
							<view class="item-content">
								<view class="item-info">
									<text class="item-title">实体门店入驻</text>
									<text class="item-desc">美业线下实体门店，线上线下经营双驱动</text>
								</view>
								<image 
									class="arrow-icon" 
									src="/static/icon/vector-4.svg" 
									mode="aspectFit"
								></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 代理商及服务合作部分（测试阶段不显示） -->
			<!-- <view class="agent-section">
				<text class="section-title">代理商及服务合作</text>
				<view class="section-content">
					<view class="settlement-item-wrapper">
						<view class="settlement-item" @tap="handleAgentSettlement">
							<view class="item-content">
								<view class="item-info">
									<text class="item-title">渠道代理加盟</text>
									<text class="item-desc">市场合伙人，代理收单业务，低成本轻松创业</text>
								</view>
								<image
									class="arrow-icon"
									src="/static/icon/vector-4.svg"
									mode="aspectFit"
								></image>
							</view>
						</view>
						<image
							class="divider"
							src="/static/icon/vector-20-1.svg"
							mode="aspectFit"
						></image>
					</view>

					<view class="settlement-item-wrapper">
						<view class="settlement-item" @tap="handleEducationSettlement">
							<view class="item-content">
								<view class="item-info">
									<text class="item-title">教育拍档</text>
									<text class="item-desc">职业教育合作，美业技能培训，职业证书认证</text>
								</view>
								<image
									class="arrow-icon"
									src="/static/icon/vector-4.svg"
									mode="aspectFit"
								></image>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		handleDesignerSettlement() {
			uni.navigateTo({
				url: '/pages/mine/designer-settlement'
			})
		},
		handleStoreSettlement() {
			uni.navigateTo({
				url: '/pages/mine/store-settlement'
			})
		},
		handleAgentSettlement() {
			uni.showToast({ title: '渠道代理加盟', icon: 'none' })
		},
		handleEducationSettlement() {
			uni.showToast({ title: '教育拍档', icon: 'none' })
		}
	}
}
</script>

<style scoped lang="scss">
.apply-settlement-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	position: relative;
}

.main-content {
	padding: 24rpx 12rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
	background-color: #f2f2f2;
}

.status-bar {
	height: 44rpx;
	width: 100%;
	background-color: #ffffff;
}

.navbar-wrapper {
	width: 100%;
	background-color: #ffffff;
	z-index: 10;
}

.navbar {
	position: relative;
	width: 100%;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 88rpx;
	padding: 0 30rpx;
	position: relative;
}

.back-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
}

.navbar-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	margin-left: 20rpx;
}
.nav-icon-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-dots {
	display: flex;
	align-items: center;
	gap: 3rpx;
}

.dot {
	width: 3rpx;
	height: 3rpx;
	border-radius: 50%;
	background-color: #000000;
}

.nav-circle {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	border: 1.5rpx solid #000000;
	background-color: transparent;
	display: flex;
	align-items: center;
	justify-content: center;
}

.circle-dot {
	width: 6rpx;
	height: 6rpx;
	border-radius: 50%;
	background-color: #000000;
}

.main-content {
	padding: 24rpx 12rpx;
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.apply-section {
	display: inline-flex;
	flex-direction: column;
	gap: 12rpx;
	padding: 30rpx 24rpx;
}

.apply-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	font-weight: normal;
	color: #000000;
}

.apply-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	font-weight: normal;
	color: #a6a6a6;
}

.merchant-section, .agent-section {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 30rpx;
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}

.section-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	font-weight: normal;
	color: #000000;
}

.section-content {
	display: flex;
	flex-direction: column;
	gap: 0;
}

.settlement-item-wrapper {
	display: flex;
	flex-direction: column;
	gap: 0;
}

.settlement-item-wrapper:not(:last-child) {
	padding-bottom: 30rpx;
}

.settlement-item {
	display: flex;
	flex-direction: column;
	gap: 0;
}

.item-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
}

.item-info {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	flex: 1;
}

.item-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	font-weight: 500;
	color: #666666;
}

.item-desc {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 24rpx;
	font-weight: 500;
	color: #a7a7a7;
}

.arrow-icon {
	width: 28rpx;
	height: 28rpx;
	flex-shrink: 0;
}

.divider {
	width: 100%;
	height: 2rpx;
	margin-top: 30rpx;
	flex-shrink: 0;
}
</style>

