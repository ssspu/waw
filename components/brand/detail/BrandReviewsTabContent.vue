<template>
	<view class="brand-reviews-content">
		<!-- 复用 DesignerReviewsTabContent 组件 -->
		<designer-reviews-tab-content></designer-reviews-tab-content>
	</view>
</template>

<script>
import DesignerReviewsTabContent from '../../DesignerReviewsTabContent.vue'

export default {
	components: {
		DesignerReviewsTabContent
	}
}
</script>

<style scoped lang="scss">
.brand-reviews-content {
	display: flex;
	flex-direction: column;
	width: 100%;
}
</style>

