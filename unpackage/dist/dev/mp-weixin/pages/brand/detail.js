"use strict";
const common_vendor = require("../../common/vendor.js");
const BrandDetailHeader = () => "../../components/brand/detail/BrandDetailHeader.js";
const DesignerTabSwitcher = () => "../../components/DesignerTabSwitcher.js";
const DesignerProfileSection = () => "../../components/DesignerProfileSection.js";
const BrandServiceTabContent = () => "../../components/brand/detail/BrandServiceTabContent.js";
const DesignerWorksTabContent = () => "../../components/DesignerWorksTabContent.js";
const BrandReviewsTabContent = () => "../../components/brand/detail/BrandReviewsTabContent.js";
const _sfc_main = {
  components: {
    BrandDetailHeader,
    DesignerTabSwitcher,
    DesignerProfileSection,
    BrandServiceTabContent,
    DesignerWorksTabContent,
    BrandReviewsTabContent
  },
  onLoad(options) {
    if (options.id) {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:233", "Brand ID:", options.id);
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
      designerInfo: {
        avatar: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-153.png",
        name: "金龙大好人美发沙龙...",
        comfortTag: "舒适",
        certIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-3.svg",
        certText: "企业认证",
        skills: "染发设计、短发造型、女士晚装",
        storeType: "工作室、专业店",
        introduction: "从业19年,毕业沙宣美发学院,擅长各种造型设计师有丰富的设计经验擅长..."
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
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:300", "More info clicked");
    },
    handleFollow() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:303", "Follow clicked");
    },
    handlePhone() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:306", "Phone clicked");
    },
    handleNavigation() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:309", "Navigation clicked");
    },
    handleShare() {
      common_vendor.index.__f__("log", "at pages/brand/detail.vue:312", "Share clicked");
    }
  }
};
if (!Array) {
  const _component_brand_detail_header = common_vendor.resolveComponent("brand-detail-header");
  const _component_designer_tab_switcher = common_vendor.resolveComponent("designer-tab-switcher");
  const _component_designer_profile_section = common_vendor.resolveComponent("designer-profile-section");
  const _component_brand_service_tab_content = common_vendor.resolveComponent("brand-service-tab-content");
  const _component_designer_works_tab_content = common_vendor.resolveComponent("designer-works-tab-content");
  const _component_brand_reviews_tab_content = common_vendor.resolveComponent("brand-reviews-tab-content");
  (_component_brand_detail_header + _component_designer_tab_switcher + _component_designer_profile_section + _component_brand_service_tab_content + _component_designer_works_tab_content + _component_brand_reviews_tab_content)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handleFollow && $options.handleFollow(...args)),
    b: `url(${$data.designerInfo.avatar})`,
    c: common_vendor.t($data.designerInfo.name),
    d: common_vendor.t($data.designerInfo.comfortTag || "舒适"),
    e: $data.designerInfo.certIcon,
    f: common_vendor.t($data.designerInfo.certText),
    g: common_vendor.t($data.designerInfo.storeType),
    h: common_vendor.t($data.designerInfo.introduction),
    i: common_vendor.o((...args) => $options.handleMoreInfo && $options.handleMoreInfo(...args)),
    j: common_vendor.f($data.serviceBadges, (badge, index, i0) => {
      return {
        a: badge.icon,
        b: common_vendor.t(badge.label),
        c: index
      };
    }),
    k: common_vendor.f($data.statsData, (stat, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(stat.value),
        b: stat.unit
      }, stat.unit ? {
        c: common_vendor.t(stat.unit)
      } : {}, {
        d: common_vendor.t(stat.label),
        e: index
      });
    }),
    l: common_vendor.t($data.businessInfo.status),
    m: common_vendor.t($data.businessInfo.restDay),
    n: common_vendor.t($data.businessInfo.hours),
    o: common_vendor.o((...args) => $options.handleMoreInfo && $options.handleMoreInfo(...args)),
    p: common_vendor.o((...args) => $options.handlePhone && $options.handlePhone(...args)),
    q: common_vendor.t($data.shopInfo.name),
    r: common_vendor.t($data.shopInfo.address),
    s: common_vendor.t($data.shopInfo.distance),
    t: common_vendor.o((...args) => $options.handleNavigation && $options.handleNavigation(...args)),
    v: common_vendor.f($data.promotions, (promo, index, i0) => {
      return {
        a: common_vendor.t(promo.text),
        b: index
      };
    }),
    w: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args)),
    x: $data.rightStats.serviceIcon,
    y: common_vendor.t($data.rightStats.serviceCount),
    z: $data.rightStats.dotIcon,
    A: $data.rightStats.workIcon,
    B: common_vendor.t($data.rightStats.workCount),
    C: $data.rightStats.dotIcon,
    D: common_vendor.o($options.handleTabChange),
    E: common_vendor.p({
      ["active-tab"]: $data.activeTab,
      tabs: $data.tabs
    }),
    F: $data.activeTab === "stylist"
  }, $data.activeTab === "stylist" ? {} : {}, {
    G: $data.activeTab === "service"
  }, $data.activeTab === "service" ? {} : {}, {
    H: $data.activeTab === "works"
  }, $data.activeTab === "works" ? {} : {}, {
    I: $data.activeTab === "reviews"
  }, $data.activeTab === "reviews" ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-464bd95a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/brand/detail.js.map
