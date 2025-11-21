"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      settingsGroups: [
        {
          items: [
            { label: "个人信息", hasChevron: true }
          ]
        },
        {
          items: [
            { label: "账号安全", hasChevron: true },
            { label: "申请认证", hasChevron: true },
            { label: "地址管理", hasChevron: true },
            { label: "支付设置", hasChevron: true }
          ]
        },
        {
          items: [
            { label: "消息通知", hasToggle: true, checked: true },
            { label: "隐私设置", hasChevron: true },
            { label: "清除缓存", rightText: "365M" }
          ]
        },
        {
          items: [
            { label: "反馈意见", hasChevron: true },
            { label: "关于众美", hasChevron: true },
            { label: "协议与条款", hasChevron: true }
          ]
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    handleMore() {
      common_vendor.index.__f__("log", "at pages/setting/index.vue:147", "More clicked");
    },
    handleScan() {
      common_vendor.index.__f__("log", "at pages/setting/index.vue:150", "Scan clicked");
    },
    handleSettingClick(item) {
      common_vendor.index.__f__("log", "at pages/setting/index.vue:153", "Setting clicked:", item.label);
      if (item.label === "清除缓存") {
        this.handleClearCache();
      }
    },
    handleToggleChange(item, event) {
      const checked = event.detail.value || event.target.checked;
      item.checked = checked;
      common_vendor.index.__f__("log", "at pages/setting/index.vue:162", "Toggle changed:", item.label, checked);
    },
    handleClearCache() {
      common_vendor.index.showModal({
        title: "清除缓存",
        content: "确定要清除缓存吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/setting/index.vue:170", "Clear cache");
          }
        }
      });
    },
    handleLogout() {
      common_vendor.index.showModal({
        title: "退出登录",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/setting/index.vue:182", "Logout");
            common_vendor.index.reLaunch({ url: "/pages/index/index" });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.f($data.settingsGroups, (group, groupIndex, i0) => {
      return {
        a: common_vendor.f(group.items, (item, itemIndex, i1) => {
          return common_vendor.e({
            a: itemIndex > 0
          }, itemIndex > 0 ? {} : {}, {
            b: common_vendor.t(item.label),
            c: item.rightText
          }, item.rightText ? {
            d: common_vendor.t(item.rightText)
          } : {}, {
            e: item.hasToggle
          }, item.hasToggle ? {
            f: item.checked !== void 0 ? item.checked : true,
            g: common_vendor.o((e) => $options.handleToggleChange(item, e), itemIndex)
          } : {}, {
            h: item.hasChevron
          }, item.hasChevron ? {} : {}, {
            i: common_vendor.o(($event) => $options.handleSettingClick(item), itemIndex),
            j: itemIndex
          });
        }),
        b: groupIndex
      };
    }),
    c: common_vendor.o((...args) => $options.handleLogout && $options.handleLogout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-861f37f2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/index.js.map
