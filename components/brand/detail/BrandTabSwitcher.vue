<template>
	<view class="tabs-card">
		<view class="tabs-header">
			<view 
				v-for="(tab, index) in tabs" 
				:key="tab.id" 
				class="tab-item"
				:class="{ active: activeTab === tab.id }"
				@tap="handleTabClick(tab.id)"
			>
				<text class="tab-label" :class="{ active: activeTab === tab.id }">{{ tab.label }}</text>
				<image 
					v-if="activeTab === tab.id"
					class="tab-indicator" 
					src="https://c.animaapp.com/mi5d4lp0csJxnR/img/vector-15.svg" 
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
		},
		tabs: {
			type: Array,
			default: () => [
				{ id: 'service', label: '服务' },
				{ id: 'appointment', label: '预约' },
				{ id: 'works', label: '作品' },
				{ id: 'reviews', label: '点评' }
			]
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
.tabs-card {
	width: 100%;
	margin-top: 0;
	background-color: transparent;
	border-radius: 0;
	border: 0;
	box-shadow: none;
	padding: 20rpx 0rpx 0rpx 0rpx;
	box-sizing: border-box;
	border-radius: 12rpx;
	// margin-left: -20rpx;
	// background-color: #fcc;
	
}

.tabs-header {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	gap: 10rpx;
	width: 102%;
	margin-left: -10rpx;
	box-sizing: border-box;
}

.tab-item {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 0;
	width: 25%;
	position: relative;
	cursor: pointer;
	padding-bottom: 12rpx;
}

.tab-label {
	font-size: 28rpx;
	text-align: center;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #666666;
	margin-bottom: 8rpx;
}

.tab-label.active {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
}

.tab-indicator {
	width: 20rpx;
	height: 6rpx;
	margin-top: 0;
	margin-bottom: 0;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
}

.separator-line {
	width: 100%;
	height: 2rpx;
	background-color: #e5e5e5;
	margin-top: 0;
	margin-bottom: 0;
}
</style>
