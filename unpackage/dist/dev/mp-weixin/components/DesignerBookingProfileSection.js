"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      morningSlots: [
        { time: "10:00", status: "booked", label: "已预约" },
        { time: "11:00", status: "booked", label: "已预约" },
        { time: "12:00", status: "selected", label: null }
      ],
      afternoonSlots: [
        { time: "13:00", status: "available" },
        { time: "14:00", status: "available" },
        { time: "15:00", status: "available" },
        { time: "16:00", status: "available" },
        { time: "17:00", status: "available" },
        { time: "18:00", status: "available" }
      ]
    };
  },
  methods: {
    handleSlotClick(period, index) {
      if (period === "morning") {
        const slot = this.morningSlots[index];
        if (slot.status === "booked") {
          return;
        }
        this.morningSlots.forEach((s, i) => {
          if (s.status === "selected") {
            s.status = "available";
            s.label = null;
          }
        });
        this.afternoonSlots.forEach((s) => {
          s.status = "available";
        });
        slot.status = "selected";
      } else if (period === "afternoon") {
        const slot = this.afternoonSlots[index];
        if (slot.status === "booked") {
          return;
        }
        this.morningSlots.forEach((s) => {
          if (s.status === "selected") {
            s.status = "available";
            s.label = null;
          }
        });
        this.afternoonSlots.forEach((s, i) => {
          if (s.status === "selected") {
            s.status = "available";
          }
        });
        slot.status = "selected";
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.morningSlots, (slot, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(slot.time),
        b: slot.status === "selected" ? 1 : "",
        c: slot.status === "booked" ? 1 : "",
        d: slot.label
      }, slot.label ? {
        e: common_vendor.t(slot.label)
      } : {}, {
        f: index,
        g: slot.status === "selected" ? 1 : "",
        h: slot.status === "booked" ? 1 : "",
        i: common_vendor.o(($event) => $options.handleSlotClick("morning", index), index)
      });
    }),
    b: common_vendor.f($data.afternoonSlots, (slot, index, i0) => {
      return {
        a: common_vendor.t(slot.time),
        b: index,
        c: common_vendor.o(($event) => $options.handleSlotClick("afternoon", index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9016fa96"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerBookingProfileSection.js.map
