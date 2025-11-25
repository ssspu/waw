"use strict";
const common_vendor = require("../../../common/vendor.js");
const BrandProfileSection = () => "../../BrandProfileSection.js";
const _sfc_main = {
  components: {
    BrandProfileSection
  },
  props: {
    activeSubTab: {
      type: String,
      default: "hair"
    }
  }
};
if (!Array) {
  const _component_brand_profile_section = common_vendor.resolveComponent("brand-profile-section");
  _component_brand_profile_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["active-sub-tab"]: $props.activeSubTab
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-20c4729e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/brand/detail/BrandServiceTabContent.js.map
