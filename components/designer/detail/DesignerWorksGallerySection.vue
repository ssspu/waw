<template>
	<view class="gallery-section">
		<view class="section-container">
			<!-- 筛选抽屉 -->
			<view class="filter-drawer" :class="{ show: showFilter }">
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

				<!-- 底部按钮 -->
				<view class="filter-footer">
					<view class="reset-btn" @tap="handleReset">
						<text class="reset-text">重置</text>
					</view>
					<view class="confirm-btn" @tap="handleConfirmFilter">
						<text class="confirm-text">确定</text>
					</view>
				</view>
				</view>
			</view>

			<!-- 筛选标签 -->
			<view class="filter-tags-card" v-if="showFilterTags">
				<view class="filter-tags-content">
					<view class="filter-tag-wrapper">
						<view class="filter-tag-item" @tap="handleTagClick('face')">
							<text class="tag-label">脸型</text>
							<image class="tag-face-icon" :src="selectedFaceIcon" mode="aspectFit"></image>
							<image class="tag-arrow-icon" :class="{ rotate: activeTagDropdown === 'face' }" src="https://bioflex.cn/static/icon/down.png" mode="aspectFit"></image>
						</view>
						<view class="tag-dropdown" v-if="activeTagDropdown === 'face'">
							<view class="face-options">
								<view
									v-for="(face, index) in faceTypes"
									:key="face.id"
									class="face-option-item"
									:class="{ active: selectedFace === face.id }"
									@tap.stop="handleFaceSelect(face.id)"
								>
									<image class="face-option-icon" :src="face.icon" mode="aspectFit"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="filter-tag-wrapper">
						<view class="filter-tag-item" @tap="handleTagClick('volume')">
							<text class="tag-label">发量</text>
							<text class="tag-value">{{ selectedVolumeLabel }}</text>
							<image class="tag-arrow-icon" :class="{ rotate: activeTagDropdown === 'volume' }" src="https://bioflex.cn/static/icon/down.png" mode="aspectFit"></image>
						</view>
						<view class="tag-dropdown" v-if="activeTagDropdown === 'volume'">
							<view class="text-options">
								<view
									v-for="(option, index) in hairAttributes[0].options"
									:key="option.value"
									class="text-option-item"
									:class="{ active: hairVolume === option.value }"
									@tap.stop="handleVolumeSelect(option.value)"
								>
									<text class="option-text">{{ option.label }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="filter-tag-wrapper">
						<view class="filter-tag-item" @tap="handleTagClick('quality')">
							<text class="tag-label">发质</text>
							<text class="tag-value">{{ selectedQualityLabel }}</text>
							<image class="tag-arrow-icon" :class="{ rotate: activeTagDropdown === 'quality' }" src="https://bioflex.cn/static/icon/down.png" mode="aspectFit"></image>
						</view>
						<view class="tag-dropdown" v-if="activeTagDropdown === 'quality'">
							<view class="text-options">
								<view
									v-for="(option, index) in hairAttributes[1].options"
									:key="option.value"
									class="text-option-item"
									:class="{ active: hairQuality === option.value }"
									@tap.stop="handleQualitySelect(option.value)"
								>
									<text class="option-text">{{ option.label }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 空数据状态 -->
			<view v-if="!loading && galleryImages.length === 0" class="empty-state">
				<image class="empty-icon" src="https://bioflex.cn/static/icon/empty-works.png" mode="aspectFit"></image>
				<text class="empty-text">暂无作品内容</text>
			</view>

			<!-- 加载状态 -->
			<view v-if="loading" class="loading-state">
				<text class="loading-text">加载中...</text>
			</view>

			<!-- 作品画廊 -->
			<scroll-view
				v-if="!loading && galleryImages.length > 0"
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
		designerId: {
			type: [String, Number],
			default: null
		},
		activeSubTab: {
			type: String,
			default: 'female'
		},
		showFilter: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			loading: false,
			scrollHeight: 0,
			selectedFace: 'oval',
			hairVolume: 'normal',
			hairQuality: 'normal',
			hairThickness: 'normal',
			showFilterTags: false,
			activeTagDropdown: '',
			
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
	computed: {
		selectedFaceIcon() {
			return `https://bioflex.cn/static/icon/face-${this.selectedFace}-mini.png`
		},
		selectedVolumeLabel() {
			const option = this.hairAttributes[0].options.find(o => o.value === this.hairVolume)
			return option ? option.label : '正常'
		},
		selectedQualityLabel() {
			const option = this.hairAttributes[1].options.find(o => o.value === this.hairQuality)
			return option ? option.label : '正常'
		}
	},
	watch: {
		designerId: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.fetchWorks()
				}
			}
		},
		activeSubTab() {
			this.fetchWorks()
		}
	},
	mounted() {
		const systemInfo = uni.getSystemInfoSync()
		this.scrollHeight = systemInfo.windowHeight
	},
	methods: {
		
		async fetchWorks() {
			if (!this.designerId || this.loading) return
			this.loading = true
			try {
				const res = await api.designer.getWorks(this.designerId, {
					type: this.activeSubTab,
					page: 1,
					pageSize: 20
				})
				if (res.code === 200) {
					const data = res.data
					const list = data.list || data.records || []
					this.galleryImages = list.map(w => ({
						src: w.image,
						title: w.title,
						description: w.description
					}))
				}
			} catch (err) {
				console.error('获取作品列表失败:', err)
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
		},
		handleReset() {
			this.selectedFace = 'oval'
			this.hairVolume = 'normal'
			this.hairQuality = 'normal'
			this.hairThickness = 'normal'
			this.showFilterTags = false
			this.fetchWorks()
		},
		handleConfirmFilter() {
			this.$emit('filter-confirm', {
				faceType: this.selectedFace,
				hairVolume: this.hairVolume,
				hairQuality: this.hairQuality,
				hairThickness: this.hairThickness
			})
			this.$emit('update:showFilter', false)
			this.showFilterTags = true
			this.fetchWorks()
		},
		handleTagClick(tag) {
			this.activeTagDropdown = this.activeTagDropdown === tag ? '' : tag
		},
		handleFaceSelect(value) {
			this.selectedFace = value
			this.activeTagDropdown = ''
		},
		handleVolumeSelect(value) {
			this.hairVolume = value
			this.activeTagDropdown = ''
		},
		handleQualitySelect(value) {
			this.hairQuality = value
			this.activeTagDropdown = ''
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
	width: 100%;
}

.filter-drawer {
	max-height: 0;
	overflow: hidden;
	transition: max-height 0.3s ease;
	background-color: #ffffff;
	border-radius: 8rpx;
}

.filter-drawer.show {
	max-height: 800rpx;
}

.filter-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	box-sizing: border-box;
	padding: 20rpx 30rpx;
}

.filter-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 30rpx;
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
	font-family: 'PingFang SC';
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
	font-family: 'PingFang SC';
	font-weight: normal;
	color: #666666;
	font-size: 22rpx;
	text-align: center;
	white-space: nowrap;

	&.active {
		font-weight: 600;
		color: #ffffff;
	}
}

