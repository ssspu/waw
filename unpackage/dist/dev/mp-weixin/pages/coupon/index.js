"use strict";
const common_vendor = require("../../common/vendor.js");
const CouponListSection = () => "../../components/coupon/index/CouponListSection.js";
const CouponDetailsSection = () => "../../components/coupon/index/CouponDetailsSection.js";
const _sfc_main = {
  components: {
    CouponListSection,
    CouponDetailsSection
  },
  data() {
    return {
      activeTab: "service"
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    handleMore() {
      common_vendor.index.__f__("log", "at pages/coupon/index.vue:90", "More clicked");
    },
    handleCircle() {
      common_vendor.index.__f__("log", "at pages/coupon/index.vue:93", "Circle clicked");
    },
    handleTabChange(tabId) {
      this.activeTab = tabId;
    }
  }
};
if (!Array) {
  const _component_coupon_list_section = common_vendor.resolveComponent("coupon-list-section");
  const _component_coupon_details_section = common_vendor.resolveComponent("coupon-details-section");
  (_component_coupon_list_section + _component_coupon_details_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args)),
    c: common_vendor.o((...args) => $options.handleCircle && $options.handleCircle(...args)),
    d: common_vendor.o($options.handleTabChange),
    e: common_vendor.p({
      ["active-tab"]: $data.activeTab
    }),
    f: common_vendor.p({
      ["active-tab"]: $data.activeTab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-59672890"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/coupon/index.js.map
