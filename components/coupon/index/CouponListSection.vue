<template>
	<view class="coupon-list-section">
		<view class="tab-list">
			<view 
				v-for="tab in tabItems" 
				:key="tab.id" 
				class="tab-item"
				:class="{ active: activeTab === tab.id }"
				@tap="handleTabClick(tab.id)"
			>
				<text class="tab-label" :class="{ active: activeTab === tab.id }">{{ tab.label }}</text>
				<image 
					v-if="activeTab === tab.id"
					class="tab-indicator" 
					src="https://c.animaapp.com/mi5m9weyYgJtGL/img/vector-15.svg" 
					mode="aspectFit"
				></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		activeTab: {
			type: String,
			default: 'service'
		}
	},
	data() {
		return {
			tabItems: [
				{ id: "service", label: "服务券" },
				{ id: "product", label: "商品券" },
				{ id: "ended", label: "已结束" },
			],
		}
	},
	methods: {
		handleTabClick(tabId) {
			this.$emit('tab-change', tabId)
		}
	}
}
</script>

<style scoped lang="scss">
.coupon-list-section {
	width: 100%;
	background-color: #ffffff;
	padding: 16rpx 32rpx 0;
	box-sizing: border-box;
	flex-shrink: 0;
}

.tab-list {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
}

.tab-item {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
	position: relative;
	padding-bottom: 16rpx;
	cursor: pointer;
	transition: color 0.3s;
}

.tab-label {
	position: relative;
	width: fit-content;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: center;
	
	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #000000;
	}
}

.tab-indicator {
	position: absolute;
	bottom: 0;
	width: 20rpx;
	height: 6rpx;
	flex-shrink: 0;
}
</style>

