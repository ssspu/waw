<template>
	<view class="portfolio-detail-page">
		<!-- 设计师信息 -->
		<view class="designer-section">
			<view class="designer-info" @tap="handleDesignerClick">
				<image
					class="designer-avatar"
					:src="designerInfo.avatar"
					mode="aspectFill"
				></image>
				<view class="designer-details">
					<view class="designer-name-row">
						<text class="designer-name">{{ designerInfo.name }}</text>
						<image
							v-if="designerInfo.verified"
							class="verified-icon"
							src="https://bioflex.cn/static/icon/verified.png"
							mode="aspectFit"
						></image>
					</view>
					<view class="designer-tags">
						<text class="tag-text">{{ designerInfo.title }}</text>
						<text class="tag-divider">|</text>
						<view class="certification-tag" @tap.stop="handleCertClick">
							<image class="cert-icon" src="https://bioflex.cn/static/icon/certification.png" mode="aspectFit"></image>
							<text class="cert-text">职业认证</text>
							<image class="cert-arrow" src="https://bioflex.cn/static/icon/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="action-btns">
				<view class="msg-btn" @tap="handleMessage">
					<text class="msg-text">私信TA</text>
				</view>
				<view class="follow-btn" :class="{ 'followed': isFollowed }" @tap="handleFollow">
					<text class="follow-check" v-if="isFollowed">✓</text>
					<text class="follow-text">{{ isFollowed ? '已关注' : '+ 关注' }}</text>
				</view>
			</view>
		</view>

		<!-- 作品内容 -->
		<scroll-view class="content-scroll" scroll-y>
			<!-- 作品大图轮播 -->
			<view class="main-image-wrapper">
				<swiper
					class="image-swiper"
					:indicator-dots="false"
					:current="currentImageIndex"
					@change="handleSwiperChange"
				>
					<swiper-item v-for="(img, index) in workDetail.images" :key="index">
						<image
							class="main-image"
							:src="img"
							mode="aspectFill"
							@tap="handlePreviewImage(index)"
						></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 轮播指示点 -->
			<view class="swiper-dots" v-if="workDetail.images.length > 1">
				<view
					v-for="(img, index) in workDetail.images"
					:key="index"
					class="swiper-dot"
					:class="{ 'active': currentImageIndex === index }"
				></view>
			</view>

			<!-- 互动数据（测试阶段隐藏） -->
			<!-- <view class="interaction-section">
				<view class="interaction-left">
					<view class="interaction-item" @tap="handleLike">
						<image
							class="interaction-icon"
							:src="isLiked ? 'https://bioflex.cn/static/icon/thumb-up-fill.png' : 'https://bioflex.cn/static/icon/thumb-up-line@2x.png'"
							mode="aspectFit"
						></image>
						<text class="interaction-count" :class="{ 'liked': isLiked }">{{ workDetail.likes }}</text>
					</view>
					<view class="interaction-item" @tap="handleOpenComment">
						<image
							class="interaction-icon"
							src="https://bioflex.cn/static/icon/chat-1-line@2x.png"
							mode="aspectFit"
						></image>
						<text class="interaction-count">{{ workDetail.comments }}</text>
					</view>
					<view class="interaction-item" @tap="handleShare">
						<image
							class="interaction-icon"
							src="https://bioflex.cn/static/icon/share-forward-line@2x.png"
							mode="aspectFit"
						></image>
						<text class="interaction-count">{{ workDetail.shares }}</text>
					</view>
				</view>
				<view class="interaction-right">
					<view class="favorite-item" @tap="handleFavorite">
						<image
							class="favorite-icon"
							:src="isFavorited ? 'https://bioflex.cn/static/icon/star-fill.png' : 'https://bioflex.cn/static/icon/star.png'"
							mode="aspectFit"
						></image>
					</view>
				</view>
			</view> -->

			<!-- 评论区（测试阶段隐藏） -->
			<!-- <view class="comment-section">
				<text class="comment-title">评论·{{ commentTotal }}</text>

				<view class="comment-input-row">
					<image class="current-avatar" :src="userAvatar" mode="aspectFill"></image>
					<view class="comment-input-box" @tap="handleOpenComment">
						<text class="comment-placeholder">请说说你的看法吧……</text>
					</view>
				</view>

				<view class="comment-list">
					<view
						v-for="(comment, index) in commentList"
						:key="index"
						class="comment-item"
					>
						<image
							class="commenter-avatar"
							:src="comment.avatar"
							mode="aspectFill"
						></image>
						<view class="comment-content">
							<view class="comment-header">
								<text class="commenter-name">{{ comment.username }}</text>
								<text class="comment-time">{{ comment.time }}</text>
							</view>
							<text class="comment-text">{{ comment.content }}</text>
						</view>
					</view>
				</view>
			</view> -->
		</scroll-view>

		<!-- 底部操作栏（测试阶段隐藏） -->
		<!-- <view class="footer-bar">
			<view class="input-wrapper" @tap="handleOpenComment">
				<text class="input-placeholder">请说说你的看法吧……</text>
			</view>
			<view class="send-btn" @tap="handleSend">
				<text class="send-text">发送</text>
			</view>
		</view> -->
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { portfolioApi } from '@/api'

