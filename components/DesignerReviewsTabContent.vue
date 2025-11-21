<template>
	<view class="reviews-tab-content">
		<!-- 筛选标签 -->
		<view class="filter-tabs-section">
			<view 
				v-for="(filter, index) in reviewFilters" 
				:key="index"
				class="filter-tab"
				:class="{ active: filter.active }"
				@tap="handleFilterClick(index)"
			>
				<text class="filter-label" :class="{ active: filter.active }">
					{{ filter.label }}
				</text>
			</view>
		</view>
		
		<!-- 点评列表 -->
		<designer-reviews-list-section></designer-reviews-list-section>
	</view>
</template>

<script>
import DesignerReviewsListSection from './DesignerReviewsListSection.vue'

export default {
	components: {
		DesignerReviewsListSection
	},
	data() {
		return {
			reviewFilters: [
				{ label: "全部", active: true },
				{ label: "有图(71)", active: false },
				{ label: "差评(9)", active: false }
			]
		}
	},
	methods: {
		handleFilterClick(index) {
			this.reviewFilters.forEach((filter, i) => {
				filter.active = i === index
			})
		}
	}
}
</script>

<style scoped lang="scss">
.reviews-tab-content {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 16rpx;
}

.filter-tabs-section {
	display: flex;
	align-items: flex-start;
	gap: 40rpx;
	padding: 0 30rpx 24rpx;
	width: 100%;
	box-sizing: border-box;
}

.filter-tab {
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
	cursor: pointer;
}

.filter-label {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 28rpx;
	text-align: center;
	
	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #000000;
	}
}
</style>

