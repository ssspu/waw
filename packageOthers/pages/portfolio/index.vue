<template>
	<view class="portfolio-page">
		<view class="status-bar-space" :style="{ height: statusBarHeight + 'px' }"></view>
		<!-- 导航栏 -->
		<view class="navbar">
			<view class="navbar-content">
				<view class="back-btn" @tap="handleBack">
					<image
						class="back-icon"
						src="https://c.animaapp.com/mi5nkzbpeEnFKd/img/frame.svg"
						mode="aspectFit"
					></image>
				</view>
				<text class="navbar-title">作品集</text>
				<view class="navbar-right"></view>
			</view>
		</view>

		<!-- 搜索和筛选区域 -->
		<view class="filter-section">
			<!-- 搜索框 -->
			<view class="search-box">
				<image class="search-icon" src="/static/icon/search.png" mode="aspectFit"></image>
				<input
					class="search-input"
					type="text"
					v-model="searchKeyword"
					placeholder="请输入关键词搜索"
					placeholder-class="search-placeholder"
					confirm-type="search"
					@confirm="handleSearch"
				/>
				<image
					v-if="searchKeyword"
					class="clear-icon"
					src="/static/icon/close.png"
					mode="aspectFit"
					@tap="handleClearSearch"
				></image>
			</view>

			<!-- 分类和筛选 -->
			<view class="category-row">
				<view class="category-tabs">
					<view
						v-for="(category, index) in categories"
						:key="index"
						class="category-item"
						:class="{ active: activeCategory === category.value }"
						@tap="handleCategoryChange(category.value)"
					>
						<text class="category-text">{{ category.label }}</text>
						<view v-if="activeCategory === category.value" class="category-indicator"></view>
					</view>
				</view>
				<view class="filter-btn" @tap="handleToggleFilter">
					<text class="filter-text">筛选</text>
					<image
						class="filter-arrow"
						:class="{ rotate: showFilterDrawer }"
						src="/static/icon/down.png"
						mode="aspectFit"
					></image>
				</view>
			</view>

			<!-- 下拉筛选卡片 -->
			<view class="filter-drawer" :class="{ show: showFilterDrawer }">
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
							<text class="filter-label">发量</text>
							<view class="toggle-group">
								<view
									v-for="(option, index) in hairAmountOptions"
									:key="option.value"
									class="toggle-item"
									:class="{ active: hairVolume === option.value }"
									@tap="hairVolume = option.value"
								>
									<text class="toggle-text" :class="{ active: hairVolume === option.value }">
										{{ option.label }}
									</text>
								</view>
							</view>
						</view>

						<!-- 发质选择 -->
						<view class="filter-row">
							<text class="filter-label">发质</text>
							<view class="toggle-group">
								<view
									v-for="(option, index) in hairQualityOptions"
									:key="option.value"
									class="toggle-item"
									:class="{ active: hairQuality === option.value }"
									@tap="hairQuality = option.value"
								>
									<text class="toggle-text" :class="{ active: hairQuality === option.value }">
										{{ option.label }}
									</text>
								</view>
							</view>
						</view>

						<!-- 粗细选择 -->
						<view class="filter-row">
							<text class="filter-label">粗细</text>
							<view class="toggle-group">
								<view
									v-for="(option, index) in hairThicknessOptions"
									:key="option.value"
									class="toggle-item"
									:class="{ active: hairThickness === option.value }"
									@tap="hairThickness = option.value"
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
		</view>

		<!-- 筛选标签卡片 - 独立区块 -->
		<view class="filter-tags-card" v-if="showFilterTags">
			<view class="filter-tags-content">
				<!-- 脸型标签 -->
				<view class="filter-tag-wrapper">
					<view class="filter-tag-item" @tap="handleTagClick('face')">
						<text class="tag-label">脸型</text>
						<image class="tag-face-icon" :src="selectedFaceIcon" mode="aspectFit"></image>
						<image class="tag-arrow-icon" :class="{ rotate: activeTagDropdown === 'face' }" src="/static/icon/down.png" mode="aspectFit"></image>
					</view>
					<!-- 脸型下拉选项 -->
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
				<!-- 发量标签 -->
				<view class="filter-tag-wrapper">
					<view class="filter-tag-item" @tap="handleTagClick('volume')">
						<text class="tag-label">发量</text>
						<text class="tag-value">{{ selectedVolumeLabel }}</text>
						<image class="tag-arrow-icon" :class="{ rotate: activeTagDropdown === 'volume' }" src="/static/icon/down.png" mode="aspectFit"></image>
					</view>
					<!-- 发量下拉选项 -->
					<view class="tag-dropdown" v-if="activeTagDropdown === 'volume'">
						<view class="text-options">
							<view
								v-for="(option, index) in hairAmountOptions"
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
				<!-- 发质标签 -->
				<view class="filter-tag-wrapper">
					<view class="filter-tag-item" @tap="handleTagClick('quality')">
						<text class="tag-label">发质</text>
						<text class="tag-value">{{ selectedQualityLabel }}</text>
						<image class="tag-arrow-icon" :class="{ rotate: activeTagDropdown === 'quality' }" src="/static/icon/down.png" mode="aspectFit"></image>
					</view>
					<!-- 发质下拉选项 -->
					<view class="tag-dropdown" v-if="activeTagDropdown === 'quality'">
						<view class="text-options">
							<view
								v-for="(option, index) in hairQualityOptions"
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

		<!-- 筛选按钮的遮罩层 -->
		<view class="filter-mask" v-if="showFilterDrawer" @tap="handleCloseFilter"></view>

		<!-- 作品列表 -->
		<scroll-view
			class="gallery-scroll"
			scroll-y
			@scrolltolower="handleLoadMore"
			:lower-threshold="100"
		>
			<view class="gallery-grid">
				<view
					v-for="(item, index) in displayList"
					:key="item.id"
					class="gallery-item"
					@tap="handleItemClick(item)"
				>
					<image
						class="gallery-image"
						:src="item.image"
						mode="aspectFill"
						lazy-load
					></image>
				</view>
			</view>
			<!-- 加载状态 -->
			<view class="load-more" v-if="displayList.length > 0">
				<text class="load-more-text">{{ loadMoreText }}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const statusBarHeight = ref(44)
