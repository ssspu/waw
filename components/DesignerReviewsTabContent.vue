<template>
	<view class="reviews-tab-content">
		<designer-reviews-list-section></designer-reviews-list-section>
	</view>
</template>

<script>
import DesignerReviewsListSection from './DesignerReviewsListSection.vue'

export default {
	components: {
		DesignerReviewsListSection
	},
	props: {
		activeSubTab: {
			type: String,
			default: 'all'
		}
	}
}
</script>

<style scoped lang="scss">
.reviews-tab-content {
	display: flex;
	flex-direction: column;
	width: calc(100% + 24rpx);
	margin: 0 -12rpx;
	gap: 16rpx;
	background-color: #f2f2f2;
	padding-bottom: 20rpx;
	box-sizing: border-box;
}
</style>

