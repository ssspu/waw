"use strict";
const common_vendor = require("../../../common/vendor.js");
const DesignerBookingProfileSection = () => "../../DesignerBookingProfileSection.js";
const _sfc_main = {
  components: {
    DesignerBookingProfileSection
  },
  props: {
    activeSubTab: {
      type: String,
      default: "today"
    }
  }
};
if (!Array) {
  const _component_designer_booking_profile_section = common_vendor.resolveComponent("designer-booking-profile-section");
  _component_designer_booking_profile_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b5cdc124"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/designer/detail/DesignerAppointmentTabContent.js.map