const activeCategory = ref('women')
const showFilterDrawer = ref(false)
const showFilterTags = ref(false)
const activeTagDropdown = ref('')
const selectedFace = ref('oval')
const hairVolume = ref('normal')
const hairQuality = ref('normal')
const hairThickness = ref('normal')
const searchKeyword = ref('')

// 分页相关
const pageSize = 6
const currentPage = ref(1)
const isLoading = ref(false)
const hasMore = ref(true)

// 页面加载时获取参数和状态栏高度
onMounted(() => {
	// 获取状态栏高度
	const systemInfo = uni.getSystemInfoSync()
	statusBarHeight.value = systemInfo.statusBarHeight || 44

	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	const options = currentPage.options || {}
	if (options.category) {
		activeCategory.value = options.category
	}
})

const categories = [
	{ label: '女士', value: 'women' },
	{ label: '男士', value: 'men' },
	{ label: '儿童', value: 'children' }
]

// 脸型选项
const faceTypes = [
	{ id: 'oval', icon: '/static/icon/face-oval.png', activeIcon: '/static/icon/face-oval-active.png' },
	{ id: 'circle', icon: '/static/icon/face-circle.png', activeIcon: '/static/icon/face-circle-active.png' },
	{ id: 'square', icon: '/static/icon/face-square.png', activeIcon: '/static/icon/face-square-active.png' },
	{ id: 'diamond', icon: '/static/icon/face-diamond.png', activeIcon: '/static/icon/face-diamond-active.png' },
	{ id: 'triangle', icon: '/static/icon/face-triangle.png', activeIcon: '/static/icon/face-triangle-active.png' },
	{ id: 'rounded-rect', icon: '/static/icon/face-rounded-rect.png', activeIcon: '/static/icon/face-rounded-rect-active.png' }
]

const hairAmountOptions = [
	{ label: '少', value: 'less' },
	{ label: '正常', value: 'normal' },
	{ label: '多', value: 'more' }
]

const hairQualityOptions = [
	{ label: '软', value: 'soft' },
	{ label: '正常', value: 'normal' },
	{ label: '硬', value: 'hard' }
]

const hairThicknessOptions = [
	{ label: '细', value: 'fine' },
	{ label: '正常', value: 'normal' },
	{ label: '粗', value: 'thick' }
]