const isFollowed = ref(false)
const isLiked = ref(false)
const isFavorited = ref(false)
const currentImageIndex = ref(0)
const commentTotal = ref(0)
const userAvatar = ref('https://bioflex.cn/static/avatar/avatar.png')
const workId = ref('')

const designerInfo = ref({
	id: '',
	avatar: '',
	name: '',
	title: '',
	verified: false
})

const workDetail = ref({
	id: '',
	images: [],
	likes: 0,
	comments: 0,
	favorites: 0,
	shares: 0
})

const commentList = ref([])


const fetchWorkDetail = async (id) => {
	try {
		const res = await portfolioApi.getDetail(id)
		if (res.code === 200 && res.data) {
			const data = res.data
			workDetail.value = {
				id: data.id,
				images: data.images || [data.coverImage],
				likes: data.likes || 0,
				comments: data.comments || 0,
				favorites: data.favorites || 0,
				shares: data.shares || 0
			}
			isLiked.value = data.isLiked || false
			isFavorited.value = data.isFavorited || false
			commentTotal.value = data.comments || 0

			
			designerInfo.value = {
				id: data.designerId,
				avatar: data.designerAvatar,
				name: data.designerName,
				title: data.brandName || '设计师',
				verified: true
			}

			
			fetchComments(id)
		}
	} catch (e) {
		console.error('获取作品详情失败', e)
	}
}


const fetchComments = async (id) => {
	try {
		const res = await portfolioApi.getComments(id, { page: 1, pageSize: 10 })
		if (res.code === 200) {
			const comments = res.data.list || res.data.records || []
			commentList.value = comments.map(item => ({
				id: item.id,
				avatar: item.userAvatar,
				username: item.userName,
				time: item.createdAt,
				content: item.content
			}))
		}
	} catch (e) {
		console.error('获取评论列表失败', e)
	}
}

onMounted(() => {
	
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	const options = currentPage.options || {}
	if (options.id) {
		workId.value = options.id
		fetchWorkDetail(options.id)
	}
})

const handleBack = () => {
	uni.navigateBack()
}

const handleDesignerClick = () => {
	uni.navigateTo({
		url: `/pages/designer/info?id=${designerInfo.value.id}`
	})
}

const handleCertClick = () => {
	uni.showToast({
		title: '查看职业认证',
		icon: 'none'
	})
}

const handleMessage = () => {
	uni.showToast({
		title: '私信功能值发中',
		icon: 'none'
	})
}

const handleFollow = async () => {
	isFollowed.value = !isFollowed.value
	uni.showToast({
		title: isFollowed.value ? '关注成功' : '已取消关注',
		icon: 'none'
	})
}

const handleSwiperChange = (e) => {
	currentImageIndex.value = e.detail.current
}

const handlePreviewImage = (index) => {
	uni.previewImage({
		urls: workDetail.value.images,
		current: workDetail.value.images[index]
	})
}

const handleOpenComment = () => {
	uni.showToast({
		title: '评论功能值发中',
		icon: 'none'
	})
}

const handleLike = async () => {
	try {
		if (isLiked.value) {
			const res = await portfolioApi.unlike(workId.value)
			if (res.code === 200) {
				isLiked.value = false
				workDetail.value.likes = res.data.likes
			}
		} else {
			const res = await portfolioApi.like(workId.value)
			if (res.code === 200) {
				isLiked.value = true
				workDetail.value.likes = res.data.likes
			}
		}
	} catch (e) {
		console.error('点赞操作失败', e)
	}
}

const handleShare = async () => {
	try {
		await portfolioApi.share(workId.value, { channel: 'wechat' })
		uni.showToast({
			title: '分享成功',
			icon: 'none'
		})
	} catch (e) {
		uni.showToast({
			title: '分享功能值发中',
			icon: 'none'
		})
	}
}

const handleFavorite = async () => {
	try {
		if (isFavorited.value) {
			const res = await portfolioApi.unfavorite(workId.value)
			if (res.code === 200) {
				isFavorited.value = false
				uni.showToast({
					title: '已取消收藏',
					icon: 'none'
				})
			}
		} else {
			const res = await portfolioApi.favorite(workId.value)
			if (res.code === 200) {
				isFavorited.value = true
				uni.showToast({
					title: '收藏成功',
					icon: 'none'
				})
			}
		}
	} catch (e) {
		console.error('收藏操作失败', e)
	}
}

const handleSend = () => {
	uni.showToast({
		title: '请先输入评论内容',
		icon: 'none'
	})
}
</script>

<style scoped lang="scss">
.portfolio-detail-page {
	width: 100%;
	min-height: 100vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	box-sizing: border-box;
}

