<template>
	<view class="gallery-section">
		<view class="section-container">
			<!-- 选择器卡片 -->
			<view class="filter-card">
				<view class="filter-content">
					<!-- 脸型选择 -->
					<view class="filter-row">
						<text class="filter-label">脸型</text>
						<view class="face-type-group">
							<view 
								v-for="(face, index) in faceTypes" 
								:key="face.id"
								class="face-type-item"
								:class="{ active: selectedFace === face.id }"
								@tap="handleFaceChange(face.id)"
							>
								<image 
									class="face-icon" 
									:src="selectedFace === face.id ? face.activeIcon : face.icon" 
									mode="aspectFit"
								></image>
							</view>
						</view>
					</view>
					
					<!-- 发量选择 -->
					<view class="filter-row">
						<text class="filter-label">{{ hairAttributes[0].label }}</text>
						<view class="toggle-group">
							<view 
								v-for="(option, index) in hairAttributes[0].options" 
								:key="option.value"
								class="toggle-item"
								:class="{ active: hairVolume === option.value }"
								@tap="handleHairVolumeChange(option.value)"
							>
								<text class="toggle-text" :class="{ active: hairVolume === option.value }">
									{{ option.label }}
								</text>
							</view>
						</view>
					</view>
					
					<!-- 发质选择 -->
					<view class="filter-row">
						<text class="filter-label">{{ hairAttributes[1].label }}</text>
						<view class="toggle-group">
							<view 
								v-for="(option, index) in hairAttributes[1].options" 
								:key="option.value"
								class="toggle-item"
								:class="{ active: hairQuality === option.value }"
								@tap="handleHairQualityChange(option.value)"
							>
								<text class="toggle-text" :class="{ active: hairQuality === option.value }">
									{{ option.label }}
								</text>
							</view>
						</view>
					</view>
					
					<!-- 粗细选择 -->
					<view class="filter-row">
						<text class="filter-label">{{ hairAttributes[2].label }}</text>
						<view class="toggle-group">
							<view 
								v-for="(option, index) in hairAttributes[2].options" 
								:key="option.value"
								class="toggle-item"
								:class="{ active: hairThickness === option.value }"
								@tap="handleHairThicknessChange(option.value)"
							>
								<text class="toggle-text" :class="{ active: hairThickness === option.value }">
									{{ option.label }}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 作品画廊 -->
			<scroll-view 
				class="gallery-scroll" 
				scroll-y 
				:style="{ height: scrollHeight + 'px' }"
				@scrolltolower="handleScrollToBottom"
			>
				<view class="gallery-grid">
					<image 
						v-for="(image, index) in galleryImages" 
						:key="index"
						class="gallery-image" 
						:src="image.src" 
						mode="aspectFill"
						@tap="handleImageClick(image.src, index)"
					></image>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import api from '@/api'

