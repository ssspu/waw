"use strict";
const common_vendor = require("../../common/vendor.js");
const DesignerInfoProfileSection = () => "../../components/designer/info/DesignerInfoProfileSection.js";
const DesignerInfoServicesSection = () => "../../components/designer/info/DesignerInfoServicesSection.js";
const _sfc_main = {
  components: {
    DesignerInfoProfileSection,
    DesignerInfoServicesSection
  },
  data() {
    return {
      activeTab: "designer"
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    handleTabChange(tab) {
      this.activeTab = tab;
    }
  }
};
if (!Array) {
  const _component_designer_info_profile_section = common_vendor.resolveComponent("designer-info-profile-section");
  const _component_designer_info_services_section = common_vendor.resolveComponent("designer-info-services-section");
  (_component_designer_info_profile_section + _component_designer_info_services_section)();
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-66b2d737"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/designer/info.js.map
