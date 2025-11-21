"use strict";
const common_vendor = require("../../common/vendor.js");
const DesignerWorksServiceSection = () => "../../components/DesignerWorksServiceSection.js";
const DesignerWorksGallerySection = () => "../../components/DesignerWorksGallerySection.js";
const _sfc_main = {
  components: {
    DesignerWorksServiceSection,
    DesignerWorksGallerySection
  },
  onLoad(options) {
    if (options.id) {
      common_vendor.index.__f__("log", "at pages/designer/works.vue:60", "Designer ID:", options.id);
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _component_designer_works_service_section = common_vendor.resolveComponent("designer-works-service-section");
  const _component_designer_works_gallery_section = common_vendor.resolveComponent("designer-works-gallery-section");
  (_component_designer_works_service_section + _component_designer_works_gallery_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d8c531d1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/designer/works.js.map