export default {
	props: {
		brandId: {
			type: [String, Number],
			default: null
		}
	},
	data() {
		return {
			scrollHeight: 0,
			selectedFace: 'oval',
			hairVolume: 'less',
			hairQuality: 'soft',
			hairThickness: 'fine',
			loading: false,
			
			faceTypes: [
				{ id: 'oval', icon: 'https://bioflex.cn/static/icon/face-oval.png', activeIcon: 'https://bioflex.cn/static/icon/face-oval-active.png' },
				{ id: 'circle', icon: 'https://bioflex.cn/static/icon/face-circle.png', activeIcon: 'https://bioflex.cn/static/icon/face-circle-active.png' },
				{ id: 'square', icon: 'https://bioflex.cn/static/icon/face-square.png', activeIcon: 'https://bioflex.cn/static/icon/face-square-active.png' },
				{ id: 'diamond', icon: 'https://bioflex.cn/static/icon/face-diamond.png', activeIcon: 'https://bioflex.cn/static/icon/face-diamond-active.png' },
				{ id: 'triangle', icon: 'https://bioflex.cn/static/icon/face-triangle.png', activeIcon: 'https://bioflex.cn/static/icon/face-triangle-active.png' },
				{ id: 'rounded-rect', icon: 'https://bioflex.cn/static/icon/face-rounded-rect.png', activeIcon: 'https://bioflex.cn/static/icon/face-rounded-rect-active.png' }
			],
			hairAttributes: [
				{
					label: "发量",
					options: [
						{ value: "less", label: "少" },
						{ value: "normal", label: "正常" },
						{ value: "more", label: "多" }
					]
				},
				{
					label: "发质",
					options: [
						{ value: "soft", label: "软" },
						{ value: "normal", label: "正常" },
						{ value: "hard", label: "硬" }
					]
				},
				{
					label: "粗细",
					options: [
						{ value: "fine", label: "细" },
						{ value: "normal", label: "正常" },
						{ value: "thick", label: "粗" }
					]
				}
			],
			galleryImages: []
		}
	},
	mounted() {
		const systemInfo = uni.getSystemInfoSync()
		this.scrollHeight = systemInfo.windowHeight
		this.fetchWorks()
	},
	methods: {
		
		async fetchWorks() {
			if (this.loading) return
			this.loading = true
			try {
				const res = await api.brand.getWorks(this.brandId, { pageSize: 50 })
				if (res.code === 200 && res.data) {
					const list = res.data.list || res.data.records || []
					
					this.galleryImages = list.map(work => ({
						id: work.id,
						src: work.image || work.cover || ''
					}))
				}
			} catch (err) {
				console.error('获取品牌馆作品失败:', err)
			} finally {
				this.loading = false
			}
		},
		handleFaceChange(value) {
			this.selectedFace = value
		},
		handleHairVolumeChange(value) {
			this.hairVolume = value
		},
		handleHairQualityChange(value) {
			this.hairQuality = value
		},
		handleHairThicknessChange(value) {
			this.hairThickness = value
		},
		handleImageClick(image, index) {
			const urls = this.galleryImages.map(img => img.src)
			uni.previewImage({
				urls: urls,
				current: image
			})
		},
		handleScrollToBottom() {
			console.log('已滚动到底部')
		}
	}
}
</script>

<style scoped lang="scss">
.gallery-section {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 726rpx;
	margin: 0 auto;
	align-items: stretch;
	gap: 20rpx;
	// padding: 0 12rpx;
	box-sizing: border-box;
}

.section-container {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	width: 100%;
}

.filter-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
}

.filter-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 30rpx;
	padding: 18rpx 20rpx 20rpx;
	box-sizing: border-box;
}

.filter-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
}

.filter-label {
	width: fit-content;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 24rpx;
	text-align: center;
	flex-shrink: 0;
	white-space: nowrap;
}

.face-type-group {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.face-type-item {
	width: 90rpx;
	height: 90rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.face-icon {
	width: 100rpx;
	height: 100rpx;
}

.toggle-group {
	display: inline-flex;
	align-items: center;
	gap: 14rpx;
	flex-shrink: 0;
}

.toggle-item {
	display: flex;
	width: 196rpx;
	height: 60rpx;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	padding: 16rpx 40rpx;
	background-color: #f6f6f6;
	border-radius: 0;
	border: 0;
	cursor: pointer;
	box-sizing: border-box;
	
	&.active {
		background-color: #333333;
		border-radius: 4rpx;
	}
}

.toggle-text {
	width: fit-content;
	margin-top: -3rpx;
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
	text-align: center;
	white-space: nowrap;
	
	&.active {
		font-family: 'PingFang_SC-Semibold', Helvetica;
		font-weight: normal;
		color: #ffffff;
	}
}

.gallery-scroll {
	width: 100%;
	background-color: transparent;
}

.gallery-grid {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: space-between;
	gap: 10rpx;
	width: 100%;
	box-sizing: border-box;
	padding: 10rpx;
}

.gallery-image {
	width: calc((100% - 10rpx) / 2);
	height: 358rpx;
	border-radius: 8rpx;
	object-fit: cover;
	flex-shrink: 0;
	cursor: pointer;
}

</style>
