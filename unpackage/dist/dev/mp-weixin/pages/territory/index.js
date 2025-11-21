"use strict";
const common_vendor = require("../../common/vendor.js");
const TerritoryHeaderSection = () => "../../components/territory/index/TerritoryHeaderSection.js";
const TerritoryUserProfileSection = () => "../../components/territory/index/TerritoryUserProfileSection.js";
const TerritoryServiceCardSection = () => "../../components/territory/index/TerritoryServiceCardSection.js";
const TerritoryServiceListSection = () => "../../components/territory/index/TerritoryServiceListSection.js";
const TerritoryBookingSection = () => "../../components/territory/index/TerritoryBookingSection.js";
const _sfc_main = {
  components: {
    TerritoryHeaderSection,
    TerritoryUserProfileSection,
    TerritoryServiceCardSection,
    TerritoryServiceListSection,
    TerritoryBookingSection
  },
  data() {
    return {
      activeTopTab: "designer",
      activeSubTab: "hairstylist"
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    handleMore() {
      common_vendor.index.__f__("log", "at pages/territory/index.vue:108", "More clicked");
    },
    handleRadio() {
      common_vendor.index.__f__("log", "at pages/territory/index.vue:111", "Radio clicked");
    },
    handleTopTabChange(tabId) {
      this.activeTopTab = tabId;
    },
    handleSubTabChange(tabId) {
      this.activeSubTab = tabId;
    }
  }
};
if (!Array) {
  const _component_territory_header_section = common_vendor.resolveComponent("territory-header-section");
  const _component_territory_user_profile_section = common_vendor.resolveComponent("territory-user-profile-section");
  const _component_territory_service_card_section = common_vendor.resolveComponent("territory-service-card-section");
  const _component_territory_service_list_section = common_vendor.resolveComponent("territory-service-list-section");
  const _component_territory_booking_section = common_vendor.resolveComponent("territory-booking-section");
  (_component_territory_header_section + _component_territory_user_profile_section + _component_territory_service_card_section + _component_territory_service_list_section + _component_territory_booking_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args)),
    c: common_vendor.o((...args) => $options.handleRadio && $options.handleRadio(...args)),
    d: common_vendor.o($options.handleTopTabChange),
    e: common_vendor.o($options.handleSubTabChange),
    f: common_vendor.p({
      ["active-top-tab"]: $data.activeTopTab,
      ["active-sub-tab"]: $data.activeSubTab
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8e3d1bd9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/territory/index.js.map
