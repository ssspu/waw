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
      basicInfoItems: [
        { label: "昵称", key: "nickname" },
        { label: "性别", key: "gender" },
        { label: "职业", key: "profession" },
        { label: "地区", key: "region" }
      ],
      userInfo: {
        avatar: "https://c.animaapp.com/mi5nkzbpeEnFKd/img/placeholder-avatar.png",
        nickname: "yangqixiaonv",
        gender: "女",
        profession: "美发师",
        region: "四川-成都",
        bio: "输入1-30字简介"
      }
    };
  },
  methods: {
    handleAvatarClick() {
      common_vendor.index.showActionSheet({
        itemList: ["拍照", "从相册选择", "删除"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/setting/personal-info.vue:184", "Avatar action:", res.tapIndex);
        }
      });
    },
    handleItemClick(item) {
      common_vendor.index.__f__("log", "at pages/setting/personal-info.vue:189", "Edit:", item.label);
    },
    handleQRCodeClick() {
      common_vendor.index.__f__("log", "at pages/setting/personal-info.vue:192", "Edit QR code");
    },
    handleBioClick() {
      common_vendor.index.__f__("log", "at pages/setting/personal-info.vue:195", "Edit bio");
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
      title: "个人信息"
    }),
    b: $data.userInfo.avatar,
    c: common_assets._imports_0,
    d: common_vendor.o((...args) => $options.handleAvatarClick && $options.handleAvatarClick(...args)),
    e: common_vendor.t($data.userInfo.nickname),
    f: common_assets._imports_0,
    g: common_vendor.o(($event) => $options.handleItemClick($data.basicInfoItems[0])),
    h: common_vendor.t($data.userInfo.gender),
    i: common_assets._imports_0,
    j: common_vendor.o(($event) => $options.handleItemClick($data.basicInfoItems[1])),
    k: common_assets._imports_0,
    l: common_vendor.o((...args) => $options.handleQRCodeClick && $options.handleQRCodeClick(...args)),
    m: common_vendor.t($data.userInfo.profession),
    n: common_assets._imports_0,
    o: common_vendor.o(($event) => $options.handleItemClick($data.basicInfoItems[2])),
    p: common_vendor.t($data.userInfo.region),
    q: common_assets._imports_0,
    r: common_vendor.o(($event) => $options.handleItemClick($data.basicInfoItems[3])),
    s: common_vendor.t($data.userInfo.bio),
    t: common_assets._imports_0,
    v: common_vendor.o((...args) => $options.handleBioClick && $options.handleBioClick(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f894702e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/personal-info.js.map
