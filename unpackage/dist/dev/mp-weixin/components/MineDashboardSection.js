"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      navigationItems: [
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-4.svg",
          label: "服务",
          isActive: false,
          path: "/pages/main/index?tab=service"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-15.svg",
          label: "消息",
          isActive: false,
          path: "/pages/main/index?tab=service"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-14.svg",
          label: "我的",
          isActive: true,
          path: "/pages/mine/index"
        }
      ]
    };
  },
  methods: {
    handleNavClick(index, item) {
      this.navigationItems.forEach((nav, i) => {
        nav.isActive = i === index;
      });
      if (item.path) {
        if (item.label === "服务") {
          common_vendor.index.navigateTo({ url: "/pages/main/index?tab=service" });
        } else if (item.label === "消息") {
          common_vendor.index.navigateTo({ url: "/pages/main/index?tab=service" });
        } else if (item.label === "我的")
          ;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.navigationItems, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.label),
        c: item.isActive ? 1 : "",
        d: index,
        e: item.isActive ? 1 : "",
        f: common_vendor.o(($event) => $options.handleNavClick(index, item), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e90275"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/MineDashboardSection.js.map
