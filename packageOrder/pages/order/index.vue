<template>
	<view class="order-page">
		<!-- Tab导航栏 -->
		<order-navigation-bar 
			:active-tab="activeTab"
			@tab-change="handleTabChange"
		></order-navigation-bar>
		
		<!-- 订单列表 -->
		<order-service-list 
			:active-tab="activeTab"
		></order-service-list>
	
	</view>
</template>

<script>
import OrderNavigationBar from '../../../components/order/index/OrderNavigationBar.vue'
import OrderServiceList from '../../../components/order/index/OrderServiceList.vue'

export default {
	components: {
		OrderNavigationBar,
		OrderServiceList
	},
	data() {
		return {
			activeTab: 'all'
		}
	},
	onLoad(options) {
		if (options.tab) {
			this.activeTab = options.tab
		}
	},
	methods: {
		handleTabChange(tabId) {
			this.activeTab = tabId
		}
	}
}
</script>

<style scoped lang="scss">
.order-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.action-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.action-text {
	font-size: 40rpx;
	color: #666666;
	line-height: 1;
}

.logo {
	position: absolute;
	top: 24rpx;
	right: 16rpx;
	width: 256rpx;
	height: 144rpx;
	z-index: 1;
}



.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}
</style>

