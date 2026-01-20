<template>
	<view class="works-tab-content">
		<brand-works-gallery-section :brand-id="brandId" :show-filter="showFilter" @update:showFilter="$emit('update:showFilter', $event)"></brand-works-gallery-section>
	</view>
</template>

<script>
import BrandWorksGallerySection from './BrandWorksGallerySection.vue'

export default {
	components: {
		BrandWorksGallerySection
	},
	props: {
		activeSubTab: {
			type: String,
			default: 'female'
		},
		brandId: {
			type: [String, Number],
			default: null
		},
		showFilter: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped lang="scss">
.works-tab-content {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 16rpx;
}
</style>
