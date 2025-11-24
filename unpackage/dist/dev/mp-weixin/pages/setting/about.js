"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const SettingDetailHeader = () => "../../components/setting/SettingDetailHeader.js";
const _sfc_main = {
  components: {
    SettingDetailHeader
  },
  data() {
    return {
      aboutItems: [
        { label: "功能介绍" },
        { label: "常见问题" },
        { label: "意见反馈" },
        { label: "用户协议" },
        { label: "隐私政策" }
      ]
    };
  },
  methods: {
    handleItemClick(item) {
      common_vendor.index.__f__("log", "at pages/setting/about.vue:114", "Click:", item.label);
      if (item.label === "用户协议") {
        common_vendor.index.navigateTo({ url: "/pages/setting/agreement" });
      }
    },
    handleCheckUpdate() {
      common_vendor.index.showLoading({
        title: "检查中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "已是最新版本",
          icon: "success"
        });
      }, 1500);
    }
  }
};
if (!Array) {
  const _component_SettingDetailHeader = common_vendor.resolveComponent("SettingDetailHeader");
  _component_SettingDetailHeader();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "关于众美"
    }),
    b: common_vendor.f($data.aboutItems, (item, index, i0) => {
      return common_vendor.e({
        a: index > 0
      }, index > 0 ? {} : {}, {
        b: common_vendor.t(item.label),
        c: common_vendor.o(($event) => $options.handleItemClick(item), index),
        d: index
      });
    }),
    c: common_assets._imports_0,
    d: common_vendor.o((...args) => $options.handleCheckUpdate && $options.handleCheckUpdate(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8d9f0409"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/about.js.map
