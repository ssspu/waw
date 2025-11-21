"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statsData: [
        { value: "1244", label: "关注" },
        { value: "123", label: "粉丝" },
        { value: "234", label: "问答" },
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
    handleEdit() {
      common_vendor.index.__f__("log", "at components/MineUserInfoSection.vue:93", "Edit clicked");
    },
    handleTerritoryClick() {
      common_vendor.index.navigateTo({ url: "/pages/territory/index" });
    },
    handleQrClick() {
      common_vendor.index.__f__("log", "at components/MineUserInfoSection.vue:99", "QR code clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.statsData, (stat, index, i0) => {
      return {
        a: common_vendor.t(stat.value),
        b: common_vendor.t(stat.label),
        c: index
      };
    }),
    b: common_vendor.o((...args) => $options.handleEdit && $options.handleEdit(...args)),
    c: common_vendor.f($data.territoryAvatars, (avatar, index, i0) => {
      return {
        a: index,
        b: `url(${avatar})`,
        c: index > 0 ? "-20rpx" : "0"
      };
    }),
    d: common_vendor.o((...args) => $options.handleQrClick && $options.handleQrClick(...args)),
    e: common_vendor.o((...args) => $options.handleTerritoryClick && $options.handleTerritoryClick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d4bb542b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/MineUserInfoSection.js.map
