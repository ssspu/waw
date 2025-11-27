"use strict";
const common_vendor = require("../../common/vendor.js");
const TerritoryHeaderSection = () => "../../components/territory/index/TerritoryHeaderSection.js";
const TerritoryServiceListSection = () => "../../components/territory/index/TerritoryServiceListSection.js";
const _sfc_main = {
  components: {
    TerritoryHeaderSection,
    TerritoryServiceListSection
  },
  data() {
    return {
      activeTopTab: "designer",
      activeSubTab: "hairstylist",
      activeBrandTab: "hair",
      avatarImage: "/static/avatar/avatar.png",
      brandCards: [
        {
          headerInfo: ["2025-05-05", "｜", "洗剪吹", "｜", "欧莱雅生化烫"],
          price: 888,
          name: "成都NICE造型沙龙",
          type: "品牌",
          level: "舒适",
          role: "专业店｜2012年开业",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: 4.8,
          designers: 8,
          services: 1236
        },
        {
          headerInfo: ["2025-05-05", "｜", "洗剪吹", "｜", "欧莱雅生化烫"],
          price: 888,
          name: "成都NICE造型沙龙",
          type: "品牌",
          level: "舒适",
          role: "专业店｜2012年开业",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: 4.8,
          designers: 8,
          services: 1236
        },
        {
          headerInfo: ["2025-05-05", "｜", "洗剪吹", "｜", "欧莱雅生化烫"],
          price: 888,
          name: "成都NICE造型沙龙",
          type: "品牌",
          level: "舒适",
          role: "专业店｜2012年开业",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: 4.8,
          designers: 8,
          services: 1236
        },
        {
          headerInfo: ["2025-05-05", "｜", "洗剪吹", "｜", "欧莱雅生化烫"],
          price: 888,
          name: "成都NICE造型沙龙",
          type: "品牌",
          level: "舒适",
          role: "专业店｜2012年开业",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: 4.8,
          designers: 8,
          services: 1236
        }
      ],
      showShareModal: false
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    handleMore() {
      common_vendor.index.__f__("log", "at pages/territory/index.vue:313", "More clicked");
    },
    handleRadio() {
      common_vendor.index.__f__("log", "at pages/territory/index.vue:316", "Radio clicked");
    },
    handleTopTabChange(tabId) {
      this.activeTopTab = tabId;
    },
    handleSubTabChange(tabId) {
      this.activeSubTab = tabId;
    },
    handleBrandTabChange(tabId) {
      this.activeBrandTab = tabId;
    },
    handlePromote() {
      this.showShareModal = true;
    },
    closeShareModal() {
      this.showShareModal = false;
    },
    handleShare(type) {
      common_vendor.index.__f__("log", "at pages/territory/index.vue:334", "Share via:", type);
      this.showShareModal = false;
    },
    handleBookAgain() {
      common_vendor.index.__f__("log", "at pages/territory/index.vue:338", "Book again clicked");
    },
    handleMore() {
      common_vendor.index.__f__("log", "at pages/territory/index.vue:341", "More clicked");
    }
  }
};
if (!Array) {
  const _component_territory_header_section = common_vendor.resolveComponent("territory-header-section");
  const _component_territory_service_list_section = common_vendor.resolveComponent("territory-service-list-section");
  (_component_territory_header_section + _component_territory_service_list_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args)),
    c: common_vendor.o((...args) => $options.handleRadio && $options.handleRadio(...args)),
    d: $data.activeTopTab === "designer" ? 1 : "",
    e: $data.activeTopTab === "designer" ? 1 : "",
    f: common_vendor.o(($event) => $options.handleTopTabChange("designer")),
    g: $data.activeTopTab === "brand" ? 1 : "",
    h: $data.activeTopTab === "brand" ? 1 : "",
    i: common_vendor.o(($event) => $options.handleTopTabChange("brand")),
    j: $data.activeTopTab === "designer"
  }, $data.activeTopTab === "designer" ? {
    k: common_vendor.o($options.handleTopTabChange),
    l: common_vendor.o($options.handleSubTabChange),
    m: common_vendor.p({
      ["active-top-tab"]: $data.activeTopTab,
      ["active-sub-tab"]: $data.activeSubTab
    })
  } : {}, {
    n: $data.activeTopTab === "brand"
  }, $data.activeTopTab === "brand" ? common_vendor.e({
    o: $data.activeBrandTab === "hair" ? 1 : "",
    p: $data.activeBrandTab === "hair"
  }, $data.activeBrandTab === "hair" ? {} : {}, {
    q: $data.activeBrandTab === "hair" ? 1 : "",
    r: common_vendor.o(($event) => $options.handleBrandTabChange("hair")),
    s: $data.activeBrandTab === "beauty" ? 1 : "",
    t: $data.activeBrandTab === "beauty"
  }, $data.activeBrandTab === "beauty" ? {} : {}, {
    v: $data.activeBrandTab === "beauty" ? 1 : "",
    w: common_vendor.o(($event) => $options.handleBrandTabChange("beauty")),
    x: $data.activeBrandTab === "makeup" ? 1 : "",
    y: $data.activeBrandTab === "makeup"
  }, $data.activeBrandTab === "makeup" ? {} : {}, {
    z: $data.activeBrandTab === "makeup" ? 1 : "",
    A: common_vendor.o(($event) => $options.handleBrandTabChange("makeup")),
    B: $data.activeBrandTab === "nail" ? 1 : "",
    C: $data.activeBrandTab === "nail"
  }, $data.activeBrandTab === "nail" ? {} : {}, {
    D: $data.activeBrandTab === "nail" ? 1 : "",
    E: common_vendor.o(($event) => $options.handleBrandTabChange("nail")),
    F: $data.activeBrandTab === "body" ? 1 : "",
    G: $data.activeBrandTab === "body"
  }, $data.activeBrandTab === "body" ? {} : {}, {
    H: $data.activeBrandTab === "body" ? 1 : "",
    I: common_vendor.o(($event) => $options.handleBrandTabChange("body")),
    J: common_vendor.f($data.brandCards, (card, index, i0) => {
      return {
        a: common_vendor.f(card.headerInfo, (item, idx, i1) => {
          return {
            a: common_vendor.t(item),
            b: idx
          };
        }),
        b: common_vendor.t(card.price),
        c: common_vendor.t(card.name),
        d: common_vendor.t(card.type),
        e: common_vendor.t(card.level),
        f: common_vendor.t(card.role),
        g: common_vendor.f(card.specialties, (specialty, idx, i1) => {
          return {
            a: common_vendor.t(specialty),
            b: idx
          };
        }),
        h: common_vendor.t(card.rating),
        i: common_vendor.t(card.designers),
        j: common_vendor.t(card.services),
        k: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args), index),
        l: common_vendor.o((...args) => $options.handlePromote && $options.handlePromote(...args), index),
        m: common_vendor.o((...args) => $options.handleBookAgain && $options.handleBookAgain(...args), index),
        n: index
      };
    }),
    K: `url(${$data.avatarImage})`
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8e3d1bd9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/territory/index.js.map