.navbar-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.nav-icon-btn {
	width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-dots {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.dot {
	width: 6rpx;
	height: 6rpx;
	border-radius: 50%;
	background-color: #000000;
}

.nav-circle {
	width: 28rpx;
	height: 28rpx;
	border-radius: 50%;
	border: 2rpx solid #000000;
	display: flex;
	align-items: center;
	justify-content: center;
}

.circle-dot {
	width: 10rpx;
	height: 10rpx;
	border-radius: 50%;
	background-color: #000000;
}


.designer-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 30rpx;
	background-color: #ffffff;
}

.designer-info {
	display: flex;
	align-items: center;
	gap: 16rpx;
	flex: 1;
}

.designer-avatar {
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	flex-shrink: 0;
}

.designer-details {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.designer-name-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.designer-name {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 600;
	color: #333333;
}

.verified-icon {
	width: 28rpx;
	height: 28rpx;
}

.designer-tags {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.tag-text {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #999999;
}

.tag-divider {
	font-size: 22rpx;
	color: #e5e5e5;
}

.certification-tag {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.cert-icon {
	width: 22rpx;
	height: 22rpx;
}

.cert-text {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #999999;
}

.cert-arrow {
	width: 18rpx;
	height: 18rpx;
	opacity: 0.5;
}

.action-btns {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.msg-btn {
	width: 134rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;
	border-radius: 8rpx;
}

.msg-text {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #333333;
}

.follow-btn {
	width: 144rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #333333;
	border-radius: 8rpx;
	gap: 4rpx;

	&.followed {
		background-color: #f5f5f5;
		border: 1rpx solid #e5e5e5;
	}
}

.follow-check {
	font-size: 22rpx;
	color: #333333;
}

.follow-text {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #ffffff;
}

.follow-btn.followed .follow-text {
	color: #333333;
}


.content-scroll {
	flex: 1;
	padding-bottom: 40rpx;
}

.main-image-wrapper {
	width: 100%;
}

.image-swiper {
	width: 750rpx;
	height: 1000rpx;
}

.main-image {
	width: 100%;
	height: 100%;
}

.swiper-dots {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	padding: 20rpx 0;
	background-color: #ffffff;
}

.swiper-dot {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background-color: #e0e0e0;
	transition: all 0.3s;

	&.active {
		background-color: #333333;
	}
}


.interaction-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 30rpx;
	background-color: #ffffff;
}

.interaction-left {
	display: flex;
	align-items: center;
	gap: 40rpx;
}

.interaction-item {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.interaction-icon {
	width: 40rpx;
	height: 40rpx;
}

.interaction-count {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	color: #333333;

	&.liked {
		color: #ff4d4f;
	}
}

.interaction-right {
	display: flex;
	align-items: center;
}

.favorite-item {
	display: flex;
	align-items: center;
	justify-content: center;
}

.favorite-icon {
	width: 44rpx;
	height: 44rpx;
}


.comment-section {
	background-color: #ffffff;
	padding: 24rpx 30rpx;
	border-top: 1rpx solid #f5f5f5;
}

.comment-title {
	font-family: 'PingFang SC';
	font-size: 28rpx;
	font-weight: 600;
	color: #000000;
	display: block;
	margin-bottom: 24rpx;
}

.comment-input-row {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-bottom: 32rpx;
}

.current-avatar {
	width: 56rpx;
	height: 56rpx;
	border-radius: 50%;
	flex-shrink: 0;
}

.comment-input-box {
	flex: 1;
	height: 56rpx;
	background-color: #f6f6f6;
	border-radius: 28rpx;
	display: flex;
	align-items: center;
	padding: 0 24rpx;
}

.comment-placeholder {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #a6a6a6;
}

.comment-list {
	display: flex;
	flex-direction: column;
	gap: 28rpx;
}

.comment-item {
	display: flex;
	align-items: flex-start;
	gap: 16rpx;
}

.commenter-avatar {
	width: 56rpx;
	height: 56rpx;
	border-radius: 50%;
	flex-shrink: 0;
}

.comment-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.comment-header {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.commenter-name {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	font-weight: 500;
	color: #333333;
}

.comment-time {
	font-family: 'PingFang SC';
	font-size: 22rpx;
	color: #a6a6a6;
}

.comment-text {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	color: #333333;
	line-height: 1.5;
}


.footer-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	gap: 20rpx;
	padding: 16rpx 30rpx;
	padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
	background-color: #ffffff;
	border-top: 1rpx solid #f0f0f0;
	box-sizing: border-box;
}

.input-wrapper {
	flex: 1;
	height: 64rpx;
	background-color: #f6f6f6;
	border-radius: 32rpx;
	display: flex;
	align-items: center;
	padding: 0 24rpx;
}

.input-placeholder {
	font-family: 'PingFang SC';
	font-size: 24rpx;
	color: #a6a6a6;
}

.send-btn {
	padding: 14rpx 36rpx;
	background-color: #333333;
	border-radius: 32rpx;
}

.send-text {
	font-family: 'PingFang SC';
	font-size: 26rpx;
	color: #ffffff;
}
</style>
