"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_brand_brandData = require("./brand-data.js");
const BrandDetailHeader = () => "../../components/brand/detail/BrandDetailHeader.js";
const BrandInfoCard = () => "../../components/brand/detail/BrandInfoCard.js";
const BrandTabSwitcher = () => "../../components/BrandTabSwitcher.js";
const BrandServiceTabContent = () => "../../components/brand/detail/BrandServiceTabContent.js";
const BrandDesignerTabContent = () => "../../components/brand/detail/BrandDesignerTabContent.js";
const BrandAppointmentTabContent = () => "../../components/brand/detail/BrandAppointmentTabContent.js";
const BrandWorksTabContent = () => "../../components/BrandWorksTabContent.js";
const BrandReviewsTabContent = () => "../../components/BrandReviewsTabContent.js";
const BrandPortfolioSection = () => "../../components/brand/detail/BrandPortfolioSection.js";
const _sfc_main = {
  components: {
    BrandDetailHeader,
    BrandInfoCard,
    BrandTabSwitcher,
    BrandServiceTabContent,
    BrandDesignerTabContent,
    BrandAppointmentTabContent,
    BrandWorksTabContent,
    BrandReviewsTabContent,
    BrandPortfolioSection
  },
  onLoad(options) {
    if (options.id) {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:122", "Brand ID:", options.id);
      this.brandId = options.id;
    }
    if (options.tab) {
      this.activeTab = options.tab;
    }
  },
  data() {
    return {
      brandId: null,
      activeTab: "service",
      activeSubTabs: {
        service: "hair",
        appointment: "hair-service",
        works: "female",
        reviews: "all"
      },
      tabs: [
        { id: "service", label: "设计师" },
        { id: "appointment", label: "服务" },
        { id: "works", label: "作品" },
        { id: "reviews", label: "点评" }
      ],
      subTabs: {
        service: [
          { id: "hair", title: "美发师" },
          { id: "beauty", title: "美容师" }
        ],
        appointment: [
          { id: "hair-service", title: "美发服务" },
          { id: "beauty-service", title: "美容服务" },
          { id: "other-service", title: "其他服务" }
        ],
        works: [
          { id: "female", title: "女士" },
          { id: "male", title: "男士" },
          { id: "kids", title: "儿童" }
        ],
        reviews: [
          { id: "all", title: "全部" },
          { id: "with-image", title: "有图(71)" },
          { id: "bad", title: "差评(9)" }
        ]
      },
      // 使用brand-data.js中的品牌数据
      designerInfo: {
        avatar: pages_brand_brandData.brandData.brandInfo.avatar,
        name: pages_brand_brandData.brandData.brandInfo.name,
        verifyIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-3.svg",
        role: pages_brand_brandData.brandData.brandInfo.badge,
        certIcon: pages_brand_brandData.brandData.brandInfo.certIcon,
        certText: pages_brand_brandData.brandData.brandInfo.certification,
        certDot: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg",
        skills: pages_brand_brandData.brandData.brandInfo.nature,
        introduction: pages_brand_brandData.brandData.brandInfo.introduction
      },
      serviceBadges: pages_brand_brandData.brandData.serviceBadges,
      statsData: pages_brand_brandData.brandData.statistics,
      businessInfo: {
        status: pages_brand_brandData.brandData.businessInfo.status,
        restDay: pages_brand_brandData.brandData.businessInfo.restDay,
        hours: pages_brand_brandData.brandData.businessInfo.hours
      },
      shopInfo: {
        name: pages_brand_brandData.brandData.addressInfo.street,
        address: pages_brand_brandData.brandData.addressInfo.detail,
        distance: pages_brand_brandData.brandData.addressInfo.distance
      },
      promotions: pages_brand_brandData.brandData.promotions.map((p) => ({ text: p.label })),
      rightStats: {
        serviceIcon: pages_brand_brandData.brandData.rightStats.designerIcon,
        serviceCount: String(pages_brand_brandData.brandData.rightStats.designerCount),
        workIcon: pages_brand_brandData.brandData.rightStats.worksIcon,
        workCount: String(pages_brand_brandData.brandData.rightStats.worksCount),
        dotIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg"
      }
    };
  },
  computed: {
    currentSubTabs() {
      return this.subTabs[this.activeTab] || [];
    },
    isCompactSubTabs() {
      return ["service", "appointment", "works", "reviews"].includes(this.activeTab);
    }
  },
  methods: {
    handleTabChange(tabId) {
      this.activeTab = tabId;
      const tabs = this.subTabs[tabId];
      if (tabs && tabs.length && !this.activeSubTabs[tabId]) {
        this.$set(this.activeSubTabs, tabId, tabs[0].id);
      }
    },
    handleSubTabClick(subTabId) {
      this.$set(this.activeSubTabs, this.activeTab, subTabId);
    },
    handleMoreInfo() {
      common_vendor.index.navigateTo({ url: "/pages/brand/info" });
    },
    handleFollow() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:224", "Follow clicked");
    },
    handlePhone() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:227", "Phone clicked");
    },
    handleNavigation() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:230", "Navigation clicked");
    },
    handleShare() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:233", "Share clicked");
    },
    handleBooking() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:236", "Booking clicked");
    }
  }
};
if (!Array) {
  const _component_brand_detail_header = common_vendor.resolveComponent("brand-detail-header");
  const _component_brand_info_card = common_vendor.resolveComponent("brand-info-card");
  const _component_brand_tab_switcher = common_vendor.resolveComponent("brand-tab-switcher");
  const _component_brand_designer_tab_content = common_vendor.resolveComponent("brand-designer-tab-content");
  const _component_brand_service_tab_content = common_vendor.resolveComponent("brand-service-tab-content");
  const _component_brand_works_tab_content = common_vendor.resolveComponent("brand-works-tab-content");
  const _component_brand_reviews_tab_content = common_vendor.resolveComponent("brand-reviews-tab-content");
  const _component_brand_portfolio_section = common_vendor.resolveComponent("brand-portfolio-section");
  (_component_brand_detail_header + _component_brand_info_card + _component_brand_tab_switcher + _component_brand_designer_tab_content + _component_brand_service_tab_content + _component_brand_works_tab_content + _component_brand_reviews_tab_content + _component_brand_portfolio_section)();
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
    i: $options.currentSubTabs.length
  }, $options.currentSubTabs.length ? {
    j: common_vendor.f($options.currentSubTabs, (subTab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(subTab.title),
        b: subTab.subtitle
      }, subTab.subtitle ? {
        c: common_vendor.t(subTab.subtitle)
      } : {}, {
        d: index,
        e: $data.activeSubTabs[$data.activeTab] === subTab.id ? 1 : "",
        f: common_vendor.o(($event) => $options.handleSubTabClick(subTab.id), index)
      });
    }),
    k: common_vendor.n({
      "compact-sub-tabs": $options.isCompactSubTabs
    })
  } : {}, {
    l: $data.activeTab === "service"
  }, $data.activeTab === "service" ? {
    m: common_vendor.p({
      ["active-sub-tab"]: $data.activeSubTabs.service
    })
  } : {}, {
    n: $data.activeTab === "appointment"
  }, $data.activeTab === "appointment" ? {
    o: common_vendor.p({
      ["active-sub-tab"]: $data.activeSubTabs.appointment
    })
  } : {}, {
    p: $data.activeTab === "works"
  }, $data.activeTab === "works" ? {
    q: common_vendor.p({
      ["active-sub-tab"]: $data.activeSubTabs.works
    })
  } : {}, {
    r: $data.activeTab === "reviews"
  }, $data.activeTab === "reviews" ? {
    s: common_vendor.p({
      ["active-sub-tab"]: $data.activeSubTabs.reviews
    })
  } : {}, {
    t: $data.activeTab === "service" || $data.activeTab === "appointment"
  }, $data.activeTab === "service" || $data.activeTab === "appointment" ? {} : {}, {}, {
    w: $data.activeTab === "reviews" ? 1 : "",
    x: $data.activeTab === "works" || $data.activeTab === "service" ? 1 : ""
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-464bd95a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/brand/detail.js.map
