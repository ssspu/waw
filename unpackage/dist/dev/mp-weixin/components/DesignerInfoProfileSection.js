"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "designer",
      tabs: [
        { id: "designer", label: "设计师介绍" },
        { id: "service", label: "服务特色" },
        { id: "environment", label: "环境设施" }
      ]
    };
  },
  methods: {
    handleTabClick(tabId) {
      this.activeTab = tabId;
      this.$emit("tab-change", tabId);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabs, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: $data.activeTab === tab.id ? 1 : "",
        c: $data.activeTab === tab.id
      }, $data.activeTab === tab.id ? {} : {}, {
        d: tab.id,
        e: $data.activeTab === tab.id ? 1 : "",
        f: common_vendor.o(($event) => $options.handleTabClick(tab.id), tab.id)
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b0bd1373"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerInfoProfileSection.js.map
