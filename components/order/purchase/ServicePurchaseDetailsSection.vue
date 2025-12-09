<template>
	<view class="details-section">
		<!-- 分页指示器 -->
		<view v-if="totalPages > 0" class="pagination-indicator">
			<view class="pagination-badge">
				<text class="current-page">{{ currentPage }}</text>
				<text class="total-pages">/{{ totalPages }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ServicePurchaseDetailsSection',
	props: {
		currentPage: {
			type: Number,
			default: 1
		},
		totalPages: {
			type: Number,
			default: 0
		}
	}
}
</script>

<style scoped lang="scss">
.details-section {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	z-index: 20;
}

.pagination-indicator {
	display: flex;
	justify-content: flex-end;
	padding: 0 32rpx 60rpx 0;
}

.pagination-badge {
	display: flex;
	align-items: center;
	gap: 6rpx;
	padding: 6rpx 20rpx;
	background-color: rgba(0, 0, 0, 0.25);
	border-radius: 34rpx;
}

.current-page {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-size: 22rpx;
	font-weight: 500;
	color: #ffffff;
}

.total-pages {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 22rpx;
	font-weight: 400;
	color: rgba(255, 255, 255, 0.78);
}
</style>






