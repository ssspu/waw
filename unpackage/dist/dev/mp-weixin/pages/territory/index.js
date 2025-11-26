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
      designerSubTabs: [
        { id: "hairstylist", label: "美发师" },
        { id: "beautician", label: "美容师" },
        { id: "makeup", label: "化妆师" },
        { id: "nail", label: "美甲师" },
        { id: "body", label: "美体师" }
      ],
      brandSubTabs: [
        { id: "hair", label: "美发" },
        { id: "beauty", label: "美容" },
        { id: "makeup", label: "化妆" },
        { id: "nail", label: "美甲" },
        { id: "body", label: "美体" }
      ],
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
      common_vendor.index.__f__("log", "at pages/territory/index.vue:277", "More clicked");
    },
    handleRadio() {
      common_vendor.index.__f__("log", "at pages/territory/index.vue:280", "Radio clicked");
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
      common_vendor.index.__f__("log", "at pages/territory/index.vue:298", "Share via:", type);
      this.showShareModal = false;
    },
    handleBookAgain() {
      common_vendor.index.__f__("log", "at pages/territory/index.vue:302", "Book again clicked");
    },
    handleMore() {
      common_vendor.index.__f__("log", "at pages/territory/index.vue:305", "More clicked");
    }
  }
};
if (!Array) {
  const _component_territory_service_list_section = common_vendor.resolveComponent("territory-service-list-section");
  _component_territory_service_list_section();
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
    k: common_vendor.f($data.designerSubTabs, (tab, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: $data.activeSubTab === tab.id ? 1 : "",
        c: $data.activeSubTab === tab.id
      }, $data.activeSubTab === tab.id ? {} : {}, {
        d: tab.id,
        e: $data.activeSubTab === tab.id ? 1 : "",
        f: common_vendor.o(($event) => $options.handleSubTabChange(tab.id), tab.id)
      });
    })
  } : {
    l: common_vendor.f($data.brandSubTabs, (tab, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: $data.activeBrandTab === tab.id ? 1 : "",
        c: $data.activeBrandTab === tab.id
      }, $data.activeBrandTab === tab.id ? {} : {}, {
        d: tab.id,
        e: $data.activeBrandTab === tab.id ? 1 : "",
        f: common_vendor.o(($event) => $options.handleBrandTabChange(tab.id), tab.id)
      });
    })
  }, {
    m: $data.activeTopTab === "designer"
  }, $data.activeTopTab === "designer" ? {} : {}, {
    n: $data.activeTopTab === "brand"
  }, $data.activeTopTab === "brand" ? {
    o: common_vendor.f($data.brandCards, (card, index, i0) => {
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
    p: `url(${$data.avatarImage})`
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8e3d1bd9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/territory/index.js.map
