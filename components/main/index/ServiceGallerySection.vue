<template>
	<view id="service-gallery-section" class="service-gallery-section">
		<!-- 附近推荐标题 -->
		<view class="nearby-header">
			<text class="nearby-title">附近推荐</text>
		</view>

		<!-- 分类标题 -->
		<view v-if="showCategoryHeader" class="category-header">
			<image class="header-icon" src="https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2.svg" mode="aspectFit"></image>
			<text class="header-title">{{ displayTitle }}</text>
		</view>

		<!-- 服务卡片网格 -->
		<view class="service-grid">
			<view
				v-for="(card, index) in filteredServiceCards"
				:key="card.id"
				class="service-card"
				@tap="handleCardClick(card)"
			>
				<image
					class="card-image"
					:src="card.image"
					:alt="card.title"
					mode="aspectFill"
				></image>

				<view class="card-info">
					<view class="card-header">
						<text class="card-title">{{ card.title }}</text>
						<text class="card-description">{{ card.description }}</text>
						<view class="card-price">
							<text class="price-symbol">¥</text>
							<text class="price-value">{{ card.price }}</text>
						</view>
					</view>

					<view class="card-footer">
						<view class="stylist-info">
							<view class="stylist-avatar">
								<image
									class="avatar-image"
									:src="card.stylist.avatar"
									:alt="card.stylist.name"
									mode="aspectFill"
								></image>
							</view>
							<view class="stylist-details">
								<view class="stylist-name-row">
									<text class="stylist-name">{{ card.stylist.name }}</text>
									<text class="stylist-role">{{ card.stylist.role }}</text>
								</view>
								<view class="stylist-rating">
									<text class="rating-score">{{ card.rating }}</text>
									<text class="star-icon">★</text>
									<text class="review-count">({{ card.reviews }})</text>
								</view>
							</view>
						</view>
						<text class="card-distance">{{ card.distance }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		showCategoryHeader: {
			type: Boolean,
			default: true
		},
		selectedCategory: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			// 所有服务卡片数据，包含分类字段
			serviceCards: [
				// 造型类
				{
					id: 1,
					category: '造型',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "日常造型",
					description: "洗发+吹风+造型设计",
					price: "128",
					stylist: { name: "李天天", role: "造型师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "526", distance: "3.2km",
				},
				{
					id: 2,
					category: '造型',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "新娘造型",
					description: "妆容+发型+整体造型",
					price: "1288",
					stylist: { name: "张美美", role: "高级造型师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "328", distance: "5.1km",
				},
				{
					id: 25,
					category: '造型',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "晚宴造型",
					description: "精致晚宴发型+整体搭配",
					price: "688",
					stylist: { name: "王晚宴", role: "资深造型师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "234", distance: "4.2km",
				},
				{
					id: 26,
					category: '造型',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "约会造型",
					description: "清新自然+甜美风格",
					price: "168",
					stylist: { name: "刘甜甜", role: "造型师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "456", distance: "2.8km",
				},
				{
					id: 27,
					category: '造型',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "职场造型",
					description: "干练专业+商务风格",
					price: "198",
					stylist: { name: "陈职场", role: "形象顾问", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "389", distance: "3.5km",
				},
				{
					id: 28,
					category: '造型',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "派对造型",
					description: "时尚潮流+个性张扬",
					price: "258",
					stylist: { name: "赵派对", role: "潮流造型师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.7", reviews: "267", distance: "5.6km",
				},
				{
					id: 29,
					category: '造型',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "写真造型",
					description: "艺术写真+多风格切换",
					price: "388",
					stylist: { name: "孙艺术", role: "艺术造型师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "178", distance: "4.8km",
				},
				{
					id: 30,
					category: '造型',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "复古造型",
					description: "经典复古+优雅风情",
					price: "328",
					stylist: { name: "钱复古", role: "复古造型专家", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "145", distance: "6.1km",
				},
				{
					id: 31,
					category: '造型',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "日韩造型",
					description: "日韩风格+氛围感造型",
					price: "238",
					stylist: { name: "周日韩", role: "日韩造型师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "512", distance: "3.1km",
				},
				{
					id: 32,
					category: '造型',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "舞台造型",
					description: "舞台表演+夸张风格",
					price: "588",
					stylist: { name: "吴舞台", role: "舞台造型师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "98", distance: "7.2km",
				},
				// 剪发类
				{
					id: 3,
					category: '剪发',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "精剪造型",
					description: "洗发+精细剪发+造型",
					price: "168",
					stylist: { name: "王大师", role: "首席设计师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "892", distance: "2.8km",
				},
				{
					id: 4,
					category: '剪发',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "总监剪发",
					description: "总监亲剪+形象设计",
					price: "388",
					stylist: { name: "陈总监", role: "技术总监", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "456", distance: "4.5km",
				},
				// 烫发类
				{
					id: 5,
					category: '烫发',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "韩式烫发",
					description: "发型提案+烫发+造型",
					price: "799",
					stylist: { name: "李天天", role: "美发师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "768", distance: "6.7km",
				},
				{
					id: 6,
					category: '烫发',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "纹理烫",
					description: "自然纹理+持久定型",
					price: "599",
					stylist: { name: "刘设计", role: "资深设计师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.7", reviews: "423", distance: "3.9km",
				},
				// 染发类
				{
					id: 7,
					category: '染发',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "时尚染发",
					description: "进口染膏+专业调色",
					price: "498",
					stylist: { name: "周染发", role: "染发专家", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "634", distance: "4.2km",
				},
				{
					id: 8,
					category: '染发',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "挑染套餐",
					description: "个性挑染+造型设计",
					price: "688",
					stylist: { name: "吴艺术", role: "创意总监", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "289", distance: "5.8km",
				},
				// 护发类
				{
					id: 9,
					category: '护发',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "深层护理",
					description: "头皮护理+发丝修复",
					price: "298",
					stylist: { name: "赵护理", role: "护发专家", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "512", distance: "3.1km",
				},
				{
					id: 10,
					category: '护发',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "奢华焗油",
					description: "进口焗油+蒸汽护理",
					price: "458",
					stylist: { name: "孙养护", role: "护发师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.7", reviews: "378", distance: "4.6km",
				},
				// 头皮类
				{
					id: 11,
					category: '头皮',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "头皮检测",
					description: "专业检测+定制方案",
					price: "128",
					stylist: { name: "钱头皮", role: "头皮专家", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "267", distance: "2.5km",
				},
				{
					id: 12,
					category: '头皮',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "头皮SPA",
					description: "深层清洁+舒缓按摩",
					price: "368",
					stylist: { name: "郑养生", role: "头皮理疗师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "189", distance: "3.8km",
				},
				// 接发类
				{
					id: 13,
					category: '接发',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "无痕接发",
					description: "真人发丝+隐形接发",
					price: "1888",
					stylist: { name: "冯接发", role: "接发专家", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "156", distance: "5.2km",
				},
				{
					id: 14,
					category: '接发',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "纳米接发",
					description: "纳米技术+自然舒适",
					price: "2688",
					stylist: { name: "褚发艺", role: "高级接发师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "98", distance: "6.3km",
				},
				// 男士类
				{
					id: 15,
					category: '男士',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "男士精剪",
					description: "型男剪发+造型设计",
					price: "88",
					stylist: { name: "卫男士", role: "男发设计师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "1024", distance: "2.3km",
				},
				{
					id: 16,
					category: '男士',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "男士烫染",
					description: "潮流烫染+个性定制",
					price: "498",
					stylist: { name: "蒋潮男", role: "潮流设计师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.7", reviews: "567", distance: "4.1km",
				},
				// 套餐优选类
				{
					id: 17,
					category: '套餐优选',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "烫染套餐",
					description: "烫发+染发+护理三合一",
					price: "1288",
					stylist: { name: "沈套餐", role: "资深设计师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "856", distance: "3.5km",
				},
				{
					id: 18,
					category: '套餐优选',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "新人专享套餐",
					description: "剪发+造型+护理",
					price: "199",
					stylist: { name: "韩新人", role: "高级设计师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "1234", distance: "2.8km",
				},
				{
					id: 19,
					category: '套餐优选',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "年度会员套餐",
					description: "12次剪发+4次护理",
					price: "2888",
					stylist: { name: "杨会员", role: "店长", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "678", distance: "4.2km",
				},
				{
					id: 20,
					category: '套餐优选',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "闺蜜双人套餐",
					description: "双人剪发+造型优惠",
					price: "358",
					stylist: { name: "朱闺蜜", role: "造型师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.7", reviews: "423", distance: "3.1km",
				},
				// 防脱护理类
				{
					id: 21,
					category: '防脱护理',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "头皮深层护理",
					description: "清洁+滋养+防脱",
					price: "398",
					stylist: { name: "秦防脱", role: "头皮专家", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "567", distance: "2.6km",
				},
				{
					id: 22,
					category: '防脱护理',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "生发育发套餐",
					description: "专业生发仪+营养液",
					price: "888",
					stylist: { name: "尤生发", role: "养发专家", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.8", reviews: "345", distance: "4.8km",
				},
				{
					id: 23,
					category: '防脱护理',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "头皮抗敏护理",
					description: "敏感头皮专属护理",
					price: "328",
					stylist: { name: "许抗敏", role: "护理师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.7", reviews: "234", distance: "3.9km",
				},
				{
					id: 24,
					category: '防脱护理',
					image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
					title: "防脱疗程套餐",
					description: "8次防脱护理疗程",
					price: "2680",
					stylist: { name: "何疗程", role: "高级养发师", avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg" },
					rating: "4.9", reviews: "189", distance: "5.1km",
				},
			],
		}
	},
	computed: {
		// 显示的标题
		displayTitle() {
			return this.selectedCategory || '优服务'
		},
		// 根据选中的分类筛选服务卡片
		filteredServiceCards() {
			if (!this.selectedCategory) {
				// 没有选择分类时显示全部
				return this.serviceCards
			}
			// 根据分类筛选
			return this.serviceCards.filter(card => card.category === this.selectedCategory)
		}
	},
	methods: {
		// 供父组件调用的滚动方法
		scrollToTop() {
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this)
				query.select('#service-gallery-section').boundingClientRect()
				query.selectViewport().scrollOffset()
				query.exec((res) => {
					if (res && res[0] && res[1]) {
						const elementRect = res[0]
						const scrollOffset = res[1]
						uni.pageScrollTo({
							scrollTop: scrollOffset.scrollTop + elementRect.top,
							duration: 100
						})
					}
				})
			})
		},
		handleCardClick(card) {
			// 跳转到服务订单购买页面，并传递服务卡片的 id
			uni.navigateTo({
				url: `/pages/order/purchase?id=${card.id}`
			})
		}
	}
}
</script>

<style scoped lang="scss">
.service-gallery-section {
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	padding: 0 12rpx;
	box-sizing: border-box;
}

.nearby-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 0 8rpx;
	margin-bottom: 16rpx;
	box-sizing: border-box;
}

.nearby-title {
	font-family: 'DIN_Black-Regular', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 28rpx;
}

.category-header {
	display: flex;
	align-items: center;
	gap: 12rpx;
	padding: 0 20rpx;
	height: 60rpx;
	background-image: url('https://c.animaapp.com/mi5bcgvrGbkedE/img/subtract.svg');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.header-icon {
	width: 28rpx;
	height: 28rpx;
}

.header-title {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #dacbb1;
	font-size: 28rpx;
}

.service-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 12rpx;
	margin-top: 10rpx;
	width: 100%;
	box-sizing: border-box;
}

.service-card {
	width: 100%;
	background-color: #ffffff;
	border-radius: 8rpx;
	border: 0;
	box-shadow: none;
	box-sizing: border-box;
	overflow: hidden;
}

.card-image {
	width: 100%;
	height: 358rpx;
	border-radius: 8rpx 8rpx 0 0;
	object-fit: cover;
}

.card-info {
	display: flex;
	flex-direction: column;
	gap: 14rpx;
	padding: 16rpx;
}

.card-header {
	display: flex;
	flex-direction: column;
	gap: 6rpx;
}

.card-title {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #000000;
	font-size: 32rpx;
}

.card-description {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #a6a6a6;
	font-size: 24rpx;
}

.card-price {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.price-symbol {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 28rpx;
}

.price-value {
	font-family: 'FZChaoCuHei-M10T-Regular', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 28rpx;
	white-space: nowrap;
}

.card-footer {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
}

.stylist-info {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.stylist-avatar {
	width: 52rpx;
	height: 52rpx;
	border-radius: 50%;
	overflow: hidden;
}

.avatar-image {
	width: 100%;
	height: 100%;
}

.stylist-details {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.stylist-name-row {
	display: flex;
	align-items: flex-start;
	gap: 8rpx;
}

.stylist-name {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 22rpx;
}

.stylist-role {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

.stylist-rating {
	display: flex;
	align-items: center;
	gap: 4rpx;
}

.rating-score {
	font-family: 'PingFang_SC-Semibold', Helvetica;
	font-weight: normal;
	color: #333333;
	font-size: 24rpx;
}

.star-icon {
	font-size: 20rpx;
	color: #333333;
}

.review-count {
	font-family: 'PingFang_SC-Medium', Helvetica;
	font-weight: 500;
	color: #333333;
	font-size: 24rpx;
}

.card-distance {
	font-family: 'PingFang_SC-Regular', Helvetica;
	font-weight: normal;
	color: #a6a6a6;
	font-size: 22rpx;
}

/* 动画 */
@keyframes fade-in {
	0% {
		opacity: 0;
		transform: translateY(-20rpx);
	}
	to {
		opacity: 1;
		transform: none;
	}
}

.animate-fade-in {
	animation: fade-in 1s ease forwards;
	opacity: 0;
}
</style>
