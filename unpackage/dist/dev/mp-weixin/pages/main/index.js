"use strict";
const common_vendor = require("../../common/vendor.js");
const DesignSection = () => "../../components/main/index/DesignSection.js";
const ServiceOptionsSection = () => "../../components/main/index/ServiceOptionsSection.js";
const FeaturedServicesSection = () => "../../components/main/index/FeaturedServicesSection.js";
const RecommendationsSection = () => "../../components/RecommendationsSection.js";
const VIPSection = () => "../../components/main/index/VIPSection.js";
const ServiceGallerySection = () => "../../components/main/index/ServiceGallerySection.js";
const BrandFeaturedItemsSection = () => "../../components/BrandFeaturedItemsSection.js";
const _sfc_main = {
  components: {
    DesignSection,
    ServiceOptionsSection,
    FeaturedServicesSection,
    RecommendationsSection,
    VIPSection,
    ServiceGallerySection,
    BrandFeaturedItemsSection
  },
  data() {
    return {
      activeTab: "designer",
      tabItems: [
        { value: "designer", label: "设计师" },
        { value: "service", label: "优服务" },
        { value: "brand", label: "品牌馆" }
      ],
      // Assets configuration
      assets: {
        designer: {
          headerBg: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-217.png",
          mainBg: "/static/background-image/mian-background-left.png",
          badgeIcon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-1.svg",
          tabBg: "/static/background-image/mian-background-left.png"
        },
        service: {
          headerBg: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-217.png",
          mainBg: "/static/background-image/mian-background-mid.png",
          badgeIcon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-3.svg",
          tabBg: "/static/background-image/mian-background-mid.png"
        },
        brand: {
          headerBg: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-217.png",
          mainBg: "/static/background-image/mian-background-right.png",
          badgeIcon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-4.svg",
          tabBg: "/static/background-image/mian-background-right.png"
        }
      }
    };
  },
  computed: {
    currentHeaderBg() {
      return this.assets[this.activeTab].headerBg;
    },
    currentMainBg() {
      return this.assets[this.activeTab].mainBg;
    },
    currentBadgeIcon() {
      return this.assets[this.activeTab].badgeIcon;
    },
    currentTabLabel() {
      const currentTab = this.tabItems.find((tab) => tab.value === this.activeTab);
      return currentTab ? currentTab.label : "设计师";
    }
  },
  onLoad(options) {
    common_vendor.index.__f__("log", "at pages/main/index.vue:160", "main页面 onLoad, 接收到的参数:", options);
    if (options.tab) {
      const validTabs = ["designer", "service", "brand"];
      if (validTabs.includes(options.tab)) {
        this.activeTab = options.tab;
        common_vendor.index.__f__("log", "at pages/main/index.vue:166", "切换到标签:", options.tab);
      } else {
        common_vendor.index.__f__("warn", "at pages/main/index.vue:168", "无效的标签:", options.tab);
      }
    } else {
      common_vendor.index.__f__("log", "at pages/main/index.vue:171", "没有接收到tab参数，使用默认标签: designer");
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    switchTab(value) {
      this.activeTab = value;
    }
  }
};
if (!Array) {
  const _component_design_section = common_vendor.resolveComponent("design-section");
  const _component_featured_services_section = common_vendor.resolveComponent("featured-services-section");
  const _component_recommendations_section = common_vendor.resolveComponent("recommendations-section");
  const _component_vip_section = common_vendor.resolveComponent("vip-section");
  const _component_service_gallery_section = common_vendor.resolveComponent("service-gallery-section");
  const _component_brand_featured_items_section = common_vendor.resolveComponent("brand-featured-items-section");
  (_component_design_section + _component_featured_services_section + _component_recommendations_section + _component_vip_section + _component_service_gallery_section + _component_brand_featured_items_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.currentHeaderBg,
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    c: $options.currentBadgeIcon,
    d: common_vendor.t($options.currentTabLabel),
    e: common_vendor.f($data.tabItems, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: $data.activeTab === tab.value ? 1 : "",
        c: $data.activeTab === tab.value
      }, $data.activeTab === tab.value ? {} : {}, {
        d: index,
        e: $data.activeTab === tab.value ? 1 : "",
        f: common_vendor.o(($event) => $options.switchTab(tab.value), index)
      });
    }),
    f: $data.activeTab === "designer"
  }, $data.activeTab === "designer" ? {} : {}, {
    g: $data.activeTab === "service"
  }, $data.activeTab === "service" ? {} : {}, {
    h: $data.activeTab === "brand"
  }, $data.activeTab === "brand" ? {} : {}, {
    i: $data.activeTab === "reviews" ? 1 : "",
    j: $data.assets[$data.activeTab].tabBg ? `url(${$data.assets[$data.activeTab].tabBg})` : "none"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d311227b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/main/index.js.map
