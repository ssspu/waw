<template>
	<view class="works-tab-content">
		<brand-works-gallery-section></brand-works-gallery-section>
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
