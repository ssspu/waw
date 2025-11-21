"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  methods: {
    handleFilter() {
      common_vendor.index.__f__("log", "at components/VIPSection.vue:15", "Filter clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleFilter && $options.handleFilter(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a57373fa"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/VIPSection.js.map
