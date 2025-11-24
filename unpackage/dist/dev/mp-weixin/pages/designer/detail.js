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
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:118", "Designer ID:", options.id);
    }
    if (options.tab) {
      this.activeTab = options.tab;
    }
  },
  data() {
    return {
      activeTab: "service",
      activeSubTabs: {
        service: "hair",
        appointment: "today",
        works: "female",
        reviews: "all"
      },
      tabs: [
        { id: "service", label: "服务" },
        { id: "appointment", label: "预约" },
        { id: "works", label: "作品" },
        { id: "reviews", label: "点评" }
      ],
      subTabs: {
        service: [
          { id: "hair", title: "美发师" },
          { id: "beauty", title: "美容师" }
        ],
        appointment: [
          { id: "today", title: "今天", subtitle: "周一" },
          { id: "tomorrow", title: "明天", subtitle: "周二" },
          { id: "1205", title: "12.05", subtitle: "周三" },
          { id: "1206", title: "12.06", subtitle: "周四" },
          { id: "1207", title: "12.07", subtitle: "周五" },
          { id: "1208", title: "12.08", subtitle: "周六" },
          { id: "1209", title: "12.09", subtitle: "周日" }
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
  computed: {
    currentSubTabs() {
      return this.subTabs[this.activeTab] || [];
    },
    isCompactSubTabs() {
      return ["appointment", "works", "reviews"].includes(this.activeTab);
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
      common_vendor.index.navigateTo({ url: "/pages/designer/info" });
    },
    handleFollow() {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:235", "Follow clicked");
    },
    handlePhone() {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:238", "Phone clicked");
    },
    handleNavigation() {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:241", "Navigation clicked");
    },
    handleShare() {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:244", "Share clicked");
    },
    handleBooking() {
      common_vendor.index.__f__("log", "at pages/designer/detail.vue:247", "Booking clicked");
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
      "compact-sub-tabs": $options.isCompactSubTabs,
      "appointment-sub-tabs": $data.activeTab === "appointment"
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
    t: $data.activeTab === "service"
  }, $data.activeTab === "service" ? {} : {}, {
    v: $data.activeTab === "appointment"
  }, $data.activeTab === "appointment" ? {
    w: common_vendor.o((...args) => $options.handleBooking && $options.handleBooking(...args))
  } : {}, {
    x: $data.activeTab === "reviews" ? 1 : ""
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d0e7643f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/designer/detail.js.map
