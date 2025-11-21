"use strict";
const common_vendor = require("../../common/vendor.js");
const DesignerDetailHeader = () => "../../components/designer/detail/DesignerDetailHeader.js";
const DesignerInfoCard = () => "../../components/designer/detail/DesignerInfoCard.js";
const DesignerTabSwitcher = () => "../../components/DesignerTabSwitcher.js";
const DesignerServiceTabContent = () => "../../components/designer/detail/DesignerServiceTabContent.js";
const DesignerAppointmentTabContent = () => "../../components/designer/detail/DesignerAppointmentTabContent.js";
const DesignerWorksTabContent = () => "../../components/DesignerWorksTabContent.js";
const DesignerReviewsTabContent = () => "../../components/DesignerReviewsTabContent.js";
const DesignerPortfolioSection = () => "../../components/designer/detail/DesignerPortfolioSection.js";
const _sfc_main = {
  components: {
    DesignerDetailHeader,
    DesignerInfoCard,
    DesignerTabSwitcher,
    DesignerServiceTabContent,
    DesignerAppointmentTabContent,
    DesignerWorksTabContent,
    DesignerReviewsTabContent,
    DesignerPortfolioSection
  },
  onLoad(options) {
    if (options.id) {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:96", "Designer ID:", options.id);
    }
    if (options.tab) {
      this.activeTab = options.tab;
    }
  },
  data() {
    return {
      activeTab: "service",
      tabs: [
        { id: "service", label: "服务" },
        { id: "appointment", label: "预约" },
        { id: "works", label: "作品" },
        { id: "reviews", label: "点评" }
      ],
      designerInfo: {
        avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-153.png",
        name: "朱一龙",
        verifyIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2110.svg",
        role: "技术总监",
        certIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2.svg",
        certText: "职业认证",
        certDot: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg",
        skills: "染发设计、短发造型、女士晚装:",
        introduction: "从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长..."
      },
      serviceBadges: [
        { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "安心服务" },
        { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "7天无忧" },
        { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "免费设计" },
        { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "小吃水果" },
        { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "预约服务" }
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
        name: "NICE美发造型沙...",
        address: "武侯区天府三家B7栋...",
        distance: "距您2.7km"
      },
      promotions: [
        { text: "满100-5" },
        { text: "满500-50" }
      ],
      rightStats: {
        serviceIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1.svg",
        serviceCount: "281",
        workIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-4.svg",
        workCount: "234",
        dotIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg"
      }
    };
  },
  methods: {
    handleTabChange(tabId) {
      this.activeTab = tabId;
    },
    handleMoreInfo() {
      common_vendor.index.navigateTo({ url: "/pages/designer/info" });
    },
    handleFollow() {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:167", "Follow clicked");
    },
    handlePhone() {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:170", "Phone clicked");
    },
    handleNavigation() {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:173", "Navigation clicked");
    },
    handleShare() {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:176", "Share clicked");
    },
    handleBooking() {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:179", "Booking clicked");
    }
  }
};
if (!Array) {
  const _component_designer_detail_header = common_vendor.resolveComponent("designer-detail-header");
  const _component_designer_info_card = common_vendor.resolveComponent("designer-info-card");
  const _component_designer_tab_switcher = common_vendor.resolveComponent("designer-tab-switcher");
  const _component_designer_service_tab_content = common_vendor.resolveComponent("designer-service-tab-content");
  const _component_designer_appointment_tab_content = common_vendor.resolveComponent("designer-appointment-tab-content");
  const _component_designer_works_tab_content = common_vendor.resolveComponent("designer-works-tab-content");
  const _component_designer_reviews_tab_content = common_vendor.resolveComponent("designer-reviews-tab-content");
  const _component_designer_portfolio_section = common_vendor.resolveComponent("designer-portfolio-section");
  (_component_designer_detail_header + _component_designer_info_card + _component_designer_tab_switcher + _component_designer_service_tab_content + _component_designer_appointment_tab_content + _component_designer_works_tab_content + _component_designer_reviews_tab_content + _component_designer_portfolio_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.handleMoreInfo),
    b: common_vendor.o($options.handleFollow),
    c: common_vendor.o($options.handlePhone),
    d: common_vendor.o($options.handleNavigation),
    e: common_vendor.o($options.handleShare),
    f: common_vendor.p({
      ["designer-info"]: $data.designerInfo,
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
    i: $data.activeTab === "service"
  }, $data.activeTab === "service" ? {} : {}, {
    j: $data.activeTab === "appointment"
  }, $data.activeTab === "appointment" ? {} : {}, {
    k: $data.activeTab === "works"
  }, $data.activeTab === "works" ? {} : {}, {
    l: $data.activeTab === "reviews"
  }, $data.activeTab === "reviews" ? {} : {}, {
    m: $data.activeTab === "service"
  }, $data.activeTab === "service" ? {} : {}, {
    n: $data.activeTab === "appointment"
  }, $data.activeTab === "appointment" ? {
    o: common_vendor.o((...args) => $options.handleBooking && $options.handleBooking(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d0e7643f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/designer/detail.js.map
