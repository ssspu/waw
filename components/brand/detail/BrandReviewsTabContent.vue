<template>
	<view class="reviews-tab-content">
		<brand-reviews-list-section :brand-id="brandId"></brand-reviews-list-section>
	</view>
</template>

<script>
import BrandReviewsListSection from './BrandReviewsListSection.vue'

export default {
	components: {
		BrandReviewsListSection
	},
	props: {
		activeSubTab: {
			type: String,
			default: 'all'
		},
		brandId: {
			type: [String, Number],
			default: null
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
