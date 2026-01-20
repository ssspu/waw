<template>
	<view class="coupon-page">
		<!-- Tab导航栏 -->
		<coupon-list-section 
			:active-tab="activeTab"
			@tab-change="handleTabChange"
		></coupon-list-section>
		
		<!-- 优惠券列表 -->
		<view class="coupon-content">
			<coupon-details-section :active-tab="activeTab"></coupon-details-section>
		</view>
	</view>
</template>

<script>
import CouponListSection from '../../../components/coupon/index/CouponListSection.vue'
import CouponDetailsSection from '../../../components/coupon/index/CouponDetailsSection.vue'

export default {
	components: {
		CouponListSection,
		CouponDetailsSection
	},
	data() {
		return {
						activeTab: 'service'
		}
	},
	onLoad() {
		},
	methods: {
				handleMore() {
			console.log('More clicked')
		},
		handleCircle() {
			console.log('Circle clicked')
		},
		handleTabChange(tabId) {
			this.activeTab = tabId
		}
	}
}
</script>

<style scoped lang="scss">
.coupon-page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.coupon-content {
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	min-height: 200rpx;
	box-sizing: border-box;
}



.indicator-bar {
	width: 268rpx;
	height: 10rpx;
	background-color: #000000;
	border-radius: 200rpx;
}
</style>

