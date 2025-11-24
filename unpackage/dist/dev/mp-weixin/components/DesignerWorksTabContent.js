"use strict";
const common_vendor = require("../common/vendor.js");
const DesignerWorksGallerySection = () => "./DesignerWorksGallerySection.js";
const _sfc_main = {
  components: {
    DesignerWorksGallerySection
  },
  props: {
    activeSubTab: {
      type: String,
      default: "female"
    }
  }
};
if (!Array) {
  const _component_designer_works_gallery_section = common_vendor.resolveComponent("designer-works-gallery-section");
  _component_designer_works_gallery_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6e94d26d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerWorksTabContent.js.map
