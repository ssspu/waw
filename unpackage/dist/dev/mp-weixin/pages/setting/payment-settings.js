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
      paymentItems: [
        { label: "设置交易密码", value: "" },
        { label: "设置收款账户", value: "" },
        { label: "银行卡", value: "" }
      ],
      bindingCards: [
        {
          id: 1,
          type: "支付宝",
          number: "账户名称 ***8888"
        },
        {
          id: 2,
          type: "微信支付",
          number: "账户名称 ***6666"
        }
      ]
    };
  },
  methods: {
    handleItemClick(item) {
      common_vendor.index.__f__("log", "at pages/setting/payment-settings.vue:65", "Edit:", item.label);
    },
    handleUnbindCard(card) {
      common_vendor.index.showModal({
        title: "解绑支付方式",
        content: `确定要解绑${card.type}吗？`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/setting/payment-settings.vue:74", "Unbind card:", card.id);
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
      title: "支付设置"
    }),
    b: common_vendor.f($data.paymentItems, (item, index, i0) => {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5b7228e9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/payment-settings.js.map
