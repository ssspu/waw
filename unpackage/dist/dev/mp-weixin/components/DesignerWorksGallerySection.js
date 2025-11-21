"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      hairVolume: "less",
      hairQuality: "soft",
      hairThickness: "fine",
      hairAttributes: [
        {
          label: "发量",
          options: [
            { value: "less", label: "少" },
            { value: "normal", label: "正常" },
            { value: "more", label: "多" }
          ]
        },
        {
          label: "发质",
          options: [
            { value: "soft", label: "软" },
            { value: "normal", label: "正常" },
            { value: "hard", label: "硬" }
          ]
        },
        {
          label: "粗细",
          options: [
            { value: "fine", label: "细" },
            { value: "normal", label: "正常" },
            { value: "thick", label: "粗" }
          ]
        }
      ],
      galleryImages: [
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" }
      ]
    };
  },
  methods: {
    handleHairVolumeChange(value) {
      this.hairVolume = value;
    },
    handleHairQualityChange(value) {
      this.hairQuality = value;
    },
    handleHairThicknessChange(value) {
      this.hairThickness = value;
    },
    handleImageClick(src, index) {
      const urls = this.galleryImages.map((img) => img.src);
      common_vendor.index.previewImage({
        urls,
        current: src
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.hairAttributes[0].label),
    b: common_vendor.f($data.hairAttributes[0].options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.label),
        b: $data.hairVolume === option.value ? 1 : "",
        c: option.value,
        d: $data.hairVolume === option.value ? 1 : "",
        e: common_vendor.o(($event) => $options.handleHairVolumeChange(option.value), option.value)
      };
    }),
    c: common_vendor.t($data.hairAttributes[1].label),
    d: common_vendor.f($data.hairAttributes[1].options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.label),
        b: $data.hairQuality === option.value ? 1 : "",
        c: option.value,
        d: $data.hairQuality === option.value ? 1 : "",
        e: common_vendor.o(($event) => $options.handleHairQualityChange(option.value), option.value)
      };
    }),
    e: common_vendor.t($data.hairAttributes[2].label),
    f: common_vendor.f($data.hairAttributes[2].options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.label),
        b: $data.hairThickness === option.value ? 1 : "",
        c: option.value,
        d: $data.hairThickness === option.value ? 1 : "",
        e: common_vendor.o(($event) => $options.handleHairThicknessChange(option.value), option.value)
      };
    }),
    g: common_vendor.f($data.galleryImages, (image, index, i0) => {
      return {
        a: index,
        b: index >= 4 ? 1 : "",
        c: image.src,
        d: common_vendor.o(($event) => $options.handleImageClick(image.src, index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3cc156a4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerWorksGallerySection.js.map
