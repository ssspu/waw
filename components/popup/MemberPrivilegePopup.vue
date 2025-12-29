<template>
	<view class="popup-overlay" v-if="visible" @tap="handleClose">
		<view class="popup-container" @tap.stop>
			<!-- 弹窗头部 -->
			<view class="popup-header">
				<text class="popup-title">会员权限</text>
				<view class="close-btn" @tap="handleClose">
					<text class="close-icon">×</text>
				</view>
			</view>
			
			<!-- 分类标签 -->
			<view class="category-tabs">
				<view 
					v-for="tab in categoryTabs" 
					:key="tab.id" 
					class="tab-item"
					:class="{ active: activeCategory === tab.id }"
					@tap="handleTabClick(tab.id)"
				>
					<text class="tab-text">{{ tab.label }}</text>
					<view v-if="activeCategory === tab.id" class="tab-indicator"></view>
				</view>
			</view>
			
			<!-- 权限列表 -->
			<view class="privilege-list">
				<view 
					v-for="privilege in currentPrivileges" 
					:key="privilege.id" 
					class="privilege-item"
				>
					<view class="privilege-info">
						<text class="privilege-title">{{ privilege.title }}</text>
						<text class="privilege-desc">{{ privilege.description }}</text>
					</view>
					<text class="privilege-discount">{{ privilege.discount }}</text>
				</view>
			</view>
			
			<!-- 会员消费告知 -->
			<view class="notice-section">
				<text class="notice-title">会员消费告知</text>
				<view class="notice-content">
					<text class="notice-text">门店消费前请出示会员卡和咨询服务项目的优惠折扣核实；</text>
					<text class="notice-text">如有商户告知特殊优惠，将不能重叠享受优惠；</text>
					<text class="notice-text">本折扣优惠只限本店使用，最终解释权归本店所有</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'MemberPrivilegePopup',
	props: {
		visible: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			activeCategory: 'hair',
			categoryTabs: [
				{ id: 'hair', label: '美发' },
				{ id: 'beauty', label: '美容' },
				{ id: 'makeup', label: '化妆' },
				{ id: 'nail', label: '美甲' },
				{ id: 'body', label: '美体' }
			],
			privilegesData: {
				hair: [
					{ id: 1, title: '基处服务折扣', description: '洗吹发型洗剪吹', discount: '7折' },
					{ id: 2, title: '项目服务折扣', description: '烫发染发护理等', discount: '6折' },
					{ id: 3, title: '店卖商品折扣', description: '店内售相关的商品', discount: '6折' }
				],
				beauty: [
					{ id: 1, title: '基服务折扣', description: '面部护理清洁', discount: '8折' },
					{ id: 2, title: '项目服务折扣', description: '美容套餐SPA', discount: '7折' },
					{ id: 3, title: '店卖商品折扣', description: '店内售相关的商品', discount: '6折' }
				],
				makeup: [
					{ id: 1, title: '基服务折扣', description: '日常妆容', discount: '8折' },
					{ id: 2, title: '项目服务折扣', description: '新娘妆晚宴妆', discount: '7折' },
					{ id: 3, title: '店卖商品折扣', description: '店内售相关的商品', discount: '6折' }
				],
				nail: [
					{ id: 1, title: '基础服务折扣', description: '基础美甲', discount: '8折' },
					{ id: 2, title: '项目服务折扣', description: '艺术美甲延长', discount: '7折' },
					{ id: 3, title: '店卖商品折扣', description: '店内售相关的商品', discount: '6折' }
				],
				body: [
					{ id: 1, title: '基础服务折扣', description: '身体按摩', discount: '8折' },
					{ id: 2, title: '项目服务折扣', description: '塑形养生套餐', discount: '7折' },
					{ id: 3, title: '店卖商品折扣', description: '店内售相关的商品', discount: '6折' }
				]
			}
		}
	},
	computed: {
		currentPrivileges() {
			return this.privilegesData[this.activeCategory] || []
		}
	},
	methods: {
		handleClose() {
			this.$emit('close')
		},
		handleTabClick(tabId) {
			this.activeCategory = tabId
		}
	}
}
</script>

<style scoped lang="scss">
.popup-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
}

.popup-container {
	width: 600rpx;
	max-height: 80vh;
	background-color: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.popup-header {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 30rpx;
	position: relative;
	border-bottom: 1rpx solid #f5f5f5;
}

.popup-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	color: #333333;
}

.close-btn {
	position: absolute;
	right: 30rpx;
	top: 50%;
	transform: translateY(-50%);
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.close-icon {
	font-size: 40rpx;
	color: #999999;
	line-height: 1;
}

.category-tabs {
	display: flex;
	align-items: center;
	padding: 0 30rpx;
	border-bottom: 1rpx solid #f5f5f5;
}

.tab-item {
	position: relative;
	padding: 24rpx 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.tab-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #999999;
	
	.tab-item.active & {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		color: #333333;
	}
}

.tab-indicator {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 32rpx;
	height: 4rpx;
	background-color: #333333;
	border-radius: 2rpx;
}

.privilege-list {
	padding: 20rpx 30rpx;
}

.privilege-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 0;
	border-bottom: 1rpx solid #f5f5f5;
	
	&:last-child {
		border-bottom: none;
	}
}

.privilege-info {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.privilege-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	color: #333333;
}

.privilege-desc {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #999999;
}

.privilege-discount {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 32rpx;
	color: #333333;
}

.notice-section {
	padding: 24rpx 30rpx;
	background-color: #fafafa;
}

.notice-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-size: 28rpx;
	color: #333333;
	margin-bottom: 16rpx;
	display: block;
}

.notice-content {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.notice-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 24rpx;
	color: #999999;
	line-height: 1.6;
}
</style>
