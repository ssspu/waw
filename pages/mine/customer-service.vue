<template>
	<view class="customer-service-page">
		<!-- 自定义头部 -->
		<view class="custom-header" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="navbar-content">
				<view class="nav-left">
					<view class="back-btn" @tap="goBack">
						<image
							class="back-icon"
							src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg"
							mode="aspectFit"
						></image>
					</view>
				</view>
				<text class="nav-title">客服中心</text>
			</view>
		</view>
		
		<view class="main-content">
			<!-- 搜索栏 -->
			<view class="search-bar">
				<view class="search-input-wrapper">
					<image class="search-icon" src="/static/icon/search.png" mode="aspectFit"></image>
					<input 
						class="search-input" 
						v-model="searchKeyword"
						placeholder="服务" 
						placeholder-style="color: #a6a6a6; font-size: 28rpx;"
					/>
				</view>
			</view>

			<!-- 标签导航 -->
			<view class="tabs-section">
				<!-- 主标签 -->
				<view class="main-tabs">
					<view 
						v-for="(tab, index) in mainTabs" 
						:key="index"
						class="main-tab"
						:class="{ active: activeMainTab === index }"
						@tap="handleMainTabClick(index)"
					>
						<text>{{ tab }}</text>
					</view>
				</view>

				<!-- 子标签 -->
				<view class="sub-tabs">
					<view 
						v-for="(subTab, index) in subTabs[activeMainTab]" 
						:key="index"
						class="sub-tab"
						:class="{ active: activeSubTab === index }"
						@tap="handleSubTabClick(index)"
					>
						<text>{{ subTab }}</text>
					</view>
				</view>
			</view>

			<!-- 问题列表 -->
			<view class="question-list">
				<view 
					v-for="(question, index) in questions" 
					:key="index"
					class="question-item"
					@tap="handleQuestionClick(question)"
				>
					<text class="question-text">{{ question }}</text>
					<image class="chevron-icon" src="/static/icon/gengduo.png" mode="aspectFit"></image>
					<view v-if="index < questions.length - 1" class="question-separator"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 44,
			searchKeyword: '',
			activeMainTab: 0,
			activeSubTab: 0,
			mainTabs: ['购买问题', '出售问题'],
			subTabs: [
				['订单问题', '售后问题', '支付问题', '支付问题'],
				['订单问题', '售后问题', '支付问题']
			],
			questions: [
				'下单后找不到记录',
				'下单后找不到记录',
				'下单后找不到记录',
				'下单后找不到记录',
				'尺码不合适可以退货吗',
				'尺码不合适可以退货吗',
				'尺码不合适可以退货吗',
				'收到的商品有瑕疵'
			]
		}
	},
	onLoad() {
		this.statusBarHeight = uni.getStorageSync('statusBarHeight') || 44
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		handleMainTabClick(index) {
			this.activeMainTab = index
			this.activeSubTab = 0
			this.loadQuestions()
		},
		handleSubTabClick(index) {
			this.activeSubTab = index
			this.loadQuestions()
		},
		loadQuestions() {
			// 根据选中的标签加载对应的问题列表
			// 这里暂时使用固定数据
		},
		handleQuestionClick(question) {
			console.log('Question clicked:', question)
			// 跳转到问题详情页面
			// uni.navigateTo({ url: `/pages/mine/question-detail?question=${question}` })
		}
	}
}
</script>

<style scoped lang="scss">
.customer-service-page {
	width: 100%;
	min-height: 100vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.custom-header {
	position: relative;
	width: 100%;
	background-color: #ffffff;
	flex-shrink: 0;
}

.navbar-content {
	display: flex;
	align-items: center;
	padding: 24rpx 32rpx;
	box-sizing: border-box;
	gap: 24rpx;
}

.nav-left {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
}

.nav-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
}

.back-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}


.nav-right {
	display: flex;
	align-items: center;
	gap: 12rpx;
	z-index: 2;
}

.nav-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}

.main-content {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 24rpx;
	gap: 24rpx;
	box-sizing: border-box;
}

.search-bar {
	width: 100%;
	padding: 0;
}

.search-input-wrapper {
	display: flex;
	align-items: center;
	background-color: #f5f5f5;
	border-radius: 50rpx;
	padding: 16rpx 20rpx;
	gap: 12rpx;
}

.search-icon {
	width: 32rpx;
	height: 32rpx;
	flex-shrink: 0;
}

.search-input {
	flex: 1;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #1d1d1f;
	background: transparent;
	border: none;
}

.tabs-section {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.main-tabs {
	display: flex;
	gap: 40rpx;
	padding-bottom: 0;
}

.main-tab {
	padding: 16rpx 0;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #a6a6a6;
	position: relative;
	cursor: pointer;
}

.main-tab.active {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #1d1d1f;
}

.main-tab.active::after {
	content: '';
	position: absolute;
	bottom: -2rpx;
	left: 0;
	right: 0;
	height: 2rpx;
	background-color: #1d1d1f;
}

.sub-tabs {
	display: flex;
	gap: 24rpx;
	flex-wrap: nowrap;
	overflow-x: auto;
	border-bottom: 2rpx solid #f0f0f0;
	padding-bottom: 16rpx;
}

.sub-tab {
	padding: 8rpx 0;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #a6a6a6;
	cursor: pointer;
}

.sub-tab.active {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: 600;
	color: #1d1d1f;
}

.question-list {
	width: 100%;
	background-color: #ffffff;
	border-radius: 0;
	overflow: hidden;
}

.question-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 0;
	position: relative;
}

.question-text {
	flex: 1;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #333333;
}

.chevron-icon {
	width: 24rpx;
	height: 24rpx;
	flex-shrink: 0;
	opacity: 0.6;
}

.question-separator {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 1rpx;
	background-color: #f0f0f0;
}
</style>

