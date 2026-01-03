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
				{ id: 'designer', label: '品牌介绍' },
				{ id: 'service', label: '服务特色' },
				{ id: 'environment', label: '环境设施' }
			]
		}
	},
	methods: {
		handleTabClick(id) {
			this.$emit('tab-change', id)
		}
	}
}
</script>

<style scoped lang="scss">
.profile-section {
	width: 100%;
	height: 100%;
}

.tabs-container {
	width: 100%;
	height: 100%;
}

.tabs-list {
	width: 100%;
	height: 100%;
	background-color: transparent;
	display: flex;
	align-items: center;
}

.tab-trigger {
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	cursor: pointer;
	pointer-events: auto;
}

.tab-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 28rpx;
	color: #999999;
	transition: all 0.2s;
	pointer-events: none; /* 让点击穿透到父级 tab-trigger */
	padding-bottom: 12rpx; /* 增加与底部指示条的距离 */
	
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
	width: 40rpx;
	height: 6rpx;
	border-radius: 3rpx;
	background-color: #111111; /* 确保有颜色 */
}
</style>

