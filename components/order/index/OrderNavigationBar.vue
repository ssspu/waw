<template>
	<view class="navigation-bar-section">
		<view class="nav-list">
			<view 
				v-for="item in navigationItems" 
				:key="item.id" 
				class="nav-item"
				:class="{ active: activeTab === item.id }"
				@tap="handleNavClick(item.id)"
			>
				<text class="nav-label" :class="{ active: activeTab === item.id }">{{ item.label }}</text>
				<image 
					v-if="activeTab === item.id"
					class="nav-indicator" 
					src="https://c.animaapp.com/mi5lwlq8FxTpMa/img/vector-15.svg" 
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
			default: 'all'
		}
	},
	data() {
		return {
			navigationItems: [
				{ id: "all", label: "全部" },
				{ id: "pending-payment", label: "待付款" },
				{ id: "pending-confirm", label: "待确认" },
				{ id: "pending-use", label: "待使用" },
				{ id: "pending-review", label: "待评价" },
				{ id: "after-sale", label: "售后" },
			],
		}
	},
	methods: {
		handleNavClick(tabId) {
			this.$emit('tab-change', tabId)
		}
	}
}
</script>

<style scoped lang="scss">
.navigation-bar-section {
	width: 100%;
	background-color: #ffffff;
	padding: 24rpx 30rpx 0rpx;
	box-sizing: border-box;
	flex-shrink: 0;
}

.nav-list {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
}

.nav-item {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
	cursor: pointer;
}

.nav-label {
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

.nav-indicator {
	width: 20rpx;
	height: 6rpx;
	flex-shrink: 0;
}
</style>

