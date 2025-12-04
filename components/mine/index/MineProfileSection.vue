<template>
	<view class="profile-section">
		<!-- 我的订单卡片 -->
		<view class="order-card">
			<view class="card-content">
				<view class="card-header">
					<text class="card-title">我的订单</text>
					<view class="more-btn" @tap="handleViewAllOrders">
						<text class="more-text">全部订单</text>
						<image 
							class="more-icon" 
							src="/static/icon/right.png" 
							mode="aspectFit"
						></image>
					</view>
				</view>
				
				<view class="order-nav">
					<view 
						v-for="(item, index) in orderItems" 
						:key="index" 
						class="order-item"
						@tap="handleOrderItemClick(item)"
					>
						<image class="order-icon" :src="item.icon" mode="aspectFit"></image>
						<text class="order-label">{{ item.label }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 我的资产卡片 -->
		<view class="asset-card">
			<view class="card-content">
				<text class="card-title">我的资产</text>
				
				<view class="asset-nav">
					<view 
						v-for="(item, index) in assetItems" 
						:key="index" 
						class="asset-item"
						@tap="handleAssetItemClick(item)"
					>
						<image class="asset-icon" :src="item.icon" mode="aspectFit"></image>
						<text class="asset-label">{{ item.label }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 入驻中心卡片 -->
		<view class="settlement-card">
			<view class="card-content">
				<text class="card-title">入驻中心</text>
				
				<view class="settlement-nav">
					<view 
						v-for="(item, index) in settlementItems" 
						:key="index" 
						class="settlement-item"
						@tap="handleSettlementItemClick(item)"
					>
						<image class="settlement-icon" :src="item.icon" mode="aspectFit"></image>
						<text class="settlement-label">{{ item.label }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderItems: [
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-16.svg",
					label: "待付款",
				},
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-11.svg",
					label: "待确认",
				},
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-8.svg",
					label: "待使用",
				},
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-12.svg",
					label: "待评价",
				},
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-5.svg",
					label: "退款/售后",
				},
			],
			assetItems: [
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-6.svg",
					label: "优惠券",
				},
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-10.svg",
					label: "资产",
				},
				{
					icon: "https://c.animaapp.com/mih16y3pFMmwpi/img/frame-4.svg",
					label: "推广佣金",
				},
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-9.svg",
					label: "美豆",
				},
			],
			settlementItems: [
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame.svg",
					label: "我要入驻",
				},
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-7.svg",
					label: "我要推广",
				},
				{
					icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-1.svg",
					label: "个人设置",
				},
			],
		}
	},
	methods: {
		handleViewAllOrders() {
			uni.navigateTo({ url: '/pages/order/index' })
		},
		handleOrderItemClick(item) {
			console.log('Order item clicked:', item)
			// 根据不同的订单状态跳转到订单页面
			if (item.label === '待付款' || item.label === '待确认' || item.label === '待使用' || item.label === '待评价' || item.label === '退款/售后') {
				uni.navigateTo({ url: '/pages/order/index?tab=' + this.getOrderTabId(item.label) })
			}
		},
		handleAssetItemClick(item) {
			console.log('Asset item clicked:', item)
			// 点击优惠券跳转到优惠券页面
			if (item.label === '优惠券') {
				uni.navigateTo({ url: '/pages/coupon/index' })
			}
			// 点击资产跳转到资产页面
			if (item.label === '资产') {
				uni.navigateTo({ url: '/pages/mine/asset' })
			}
			// 点击推广佣金跳转到推广佣金页面
			if (item.label === '推广佣金') {
				uni.navigateTo({ url: '/pages/mine/promotion' })
			}
			// 点击美豆跳转到美豆页面
			if (item.label === '美豆') {
				uni.navigateTo({ url: '/pages/mine/beans' })
			}
		},
		handleSettlementItemClick(item) {
			console.log('Settlement item clicked:', item)
			// 点击我要入驻跳转到申请入驻页面
			if (item.label === '我要入驻') {
				uni.navigateTo({ url: '/pages/mine/apply-settlement' })
			}
			// 点击我要推广跳转到推广页面
			if (item.label === '我要推广') {
				uni.navigateTo({ url: '/pages/mine/share-promotion' })
			}
			// 点击个人设置跳转到设置页面
			if (item.label === '个人设置') {
				uni.navigateTo({ url: '/pages/setting/index' })
			}
		},
		getOrderTabId(label) {
			const map = {
				'待付款': 'pending-payment',
				'待确认': 'pending-confirm',
				'待使用': 'pending-use',
				'待评价': 'pending-review',
				'退款/售后': 'after-sale'
			}
			return map[label] || 'all'
		}
	}
}
</script>

<style scoped lang="scss">
.profile-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
	width: 710rpx;
	margin-bottom: 26rpx;
	box-sizing: border-box;
}

.order-card, .asset-card, .settlement-card {
	width: 100%;
	height: 198rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-shadow: none;
	box-sizing: border-box;
}

.card-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 20rpx;
	padding: 24rpx 20rpx;
	box-sizing: border-box;
}

.card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.card-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 26rpx;
}

.more-btn {
	display: inline-flex;
	align-items: center;
	// gap: 10rpx;
	cursor: pointer;
}

.more-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 28rpx;
	text-align: center;
}

.more-icon {
	width: 28rpx;
	height: 28rpx;
	flex-shrink: 0;
}

.order-nav, .asset-nav, .settlement-nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 10rpx;
	width: 100%;
	box-sizing: border-box;
}

.order-item, .asset-item, .settlement-item {
	display: flex;
	flex-direction: column;
	width: 88rpx;
	align-items: center;
	gap: 12rpx;
	cursor: pointer;
}

.order-icon, .asset-icon, .settlement-icon {
	width: 48rpx;
	height: 48rpx;
	flex-shrink: 0;
}

.order-label, .asset-label, .settlement-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
	text-align: center;
	word-wrap: break-word;
	white-space: normal;
	line-height: 1.2;
	width: 100rpx;
}
</style>

