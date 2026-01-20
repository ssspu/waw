<template>
	<view class="designer-tab-content">
		<!-- 发型师列表 -->
		<brand-stylist-section :active-sub-tab="activeSubTab" :brand-id="brandId"></brand-stylist-section>
	</view>
</template>

<script>
import BrandStylistSection from './BrandStylistSection.vue'

export default {
	components: {
		BrandStylistSection
	},
	props: {
		activeSubTab: {
			type: String,
			default: 'hair'
		},
		brandId: {
			type: [String, Number],
			default: null
		}
	}
}
</script>

<style scoped lang="scss">
.designer-tab-content {
	display: flex;
	flex-direction: column;
	width: 100%;
	box-sizing: border-box;
}
</style>
