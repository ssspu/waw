<template>
	<view class="profile-section">
		<view class="tabs-container">
			<view class="tabs-list">
				<view 
					v-for="(tab, index) in tabs" 
					:key="tab.id"
					class="tab-trigger"
					:class="{ active: activeTab === tab.id }"
					@tap="handleTabClick(tab.id)"
				>
					<text 
						class="tab-label"
						:class="{ active: activeTab === tab.id }"
					>
						{{ tab.label }}
					</text>
					<image 
						v-if="activeTab === tab.id"
						class="tab-indicator" 
						src="https://c.animaapp.com/mi5eklbiAEaKLJ/img/vector-15.svg" 
						mode="aspectFit"
					></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			activeTab: 'designer',
			tabs: [
				{ id: 'designer', label: '设计师介绍' },
				{ id: 'service', label: '服务特色' },
				{ id: 'environment', label: '环境设施' }
			]
		}
	},
	methods: {
		handleTabClick(tabId) {
			this.activeTab = tabId
			this.$emit('tab-change', tabId)
		}
	}
}
</script>

<style scoped lang="scss">
.profile-section {
	width: 100%;
	padding: 32rpx 32rpx 24rpx;
	transform: translateY(-32rpx);
}

.tabs-container {
	width: 100%;
}

.tabs-list {
	width: 100%;
	height: auto;
	background-color: transparent;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 32rpx;
}

.tab-trigger {
	flex: 1;
	height: auto;
	background-color: transparent;
	padding: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
	position: relative;
}

.tab-label {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	text-align: center;
	letter-spacing: 0;
	line-height: normal;
	transition: color 0.3s;
	
	&.active {
		font-weight: 600;
		color: #000000;
	}
	
	&:not(.active) {
		font-family: 'PingFang_SC-Medium', Helvetica;
		font-weight: 500;
		color: #a6a6a6;
	}
}

.tab-indicator {
	width: 20rpx;
	height: 6rpx;
}
</style>

