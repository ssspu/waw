"use strict";
const common_vendor = require("../../common/vendor.js");
const DesignerReviewsPageSection = () => "../../components/DesignerReviewsPageSection.js";
const DesignerReviewsListSection = () => "../../components/DesignerReviewsListSection.js";
const _sfc_main = {
  components: {
    DesignerReviewsPageSection,
    DesignerReviewsListSection
  },
  onLoad(options) {
    if (options.id) {
      common_vendor.index.__f__("log", "at pages/designer/reviews.vue:51", "Designer ID:", options.id);
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _component_designer_reviews_page_section = common_vendor.resolveComponent("designer-reviews-page-section");
  const _component_designer_reviews_list_section = common_vendor.resolveComponent("designer-reviews-list-section");
  (_component_designer_reviews_page_section + _component_designer_reviews_list_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-11e18af1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/designer/reviews.js.map
