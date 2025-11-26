"use strict";
const common_vendor = require("../../common/vendor.js");
const OrderNavigationBar = () => "../../components/order/index/OrderNavigationBar.js";
const OrderServiceList = () => "../../components/order/index/OrderServiceList.js";
const _sfc_main = {
  components: {
    OrderNavigationBar,
    OrderServiceList
  },
  data() {
    return {
      activeTab: "all"
    };
  },
  onLoad(options) {
    if (options.tab) {
      this.activeTab = options.tab;
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    handleMore() {
      common_vendor.index.__f__("log", "at pages/order/index.vue:63", "More clicked");
    },
    handleCircle() {
      common_vendor.index.__f__("log", "at pages/order/index.vue:66", "Circle clicked");
    },
    handleTabChange(tabId) {
      this.activeTab = tabId;
    }
  }
};
if (!Array) {
  const _component_order_navigation_bar = common_vendor.resolveComponent("order-navigation-bar");
  const _component_order_service_list = common_vendor.resolveComponent("order-service-list");
  (_component_order_navigation_bar + _component_order_service_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o($options.handleTabChange),
    c: common_vendor.p({
      ["active-tab"]: $data.activeTab
    }),
    d: common_vendor.p({
      ["active-tab"]: $data.activeTab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-17a44f9d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/index.js.map
