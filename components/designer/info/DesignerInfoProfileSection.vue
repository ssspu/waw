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
	props: {
		activeTab: {
			type: String,
			default: 'designer'
		}
	},
	data() {
		return {
			tabs: [
				{ id: 'designer', label: '设计师介绍' },
				{ id: 'service', label: '服务特色' },
				{ id: 'environment', label: '环境设施' }
			]
		}
	},
	methods: {
		handleTabClick(tabId) {
			if (tabId !== this.activeTab) {
				this.$emit('tab-change', tabId)
			}
		}
	}
}
</script>

<style scoped lang="scss">
.profile-section {
	width: 100%;
	padding: 0 24rpx;
}

.tabs-container {
	width: 100%;
}

.tabs-list {
	width: 100%;
	height: 98rpx;
	background-color: transparent;
	padding: 0 0 6rpx;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	gap: 0;
}

.tab-trigger {
	flex: 1;
	height: 100%;
	min-width: 0;
	background-color: transparent;
	padding: 0 0 10rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	position: relative;
}

.tab-label {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 30rpx;
	text-align: center;
	letter-spacing: 0;
	line-height: 44rpx;
	transition: color 0.2s;
	width: 100%;
	color: #b0b0b0;
	
	&.active {
		font-weight: 600;
		color: #111111;
	}
}

.tab-indicator {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 38rpx;
	height: 6rpx;
	border-radius: 3rpx;
	display: block;
}
</style>

