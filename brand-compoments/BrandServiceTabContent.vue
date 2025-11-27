<template>
	<view class="brand-service-content">
		<!-- 复用 DesignerProfileSection 作为服务列表 -->
		<designer-profile-section></designer-profile-section>
		
		<!-- 服务信息卡片 -->
		<brand-service-info-section></brand-service-info-section>
	</view>
</template>

<script>
import DesignerProfileSection from '../../DesignerProfileSection.vue'
import BrandServiceInfoSection from './BrandServiceInfoSection.vue'

export default {
	components: {
		DesignerProfileSection,
		BrandServiceInfoSection
	}
}
</script>

<style scoped lang="scss">
.brand-service-content {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	gap: 12rpx;
}
</style>

