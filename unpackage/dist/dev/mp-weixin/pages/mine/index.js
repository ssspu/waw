"use strict";
const common_vendor = require("../../common/vendor.js");
const MineUserInfoSection = () => "../../components/mine/index/MineUserInfoSection.js";
const MineMenuSection = () => "../../components/mine/index/MineMenuSection.js";
const MineProfileSection = () => "../../components/mine/index/MineProfileSection.js";
const MineDashboardSection = () => "../../components/mine/index/MineDashboardSection.js";
const _sfc_main = {
  components: {
    MineUserInfoSection,
    MineMenuSection,
    MineProfileSection,
    MineDashboardSection
  }
};
if (!Array) {
  const _component_mine_user_info_section = common_vendor.resolveComponent("mine-user-info-section");
  const _component_mine_menu_section = common_vendor.resolveComponent("mine-menu-section");
  const _component_mine_profile_section = common_vendor.resolveComponent("mine-profile-section");
  const _component_mine_dashboard_section = common_vendor.resolveComponent("mine-dashboard-section");
  (_component_mine_user_info_section + _component_mine_menu_section + _component_mine_profile_section + _component_mine_dashboard_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-569e925a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/index.js.map
