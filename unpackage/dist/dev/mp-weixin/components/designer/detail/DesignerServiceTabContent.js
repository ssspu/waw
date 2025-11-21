"use strict";
const common_vendor = require("../../../common/vendor.js");
const DesignerProfileSection = () => "../../DesignerProfileSection.js";
const _sfc_main = {
  components: {
    DesignerProfileSection
  },
  data() {
    return {
      activeSubTab: "hair",
      subTabs: [
        { id: "hair", label: "美发师" },
        { id: "beauty", label: "美容师" }
      ]
    };
  },
  methods: {
    handleSubTabClick(id) {
      this.activeSubTab = id;
    }
  }
};
if (!Array) {
  const _component_designer_profile_section = common_vendor.resolveComponent("designer-profile-section");
  _component_designer_profile_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.subTabs, (subTab, index, i0) => {
      return {
        a: common_vendor.t(subTab.label),
        b: index,
        c: $data.activeSubTab === subTab.id ? 1 : "",
        d: common_vendor.o(($event) => $options.handleSubTabClick(subTab.id), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1b0a56c7"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/designer/detail/DesignerServiceTabContent.js.map
