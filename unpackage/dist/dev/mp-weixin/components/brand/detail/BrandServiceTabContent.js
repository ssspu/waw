"use strict";
const common_vendor = require("../../../common/vendor.js");
const DesignerProfileSection = () => "../../DesignerProfileSection.js";
const BrandServiceInfoSection = () => "./BrandServiceInfoSection.js";
const _sfc_main = {
  components: {
    DesignerProfileSection,
    BrandServiceInfoSection
  }
};
if (!Array) {
  const _component_designer_profile_section = common_vendor.resolveComponent("designer-profile-section");
  const _component_brand_service_info_section = common_vendor.resolveComponent("brand-service-info-section");
  (_component_designer_profile_section + _component_brand_service_info_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-20c4729e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/brand/detail/BrandServiceTabContent.js.map
