"use strict";
const common_vendor = require("../common/vendor.js");
const DesignerReviewsListSection = () => "./DesignerReviewsListSection.js";
const _sfc_main = {
  components: {
    DesignerReviewsListSection
  },
  props: {
    activeSubTab: {
      type: String,
      default: "all"
    }
  }
};
if (!Array) {
  const _component_designer_reviews_list_section = common_vendor.resolveComponent("designer-reviews-list-section");
  _component_designer_reviews_list_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cd62d4c5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerReviewsTabContent.js.map
