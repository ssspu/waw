"use strict";
const common_vendor = require("../common/vendor.js");
const DesignerWorksGallerySection = () => "./DesignerWorksGallerySection.js";
const _sfc_main = {
  components: {
    DesignerWorksGallerySection
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
  const _component_designer_works_gallery_section = common_vendor.resolveComponent("designer-works-gallery-section");
  _component_designer_works_gallery_section();
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6e94d26d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerWorksTabContent.js.map
