"use strict";
const common_vendor = require("../../common/vendor.js");
const DesignerBookingSection = () => "../../components/DesignerBookingSection.js";
const DesignerBookingProfileSection = () => "../../components/DesignerBookingProfileSection.js";
const _sfc_main = {
  components: {
    DesignerBookingSection,
    DesignerBookingProfileSection
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    handleBooking() {
      common_vendor.index.__f__("log", "at pages/designer/booking.vue:67", "Booking clicked");
    }
  }
};
if (!Array) {
  const _component_designer_booking_section = common_vendor.resolveComponent("designer-booking-section");
  const _component_designer_booking_profile_section = common_vendor.resolveComponent("designer-booking-profile-section");
  (_component_designer_booking_section + _component_designer_booking_profile_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.handleBooking && $options.handleBooking(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9c3dadcc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/designer/booking.js.map
