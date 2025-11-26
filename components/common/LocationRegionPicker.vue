<template>
	<view class="location-picker-overlay" @tap.self="handleCancel">
		<view class="location-picker-panel">
			<view class="picker-header">
				<text class="header-title">选择位置区域</text>
				<view class="header-actions">
					<text class="action cancel" @tap="handleCancel">取消</text>
					<text class="action confirm" @tap="handleConfirm">确定</text>
				</view>
			</view>
			<view class="picker-body">
				<scroll-view class="region-list" scroll-y>
					<view
						v-for="(region, index) in regions"
						:key="region.name"
						class="region-item"
						:class="{ active: index === activeRegionIndex }"
						@tap="selectRegion(index)"
					>
						{{ region.name }}
					</view>
				</scroll-view>
				<scroll-view class="area-list" scroll-y>
					<view
						v-for="(area, index) in currentAreas"
						:key="area"
						class="area-item"
						:class="{ active: index === activeAreaIndex }"
						@tap="selectArea(index)"
					>
						{{ area }}
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'LocationRegionPicker',
	props: {
		regions: {
			type: Array,
			default: () => [],
		},
		value: {
			type: Object,
			default: () => ({ regionIndex: 0, areaIndex: 0 }),
		},
	},
	data() {
		return {
			activeRegionIndex: this.value.regionIndex || 0,
			activeAreaIndex: this.value.areaIndex || 0,
		}
	},
	computed: {
		currentAreas() {
			const region = this.regions[this.activeRegionIndex]
			return region && region.areas ? region.areas : []
		},
	},
	watch: {
		value(newVal) {
			if (typeof newVal?.regionIndex === 'number') {
				this.activeRegionIndex = newVal.regionIndex
			}
			if (typeof newVal?.areaIndex === 'number') {
				this.activeAreaIndex = newVal.areaIndex
			}
		},
	},
	methods: {
		selectRegion(index) {
			if (this.activeRegionIndex !== index) {
				this.activeRegionIndex = index
				this.activeAreaIndex = 0
			}
		},
		selectArea(index) {
			this.activeAreaIndex = index
		},
		handleConfirm() {
			const region = this.regions[this.activeRegionIndex] || {}
			const area = this.currentAreas[this.activeAreaIndex] || ''
			this.$emit('confirm', {
				regionIndex: this.activeRegionIndex,
				areaIndex: this.activeAreaIndex,
				regionName: region.name || '',
				areaName: area,
			})
			this.$emit('close')
		},
		handleCancel() {
			this.$emit('cancel')
			this.$emit('close')
		},
	},
}
</script>

<style scoped lang="scss">
.location-picker-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.35);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
}

.location-picker-panel {
	width: 640rpx;
	height: 720rpx;
	background: #fff;
	border-radius: 24rpx;
	box-shadow: 0 30rpx 60rpx rgba(0, 0, 0, 0.18);
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.picker-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 32rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.header-title {
	font-size: 30rpx;
	color: #333;
	font-weight: 600;
}

.header-actions {
	display: flex;
	gap: 24rpx;
	font-size: 28rpx;
}

.action {
	padding: 8rpx 12rpx;
}

.cancel {
	color: #999;
}

.confirm {
	color: #ff7a45;
}

.picker-body {
	flex: 1;
	display: flex;
}

.region-list {
	width: 220rpx;
	background: #fafafa;
}

.region-item {
	padding: 28rpx 32rpx;
	font-size: 26rpx;
	color: #666;
	border-left: 6rpx solid transparent;
}

.region-item.active {
	background: #fff;
	color: #000;
	font-weight: 600;
	border-left-color: #000;
}

.area-list {
	flex: 1;
	background: #fff;
}

.area-item {
	padding: 24rpx 32rpx;
	font-size: 26rpx;
	color: #666;
	border-bottom: 1rpx solid #f7f7f7;
}

.area-item.active {
	color: #ff7a45;
	font-weight: 600;
}
</style>

