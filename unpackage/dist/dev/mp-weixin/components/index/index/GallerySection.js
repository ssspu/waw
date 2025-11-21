"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      navigationItems: [
        {
          icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2.svg",
          label: "服务",
          isActive: true
        },
        {
          icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame.svg",
          label: "消息",
          isActive: false
        },
        {
          icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-1.svg",
          label: "我的",
          isActive: false
        }
      ]
    };
  },
  methods: {
    handleNavClick(index) {
      this.navigationItems.forEach((item2, i) => {
        item2.isActive = i === index;
      });
      const item = this.navigationItems[index];
      if (item.label === "服务") {
        common_vendor.index.navigateTo({ url: "/pages/main/index?tab=service" });
      } else if (item.label === "消息") {
        common_vendor.index.navigateTo({ url: "/pages/main/index?tab=service" });
      } else if (item.label === "我的") {
        common_vendor.index.navigateTo({ url: "/pages/mine/index" });
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
        f: common_vendor.o(($event) => $options.handleNavClick(index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d1783240"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/index/index/GallerySection.js.map
