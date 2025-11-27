<template>
	<view class="works-tab-content">
		<designer-works-gallery-section></designer-works-gallery-section>
	</view>
</template>

<script>
import DesignerWorksGallerySection from './DesignerWorksGallerySection.vue'

export default {
	components: {
		DesignerWorksGallerySection
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
