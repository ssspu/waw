"use strict";
const common_vendor = require("../../common/vendor.js");
const BrandDetailHeader = () => "../../components/brand/detail/BrandDetailHeader.js";
const BrandInfoCard = () => "../../components/brand/detail/BrandInfoCard.js";
const DesignerTabSwitcher = () => "../../components/DesignerTabSwitcher.js";
const BrandStylistTabContent = () => "../../components/brand/detail/BrandStylistTabContent.js";
const BrandServiceTabContent = () => "../../components/brand/detail/BrandServiceTabContent.js";
const DesignerWorksTabContent = () => "../../components/DesignerWorksTabContent.js";
const BrandReviewsTabContent = () => "../../components/brand/detail/BrandReviewsTabContent.js";
const _sfc_main = {
  components: {
    BrandDetailHeader,
    BrandInfoCard,
    DesignerTabSwitcher,
    BrandStylistTabContent,
    BrandServiceTabContent,
    DesignerWorksTabContent,
    BrandReviewsTabContent
  },
  onLoad(options) {
    if (options.id) {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:84", "Brand ID:", options.id);
    }
    if (options.tab) {
      this.activeTab = options.tab;
    }
  },
  data() {
    return {
      activeTab: "stylist",
      tabs: [
        { id: "stylist", label: "设计师" },
        { id: "service", label: "服务" },
        { id: "works", label: "作品" },
        { id: "reviews", label: "点评" }
      ],
      brandInfo: {
        avatar: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-153.png",
        name: "金龙大好人美发沙龙...",
        verifyBadge: "舒适",
        certIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-3.svg",
        certText: "企业认证",
        certDot: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg",
        type: "工作室、专业店",
        introduction: "从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长..."
      },
      serviceBadges: [
        { icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "安心服务" },
        { icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "7天无忧" },
        { icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "免费设计" },
        { icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "小吃水果" },
        { icon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1891.svg", label: "预约服务" }
      ],
      statsData: [
        { value: "1244", label: "预约" },
        { value: "2000", label: "粉丝" },
        { value: "18", unit: "年", label: "从业" },
        { value: "4.8", unit: "分", label: "评分" }
      ],
      businessInfo: {
        status: "营业中",
        restDay: "周二休息",
        hours: "10:00-21:00"
      },
      shopInfo: {
        name: "锦江区红星路120号",
        address: "IFS国际东门2栋607室",
        distance: "距您2.7km"
      },
      promotions: [
        { text: "满100-5" },
        { text: "满500-50" }
      ],
      rightStats: {
        serviceIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-4.svg",
        serviceCount: "281",
        workIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-12.svg",
        workCount: "234",
        dotIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg"
      }
    };
  },
  methods: {
    handleTabChange(tabId) {
      this.activeTab = tabId;
    },
    handleMoreInfo() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:151", "More info clicked");
    },
    handleFollow() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:154", "Follow clicked");
    },
    handlePhone() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:157", "Phone clicked");
    },
    handleNavigation() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:160", "Navigation clicked");
    },
    handleShare() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:163", "Share clicked");
    }
  }
};
if (!Array) {
  const _component_brand_detail_header = common_vendor.resolveComponent("brand-detail-header");
  const _component_brand_info_card = common_vendor.resolveComponent("brand-info-card");
  const _component_designer_tab_switcher = common_vendor.resolveComponent("designer-tab-switcher");
  const _component_brand_stylist_tab_content = common_vendor.resolveComponent("brand-stylist-tab-content");
  const _component_brand_service_tab_content = common_vendor.resolveComponent("brand-service-tab-content");
  const _component_designer_works_tab_content = common_vendor.resolveComponent("designer-works-tab-content");
  const _component_brand_reviews_tab_content = common_vendor.resolveComponent("brand-reviews-tab-content");
  (_component_brand_detail_header + _component_brand_info_card + _component_designer_tab_switcher + _component_brand_stylist_tab_content + _component_brand_service_tab_content + _component_designer_works_tab_content + _component_brand_reviews_tab_content)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.handleMoreInfo),
    b: common_vendor.o($options.handleFollow),
    c: common_vendor.o($options.handlePhone),
    d: common_vendor.o($options.handleNavigation),
    e: common_vendor.o($options.handleShare),
    f: common_vendor.p({
      ["brand-info"]: $data.brandInfo,
      ["service-badges"]: $data.serviceBadges,
      ["stats-data"]: $data.statsData,
      ["business-info"]: $data.businessInfo,
      ["shop-info"]: $data.shopInfo,
      promotions: $data.promotions,
      ["right-stats"]: $data.rightStats
    }),
    g: common_vendor.o($options.handleTabChange),
    h: common_vendor.p({
      ["active-tab"]: $data.activeTab,
      tabs: $data.tabs
    }),
    i: $data.activeTab === "stylist"
  }, $data.activeTab === "stylist" ? {} : {}, {
    j: $data.activeTab === "service"
  }, $data.activeTab === "service" ? {} : {}, {
    k: $data.activeTab === "works"
  }, $data.activeTab === "works" ? {} : {}, {
    l: $data.activeTab === "reviews"
  }, $data.activeTab === "reviews" ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-464bd95a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/brand/detail.js.map
