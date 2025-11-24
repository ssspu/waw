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
      merchantItems: [
        { label: "设计师认证", status: "pending" },
        { label: "品牌认证", status: "pending" },
        { label: "服务商认证", status: "pending" }
      ]
    };
  },
  methods: {
    handleEditCertification() {
      common_vendor.index.__f__("log", "at pages/setting/apply-certification.vue:88", "Edit certification");
    },
    handleMerchantApply(item) {
      common_vendor.index.__f__("log", "at pages/setting/apply-certification.vue:91", "Apply for:", item.label);
      common_vendor.index.showModal({
        title: item.label,
        content: "点击申请，系统将审核您的资料",
        confirmText: "申请",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/setting/apply-certification.vue:98", "Submit merchant application:", item.label);
          }
        }
      });
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
      title: "申请认证"
    }),
    b: common_assets._imports_0,
    c: common_vendor.o((...args) => $options.handleEditCertification && $options.handleEditCertification(...args)),
    d: common_vendor.f($data.merchantItems, (item, index, i0) => {
      return common_vendor.e({
        a: index > 0
      }, index > 0 ? {} : {}, {
        b: common_vendor.t(item.label),
        c: common_vendor.o(($event) => $options.handleMerchantApply(item), index),
        d: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-03014376"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/apply-certification.js.map