.filter-footer {
	display: flex;
	align-items: center;
	gap: 24rpx;
	margin-top: 30rpx;
	padding-bottom: 20rpx;
}

.reset-btn,
.confirm-btn {
	flex: 1;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 40rpx;
}

.reset-btn {
	border: 2rpx solid #333333;
	background-color: #ffffff;
}

.confirm-btn {
	background-color: #333333;
}

.reset-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 500;
	color: #333333;
}

.confirm-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 500;
	color: #ffffff;
}

.filter-tags-card {
	padding: 0;
}

.filter-tags-content {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
	margin-bottom: 12rpx;
	margin-top: 12rpx;
}

.filter-tag-wrapper {
	position: relative;
}

.filter-tag-item {
	display: flex;
	align-items: center;
	gap: 6rpx;
	padding: 0 16rpx;
	height: 48rpx;
	background-color: #ffffff;
	border-radius: 6rpx;
}

.tag-label {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #a6a6a6;
}

.tag-face-icon {
	width: 24rpx;
	height: 24rpx;
}

.tag-value {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #333333;
	font-weight: 500;
}

.tag-arrow-icon {
	width: 20rpx;
	height: 20rpx;
	opacity: 0.5;
	transition: transform 0.3s ease;
}

.tag-arrow-icon.rotate {
	transform: rotate(180deg);
}

.tag-dropdown {
	position: absolute;
	top: 56rpx;
	left: 0;
	padding: 16rpx;
	background-color: #ffffff;
	border-radius: 6rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	z-index: 200;
}

.face-options {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.face-option-item {
	width: 56rpx;
	height: 56rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6rpx;
	background-color: #f6f6f6;
}

.face-option-item.active {
	background-color: #333333;
}

.face-option-icon {
	width: 40rpx;
	height: 40rpx;
}

.text-options {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.text-option-item {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 20rpx;
	height: 48rpx;
	background-color: #f6f6f6;
	border-radius: 6rpx;
}

.text-option-item.active {
	background-color: #333333;
}

.option-text {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #666666;
	white-space: nowrap;
}

.text-option-item.active .option-text {
	color: #ffffff;
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


.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 80rpx 40rpx;
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	box-sizing: border-box;
}

.empty-icon {
	width: 160rpx;
	height: 160rpx;
	margin-bottom: 24rpx;
	opacity: 0.6;
}

.empty-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 28rpx;
	color: #a6a6a6;
}

.loading-state {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60rpx 0;
	width: 100%;
}

.loading-text {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-size: 26rpx;
	color: #a6a6a6;
}
</style>
