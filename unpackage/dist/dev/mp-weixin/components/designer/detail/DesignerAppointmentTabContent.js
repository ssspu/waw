"use strict";
const common_vendor = require("../../../common/vendor.js");
const DesignerBookingProfileSection = () => "../../DesignerBookingProfileSection.js";
const _sfc_main = {
  components: {
    DesignerBookingProfileSection
  },
  data() {
    return {
      dateSchedule: [
        { date: "今天", day: "周一", active: true },
        { date: "明天", day: "周二", active: false },
        { date: "12.05", day: "周三", active: false },
        { date: "12.06", day: "周四", active: false },
        { date: "12.07", day: "周五", active: false },
        { date: "12.08", day: "周六", active: false },
        { date: "12.09", day: "周日", active: false }
      ]
    };
  },
  methods: {
    handleDateClick(index) {
      this.dateSchedule.forEach((date, i) => {
        date.active = i === index;
      });
    }
  }
};
if (!Array) {
  const _component_designer_booking_profile_section = common_vendor.resolveComponent("designer-booking-profile-section");
  _component_designer_booking_profile_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.dateSchedule, (date, index, i0) => {
      return {
        a: common_vendor.t(date.date),
        b: date.active ? 1 : "",
        c: common_vendor.t(date.day),
        d: date.active ? 1 : "",
        e: index,
        f: date.active ? 1 : "",
        g: common_vendor.o(($event) => $options.handleDateClick(index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b5cdc124"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/designer/detail/DesignerAppointmentTabContent.js.map
