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
      securityItems: [
        { label: "修改手机号码", value: "151****65" },
        { label: "修改登录密码", value: "" }
      ]
    };
  },
  methods: {
    handleItemClick(item) {
      common_vendor.index.__f__("log", "at pages/setting/account-security.vue:52", "Edit:", item.label);
      if (item.label === "修改手机号码") {
        this.navigateToEditPhone();
      } else if (item.label === "修改登录密码") {
        this.navigateToEditPassword();
      }
    },
    navigateToEditPhone() {
      common_vendor.index.__f__("log", "at pages/setting/account-security.vue:61", "Navigate to edit phone");
    },
    navigateToEditPassword() {
      common_vendor.index.__f__("log", "at pages/setting/account-security.vue:64", "Navigate to edit password");
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
      title: "账号安全"
    }),
    b: common_vendor.f($data.securityItems, (item, index, i0) => {
      return common_vendor.e({
        a: index > 0
      }, index > 0 ? {} : {}, {
        b: common_vendor.t(item.label),
        c: item.value
      }, item.value ? {
        d: common_vendor.t(item.value)
      } : {}, {
        e: common_vendor.o(($event) => $options.handleItemClick(item), index),
        f: index
      });
    }),
    c: common_assets._imports_0
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cfee160a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/account-security.js.map
