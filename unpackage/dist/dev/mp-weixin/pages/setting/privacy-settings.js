"use strict";
const common_vendor = require("../../common/vendor.js");
const SettingDetailHeader = () => "../../components/setting/SettingDetailHeader.js";
const _sfc_main = {
  components: {
    SettingDetailHeader
  },
  data() {
    return {
      privacyItems: [
        {
          label: "开启地理位置",
          desc: "开启后，其他用户可通过位置搜索到您",
          checked: true
        },
        {
          label: "允许访问相册",
          desc: "开启后，可以访问您的相册信息",
          checked: false
        },
        {
          label: "允许访问相机",
          desc: "开启后，可以访问您的相机",
          checked: false
        },
        {
          label: "允许访问麦克风",
          desc: "开启后，可以访问您的麦克风",
          checked: false
        }
      ]
    };
  },
  methods: {
    handleToggleChange(item, event) {
      const checked = event.detail.value || event.target.checked;
      item.checked = checked;
      common_vendor.index.__f__("log", "at pages/setting/privacy-settings.vue:72", "Toggle changed:", item.label, checked);
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
      title: "隐私设置"
    }),
    b: common_vendor.f($data.privacyItems, (item, index, i0) => {
      return common_vendor.e({
        a: index > 0
      }, index > 0 ? {} : {}, {
        b: common_vendor.t(item.label),
        c: common_vendor.t(item.desc),
        d: item.checked,
        e: common_vendor.o((e) => $options.handleToggleChange(item, e), index),
        f: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-41123cfa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/privacy-settings.js.map
