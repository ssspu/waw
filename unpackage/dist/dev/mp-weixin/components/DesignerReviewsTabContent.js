"use strict";
const common_vendor = require("../common/vendor.js");
const DesignerReviewsListSection = () => "./DesignerReviewsListSection.js";
const _sfc_main = {
  components: {
    DesignerReviewsListSection
  },
  data() {
    return {
      reviewFilters: [
        { label: "全部", active: true },
        { label: "有图(71)", active: false },
        { label: "差评(9)", active: false }
      ]
    };
  },
  methods: {
    handleFilterClick(index) {
      this.reviewFilters.forEach((filter, i) => {
        filter.active = i === index;
      });
    }
  }
};
if (!Array) {
  const _component_designer_reviews_list_section = common_vendor.resolveComponent("designer-reviews-list-section");
  _component_designer_reviews_list_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.reviewFilters, (filter, index, i0) => {
      return {
        a: common_vendor.t(filter.label),
        b: filter.active ? 1 : "",
        c: index,
        d: filter.active ? 1 : "",
        e: common_vendor.o(($event) => $options.handleFilterClick(index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cd62d4c5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerReviewsTabContent.js.map
