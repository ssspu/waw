<template>
	<view class="service-tab-content">
		<!-- 子标签切换 -->
		<view class="sub-tabs-section">
			<view 
				v-for="(subTab, index) in subTabs" 
				:key="index" 
				class="sub-tab-item"
				:class="{ active: activeSubTab === subTab.id }"
				@tap="handleSubTabClick(subTab.id)"
			>
				<text>{{ subTab.label }}</text>
			</view>
		</view>
		
		<!-- 服务列表 -->
		<designer-profile-section></designer-profile-section>
	</view>
</template>

<script>
import DesignerProfileSection from '../../DesignerProfileSection.vue'

export default {
	components: {
		DesignerProfileSection
	},
	data() {
		return {
			activeSubTab: 'hair',
			subTabs: [
				{ id: 'hair', label: '美发师' },
				{ id: 'beauty', label: '美容师' }
			]
		}
	},
	methods: {
		handleSubTabClick(id) {
			this.activeSubTab = id
		}
	}
}
</script>

<style scoped lang="scss">
.service-tab-content {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 12rpx;
}

.sub-tabs-section {
	display: flex;
	align-items: center;
	gap: 40rpx;
	padding: 0 30rpx;
	margin-bottom: 12rpx;
	width: 100%;
	box-sizing: border-box;
}

.sub-tab-item {
	font-size: 28rpx;
	text-align: center;
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	cursor: pointer;
	
	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #333333;
	}
}
</style>

