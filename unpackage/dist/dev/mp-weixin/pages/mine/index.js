"use strict";
const common_vendor = require("../../common/vendor.js");
const MineUserInfoSection = () => "../../components/mine/index/MineUserInfoSection.js";
const MineProfileSection = () => "../../components/mine/index/MineProfileSection.js";
const MineDashboardSection = () => "../../components/mine/index/MineDashboardSection.js";
const _sfc_main = {
  components: {
    MineUserInfoSection,
    MineProfileSection,
    MineDashboardSection
  },
  methods: {
    handleCustomerService(e) {
      common_vendor.index.__f__("log", "at pages/mine/index.vue:38", "Customer service button clicked", e);
      common_vendor.index.showToast({ title: "点击了客服按钮", icon: "none", duration: 2e3 });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/mine/customer-service",
          success: () => {
            common_vendor.index.__f__("log", "at pages/mine/index.vue:44", "Navigate to customer service success");
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/mine/index.vue:47", "Navigate to customer service failed:", err);
            common_vendor.index.showToast({ title: "页面跳转失败: " + JSON.stringify(err), icon: "none", duration: 3e3 });
          }
        });
      }, 100);
    }
  }
};
if (!Array) {
  const _component_mine_user_info_section = common_vendor.resolveComponent("mine-user-info-section");
  const _component_mine_profile_section = common_vendor.resolveComponent("mine-profile-section");
  const _component_mine_dashboard_section = common_vendor.resolveComponent("mine-dashboard-section");
  (_component_mine_user_info_section + _component_mine_profile_section + _component_mine_dashboard_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleCustomerService && $options.handleCustomerService(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-569e925a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/index.js.map
