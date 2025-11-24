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
				<view v-if="activeTab === tab.id" class="tab-indicator"></view>
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
	background-color: transparent;
	border-radius: 0;
	border: 0;
	box-shadow: none;
	padding: 20rpx 30rpx 0;
	box-sizing: border-box;
}

.tabs-header {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	gap: 10rpx;
	width: 100%;
	box-sizing: border-box;
	padding-bottom: 12rpx;
	border-bottom: 2rpx solid #f3f3f3;
}

.tab-item {
	display: inline-flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	gap: 10rpx;
	flex: 1;
	cursor: pointer;
}

.tab-label {
	font-size: 28rpx;
	text-align: left;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
}

.tab-label.active {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
}

.tab-indicator {
	width: 36rpx;
	height: 6rpx;
	border-radius: 4rpx;
	background-color: #000000;
}
</style>

