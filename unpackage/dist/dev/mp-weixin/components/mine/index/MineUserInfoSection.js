"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statsData: [
        { value: "1244", label: "关注" },
        { value: "234", label: "浏览" },
        { value: "1245", label: "收藏" }
      ],
      territoryAvatars: [
        "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
        "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
        "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
        "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
        "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png",
        "https://c.animaapp.com/mi5lwd2pQMRb0W/img/ellipse-78-5.png"
      ]
    };
  },
  methods: {
    handleStatClick(stat) {
      if (stat.label === "关注") {
        common_vendor.index.navigateTo({ url: "/pages/mine/follow-list" });
      } else if (stat.label === "浏览") {
        common_vendor.index.navigateTo({ url: "/pages/mine/browse-records" });
      } else if (stat.label === "收藏") {
        common_vendor.index.navigateTo({ url: "/pages/mine/favorites" });
      }
    },
    handleTerritoryClick() {
      common_vendor.index.navigateTo({ url: "/pages/territory/index" });
    },
    handleQrClick() {
      common_vendor.index.__f__("log", "at components/mine/index/MineUserInfoSection.vue:102", "QR code clicked");
      common_vendor.index.navigateTo({
        url: "/pages/mine/qr-code-card"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.statsData, (stat, index, i0) => {
      return {
        a: common_vendor.t(stat.value),
        b: common_vendor.t(stat.label),
        c: index,
        d: common_vendor.o(($event) => $options.handleStatClick(stat), index)
      };
    }),
    b: common_vendor.f($data.territoryAvatars, (avatar, index, i0) => {
      return {
        a: index,
        b: `url(${avatar})`,
        c: index > 0 ? "-20rpx" : "0"
      };
    }),
    c: common_vendor.o((...args) => $options.handleTerritoryClick && $options.handleTerritoryClick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-012df707"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/mine/index/MineUserInfoSection.js.map
