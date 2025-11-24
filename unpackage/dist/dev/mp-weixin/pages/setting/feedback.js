"use strict";
const common_vendor = require("../../common/vendor.js");
const SettingDetailHeader = () => "../../components/setting/SettingDetailHeader.js";
const _sfc_main = {
  components: {
    SettingDetailHeader
  },
  data() {
    return {
      feedbackTypes: ["功能建议", "问题报告", "体验反馈", "其他"],
      selectedType: "功能建议",
      feedbackContent: "",
      uploadedImages: [],
      contactInfo: ""
    };
  },
  methods: {
    handleAddImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          if (this.uploadedImages.length < 3) {
            this.uploadedImages.push(res.tempFilePaths[0]);
          }
        }
      });
    },
    removeImage(index) {
      this.uploadedImages.splice(index, 1);
    },
    handleSubmitFeedback() {
      if (!this.feedbackContent.trim()) {
        common_vendor.index.showToast({
          title: "请输入反馈内容",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "感谢您的反馈",
          icon: "success"
        });
        this.feedbackContent = "";
        this.uploadedImages = [];
        this.contactInfo = "";
        this.selectedType = "功能建议";
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }, 1e3);
    }
  }
};
if (!Array) {
  const _component_SettingDetailHeader = common_vendor.resolveComponent("SettingDetailHeader");
  _component_SettingDetailHeader();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "反馈意见"
    }),
    b: common_vendor.f($data.feedbackTypes, (type, index, i0) => {
      return {
        a: common_vendor.t(type),
        b: index,
        c: $data.selectedType === type ? 1 : "",
        d: common_vendor.o(($event) => $data.selectedType = type, index)
      };
    }),
    c: $data.feedbackContent,
    d: common_vendor.o(($event) => $data.feedbackContent = $event.detail.value),
    e: common_vendor.t($data.feedbackContent.length),
    f: common_vendor.f($data.uploadedImages, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.removeImage(index), index),
        c: index
      };
    }),
    g: $data.uploadedImages.length < 3
  }, $data.uploadedImages.length < 3 ? {
    h: common_vendor.o((...args) => $options.handleAddImage && $options.handleAddImage(...args))
  } : {}, {
    i: $data.contactInfo,
    j: common_vendor.o(($event) => $data.contactInfo = $event.detail.value),
    k: common_vendor.o((...args) => $options.handleSubmitFeedback && $options.handleSubmitFeedback(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-73450249"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/feedback.js.map
