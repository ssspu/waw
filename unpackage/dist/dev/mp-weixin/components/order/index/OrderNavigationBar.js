"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    activeTab: {
      type: String,
      default: "all"
    }
  },
  data() {
    return {
      navigationItems: [
        { id: "all", label: "全部" },
        { id: "pending-payment", label: "待付款" },
        { id: "pending-confirm", label: "待确认" },
        { id: "pending-use", label: "待使用" },
        { id: "pending-review", label: "待评价" }
      ]
    };
  },
  methods: {
    handleNavClick(tabId) {
      this.$emit("tab-change", tabId);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.navigationItems, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.label),
        b: $props.activeTab === item.id ? 1 : "",
        c: $props.activeTab === item.id
      }, $props.activeTab === item.id ? {} : {}, {
        d: item.id,
        e: $props.activeTab === item.id ? 1 : "",
        f: common_vendor.o(($event) => $options.handleNavClick(item.id), item.id)
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-52ff1e06"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/order/index/OrderNavigationBar.js.map
