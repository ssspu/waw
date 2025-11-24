"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    activeTopTab: {
      type: String,
      default: "designer"
    },
    activeSubTab: {
      type: String,
      default: "hairstylist"
    }
  },
  data() {
    return {
      topNavItems: [
        { id: "designer", label: "设计师", active: true },
        { id: "brand", label: "品牌馆", active: false }
      ],
      tabItems: [
        { id: "hairstylist", label: "美发师" },
        { id: "beautician", label: "美容师" },
        { id: "makeup", label: "化妆师" },
        { id: "nail", label: "美甲师" },
        { id: "body", label: "美体师" }
      ]
    };
  },
  methods: {
    handleTopNavClick(tabId) {
      this.$emit("top-tab-change", tabId);
    },
    handleTabClick(tabId) {
      this.$emit("sub-tab-change", tabId);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabItems, (tab, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: $props.activeSubTab === tab.id ? 1 : "",
        c: $props.activeSubTab === tab.id
      }, $props.activeSubTab === tab.id ? {} : {}, {
        d: tab.id,
        e: $props.activeSubTab === tab.id ? 1 : "",
        f: common_vendor.o(($event) => $options.handleTabClick(tab.id), tab.id)
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-85c991f3"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/territory/index/TerritoryHeaderSection.js.map
