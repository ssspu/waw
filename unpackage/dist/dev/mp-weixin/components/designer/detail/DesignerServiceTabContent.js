"use strict";
const common_vendor = require("../../../common/vendor.js");
const DesignerProfileSection = () => "../../DesignerProfileSection.js";
const _sfc_main = {
  components: {
    DesignerProfileSection
  },
  props: {
    activeSubTab: {
      type: String,
      default: "hair"
    }
  }
};
if (!Array) {
  const _component_designer_profile_section = common_vendor.resolveComponent("designer-profile-section");
  _component_designer_profile_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["active-sub-tab"]: $props.activeSubTab
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1b0a56c7"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/designer/detail/DesignerServiceTabContent.js.map
