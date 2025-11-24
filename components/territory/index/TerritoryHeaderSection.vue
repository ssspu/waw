<template>
	<view class="territory-header-section">
		<!-- Tab导航 -->
		<view class="tab-nav">
			<view 
				v-for="tab in tabItems" 
				:key="tab.id" 
				class="tab-item"
				:class="{ active: activeSubTab === tab.id }"
				@tap="handleTabClick(tab.id)"
			>
				<text class="tab-label" :class="{ active: activeSubTab === tab.id }">{{ tab.label }}</text>
				<image 
					v-if="activeSubTab === tab.id"
					class="tab-indicator" 
					src="https://c.animaapp.com/mi5ng54v4eM3X6/img/vector-15.svg" 
					mode="aspectFit"
				></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		activeTopTab: {
			type: String,
			default: 'designer'
		},
		activeSubTab: {
			type: String,
			default: 'hairstylist'
		}
	},
	data() {
		return {
			topNavItems: [
				{ id: "designer", label: "设计师", active: true },
				{ id: "brand", label: "品牌馆", active: false },
			],
			tabItems: [
				{ id: "hairstylist", label: "美发师" },
				{ id: "beautician", label: "美容师" },
				{ id: "makeup", label: "化妆师" },
				{ id: "nail", label: "美甲师" },
				{ id: "body", label: "美体师" },
			],
		}
	},
	methods: {
		handleTopNavClick(tabId) {
			this.$emit('top-tab-change', tabId)
		},
		handleTabClick(tabId) {
			this.$emit('sub-tab-change', tabId)
		}
	}
}
</script>

<style scoped lang="scss">
.territory-header-section {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 24rpx;
	padding: 24rpx 30rpx;
	width: 100%;
	background-color: #ffffff;
	box-sizing: border-box;
}

.tab-nav {
	display: flex;
	align-items: flex-start;
	gap: 24rpx;
	width: 100%;
	flex-wrap: wrap;
}

.tab-item {
	display: inline-flex;
	flex-direction: column;
	height: 62rpx;
	align-items: center;
	gap: 20rpx;
	position: relative;
	cursor: pointer;
	transition: color 0.3s;
}

.tab-label {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: center;
	
	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: 600;
		color: #000000;
	}
}

.tab-indicator {
	position: absolute;
	bottom: -20rpx;
	width: 20rpx;
	height: 6rpx;
	flex-shrink: 0;
	margin-bottom: -1rpx;
}
</style>

