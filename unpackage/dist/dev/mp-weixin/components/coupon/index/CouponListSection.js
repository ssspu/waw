"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    activeTab: {
      type: String,
      default: "service"
    }
  },
  data() {
    return {
      tabItems: [
        { id: "service", label: "服务券" },
        { id: "product", label: "商品券" },
        { id: "ended", label: "已结束" }
      ]
    };
  },
  methods: {
    handleTabClick(tabId) {
      this.$emit("tab-change", tabId);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabItems, (tab, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: $props.activeTab === tab.id ? 1 : "",
        c: $props.activeTab === tab.id
      }, $props.activeTab === tab.id ? {} : {}, {
        d: tab.id,
        e: $props.activeTab === tab.id ? 1 : "",
        f: common_vendor.o(($event) => $options.handleTabClick(tab.id), tab.id)
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1f185dfd"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/coupon/index/CouponListSection.js.map
