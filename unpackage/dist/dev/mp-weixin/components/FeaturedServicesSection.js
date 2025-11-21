"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      services: [
        {
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-2.svg",
          label: "造型"
        },
        {
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006.svg",
          label: "剪发"
        },
        {
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-4.svg",
          label: "烫发"
        },
        {
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-6.svg",
          label: "染发"
        },
        {
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-3.svg",
          label: "护发"
        },
        {
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-5.svg",
          label: "头皮"
        },
        {
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-7.svg",
          label: "接发"
        },
        {
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2006-1.svg",
          label: "男士"
        }
      ]
    };
  },
  methods: {
    handleServiceClick(service) {
      common_vendor.index.__f__("log", "at components/FeaturedServicesSection.vue:61", "Service clicked:", service);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.services, (service, index, i0) => {
      return {
        a: service.icon,
        b: service.label,
        c: common_vendor.t(service.label),
        d: index,
        e: common_vendor.o(($event) => $options.handleServiceClick(service), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0dd5d930"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/FeaturedServicesSection.js.map
