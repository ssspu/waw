"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      scrollHeight: 0,
      selectedFace: "oval",
      hairVolume: "less",
      hairQuality: "soft",
      hairThickness: "fine",
      // 脸型选项
      faceTypes: [
        { id: "oval", icon: "/static/icon/face-oval.png", activeIcon: "/static/icon/face-oval-active.png" },
        { id: "circle", icon: "/static/icon/face-circle.png", activeIcon: "/static/icon/face-circle-active.png" },
        { id: "square", icon: "/static/icon/face-square.png", activeIcon: "/static/icon/face-square-active.png" },
        { id: "diamond", icon: "/static/icon/face-diamond.png", activeIcon: "/static/icon/face-diamond-active.png" },
        { id: "triangle", icon: "/static/icon/face-triangle.png", activeIcon: "/static/icon/face-triangle-active.png" },
        { id: "rounded-rect", icon: "/static/icon/face-rounded-rect.png", activeIcon: "/static/icon/face-rounded-rect-active.png" }
      ],
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
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" },
        { src: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-173.png" }
      ]
    };
  },
  mounted() {
    const systemInfo = common_vendor.index.getSystemInfoSync();
    this.scrollHeight = systemInfo.windowHeight;
  },
  methods: {
    handleFaceChange(value) {
      this.selectedFace = value;
    },
    handleHairVolumeChange(value) {
      this.hairVolume = value;
    },
    handleHairQualityChange(value) {
      this.hairQuality = value;
    },
    handleHairThicknessChange(value) {
      this.hairThickness = value;
    },
    handleImageClick(image, index) {
      const urls = this.galleryImages.map((img) => img.src);
      common_vendor.index.previewImage({
        urls,
        current: image
      });
    },
    handleScrollToBottom() {
      common_vendor.index.__f__("log", "at components/DesignerWorksGallerySection.vue:198", "已滚动到底部");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.faceTypes, (face, index, i0) => {
      return {
        a: $data.selectedFace === face.id ? face.activeIcon : face.icon,
        b: face.id,
        c: $data.selectedFace === face.id ? 1 : "",
        d: common_vendor.o(($event) => $options.handleFaceChange(face.id), face.id)
      };
    }),
    b: common_vendor.t($data.hairAttributes[0].label),
    c: common_vendor.f($data.hairAttributes[0].options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.label),
        b: $data.hairVolume === option.value ? 1 : "",
        c: option.value,
        d: $data.hairVolume === option.value ? 1 : "",
        e: common_vendor.o(($event) => $options.handleHairVolumeChange(option.value), option.value)
      };
    }),
    d: common_vendor.t($data.hairAttributes[1].label),
    e: common_vendor.f($data.hairAttributes[1].options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.label),
        b: $data.hairQuality === option.value ? 1 : "",
        c: option.value,
        d: $data.hairQuality === option.value ? 1 : "",
        e: common_vendor.o(($event) => $options.handleHairQualityChange(option.value), option.value)
      };
    }),
    f: common_vendor.t($data.hairAttributes[2].label),
    g: common_vendor.f($data.hairAttributes[2].options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.label),
        b: $data.hairThickness === option.value ? 1 : "",
        c: option.value,
        d: $data.hairThickness === option.value ? 1 : "",
        e: common_vendor.o(($event) => $options.handleHairThicknessChange(option.value), option.value)
      };
    }),
    h: common_vendor.f($data.galleryImages, (image, index, i0) => {
      return {
        a: index,
        b: image.src,
        c: common_vendor.o(($event) => $options.handleImageClick(image.src, index), index)
      };
    }),
    i: $data.scrollHeight + "px",
    j: common_vendor.o((...args) => $options.handleScrollToBottom && $options.handleScrollToBottom(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3cc156a4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerWorksGallerySection.js.map
