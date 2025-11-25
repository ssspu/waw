"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      settingsGroups: [
        {
          items: [
            { label: "个人信息" }
          ]
        },
        {
          items: [
            { label: "账号安全" },
            { label: "申请认证" },
            { label: "地址管理" },
            { label: "支付设置" }
          ]
        },
        {
          items: [
            { label: "消息通知", hasToggle: true, checked: true },
            { label: "隐私设置" },
            { label: "清除缓存", rightText: "365M" }
          ]
        },
        {
          items: [
            { label: "反馈意见" },
            { label: "关于众美" },
            { label: "协议与条款" }
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
      common_vendor.index.__f__("log", "at pages/setting/index.vue:152", "More clicked");
    },
    handleScan() {
      common_vendor.index.__f__("log", "at pages/setting/index.vue:155", "Scan clicked");
    },
    handleSettingClick(item) {
      common_vendor.index.__f__("log", "at pages/setting/index.vue:158", "Setting clicked:", item.label);
      if (item.label === "清除缓存") {
        if (!event.target.closest(".action-button")) {
          this.navigateToDetailPage(item.label);
        }
      } else if (item.hasToggle) {
        return;
      } else {
        this.navigateToDetailPage(item.label);
      }
    },
    handleActionClick(item, event2) {
      event2.stopPropagation();
      if (item.label === "清除缓存") {
        this.handleClearCache();
      }
      common_vendor.index.__f__("log", "at pages/setting/index.vue:177", "Action button clicked:", item.label);
    },
    navigateToDetailPage(label) {
      const routeMap = {
        "个人信息": "/pages/setting/personal-info",
        "账号安全": "/pages/setting/account-security",
        "申请认证": "/pages/setting/apply-certification",
        "地址管理": "/pages/setting/address-management",
        "支付设置": "/pages/setting/payment-settings",
        "隐私设置": "/pages/setting/privacy-settings",
        "反馈意见": "/pages/setting/feedback",
        "关于众美": "/pages/setting/about",
        "协议与条款": "/pages/setting/agreement"
      };
      const url = routeMap[label];
      if (url) {
        common_vendor.index.navigateTo({ url });
      }
    },
    handleToggleChange(item, event2) {
      const checked = event2.detail.value || event2.target.checked;
      item.checked = checked;
      common_vendor.index.__f__("log", "at pages/setting/index.vue:199", "Toggle changed:", item.label, checked);
    },
    handleClearCache() {
      common_vendor.index.showModal({
        title: "清除缓存",
        content: "确定要清除缓存吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/setting/index.vue:207", "Clear cache");
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
            common_vendor.index.__f__("log", "at pages/setting/index.vue:219", "Logout");
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
            h: !item.hasToggle
          }, !item.hasToggle ? {
            i: common_assets._imports_0$1,
            j: common_vendor.o(($event) => $options.handleActionClick(item, $event), itemIndex)
          } : {}, {
            k: common_vendor.o(($event) => $options.handleSettingClick(item), itemIndex),
            l: itemIndex
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
