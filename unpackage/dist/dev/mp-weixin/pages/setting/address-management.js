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
      addresses: [
        {
          id: 1,
          name: "李小姐",
          phone: "18999279748",
          isDefault: true,
          province: "四川省",
          city: "成都市",
          district: "武侯区",
          title: "默认地址",
          detail: "软件园b7栋613号武侯区软件园b7栋613号"
        },
        {
          id: 2,
          name: "李小姐",
          phone: "18999279748",
          isDefault: false,
          province: "四川省",
          city: "成都市",
          district: "武侯区",
          title: "默认地址",
          detail: "软件园b7栋613号武侯区软件园b7栋613号"
        }
      ]
    };
  },
  methods: {
    handleEditAddress(address) {
      common_vendor.index.__f__("log", "at pages/setting/address-management.vue:96", "Edit address:", address.id);
    },
    handleDeleteAddress(address) {
      common_vendor.index.showModal({
        title: "删除地址",
        content: "确定要删除这个地址吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/setting/address-management.vue:104", "Delete address:", address.id);
          }
        }
      });
    },
    handleAddAddress() {
      common_vendor.index.__f__("log", "at pages/setting/address-management.vue:110", "Add new address");
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
      title: "收货地址"
    }),
    b: common_vendor.f($data.addresses, (address, index, i0) => {
      return common_vendor.e({
        a: address.isDefault
      }, address.isDefault ? {} : {}, {
        b: common_vendor.t(address.name),
        c: common_vendor.t(address.phone),
        d: address.isDefault
      }, address.isDefault ? {} : {}, {
        e: common_vendor.t(address.province),
        f: common_vendor.t(address.city),
        g: common_vendor.t(address.district),
        h: common_vendor.t(address.detail),
        i: common_vendor.o(($event) => $options.handleEditAddress(address), index),
        j: index
      });
    }),
    c: common_assets._imports_0$1,
    d: common_vendor.o((...args) => $options.handleAddAddress && $options.handleAddAddress(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e596e12c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/address-management.js.map
