"use strict";
const common_vendor = require("../../common/vendor.js");
const CouponEndDetailsSection = () => "../../components/CouponEndDetailsSection.js";
const CouponEndListSection = () => "../../components/CouponEndListSection.js";
const _sfc_main = {
  components: {
    CouponEndDetailsSection,
    CouponEndListSection
  },
  data() {
    return {
      activeTab: "ended"
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    handleMore() {
      common_vendor.index.__f__("log", "at pages/coupon-end/index.vue:90", "More clicked");
    },
    handleCircle() {
      common_vendor.index.__f__("log", "at pages/coupon-end/index.vue:93", "Circle clicked");
    },
    handleTabChange(tabId) {
      this.activeTab = tabId;
    }
  }
};
if (!Array) {
  const _component_coupon_end_details_section = common_vendor.resolveComponent("coupon-end-details-section");
  const _component_coupon_end_list_section = common_vendor.resolveComponent("coupon-end-list-section");
  (_component_coupon_end_details_section + _component_coupon_end_list_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args)),
    c: common_vendor.o((...args) => $options.handleCircle && $options.handleCircle(...args)),
    d: common_vendor.p({
      ["active-tab"]: $data.activeTab
    }),
    e: common_vendor.o($options.handleTabChange),
    f: common_vendor.p({
      ["active-tab"]: $data.activeTab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-44d6f269"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/coupon-end/index.js.map