// 筛选标签显示图标
const selectedFaceIcon = computed(() => {
	return `/static/icon/face-${selectedFace.value}-mini.png`
})

const selectedVolumeLabel = computed(() => {
	const option = hairAmountOptions.find(o => o.value === hairVolume.value)
	return option ? option.label : '正常'
})

const selectedQualityLabel = computed(() => {
	const option = hairQualityOptions.find(o => o.value === hairQuality.value)
	return option ? option.label : '正常'
})

// 按分类的图片数据
const galleryByCategory = {
	women: [
		{ id: 1, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---176.svg', category: 'women' },
		{ id: 2, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---177.svg', category: 'women' },
		{ id: 3, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---178.svg', category: 'women' },
		{ id: 4, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---179.svg', category: 'women' },
		{ id: 5, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---180.svg', category: 'women' },
		{ id: 6, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---181.svg', category: 'women' },
		{ id: 7, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---176.svg', category: 'women' },
		{ id: 8, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---177.svg', category: 'women' },
		{ id: 9, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---178.svg', category: 'women' },
		{ id: 10, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---179.svg', category: 'women' },
		{ id: 11, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---180.svg', category: 'women' },
		{ id: 12, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---181.svg', category: 'women' }
	],
	men: [
		{ id: 13, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 14, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 15, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 16, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 17, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 18, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 19, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 20, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 21, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 22, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 23, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' },
		{ id: 24, image: 'https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png', category: 'men' }
	],
	children: [
		{ id: 25, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---176.svg', category: 'children' },
		{ id: 26, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---177.svg', category: 'children' },
		{ id: 27, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---178.svg', category: 'children' },
		{ id: 28, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---179.svg', category: 'children' },
		{ id: 29, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---180.svg', category: 'children' },
		{ id: 30, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---181.svg', category: 'children' },
		{ id: 31, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---176.svg', category: 'children' },
		{ id: 32, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---177.svg', category: 'children' },
		{ id: 33, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---178.svg', category: 'children' },
		{ id: 34, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---179.svg', category: 'children' },
		{ id: 35, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---180.svg', category: 'children' },
		{ id: 36, image: 'https://c.animaapp.com/mimxn9o1hGbnXQ/img/---181.svg', category: 'children' }
	]
}

// 计算当前分类的图片列表
const galleryList = computed(() => {
	return galleryByCategory[activeCategory.value] || galleryByCategory.women
})

// 分页显示列表
const displayList = computed(() => {
	const list = galleryList.value
	return list.slice(0, currentPage.value * pageSize)
})

// 加载更多文案
const loadMoreText = computed(() => {
	if (isLoading.value) return '加载中...'
	if (!hasMore.value) return '没有更多了'
	return '上拉加载更多'
})

// 监听分类变化，重置分页
watch(activeCategory, () => {
	currentPage.value = 1
	hasMore.value = true
})

const handleBack = () => {
	uni.navigateBack()
}

const handleSearch = () => {
	console.log('搜索关键词:', searchKeyword.value)
	// 根据关键词过滤作品列表
	currentPage.value = 1
	hasMore.value = true
}

const handleClearSearch = () => {
	searchKeyword.value = ''
	currentPage.value = 1
	hasMore.value = true
}

// 加载更多
const handleLoadMore = () => {
	if (isLoading.value || !hasMore.value) return

	const totalItems = galleryList.value.length
	const loadedItems = currentPage.value * pageSize

	if (loadedItems >= totalItems) {
		hasMore.value = false
		return
	}

	isLoading.value = true
	// 模拟加载延迟
	setTimeout(() => {
		currentPage.value++
		isLoading.value = false

		// 检查是否还有更多
		if (currentPage.value * pageSize >= totalItems) {
			hasMore.value = false
		}
	}, 500)
}

const handleCategoryChange = (value) => {
	activeCategory.value = value
}

const handleToggleFilter = () => {
	showFilterDrawer.value = !showFilterDrawer.value
}

const handleCloseFilter = () => {
	showFilterDrawer.value = false
}

const handleCloseAllDropdown = () => {
	showFilterDrawer.value = false
	activeTagDropdown.value = ''
}

const handleTagClick = (tag) => {
	if (activeTagDropdown.value === tag) {
		activeTagDropdown.value = ''
	} else {
		activeTagDropdown.value = tag
	}
}

const handleFaceChange = (value) => {
	selectedFace.value = value
}

const handleFaceSelect = (value) => {
	selectedFace.value = value
	activeTagDropdown.value = ''
}

const handleVolumeSelect = (value) => {
	hairVolume.value = value
	activeTagDropdown.value = ''
}

const handleQualitySelect = (value) => {
	hairQuality.value = value
	activeTagDropdown.value = ''
}

const handleReset = () => {
	selectedFace.value = 'oval'
	hairVolume.value = 'normal'
	hairQuality.value = 'normal'
	hairThickness.value = 'normal'
	showFilterTags.value = false
}

const handleConfirmFilter = () => {
	showFilterDrawer.value = false
	showFilterTags.value = true
	// 根据筛选条件过滤列表
}

const handleItemClick = (item) => {
	uni.navigateTo({
		url: `/packageOthers/pages/portfolio/detail?id=${item.id}`
	})
}
</script>

<style scoped lang="scss">
.portfolio-page {
	width: 100%;
	height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-sizing: border-box;
}

.status-bar-space {
	background-color: #ffffff;
	position: relative;
	z-index: 200;
}

.navbar {
	width: 100%;
	background-color: #ffffff;
	position: relative;
	z-index: 200;
}

.navbar-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 88rpx;
	padding: 0 30rpx;
	position: relative;
}

.back-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.back-icon {
	width: 32rpx;
	height: 32rpx;
}

.navbar-title {
	font-family: 'PingFang SC';
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

.navbar-right {
	width: 32rpx;
}

.search-box {
	display: flex;
	align-items: center;
	height: 64rpx;
	background-color: #f6f6f6;
	border-radius: 32rpx;
	padding: 0 24rpx;
	gap: 12rpx;
}

.search-icon {
	width: 28rpx;
	height: 28rpx;
	opacity: 0.5;
	flex-shrink: 0;
}

.search-input {
	flex: 1;
	height: 64rpx;
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #333333;
}

.search-placeholder {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #a6a6a6;
}

.clear-icon {
	width: 28rpx;
	height: 28rpx;
	opacity: 0.5;
	flex-shrink: 0;
}

.filter-section {
	background-color: #ffffff;
	padding: 20rpx 30rpx 0;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	position: relative;
	z-index: 150;
}

.category-row {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding-top: 4rpx;
}

.category-tabs {
	display: flex;
	align-items: flex-start;
	gap: 80rpx;
}

.category-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
}

.category-text {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 500;
	color: #a6a6a6;
}

.category-item.active .category-text {
	font-weight: 600;
	color: #000000;
}

.category-indicator {
	width: 20rpx;
	height: 6rpx;
	background-color: #000000;
	border-radius: 3rpx;
}

.filter-btn {
	display: flex;
	align-items: center;
	gap: 8rpx;
	padding-top: 4rpx;
}

.filter-text {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	font-weight: 500;
	color: #333333;
}

.filter-arrow {
	width: 24rpx;
	height: 24rpx;
	transition: transform 0.3s ease;
}

.filter-arrow.rotate {
	transform: rotate(180deg);
}

/* 筛选标签卡片 - 独立区块 */
.filter-tags-card {
	padding: 12rpx 12rpx 0 12rpx;
	background-color: #f2f2f2;
	position: relative;
	z-index: 100;
}

.filter-tags-content {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
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

/* 标签下拉选项 */
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

/* 下拉筛选抽屉 */
.filter-drawer {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	max-height: 0;
	overflow: hidden;
	transition: max-height 0.3s ease;
	background-color: #ffffff;
	z-index: 101;
}

.filter-drawer.show {
	max-height: 800rpx;
}

.filter-card {
	width: 100%;
	background-color: #ffffff;
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

/* 遮罩层 */
.filter-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 99;
	pointer-events: auto;
}

.gallery-scroll {
	flex: 1;
	padding: 12rpx;
	box-sizing: border-box;
	height: 0;
}

.gallery-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
	width: 100%;
	box-sizing: border-box;
}

.gallery-item {
	width: calc(50% - 6rpx);
	border-radius: 8rpx;
	overflow: hidden;
	box-sizing: border-box;
}

.gallery-image {
	width: 100%;
	height: 478rpx;
}

/* 加载更多 */
.load-more {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 30rpx 0;
}

.load-more-text {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #a6a6a6;
}
</style>
